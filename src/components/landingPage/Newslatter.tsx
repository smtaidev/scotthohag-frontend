'use client'

import { useCreateNewslatterMutation } from '@/redux/api/plan/planSlice';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function Newsletter() {
  const [createLatter] = useCreateNewslatterMutation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false)

  const handleLetter = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault(); // Prevent page reload
    if (!email) return; // simple validation

    try {
      const res = await createLatter({ email })
      if (res?.data) {
        toast.success(" Subscribe to Newsletters Successfully!")
      }


      setEmail('');
      setLoading(false)
    } catch (error) {
      setLoading(false);

    }

  };

  return (
    <div className=" ">

        <section className="bg-secondary py-16 relative overflow-hidden z-20">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-2xl md:text-5xl font-bold text-white mb-6 text-balance">Expand Your Wellness Network</h1>

        <p className="text-white text-sm md:text-lg xl:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
          Join a dynamic community built around expert resources, the latest medical updates, and meaningful wellness
          insights. Together, we learn, grow, and create a stronger path to lasting health.
        </p>

        <form onSubmit={handleLetter} className="flex flex-col sm:flex-row gap-0  md:mx-auto relative mx-3">
          <input
             type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setLoading(false)
              }}
            placeholder="Enter your email..."
            className="flex-1 px-2 md:px-6 py-2 md:py-4 text-gray-700 bg-white rounded-l-lg  rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-600 md:text-lg"
            required
          />
          {/* <button
            type="submit"
            className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-r-lg sm:rounded-l-none rounded-l-lg font-semibold text-lg transition-colors duration-200"
          >
            Subscribe Newsletter
          </button> */}
             <button
              type="submit"
              className="cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 bg-primary text-white text-xs md:text-base px-2 py-1 md:px-5 md:py-2 rounded-md hover:bg-green-600 transition"
            >
              {
                loading ? <>SUBSCRIBING...</> : <>Subscribe Newsletter</>
              }

            </button>
        </form>
      </div>
       <div className='absolute top-40'><Image src={"/shape1.png"} alt='shape' height={391} width={352}></Image></div>
       <div className='absolute top-60 -left-23'><Image src={"/shape1.png"} alt='shape' height={391} width={352}></Image></div>
       <div className='absolute bottom-40 -right-23 rotate-180'><Image src={"/shape1.png"} alt='shape' height={391} width={352}></Image></div>
       <div className='absolute bottom-20 right-0 rotate-180'><Image src={"/shape1.png"} alt='shape' height={391} width={352}></Image></div>
    </section>
    </div>
  );
}