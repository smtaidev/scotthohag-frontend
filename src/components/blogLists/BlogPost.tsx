'use client';

import React from 'react';
import { FaCalendar, FaTint, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

interface BlogPostProps {
  id: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ id }) => {
  // Blog data - in a real app, this would come from an API or database
  const blogPosts = [
    {
      id: 1,
      image: "/images/blog1.png",
      title: "Understanding Your Health Through Your Blood Data",
      date: "25 Aug 2025",
      category: "Blood",
      description: "The health of every cell in our body depends on the quality of our blood. Smart Blood Insights is an advanced technology that analyzes key markers in your blood and provides personalized information based on your age, gender, and health goals. This helps you easily identify the most important factors affecting your health and understand where to focus your attention.",
      alt: "Person wearing light blue medical gloves writing on clipboard with blood sample tubes in background",
      content: `
        <p class="mb-6 text-base leading-relaxed text-[#4B4B4B]">
          Smart Blood Insights is an advanced technology that analyzes key markers in your blood and provides personalized information based on your age, gender, and health goals. This helps you easily identify the most important factors affecting your health and understand where to focus your attention.
        </p>
        
        <h3 class="text-[32px] font-bold text-black mb-4">Why Are Smart Blood Insights Important?</h3>
        <ul class="list-disc list-inside space-y-2 mb-8 text-[#4B4B4B]">
          <li><strong>Personalized Analysis:</strong> Your results are analyzed based on your unique health profile and medical history.</li>
          <li><strong>Easy-to-Understand Reports:</strong> Complex medical data is translated into clear, actionable insights.</li>
          <li><strong>Proactive Health Management:</strong> Early detection of potential health issues before they become serious problems.</li>
          <li><strong>Time and Cost Efficiency:</strong> Reduce unnecessary doctor visits and medical expenses through better understanding.</li>
        </ul>
        
        <h3 class="text-[32px] font-bold text-black mb-4">What Information Does Smart Blood Insights Provide?</h3>
        <ul class="list-disc list-inside space-y-2 mb-8 text-[#4B4B4B]">
          <li>Hemoglobin and Red Blood Cell Count: Essential for oxygen transport and energy levels.</li>
          <li>Cholesterol and Triglyceride Levels: Key indicators of cardiovascular health.</li>
          <li>Glucose (Blood Sugar) Levels: Critical for diabetes management and prevention.</li>
          <li>Liver and Kidney Function Indicators: Vital for detoxification and waste removal.</li>
          <li>Vitamin and Mineral Levels: Important for overall health and immune function.</li>
          <li>Inflammation and Immune Response Markers: Essential for understanding your body's defense mechanisms.</li>
        </ul>
        
        <h3 class="text-[32px] font-bold text-black mb-4">How Does It Work?</h3>
        <p class="text-base leading-relaxed text-[#4B4B4B]">
          The process is simple and straightforward. You upload your blood test reports, and our advanced AI system analyzes the data to provide you with personalized insights and recommendations. These reports help you understand your health status and guide you in making informed decisions about your wellness journey.
        </p>
      `
    },
    {
      id: 2,
      image: "/images/blog2.png",
      title: "Why Regular Blood Tests Are Crucial for Your Health",
      date: "25 Aug 2025",
      category: "Blood",
      description: "Discuss the importance of routine blood testing for early detection of diseases, monitoring chronic conditions, and maintaining overall health. Highlight how blood tests provide a window into your body's inner workings.",
      alt: "Hand wearing light blue medical glove holding blood sample tube with red cap",
      content: `
        <p class="mb-6 text-base leading-relaxed text-[#4B4B4B]">
          Regular blood testing is one of the most powerful tools in preventive healthcare. It provides a comprehensive view of your body's internal health and can detect potential issues long before symptoms appear.
        </p>
        
        <h3 class="text-[32px] font-bold text-black mb-4">Early Detection Saves Lives</h3>
        <p class="mb-6 text-base leading-relaxed text-[#4B4B4B]">
          Many serious health conditions, including diabetes, heart disease, and certain cancers, can be detected early through routine blood work. Early detection often means more treatment options and better outcomes.
        </p>
        
        <h3 class="text-[32px] font-bold text-black mb-4">Monitoring Chronic Conditions</h3>
        <p class="mb-6 text-base leading-relaxed text-[#4B4B4B]">
          For those managing chronic conditions like diabetes, hypertension, or thyroid disorders, regular blood tests are essential for tracking treatment effectiveness and adjusting medications as needed.
        </p>
        
        <h3 class="text-[32px] font-bold text-black mb-4">Preventive Health Benefits</h3>
        <ul class="list-disc list-inside space-y-2 mb-8 text-[#4B4B4B]">
          <li>Identify nutritional deficiencies before they cause health problems</li>
          <li>Monitor organ function and detect early signs of dysfunction</li>
          <li>Track inflammatory markers that may indicate underlying health issues</li>
          <li>Assess cardiovascular risk factors</li>
        </ul>
      `
    },
    {
      id: 3,
      image: "/images/blog3.jpg",
      title: "The Role of Blood Markers in Preventive Healthcare",
      date: "25 Aug 2025",
      category: "Blood",
      description: "Write about specific blood markers (e.g., cholesterol, blood sugar, inflammatory indicators). Explain how monitoring these markers can help prevent heart disease, diabetes, and other health issues.",
      alt: "Medical professional's hands performing blood draw from patient's arm",
      content: `
        <p class="mb-6 text-base leading-relaxed text-[#4B4B4B]">
          Blood markers are powerful indicators that provide insights into your body's health status. Understanding these markers can help you take proactive steps to prevent serious health conditions.
        </p>
        
        <h3 class="text-[32px] font-bold text-black mb-4">Cardiovascular Health Markers</h3>
        <p class="mb-6 text-base leading-relaxed text-[#4B4B4B]">
          Cholesterol levels, triglycerides, and inflammatory markers like C-reactive protein (CRP) are crucial for assessing cardiovascular risk. Regular monitoring of these markers can help prevent heart disease and stroke.
        </p>
        
        <h3 class="text-[32px] font-bold text-black mb-4">Metabolic Health Indicators</h3>
        <p class="mb-6 text-base leading-relaxed text-[#4B4B4B]">
          Blood glucose levels, insulin resistance markers, and HbA1c are essential for diabetes prevention and management. These markers can indicate prediabetes long before symptoms appear.
        </p>
        
        <h3 class="text-[32px] font-bold text-black mb-4">Inflammation and Immune Response</h3>
        <p class="mb-6 text-base leading-relaxed text-[#4B4B4B]">
          Markers like ESR, CRP, and white blood cell counts help identify inflammation and immune system activity. Elevated levels may indicate infection, autoimmune conditions, or chronic inflammation.
        </p>
      `
    },
    {
      id: 4,
      image: "/images/blog4.jpg",
      title: "Why Regular Blood Tests Are Crucial for Your Health",
      date: "25 Aug 2025",
      category: "Blood",
      description: "Discuss the importance of routine blood testing for early detection of diseases, monitoring chronic conditions, and maintaining overall health. Highlight how blood tests provide a window into your body's inner workings.",
      alt: "Hand wearing light blue medical glove holding blood sample tube with red cap",
      content: `
        <p class="mb-6 text-base leading-relaxed text-[#4B4B4B]">
          Regular blood testing is one of the most powerful tools in preventive healthcare. It provides a comprehensive view of your body's internal health and can detect potential issues long before symptoms appear.
        </p>
        
        <h3 class="text-[32px] font-bold text-black mb-4">Early Detection Saves Lives</h3>
        <p class="mb-6 text-base leading-relaxed text-[#4B4B4B]">
          Many serious health conditions, including diabetes, heart disease, and certain cancers, can be detected early through routine blood work. Early detection often means more treatment options and better outcomes.
        </p>
        
        <h3 class="text-[32px] font-bold text-black mb-4">Monitoring Chronic Conditions</h3>
        <p class="mb-6 text-base leading-relaxed text-[#4B4B4B]">
          For those managing chronic conditions like diabetes, hypertension, or thyroid disorders, regular blood tests are essential for tracking treatment effectiveness and adjusting medications as needed.
        </p>
      `
    },
    {
      id: 5,
      image: "/images/blog5.jpg",
      title: "The Role of Blood Markers in Preventive Healthcare",
      date: "25 Aug 2025",
      category: "Blood",
      description: "Write about specific blood markers (e.g., cholesterol, blood sugar, inflammatory indicators). Explain how monitoring these markers can help prevent heart disease, diabetes, and other health issues.",
      alt: "Medical professional's hands performing blood draw from patient's arm",
      content: `
        <p class="mb-6 text-base leading-relaxed text-[#4B4B4B]">
          Blood markers are powerful indicators that provide insights into your body's health status. Understanding these markers can help you take proactive steps to prevent serious health conditions.
        </p>
        
        <h3 class="text-[32px] font-bold text-black mb-4">Cardiovascular Health Markers</h3>
        <p class="mb-6 text-base leading-relaxed text-[#4B4B4B]">
          Cholesterol levels, triglycerides, and inflammatory markers like C-reactive protein (CRP) are crucial for assessing cardiovascular risk. Regular monitoring of these markers can help prevent heart disease and stroke.
        </p>
        
        <h3 class="text-[32px] font-bold text-black mb-4">Metabolic Health Indicators</h3>
        <p class="mb-6 text-base leading-relaxed text-[#4B4B4B]">
          Blood glucose levels, insulin resistance markers, and HbA1c are essential for diabetes prevention and management. These markers can indicate prediabetes long before symptoms appear.
        </p>
      `
    }
  ];

  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
          <Link href="/blog-lists" className="text-secondary hover:underline">
            Back to Blog List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className=" bg-white">
      <div className="max-w-none">
        {/* Back Button */}
        {/* <div className="mb-6 lg:mb-8 px-4 lg:px-0">
          <Link 
            href="/blog-lists" 
            className="inline-flex items-center space-x-2 text-secondary hover:text-secondary/80 transition-colors duration-300"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Back to Blog List</span>
          </Link>
        </div> */}

        

        {/* Blog Post */}
        <article className="bg-white overflow-hidden">
          {/* Blog Post Image */}
          <div className="w-full h-80 sm:h-96 md:h-[500px] overflow-hidden mt-6 mb-6 lg:mb-8  rounded-xl">
            <img
              src={post.image}
              alt={post.alt}
              className="w-full h-full object-cover rounded-xl"
              loading="lazy"
            />
          </div>

          {/* Blog Post Content */}
          <div className="space-y-6 lg:space-y-8 px-0 lg:px-0">
            {/* Title and Metadata */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4 lg:gap-6">
              <div className="w-full lg:w-3/4">
                <h2 className="text-3xl sm:text-4xl font-bold text-primary-text leading-tight">
                  {post.title}
                </h2>
              </div>
              {/* Metadata */}
              <div className="flex items-center space-x-4 lg:space-x-6 text-sm text-primary-text">
                <div className="flex items-center space-x-2">
                  <FaCalendar className="w-4 h-4" />
                  <span className="text-primary-text text-base">{post.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaTint className="w-4 h-4" />
                  <span className="text-primary-text text-base">{post.category}</span>
                </div>
              </div>
            </div>

            {/* Blog Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </div>
    </section>
  );
};

export default BlogPost;

