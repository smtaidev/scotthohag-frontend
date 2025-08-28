'use client';

import React from 'react';
import { 
  FaWeight, 
  FaBrain, 
  FaVenusMars, 
  FaSyringe, 
  FaRocket, 
  FaLeaf, 
  FaHeart, 
  FaBed, 
  FaChartLine, 
  FaHeartbeat
} from 'react-icons/fa';

const AreasOfSpecialty: React.FC = () => {
  const specialties = [
    {
      icon: FaWeight,
      title: "Weight Loss",
      color: "text-[#4F46E5]",
      bgColor: "bg-purple-100"
    },
    {
      icon: FaBrain,
      title: "Energy, Focus & Mood",
      color: "text-[#DB2777]",
      bgColor: "bg-purple-100"
    },
    {
      icon: FaVenusMars,
      title: "Hormone Health",
      color: "text-pink-600",
      bgColor: "bg-pink-100"
    },
    {
      icon: FaSyringe,
      title: "Peptide Therapy",
      color: "text-[#2563EB]",
      bgColor: "bg-blue-100"
    },
    {
      icon: FaRocket,
      title: "Performance",
      color: "text-[#EA580C]",
      bgColor: "bg-orange-100"
    },
    {
      icon: FaLeaf,
      title: "Longevity & Health Span",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: FaHeartbeat ,
      title: "Heart Health",
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      icon: FaBed,
      title: "Sleep",
      color: "text-[#4F46E5]",
      bgColor: "bg-blue-100"
    },
    {
      icon: FaChartLine,
      title: "Monitor Health Issues",
      color: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  return (
    <section className=" bg-card">
      <div className="max-w-10/12 mx-auto py-10 md:py-20 px-0 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-bold text-primary-text text-center mb-16">
          Areas of Specialty
        </h2>

        {/* Specialty Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {specialties.map((specialty, index) => (
            <div key={index} className="bg-white rounded-xl px-6 py-12  duration-300">
              <div className="flex flex-col items-center text-center space-y-3">
                {/* Icon */}
                <div className={`w-14 h-14  rounded-full flex items-center justify-center`}>
                  <specialty.icon className={`w-7 h-7 ${specialty.color}`} />
                </div>
                
                {/* Title */}
                <h3 className="text-base font-medium text-gray-700 leading-tight">
                  {specialty.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreasOfSpecialty;
