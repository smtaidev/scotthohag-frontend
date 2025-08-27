import React from 'react';
import BlogPage from '../../../../components/blogLists/BlogPage';
import LatestNews from '@/components/landingPage/LatestNews';

interface BlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

const BlogPageRoute: React.FC<BlogPageProps> = async ({ params }) => {
  const { id } = await params;
  
  return <>
  <BlogPage id={id} />
  <LatestNews />
  </>;
};

export default BlogPageRoute;

