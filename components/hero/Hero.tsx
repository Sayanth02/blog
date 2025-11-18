import { client } from '@/sanity/lib/client';
import { featuredPostsQuery } from '@/sanity/lib/queries';
import { Post } from '@/sanity/lib/types';
import React from 'react'
import HeroCarousel from './HeroCarousel';

export const revalidate = 60;
const Hero = async () => {
    let featuredPosts: Post[] = [];
      
      try {
        featuredPosts = await client.fetch<Post[]>(featuredPostsQuery);
      } catch (error) {
        console.error("Failed to fetch featured posts:", error);
      }
  return (
    <HeroCarousel posts={featuredPosts} />
  )
}

export default Hero