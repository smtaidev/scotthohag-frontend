'use client';

import React from 'react';
import BlogList from './BlogList';
import BlogSidebar from './BlogSidebar';
import BlogPost from './BlogPost';

interface BlogPageProps {
  id: string;
}

const BlogPage: React.FC<BlogPageProps> = ({ id }) => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-10/12 mx-auto px-0 lg:px-0 pt-16">
        {/* Blog Header */}
        <div className="mb-8  px-4 lg:px-0">
          <h1 className="text-[32px] sm:text-5xl font-bold text-primary-text mb-4">
            Blog
          </h1>
        </div>
        {/* Blog Layout */}
        <div className="flex flex-col lg:flex-row w-full">
          {/* Main Blog Content */}
          <div className="lg:w-3/4  lg:pr-8">
            <BlogPost id={id} />
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4 lg:pt-0 pt-10">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
