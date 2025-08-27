'use client';

import React from 'react';
import { FaCalendar, FaTint } from 'react-icons/fa';
import Link from 'next/link';

const BlogList: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      image: "/images/blog1.png",
      title: "Understanding Your Blood Test Results",
      date: "25 Aug 2025",
      category: "Blood",
      description: "Explore the common components of a blood test result, such as RBC, WBC, hemoglobin, platelets, and what their normal ranges mean. Equip yourself to understand how to interpret these results and what abnormalities might indicate.",
      alt: "Person wearing light blue medical gloves writing on clipboard with blood sample tubes in background"
    },
    {
      id: 2,
      image: "/images/blog2.png",
      title: "Why Regular Blood Tests Are Crucial for Your Health",
      date: "25 Aug 2025",
      category: "Blood",
      description: "Discuss the importance of routine blood testing for early detection of diseases, monitoring chronic conditions, and maintaining overall health. Highlight how blood tests provide a window into your body's inner workings.",
      alt: "Hand wearing light blue medical glove holding blood sample tube with red cap"
    },
    {
      id: 3,
      image: "/images/blog3.jpg",
      title: "The Role of Blood Markers in Preventive Healthcare",
      date: "25 Aug 2025",
      category: "Blood",
      description: "Write about specific blood markers (e.g., cholesterol, blood sugar, inflammatory indicators). Explain how monitoring these markers can help prevent heart disease, diabetes, and other health issues.",
      alt: "Medical professional's hands performing blood draw from patient's arm"
    },
    {
      id: 4,
      image: "/images/blog4.jpg",
      title: "Why Regular Blood Tests Are Crucial for Your Health",
      date: "25 Aug 2025",
      category: "Blood",
      description: "Discuss the importance of routine blood testing for early detection of diseases, monitoring chronic conditions, and maintaining overall health. Highlight how blood tests provide a window into your body's inner workings.",
      alt: "Hand wearing light blue medical glove holding blood sample tube with red cap"
    },
    {
      id: 5,
      image: "/images/blog5.jpg",
      title: "The Role of Blood Markers in Preventive Healthcare",
      date: "25 Aug 2025",
      category: "Blood",
      description: "Write about specific blood markers (e.g., cholesterol, blood sugar, inflammatory indicators). Explain how monitoring these markers can help prevent heart disease, diabetes, and other health issues.",
      alt: "Medical professional's hands performing blood draw from patient's arm"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-10/12 mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-primary-text text-start mb-12">
          Blog List
        </h1>

        {/* Blog Posts */}
        <div className="space-y-16">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl  overflow-hidden duration-300">
              {/* Blog Post Image */}
              <div className="w-full h-96 md:h-[900px] overflow-hidden">
                <Link href={`/blog-lists/${post.id}`}>
                  <img
                    src={post.image}
                    alt={post.alt}
                    width={1000}
                    height={800}
                    className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </Link>
              </div>

              {/* Blog Post Content */}
              <div className="space-y-6 mt-6">
                {/* Title */}
                <div className='flex flex-col lg:flex-row justify-between items-start gap-6'>
                  <div className='w-full lg:w-3/5'>
                    <Link href={`/blog-lists/${post.id}`} className="hover:text-secondary transition-colors duration-300">
                      <h2 className="text-3xl sm:text-4xl font-bold text-primary-text leading-tight">
                        {post.title}
                      </h2>
                    </Link>
                  </div>
                  {/* Metadata */}
                  <div className="flex items-center space-x-6 text-sm text-primary-text">
                    <div className="flex items-center space-x-2">
                      <FaCalendar className="w-4 h-4" />
                      <span className='text-primary-text text-base'>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaTint className="w-4 h-4" />
                      <span className='text-primary-text text-base'>{post.category}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="texty-base font-normal text-[#4B4B4B] w-full lg:w-3/5">
                  {post.description}
                </p>

                {/* Learn More Button */}
                <Link href={`/blog-lists/${post.id}`}>
                  <button className="bg-secondary text-white cursor-pointer px-8 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
