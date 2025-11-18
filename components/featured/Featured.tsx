import React from "react";
import FtCard from "./FtCard";
import FtCol from "./FtCol";
import Link from "next/link";
import { CircleChevronRight } from "lucide-react";
import type { Post } from "@/sanity/lib/types";
import { client } from "@/sanity/lib/client";
import { featuredPostsQuery } from "@/sanity/lib/queries";

// interface FeaturedProps {
//   posts: Post[];
// }
export const revalidate = 60;
const Featured = async () => {
  let featuredPosts: Post[] = [];
    try {
      featuredPosts = await client.fetch<Post[]>(featuredPostsQuery);
    } catch (error) {
      console.error("Failed to fetch featured posts:", error);
    }
  const mainPost = featuredPosts[0];
  const sidebarPosts = featuredPosts.slice(1, 4);

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
