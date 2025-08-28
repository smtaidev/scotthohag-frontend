'use client';

import React, { useState } from 'react';
import { FaEnvelope, FaClock } from 'react-icons/fa';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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
  };

  return (
    <section className=" bg-gray-50">
      <div className="max-w-10/12 mx-auto py-10 md:py-20 px-0 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-bold text-primary-text text-center mb-16">
          Contact Us
        </h2>

        {/* Contact Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Contact Form - Left Side */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors duration-300"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors duration-300"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors duration-300 resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-secondary text-white py-3 px-6 rounded-lg font-medium hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information - Right Side */}
          <div className="w-full lg:w-1/3 flex flex-col items-center space-y-8">
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
      </div>
    </section>
  );
};

export default ContactUs;
