'use client';

import React from 'react';
import { FaPaypal, FaFilePdf, FaChartBar, FaHandsHelping } from 'react-icons/fa';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: FaPaypal,
      title: "PayPal Subscription",
      color: "bg-primary-text"
    },
    {
      icon: FaFilePdf,
      title: "Upload bloodwork PDF",
      color: "bg-red-400"
    },
    {
      icon: FaChartBar,
      title: "Get instant analysis",
      color: "bg-green-400"
    },
    {
      icon: FaHandsHelping,
      title: "Receive guidance",
      color: "bg-blue-400"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
      <div className="max-w-10/12 mx-auto">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-bold text-primary-text text-center mb-16">
          How It Works
        </h2>

        {/* Process Flow */}
        <div className="relative">
          {/* Wavy Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 transform -translate-y-1/2">
            <svg className="w-full h-8" viewBox="0 0 1200 20" preserveAspectRatio="none">
              <path
                d="M0,10 Q150,0 300,10 T600,10 T900,10 T1200,10"
                stroke="#003160"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center">
                {/* Step Circle */}
                <div className={`relative z-10 w-20 h-20 ${step.color} rounded-full flex items-center justify-center shadow-lg mb-4`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Step Title */}
                <h3 className="text-sm md:text-base font-semibold text-primary-text text-center max-w-32">
                  {step.title}
                </h3>

                {/* Step Number for Mobile */}
                <div className="md:hidden absolute -top-2 -right-2 w-6 h-6 bg-primary-text text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Dots at start and end */}
          <div className="hidden md:block absolute top-1/2 left-0 w-4 h-4 bg-primary-text rounded-full transform -translate-y-1/2 -translate-x-1/2 shadow-md"></div>
          <div className="hidden md:block absolute top-1/2 right-0 w-4 h-4 bg-primary-text rounded-full transform -translate-y-1/2 translate-x-1/2 shadow-md"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
