'use client';

import React, { useRef, useState } from 'react';
import { FaEnvelope, FaClock } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const form = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);

    if (form.current) {
      emailjs
        .sendForm(`${process.env.NEXT_PUBLIC_YOUR_SERVICE_ID}`, `${process.env.NEXT_PUBLIC_YOUR_TEMPLETE_ID}`, form.current, {
          publicKey: `${process.env.NEXT_PUBLIC_YOUR_EJSKEY_ID}`,
        })
        .then(
          () => {
            console.log('SUCCESS!');
            setFormData({
              name: '',
              email: '',
              message: ''
            })
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    } else {
      console.log('Form reference is null.');
    }
  };

  return (
    <section id='contact' className=" bg-gray-50">
      <div className="max-w-10/12 mx-auto py-10 md:py-20 px-0 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-bold text-primary-text text-center mb-16">
          Contact Me
        </h2>

        {/* Contact Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-40 justify-center">
       

          {/* Contact Information - Right Side */}
 
            {/* Email Information */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                <FaEnvelope className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-black text-base font-semibold mb-2">Email</h3>
              <p className="text-[#4B5563] text-lg font-normal">
                scott@peakwellnessbyscott.com
              </p>
            </div>

            {/* Hours Information */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                <FaClock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-black text-base font-semibold mb-2">Hours</h3>
              <p className="text-[#4B5563] text-lg font-normal">
                Mon-Fri, 8 AM-5 PM CST
              </p>
            </div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
