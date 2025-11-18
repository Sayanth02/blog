"use client";

import React, { useEffect, useState } from "react";
import FtCard from "./FtCard";
import FtCol from "./FtCol";
import Link from "next/link";
import { CircleChevronRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { featuredPostsQuery } from "@/sanity/lib/queries";
import type { Post } from "@/sanity/lib/types";

const Featured = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await client.fetch<Post[]>(featuredPostsQuery);
        if (mounted) {
          setPosts(data ?? []);
        }
      } catch (error) {
        console.error("Failed to fetch featured posts:", error);
        if (mounted) {
          setPosts([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const mainPost = posts[0];
  const sidebarPosts = posts.slice(1, 4);

  if (loading) {
    return (
      <div className="w-full px-4 md:px-8 lg:px-16 py-8">
        <div className="w-full border border-neutaral-lighter rounded-2xl p-8 flex justify-between items-center mb-4">
          <h2>Featured</h2>
          <Link
            className="flex gap-2 items-center underline font-bold text-lg"
            href={"/posts"}
          >
            Discover More <CircleChevronRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-[600px] bg-neutral-200 rounded-3xl animate-pulse" />
          <div className="flex flex-col gap-2 px-4 border border-neutaral-lighter rounded-2xl overflow-hidden">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-32 bg-neutral-200 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!mainPost) {
    return null;
  }

  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-8 ">
      <div className="w-full border border-neutaral-lighter rounded-2xl p-8 flex justify-between items-center mb-4">
        <h2>Featured</h2>
        <Link
          className="flex gap-2 items-center underline font-bold text-lg "
          href={"/posts"}
        >
          Discover More <CircleChevronRight />
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <FtCard post={mainPost} />
        </div>
        <div className="flex flex-col gap-0 border border-neutaral-lighter rounded-2xl overflow-hidden h-[600px]">
          {sidebarPosts.map((post, index) => (
            <div key={post._id} className="flex-1 flex items-center px-4 border-b border-neutaral-lighter last:border-b-0">
              <FtCol post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
