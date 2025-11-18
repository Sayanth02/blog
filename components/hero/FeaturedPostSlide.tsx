import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { MessageSquare } from "lucide-react";

type FeaturedPostSlideProps = {
  post: Post;
};

const FeaturedPostSlide = ({ post }: FeaturedPostSlideProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInHours < 48) {
      return "1 day ago";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  const author = post.author;
  const category = post.categories?.[0];
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(600).url()
    : "/images/hero.jpg";

  return (
    <Link href={`/posts/${post.slug}`} className="block relative w-full h-full">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={imageUrl}
          alt={post.mainImage?.alt || post.title}
          fill
          className="object-cover"
          priority
        />
        {/* Dark gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-black/30" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 lg:p-16 max-w-7xl mx-auto">
        {/* Category Badge */}
        {category && (
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
              {category.title}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 leading-tight max-w-4xl">
          {post.title}
        </h1>

        {/* Summary */}
        {post.excerpt && (
          <p className="text-base md:text-lg text-white/90 mb-6 max-w-3xl line-clamp-2">
            {post.excerpt}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-white/80 text-sm">
          {/* Publish Date */}
          {post.publishedAt && (
            <span className="flex items-center gap-2">
              {formatDate(post.publishedAt)}
            </span>
          )}

          {/* Author */}
          {author && (
            <>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-2">
                by <span className="font-medium">{author.name}</span>
              </span>
            </>
          )}

          {/* Comment indicator (placeholder) */}
          <span className="text-white/40">•</span>
          <span className="flex items-center gap-1">
            <MessageSquare size={16} />
            <span>0</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedPostSlide;
