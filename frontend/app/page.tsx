```typescript
import { useState } from 'react';
import { Phone, MapPin, Mail } from 'lucide-react-native';
import { useForm } from 'react-hook-form';

export default function Home() {
  const { register, handleSubmit } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: any) => {
    console.log(data);
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <section className="bg-orange-500 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Velvet Taco</h1>
        <p>Experience the best tacos in town!</p>
      </section>
      <section className="mt-4">
        <h2 className="text-2xl font-bold">Our Services</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-white p-4 rounded shadow-md w-80">
            <h3 className="text-xl font-bold">Taco Catering</h3>
            <p>Let us bring the tacos to you!</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md w-80">
            <h3 className="text-xl font-bold">Taco Truck</h3>
            <p>Our truck is always on the move, serving up delicious tacos!</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md w-80">
            <h3 className="text-xl font-bold">Taco Bar</h3>
            <p>Build your own tacos with our wide variety of toppings!</p>
          </div>
        </div>
      </section>
      <section className="mt-4">
        <h2 className="text-2xl font-bold">Get in Touch</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            {...register('name')}
            placeholder="Name"
            className="p-2 border border-gray-400 rounded"
          />
          <input
            type="email"
            {...register('email')}
            placeholder="Email"
            className="p-2 border border-gray-400 rounded"
          />
          <input
            type="tel"
            {...register('phone')}
            placeholder="Phone"
            className="p-2 border border-gray-400 rounded"
          />
          <textarea
            {...register('message')}
            placeholder="Message"
            className="p-2 border border-gray-400 rounded"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white p-2 rounded"
          >
            Send Message
          </button>
          {submitted && <p>Thank you for your message!</p>}
        </form>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex gap-2">
            <Phone size={20} />
            <p>123-456-7890</p>
          </div>
          <div className="flex gap-2">
            <MapPin size={20} />
            <p>123 Main St, Anytown, USA</p>
          </div>
          <div className="flex gap-2">
            <Mail size={20} />
            <p>info@velvettaco.com</p>
          </div>
        </div>
      </section>
      <footer className="bg-gray-200 p-4 text-center mt-4">
        <p>Hours of Operation:</p>
        <p>Monday - Thursday: 11am - 10pm</p>
        <p>Friday - Saturday: 11am - 11pm</p>
        <p>Sunday: 12pm - 9pm</p>
      </footer>
    </div>
  );
}
```