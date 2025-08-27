'use client';

import React from 'react';
import { FaPaypal, FaFilePdf, FaChartBar, FaHandsHelping, FaCheckCircle } from 'react-icons/fa';

const DemoCurve: React.FC = () => {
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
    },
    {
      icon: FaCheckCircle,
      title: "Complete journey",
      color: "bg-purple-400"
    },
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
          {/* Steps with alternating curved lines */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 mt-40 mb-20">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-end border">
                {/* Step Circle */}
                <div className={`relative z-10 w-20 h-20 ${step.color} rounded-full flex items-center justify-center shadow-lg mb-4`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Step Title */}
                {/* <h3 className="text-sm md:text-base font-semibold text-primary-text text-center max-w-32 mb-4">
                  {step.title}
                </h3> */}

                {/* Curved Line - Only show between steps */}
                {index < steps.length - 0 && (
                  <div className="hidden md:block absolute  w-50 h-50 transform -translate-y-1/2 border">
                    <svg className="w-full h-full" viewBox="0 0 64 64" preserveAspectRatio="none">
                      {index % 2 === 0 ? (
                        // Odd div: curve from top-left to bottom-right
                        <path
                          d="M0,0 Q32,32 64,64"
                          stroke="#003160"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                        />
                      ) : (
                        // Even div: curve from bottom-left to top-right
                        <path
                          d="M0,64 Q32,32 64,0"
                          stroke="#003160"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                        />
                      )}
                    </svg>

                    
                  </div>
                )}

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

export default DemoCurve;
