'use client';

import React from 'react';

const AboutScott: React.FC = () => {
  return (
    <section className=" bg-white">
      <div className="max-w-10/12 mx-auto py-10 md:py-20 px-0 sm:px-6 lg:px-8">
        {/* Title and Subtitle */}
        <div className='flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-14'>
          <div className='w-full lg:w-2/5'>
          </div>
          <div className="w-full lg:w-3/5 text-center lg:text-left mb-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-primary-text mb-4">
              About
            </h2>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#062CC4] ">
              Meet Scott
            </h3>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-14">
          {/* Image Section */}
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Background decorative circles */}
              <div className="absolute -top-8 -left-12 w-44 h-44 bg-blue-200  rounded-full opacity-30"></div>
              <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-blue-200 rounded-full opacity-30"></div>

              {/* Cube-shaped image container */}
              <div className="relative w-80 h-80 bg-gray-200 rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="/images/scott.png"
                  alt="Scott - Health and fitness professional"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-3/5 space-y-6">
            <p className="text-[#575757] leading-relaxed text-base md:text-lg text-justify">
              My passion for health and fitness began in childhood, growing up playing sports in Minnesota. I was always in awe of the body's ability to adapt and transform through proper training and nutrition. That curiosity turned into a lifelong pursuit—one that carried through college and into adulthood, as I immersed myself in learning everything I could about exercise, diet protocols, and supplementation.
            </p>

            <p className="text-[#575757] leading-relaxed text-base md:text-lg text-justify">
              Everything changed two days after my 30th birthday when my father passed away unexpectedly at age 60 from cardiac arrhythmia due to severe cardiovascular disease. That moment was a turning point. My focus shifted from simply looking good on the outside to optimizing health from the inside out. For the past 22 years, I've dedicated myself to studying anti-aging, disease prevention, and functional health.
            </p>

            <p className="text-[#575757] leading-relaxed text-base md:text-lg text-justify">
              My mission is simple: to help people take control of their well-being through regular bloodwork analysis, targeted supplementation, effective exercise, and sustainable lifestyle changes.
            </p>

            <p className="text-[#575757] leading-relaxed text-base md:text-lg text-justify">
              This journey isn't just mine—it's ours. I invite you to come along and take the next step toward your healthiest, most vibrant life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutScott;
