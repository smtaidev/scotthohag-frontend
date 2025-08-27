'use client';

import Link from 'next/link';
import React from 'react';
import { FaCalendar, FaTint } from 'react-icons/fa';

const LatestNews: React.FC = () => {
  const articles = [
    {
      image: "/images/trending1.jpg",
      date: "05 Aug 2025",
      category: "Blood",
      title: "Smart Blood Insights",
      alt: "Medical professional taking blood sample from patient's arm"
    },
    {
      image: "/images/feature3.jpg",
      date: "05 Aug 2025",
      category: "Blood",
      title: "What Your Blood Really Says",
      alt: "Hands in blue medical gloves holding red-capped blood sample tube"
    },
    {
      image: "/images/trending2.jpg",
      date: "05 Aug 2025",
      category: "Blood",
      title: "Precision Markers That Matter",
      alt: "Person in white lab coat writing on medical form with blood sample tubes"
    }
  ];

  return (
    <section className=" bg-white">
      <div className="max-w-10/12 mx-auto py-20 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
          <div className="mb-6 sm:mb-0">
            <p className="text-secondary text-sm font-medium mb-2">
              Latest News & Articles
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-primary-text">
              Trending Topics in <br /> Medicine and Wellness
            </h2>
          </div>
          <Link href="/blog-lists">
          <button className="bg-secondary text-white px-12 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors duration-300 self-start sm:self-auto">
            View all
          </button>
          </Link>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div key={index} className="bg-card rounded-xl  overflow-hidden  transition-shadow duration-300">
              {/* Article Image */}
              <div className="w-full h-48 overflow-hidden p-6 ">
                <img
                  src={article.image}
                  alt={article.alt} 
                  className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Article Content */}
              <div className="p-6 space-y-4">
                {/* Metadata */}
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <FaCalendar className="w-3 h-3" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaTint className="w-3 h-3" />
                    <span>{article.category}</span>
                  </div>
                </div>

                {/* Article Title */}
                <h3 className="text-xl font-bold text-primary-text leading-tight">
                  {article.title}
                </h3>

                {/* Learn More Button */}
                <button className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 w-full sm:w-auto">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
