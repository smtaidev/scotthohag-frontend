'use client';

import React, { useState } from 'react';
import { FaSearch, FaCalendar, FaTint, FaHeart, FaBrain, FaLeaf } from 'react-icons/fa';

const BlogSidebar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: "Blood Analysis", icon: FaTint, count: 12 },
    { name: "Heart Health", icon: FaHeart, count: 8 },
    { name: "Mental Wellness", icon: FaBrain, count: 6 },
    { name: "Longevity", icon: FaLeaf, count: 10 }
  ];

  const recentPosts = [
    {
      title: "Understanding Your Blood Test Results",
      date: "25 Aug 2025",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=60&fit=crop"
    },
    {
      title: "Why Regular Blood Tests Are Crucial",
      date: "25 Aug 2025",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=60&fit=crop"
    },
    {
      title: "Blood Markers in Preventive Healthcare",
      date: "25 Aug 2025",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=100&h=60&fit=crop"
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <aside className="w-full lg:w-80 space-y-8">
      {/* Search Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-primary-text mb-4">Search Articles</h3>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full px-4 py-3 pl-10 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 px-4 rounded-lg font-medium hover:bg-secondary/90 transition-colors duration-300"
          >
            Search
          </button>
        </form>
      </div>

      {/* Categories Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-primary-text mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300 cursor-pointer">
              <div className="flex items-center space-x-3">
                <category.icon className="w-5 h-5 text-secondary" />
                <span className="text-gray-700 font-medium">{category.name}</span>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Posts Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-primary-text mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300 cursor-pointer">
              <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-primary-text leading-tight line-clamp-2">
                  {post.title}
                </h4>
                <div className="flex items-center space-x-2 mt-1">
                  <FaCalendar className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-secondary to-secondary/80 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
        <p className="text-white/90 text-sm mb-4">
          Get the latest health insights and wellness tips delivered to your inbox.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            className="w-full bg-white text-secondary py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </aside>
  );
};

export default BlogSidebar;
