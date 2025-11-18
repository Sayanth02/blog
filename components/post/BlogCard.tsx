// components/BlogCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User } from "lucide-react";
import {
  urlForImage,
  formatDate,
  calculateReadingTime,
} from "@/sanity/lib/utils";
import { PostCard } from "@/sanity/lib/types";

interface BlogCardProps {
  post: PostCard;
  variant?: "default" | "vertical";
  priority?: boolean;
}

export default function BlogCard({
  post,
  variant = "default",
  priority = false,
}: BlogCardProps) {
  const imageUrl = post.mainImage
    ? urlForImage(post.mainImage)?.width(800).height(600).url()
    : "/images/hero.jpg";

  const readingTime =
    post.estimatedReadingTime ||
    (post.body ? calculateReadingTime(post.body) : 0);

  // 🟦 Vertical Layout
  if (variant === "vertical") {
    return (
      <article className="bg-white rounded-3xl border border-neutral-200 hover:shadow-lg transition-all duration-300 overflow-hidden max-w-sm mx-auto">
        <Link href={`/posts/${post.slug}`}>
          {/* Content */}
          <div className="p-6 flex flex-col gap-4">
            {/* Category */}
            {post.categories && post.categories.length > 0 && (
              <span className="w-fit inline-block px-4 py-1 text-xs font-medium text-neutral-600 rounded-full border border-neutral-200">
                {post.categories[0].title}
              </span>
            )}

            {/* Title */}
            <h2 className="text-2xl font-bold text-neutral-900 mb-2 leading-snug line-clamp-2">
              {post.title}
            </h2>

            {/* Image */}
            <div className="w-full rounded-3xl overflow-hidden bg-neutral-100">
              <Image
                src={imageUrl}
                alt={post.mainImage?.alt || post.title}
                width={400}
                height={400}
                className="object-fit w-full aspect-square"
                priority={priority}
              />
            </div>

            {/* Meta Info */}
            <div className="flex items-center  text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                {/* <Calendar size={14} /> */}
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)} /   
                </time>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-neutral-800">
                   by { post.author.name}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // 🟩 Default (Horizontal Layout)
  return (
    <article className="bg-white rounded-2xl border border-neutral-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
      <Link
        href={`/posts/${post.slug}`}
        className="flex flex-col md:flex-row gap-6 p-6"
      >
        {/* Image */}
        <div className="w-full md:w-64 h-64 rounded-2xl overflow-hidden bg-neutral-100 shrink-0">
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            width={256}
            height={256}
            className="object-fit w-full h-full"
            priority={priority}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            {/* Category */}
            {post.categories && post.categories.length > 0 && (
              <span className="inline-block px-4 py-1 text-xs font-medium text-neutral-600 rounded-full border border-neutral-200 mb-3">
                {post.categories[0].title}
              </span>
            )}

            {/* Title */}
            <h2 className="text-2xl font-bold text-neutral-900 mb-3 leading-snug line-clamp-2">
              {post.title}
            </h2>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-base text-neutral-500 leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>
            )}
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              {/* {post.author?.image ? (
                <Image
                  src={
                    urlForImage(post.author.image)
                      ?.width(32)
                      .height(32)
                      .url() || ""
                  }
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User size={16} />
                </div>
              )} */}

              {/* Date */}
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              <span className="text-neutral-300">/</span>
              {/* Author */}
              <span className="font-medium text-neutral-800">
                {post.author.name}
              </span>
            </div>

            {/* Reading Time */}
            {readingTime > 0 && (
              <>
                <span className="text-neutral-300">•</span>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{readingTime} min read</span>
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
