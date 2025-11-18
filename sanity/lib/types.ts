// lib/sanity.types.ts
import { PortableTextBlock } from "@portabletext/types";
import { ImageAsset, Slug } from "@sanity/types";

export interface Post {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: Slug;
  author: Author;
  mainImage: Image;
  categories: Category[];
  tags?: string[];
  publishedAt: string;
  excerpt: string;
  body: PortableTextBlock[];
  estimatedReadingTime?: number;
  featured: boolean;
  status: "draft" | "review" | "published" | "archived";
  seo?: SEO;
}

export interface Author {
  _id: string;
  name: string;
  slug: Slug;
  image?: Image;
  bio?: string;
  role?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  email?: string;
}

export interface Category {
  _id: string;
  title: string;
  slug: Slug;
  description?: string;
  color?: {
    hex: string;
  };
}

export interface Image {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
  };
}

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: Image;
  noIndex?: boolean;
}

// Simplified types for lists
export interface PostCard {
  _id: string;
  title: string;
  slug: string;
  author: {
    name: string;
    slug: Slug;
    image?: Image;
  };
  mainImage: Image;
  categories: Category[];
  publishedAt: string;
  excerpt: string;
  estimatedReadingTime?: number;
  featured: boolean;
  body: PortableTextBlock[];
}

export interface PaginatedPosts {
  posts: PostCard[];
  total: number;
  hasMore: boolean;
}
