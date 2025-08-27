'use client';

import React from 'react';
import BlogList from './BlogList';
import BlogSidebar from './BlogSidebar';

const BlogPage: React.FC = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-10/12 mx-auto">
       

        {/* Blog Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Blog Content */}
          <div className="flex-1">
            <BlogList />
          </div>

          {/* Sidebar */}
          {/* <div className="lg:w-80">
            <BlogSidebar />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
