'use client';

import React from 'react';
import { BsPaypal } from 'react-icons/bs';
import { FaPaypal, FaFilePdf, FaChartBar, FaHandsHelping, FaCheckCircle } from 'react-icons/fa';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: BsPaypal ,
      title: "PayPal Subscription",
      color: "bg-[#E8F2FD]",
    iconColor: "text-[#002991]"
    },
    {
      icon: FaFilePdf,
      title: "Upload bloodwork PDF",
      color: "bg-[#FDE4E4]",
      iconColor: "text-[#FF435B]"
    },
    {
      icon: FaChartBar,
      title: "Get instant analysis",
      color: "bg-[#EBFFF5]",
      iconColor: "text-[#00A14B]"
    }, 
    {
      icon: FaHandsHelping,
      title: "Receive guidance",
      color: "bg-[#E8F2FD]",
      iconColor: "text-[#0082FF]"
    },
    
  ];

  return (
    <section className="py-10 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
      <div className="max-w-10/12 mx-auto">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-bold text-primary-text text-center mb-20">
          How It Works
        </h2>

        {/* Process Flow */}
        <div className="relative">
          {/* Integrated curve and steps container */}
          <div className="relative w-full h-48 mb-20">
            {/* Main curve */}
            <svg className="w-full h-full" viewBox="0 0 1128 188" preserveAspectRatio="none">
              <path d="M677.982 187.186C619.581 187.186 590.216 140.304 561.837 94.9639C532.902 48.7644 505.586 5.11888 449.992 5.11888C394.398 5.11888 367.082 48.7644 338.147 94.9639C309.768 140.304 280.403 187.186 222.002 187.186C163.601 187.186 134.261 140.304 105.857 94.9639C78.4903 51.2425 52.641 9.92342 2.81405 5.49818C1.42294 5.37175 0.385932 4.15797 0.512396 2.76718C0.638861 1.37639 1.85292 0.314333 3.24403 0.466055C55.5497 5.11888 83.296 49.4218 110.132 92.2834C139.067 138.483 166.383 182.128 221.977 182.128C277.571 182.128 304.887 138.483 333.822 92.2834C362.201 46.9437 391.566 0.0614624 449.967 0.0614624C508.368 0.0614624 537.708 46.9437 566.112 92.2834C595.047 138.483 622.363 182.128 677.957 182.128C733.55 182.128 760.892 138.483 789.827 92.2834C818.206 46.9437 847.571 0.0614624 905.972 0.0614624C964.373 0.0614624 993.738 46.9437 1022.12 92.2834C1049.51 136.005 1075.36 177.299 1125.16 181.749C1126.55 181.876 1127.59 183.089 1127.46 184.505C1127.34 185.896 1126.1 186.908 1124.73 186.807C1072.42 182.154 1044.68 137.851 1017.84 94.9891C988.907 48.7897 961.591 5.14417 905.972 5.14417C850.353 5.14417 823.037 48.7897 794.102 94.9891C765.723 140.329 736.358 187.211 677.957 187.211L677.982 187.186Z" fill="#003160"/>
            </svg>

            {/* Step circles positioned on the curve */}
            {steps.map((step, index) => {
              // Calculate positions for circles on the curve
              const positions = [
                { left: '20%', top: '90%' }, // First trough
                { left: '40%', top: '5%' }, // First peak
                { left: '60%', top: '90%' }, // Second trough
                { left: '80%', top: '5%' }  // Second peak
              ];
              
              return (
                <div 
                  key={index} 
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ 
                    left: positions[index]?.left || '0%', 
                    top: positions[index]?.top || '50%' 
                  }}
                >
                  {/* Step Circle */}
                  <div className={`relative z-20 md:w-20 md:h-20 w-16 h-16 ${step.color} rounded-full flex items-center justify-center shadow-lg `}>
                    <step.icon className={`md:w-10 md:h-10 w-6 h-6 ${step.iconColor}`}/>
                  </div>
                  
                  {/* Step Title */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-32">
                    <h3 className="text-sm font-semibold text-primary-text text-center">
                      {step.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile steps */}
          {/* <div className="md:hidden grid grid-cols-1 gap-4 mt-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                
                <div className="w-8 h-8 bg-primary-text text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                
              
                <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                
            
                <h3 className="text-sm font-semibold text-primary-text">
                  {step.title}
                </h3>
              </div>
            ))}
          </div> */}

          {/* Dots at start and end */}
          <div className=" absolute top-0 left-0 w-4 h-4 bg-primary-text rounded-full transform -translate-y-1/2 -translate-x-1/2 shadow-md"></div>
          <div className=" absolute top-47 right-0 w-4 h-4 bg-primary-text rounded-full transform -translate-y-1/2 translate-x-1/2 shadow-md"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
