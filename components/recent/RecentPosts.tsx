import React from 'react'
import SectionHeader from './SectionHeader'
import { PostCard } from '@/sanity/lib/types';
import { client } from '@/sanity/lib/client';
import { latestPostsQuery } from '@/sanity/lib/queries';
import BlogCard from '../post/BlogCard';

const RecentPosts = async () => {
    const recentPosts = await client.fetch<PostCard[]>(latestPostsQuery, {
      limit: 8,
    });
  return (
    <div className="w-full px-4 md:px-8 lg:px-16 pt-8">
      <SectionHeader />
      <div className="container mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {recentPosts.map((post) => (
                  <BlogCard variant='vertical'  key={post._id} post={post} />
              ))}
            </div>
          </div>
    </div>
  );
}

export default RecentPosts