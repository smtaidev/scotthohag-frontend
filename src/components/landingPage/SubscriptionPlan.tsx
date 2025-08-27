'use client';

import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const SubscriptionPlan: React.FC = () => {
  const [disclaimerAgreed, setDisclaimerAgreed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const benefits = [
    {
      title: "Monthly Check-Ins",
      description: "Regular follow-up to ensure progress and adjust plans accordingly."
    },
    {
      title: "Gut Healing Protocols",
      description: "Comprehensive plans to improve digestive health and restore balance."
    },
    {
      title: "Exclusive Discounts",
      description: "Access to special offers and discounts on wellness products."
    },
    {
      title: "Bloodwork Review",
      description: "Regular follow-up to ensure progress and adjust plans accordingly."
    },
    {
      title: "Peptide Therapy Guidance",
      description: "Expert advice on peptide therapy to enhance healing and overall well-being."
    },
    {
      title: "Personalized Reports",
      description: "Get detailed, easy-to-understand reports of your blood markers."
    },
    {
      title: "Supplement Recommendations",
      description: "Regular follow-up to ensure progress and adjust plans accordingly."
    },
    {
      title: "Sourcing Recommendations",
      description: "High-quality supplement and peptide recommendations to support your health."
    },
    {
      title: "Expert Recommendations",
      description: "Receive personalized advice from wellness experts."
    }
  ];

  const images = [
    {
      src: "/images/hero1.png",
      alt: "Man and woman performing plank exercises in gym"
    },
    {
      src: "/images/hero2.png",
      alt: "Men doing squats with barbell in gym"
    },
    {
      src: "/images/hero3.png",
      alt: "Woman doing seated yoga twist outdoors"
    },
    {
      src: "/images/hero4.png",
      alt: "Healthy food items including fruits and green juice"
    }
  ];

  const handlePayment = () => {
    if (!disclaimerAgreed || !termsAgreed) {
      alert('Please agree to both the disclaimer and terms & conditions');
      return;
    }
    // Handle PayPal payment logic here
    console.log('Processing payment...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0FDF4] to-[#EFF6FF] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-10/12 mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold mb-4">
            <span className="text-primary-text">Premium</span>{' '}
            <span className="text-secondary">Wellness</span>{' '}
            <span className="text-primary-text">Subscription Plan</span>
          </h1>
          <p className="text-[#4B4B4B] text-xl md:text-base leading-relaxed font-bold max-w-3xl mx-auto">
            Comprehensive Health & Wellness Support for Your Journey to Optimal Health
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className=" w-full h-80 rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-101">
                <img
                  src={image.src}
                  alt={image.alt}
                  width={500}
                  height={500}
                  className="w-full h-80 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
            What's Included in Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className=" rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 bg-secondary rounded-full p-1">
                    <FaCheck className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h3 className="text-title">
                      {benefit.title}
                    </h3>
                    <p className="info">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Agreements */}
        <div className=" p-6  mb-4 flex flex-col items-center">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="disclaimer"
                checked={disclaimerAgreed}
                onChange={(e) => setDisclaimerAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="disclaimer" className="text-primary-text text-sm md:text-base cursor-pointer">
                I agree to the{' '}
                <span className="underline font-medium">
                  disclaimer
                </span>
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="text-primary-text cursor-pointer">
                I agree to the{' '}
                <span className="underline font-medium">
                  Terms and Conditions
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <div className="text-center">
          <button
            onClick={handlePayment}
            disabled={!disclaimerAgreed || !termsAgreed}
            className={`
              inline-flex items-center px-8 py-4 text-xl font-semibold text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105
              ${disclaimerAgreed && termsAgreed 
                ? 'bg-secondary hover:bg-secondary/80 cursor-pointer' 
                : 'bg-secondary cursor-not-allowed'
              }
            `}
          >
            <span className="mr-2">$250</span>
            Pay with PayPal
          </button>
          {(!disclaimerAgreed || !termsAgreed) && (
            <p className="text-red-500 text-sm mt-2">
              Please agree to both terms before proceeding
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
