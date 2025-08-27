import React from 'react';
import BlogPost from '../../../../components/blogLists/BlogPost';
import LatestNews from '@/components/landingPage/LatestNews';

interface BlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

const BlogPage: React.FC<BlogPageProps> = async ({ params }) => {
  const { id } = await params;
  
  return <>
  <BlogPost id={id} />
  <LatestNews />
  </>;
};

export default BlogPage;

