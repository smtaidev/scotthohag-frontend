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
          {/* Main curve container */}
          <div className="relative w-full h-32 mb-20">
            <svg className="w-full h-full" viewBox="0 0 1128 188" preserveAspectRatio="none">
              <path d="M677.982 187.186C619.581 187.186 590.216 140.304 561.837 94.9639C532.902 48.7644 505.586 5.11888 449.992 5.11888C394.398 5.11888 367.082 48.7644 338.147 94.9639C309.768 140.304 280.403 187.186 222.002 187.186C163.601 187.186 134.261 140.304 105.857 94.9639C78.4903 51.2425 52.641 9.92342 2.81405 5.49818C1.42294 5.37175 0.385932 4.15797 0.512396 2.76718C0.638861 1.37639 1.85292 0.314333 3.24403 0.466055C55.5497 5.11888 83.296 49.4218 110.132 92.2834C139.067 138.483 166.383 182.128 221.977 182.128C277.571 182.128 304.887 138.483 333.822 92.2834C362.201 46.9437 391.566 0.0614624 449.967 0.0614624C508.368 0.0614624 537.708 46.9437 566.112 92.2834C595.047 138.483 622.363 182.128 677.957 182.128C733.55 182.128 760.892 138.483 789.827 92.2834C818.206 46.9437 847.571 0.0614624 905.972 0.0614624C964.373 0.0614624 993.738 46.9437 1022.12 92.2834C1049.51 136.005 1075.36 177.299 1125.16 181.749C1126.55 181.876 1127.59 183.089 1127.46 184.505C1127.34 185.896 1126.1 186.908 1124.73 186.807C1072.42 182.154 1044.68 137.851 1017.84 94.9891C988.907 48.7897 961.591 5.14417 905.972 5.14417C850.353 5.14417 823.037 48.7897 794.102 94.9891C765.723 140.329 736.358 187.211 677.957 187.211L677.982 187.186Z" fill="#003160"/>
            </svg>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
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
        </div>
      </div>
    </section>
  );
};

export default DemoCurve;
