'use client';

import React from 'react';
import { FaHeart, FaStethoscope, FaDumbbell, FaQuestion } from 'react-icons/fa';

const WhoItsFor: React.FC = () => {
  const audiences = [
    {
      icon: FaHeart,
      title: "Health-conscious individuals",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: FaStethoscope,
      title: "People managing chronic conditions",
      bgColor: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      icon: FaDumbbell,
      title: "Fitness/performance enthusiasts",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: FaQuestion,
      title: "Anyone confused by lab reports",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600"
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
