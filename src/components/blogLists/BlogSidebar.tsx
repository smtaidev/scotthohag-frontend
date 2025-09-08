'use client';

import React from 'react';

const BlogSidebar: React.FC = () => {
  const areasOfSpecialty = [
    "Weight Loss",
    "Energy, Focus & Mood",
    "Hormone Health",
    "Peptide Therapy",
    "Performance",
    "Longevity & Health Span",
    "Heart Health",
    "Sleep",
    "Monitor Health Issues"
  ];

  return (
    <aside className="w-full  space-y-6 lg:space-y-8  px-0 lg:px-0">
      {/* Promotional Box */}
      <div className="bg-[#F5FAFF] rounded-xl p-4 lg:p-8 ">
        <h3 className="text-lg lg:text-xl font-bold text-primary-text mb-3 leading-tight">
          Need comprehensive health and wellness support for your journey to optimal health?
        </h3>
        <p className="info mb-4 lg:mb-6 leading-relaxed">
        True wellness is a balance of mindful eating, regular exercise, rest, mental calmness, and positive thinking. Each day offers a chance to nurture both body and mind, leading to lasting vitality. Health is not just the absence of illness but a state of energy, joy, and enthusiasm for life. By maintaining harmony, we lay the foundation for a fulfilling future.
        </p>
        {/* <button className="w-full bg-secondary hover:bg-secondary/90 cursor-pointer text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
          $250 Pay with PayPal
        </button> */}
      </div>

      {/* Areas of Specialty */}
      <div className="bg-white rounded-xl p-4 lg:p-8 border border-primary-text">
        <h3 className="text-lg lg:text-xl font-bold text-primary-text mb-4">
          Areas of Specialty
        </h3>
        <div className="flex flex-wrap gap-3">
          {areasOfSpecialty.map((specialty, index) => (
            <span
              key={index}
              className="inline-block px-3 py-2 text-sm text-primary-text bg-white border border-primary-text rounded-full hover:bg-gray-50 transition-colors duration-200 cursor-pointer "
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
