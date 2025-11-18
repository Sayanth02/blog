import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { Post } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { formatRelativeDate } from "@/sanity/lib/utils";

type FtColProps = {
  post: Post;
};

const FtCol = ({ post }: FtColProps) => {

  const category = post.categories?.[0];
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(200).height(200).url()
    : "/images/frontend.535Z.png";

  return (
    <Link href={`/posts/${post.slug}`}>
      <div className="w-full h-full flex justify-center items-center gap-3 hover:bg-neutral-50 transition-colors cursor-pointer py-2">
        <div className="rounded-xl shrink-0">
          <Image
            src={imageUrl}
            width={100}
            height={100}
            alt={post.mainImage?.alt || post.title}
            className="rounded-xl object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          {category && (
            <span className="inline-block px-3 py-0.5 text-xs font-medium text-neutral-600 rounded-full border border-neutral-200 mb-2">
              {category.title}
            </span>
          )}
          <h2 className="text-sm font-bold text-neutral-900 mb-1 leading-snug line-clamp-2">
            {post.title}
          </h2>
          <p className="text-xs flex gap-2 text-neutral-600">
            <span>{formatRelativeDate(post.publishedAt)}</span>
            <span>•</span>
            <span className="font-semibold">{post.author?.name || "Unknown"}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default FtCol;