import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { Post } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { formatRelativeDate } from "@/sanity/lib/utils";

type FtCardProps = {
  post: Post;
};

const FtCard = ({ post }: FtCardProps) => {

  const category = post.categories?.[0];
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(600).height(800).url()
    : "/images/frontend.535Z.png";

  return (
    <Link href={`/posts/${post.slug}`}>
      <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
        {/* Background Image */}
        <Image
          className="absolute inset-0 bg-cover bg-center w-full h-full object-cover"
          src={imageUrl}
          width={600}
          height={800}
          alt={post.mainImage?.alt || post.title}
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent"></div>

        {/* CONTENT */}
        <div className="relative z-10 h-full flex flex-col justify-end p-8 space-y-5">
          {/* Category Tag */}
          {category && (
            <span className="w-fit inline-block px-4 py-1 text-sm rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
              {category.title}
            </span>
          )}

          {/* Title */}
          <h2 className="text-4xl font-bold text-white leading-tight max-w-xl">
            {post.title}
          </h2>

          {/* Divider */}
          <div className="w-full h-px bg-white/20"></div>

          {/* Author + Comments Row */}
          <div className="flex items-center justify-between text-white/80 text-sm">
            <p>
              by{" "}
              <span className="font-semibold text-white">
                {post.author?.name || "Unknown"}
              </span>{" "}
              · {formatRelativeDate(post.publishedAt)}
            </p>

            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FtCard;
