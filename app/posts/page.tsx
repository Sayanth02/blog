import BlogCard from "@/components/post/BlogCard";
import { client } from "@/sanity/lib/client";
import { paginatedPostsQuery, paginatedPostsByCategoryQuery, topCategoriesQuery } from "@/sanity/lib/queries";
import { PostCard, PaginatedPosts, Category } from "@/sanity/lib/types";
import { Disc2, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import Link from "next/link";

export const revalidate = 60;

const POSTS_PER_PAGE = 6;

interface BlogPageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const selectedCategory = params.category || null;
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  // Fetch categories
  const categories = await client.fetch<Category[]>(topCategoriesQuery);

  // Fetch posts based on category selection
  let result: PaginatedPosts;
  if (selectedCategory) {
    result = await client.fetch<PaginatedPosts>(paginatedPostsByCategoryQuery, {
      categorySlug: selectedCategory,
      start,
      end,
    });
  } else {
    result = await client.fetch<PaginatedPosts>(paginatedPostsQuery, {
      start,
      end,
    });
  }

  const totalPages = Math.ceil(result.total / POSTS_PER_PAGE);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const getPaginationUrl = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (selectedCategory) {
      params.set("category", selectedCategory);
    }
    return `/posts?${params.toString()}`;
  };

  return (
    <div className="container mx-auto p-16">
      <div className="hidden w-full lg:flex flex-col items-center mb-16 text-center space-y-6">
        <h2 className="text-7xl font-light">All Articles</h2>
        <Disc2 />
        <p className="text-neutaral-base w-1/3">
          Welcome to The Local Host, where I share insights, lessons, and
          experiments from my developer journey.
        </p>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-12 justify-center">
        <Link
          href="/posts"
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            !selectedCategory
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/posts?category=${category.slug}`}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category.title
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {category.title}
          </Link>
        ))}
      </div>

      {/* Posts Grid */}
      {result.posts.length > 0 ? (
        <div className="grid grid-cols-1  xl:grid-cols-2 gap-4">
          {result.posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No posts found in this category.
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {result.posts.length > 0 && (
        <div className="flex items-center justify-center gap-4 mt-12">
          {hasPrevPage && (
            <Link
              href={getPaginationUrl(currentPage - 1)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              <ChevronLeft size={20} />
              Previous
            </Link>
          )}

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          {hasNextPage && (
            <Link
              href={getPaginationUrl(currentPage + 1)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              Next
              <ChevronRight size={20} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}