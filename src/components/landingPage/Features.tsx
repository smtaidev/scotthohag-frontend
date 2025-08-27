'use client';

import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      title: "Smart Blood Marker Breakdown",
      description: "From cholesterol to thyroid and vitamin levels, we translate each value into actionable insights",
      image: "/images/feature1.png",
      imageAlt: "Person's finger being pricked for blood sample with glucose meter",
      imagePosition: "left"
    },
    {
      title: "Understand What Matters Most",
      description: "We highlight the markers most relevant to your age, gender, and goals, so you're not overwhelmed with information",
      image: "/images/feature2.png",
      imageAlt: "Doctor in lab coat with stethoscope holding family cutouts and heart",
      imagePosition: "right"
    },
    {
      title: "Track Trends Over Time",
      description: "See how your levels change across tests. Spot early warning signs or celebrate health improvements.",
      image: "/images/feature3.jpg",
      imageAlt: "Doctor holding red heart and stethoscope",
      imagePosition: "left"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
      <div className="max-w-10/12 mx-auto space-y-24">
        {features.map((feature, index) => (
          <div key={index} className={`flex flex-col ${feature.imagePosition === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>
            {/* Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="w-full h-96 rounded-xl overflow-hidden shadow-xl">
                  <img
                    src={feature.image}
                    alt={feature.imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Subtle overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-xl"></div>
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2 space-y-8">
              <h3 className="title leading-tight">
                {feature.title}
              </h3>
              <p className="info leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
