'use client';

import React from 'react';
import { FaHeart, FaStethoscope, FaDumbbell, FaQuestion } from 'react-icons/fa';

const WhoItsFor: React.FC = () => {
  const audiences = [
    {
      icon: FaHeart,
      title: "Health-conscious individuals",
      bgColor: "bg-[#DBEAFE]",
      iconColor: "text-[#2563EB]"
    },
    {
      icon: FaStethoscope,
      title: "People managing chronic conditions",
      bgColor: "bg-[#FEE2E2]",
      iconColor: "text-[#DC2626]"
    },
    {
      icon: FaDumbbell,
      title: "Fitness/performance enthusiasts",
      bgColor: "bg-[#DCFCE7]",
      iconColor: "text-[#16A34A]"
    },
    {
      icon: FaQuestion,
      title: "Anyone confused by lab reports",
      bgColor: "bg-[#FEF9C3]",
      iconColor: "text-[#CA8A04]"
    }
  ];

  return (
    <section className=" bg-white">
      <div className="max-w-10/12 mx-auto py-36 px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-bold text-primary-text text-center mb-16">
          Who It's For
        </h2>

        {/* Audience Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
          {audiences.map((audience, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Circular Icon */}
              <div className={`w-20 h-20 ${audience.bgColor} rounded-full flex items-center justify-center shadow-md mb-4 hover:scale-105 transition-transform duration-300`}>
                <audience.icon className={`w-10 h-10 ${audience.iconColor}`} />
              </div>
              
              {/* Title */}
              <h3 className="text-sm md:text-base font-medium text-primary-text leading-tight">
                {audience.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;
