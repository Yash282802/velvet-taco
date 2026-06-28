```python
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, String, Integer, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

app = FastAPI()

# CORS Configuration
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database Configuration
SQLALCHEMY_DATABASE_URL = "sqlite:///database.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class Contact(Base):
    __tablename__ = "contacts"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    message = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String, index=True)
    email = Column(String, index=True)
    phone = Column(String, index=True)
    service = Column(String, index=True)
    preferred_date = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

# Create database tables
Base.metadata.create_all(bind=engine)

# Pydantic Models
class ContactRequest(BaseModel):
    name: str
    email: str
    message: str

class BookingRequest(BaseModel):
    customer_name: str
    email: str
    phone: str
    service: str
    preferred_date: str

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Routes
@app.post("/api/contact")
async def create_contact(contact: ContactRequest, db: SessionLocal = next(get_db())):
    db_contact = Contact(name=contact.name, email=contact.email, message=contact.message)
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return JSONResponse(content={"message": "Contact created successfully"}, status_code=201)

@app.post("/api/bookings")
async def create_booking(booking: BookingRequest, db: SessionLocal = next(get_db())):
    db_booking = Booking(
        customer_name=booking.customer_name,
        email=booking.email,
        phone=booking.phone,
        service=booking.service,
        preferred_date=booking.preferred_date,
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return JSONResponse(content={"message": "Booking created successfully"}, status_code=201)

@app.get("/api/health")
async def get_health():
    return JSONResponse(content={"status": "healthy"}, status_code=200)
```