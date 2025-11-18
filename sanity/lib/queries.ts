// lib/sanity.queries.ts
import { groq } from "next-sanity";

// 🔧 Reusable fragments
const postFields = groq`
  _id,
  _createdAt,
  _updatedAt,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  featured,
  status,
  estimatedReadingTime,
  body
`;

const authorFields = groq`
  _id,
  name,
  "slug": slug.current,
  image {
    asset->,
    alt
  },
  bio,
  role,
  social,
  email
`;

const categoryFields = groq`
  _id,
  title,
  "slug": slug.current,
  description,
  color
`;

const imageFields = groq`
  asset->,
  alt,
  caption,
  hotspot
`;

// 📄 POST QUERIES

// Get all published posts (for blog index)
export const allPostsQuery = groq`
  *[_type == "post" && status == "published"] | order(publishedAt desc) {
    ${postFields},
    author-> {
      name,
      "slug": slug.current,
      image {
        asset->,
        alt
      }
    },
    mainImage {
      ${imageFields}
    },
    categories[]-> {
      ${categoryFields}
    },
    tags
  }
`;

// Get paginated posts
export const paginatedPostsQuery = groq`
  {
    "posts": *[_type == "post" && status == "published"] | order(publishedAt desc) [$start...$end] {
      ${postFields},
      author-> {
        name,
        "slug": slug.current,
        image {
          asset->,
          alt
        }
      },
      mainImage {
        ${imageFields}
      },
      categories[]-> {
        ${categoryFields}
      }
    },
    "total": count(*[_type == "post" && status == "published"])
  }
`;

// Get paginated posts by category
export const paginatedPostsByCategoryQuery = groq`
  {
    "posts": *[_type == "post" && status == "published" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) [$start...$end] {
      ${postFields},
      author-> {
        name,
        "slug": slug.current,
        image {
          asset->,
          alt
        }
      },
      mainImage {
        ${imageFields}
      },
      categories[]-> {
        ${categoryFields}
      }
    },
    "total": count(*[_type == "post" && status == "published" && $categorySlug in categories[]->slug.current])
  }
`;

// Get single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && status == "published"][0] {
    ${postFields},
    author-> {
      ${authorFields}
    },
    mainImage {
      ${imageFields}
    },
    categories[]-> {
      ${categoryFields}
    },
    tags,
    body,
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        ${imageFields}
      },
      noIndex
    }
  }
`;

// Get post paths for static generation
export const postPathsQuery = groq`
  *[_type == "post" && status == "published" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// Get featured posts
export const featuredPostsQuery = groq`
  *[_type == "post" && status == "published" && featured == true] | order(publishedAt desc) [0...4] {
    ${postFields},
    author-> {
      name,
      "slug": slug.current,
      image {
        asset->,
        alt
      }
    },
    mainImage {
      ${imageFields}
    },
    categories[]-> {
      ${categoryFields}
    }
  }
`;

// Get latest posts
export const latestPostsQuery = groq`
  *[_type == "post" && status == "published"] | order(publishedAt desc) [0...$limit] {
    ${postFields},
    author-> {
      name,
      "slug": slug.current
    },
    mainImage {
      ${imageFields}
    },
    categories[]-> {
      title,
      "slug": slug.current
    }
  }
`;

// Get related posts (same categories, excluding current)
export const relatedPostsQuery = groq`
  *[
    _type == "post" && 
    status == "published" && 
    _id != $postId &&
    count((categories[]->slug.current)[@ in $categories]) > 0
  ] | order(publishedAt desc) [0...3] {
    ${postFields},
    author-> {
      name,
      "slug": slug.current
    },
    mainImage {
      ${imageFields}
    },
    categories[]-> {
      ${categoryFields}
    }
  }
`;

// Search posts
export const searchPostsQuery = groq`
  *[
    _type == "post" && 
    status == "published" &&
    (
      title match $query ||
      excerpt match $query ||
      pt::text(body) match $query
    )
  ] | order(publishedAt desc) {
    ${postFields},
    author-> {
      name,
      "slug": slug.current
    },
    mainImage {
      ${imageFields}
    },
    categories[]-> {
      ${categoryFields}
    }
  }
`;

// 👤 AUTHOR QUERIES

// Get all authors
export const allAuthorsQuery = groq`
  *[_type == "author"] | order(name asc) {
    ${authorFields},
    "postCount": count(*[_type == "post" && references(^._id) && status == "published"])
  }
`;

// Get author by slug with posts
export const authorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    ${authorFields},
    "posts": *[_type == "post" && references(^._id) && status == "published"] | order(publishedAt desc) {
      ${postFields},
      mainImage {
        ${imageFields}
      },
      categories[]-> {
        ${categoryFields}
      }
    }
  }
`;

// Get author paths
export const authorPathsQuery = groq`
  *[_type == "author" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// 🏷️ CATEGORY QUERIES

// Get all categories with post count
export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    ${categoryFields},
    "postCount": count(*[_type == "post" && references(^._id) && status == "published"])
  }
`;

// Get top 6 categories for filtering
export const topCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) [0...6] {
    ${categoryFields},
    "postCount": count(*[_type == "post" && references(^._id) && status == "published"])
  }
`;

// Get category by slug with posts
export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    ${categoryFields},
    "posts": *[_type == "post" && references(^._id) && status == "published"] | order(publishedAt desc) {
      ${postFields},
      author-> {
        name,
        "slug": slug.current,
        image {
          asset->,
          alt
        }
      },
      mainImage {
        ${imageFields}
      },
      categories[]-> {
        ${categoryFields}
      }
    }
  }
`;

// Get category paths
export const categoryPathsQuery = groq`
  *[_type == "category" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// Posts by category (paginated)
export const postsByCategoryQuery = groq`
  {
    "category": *[_type == "category" && slug.current == $slug][0] {
      ${categoryFields}
    },
    "posts": *[_type == "post" && status == "published" && $slug in categories[]->slug.current] | order(publishedAt desc) [$start...$end] {
      ${postFields},
      author-> {
        name,
        "slug": slug.current
      },
      mainImage {
        ${imageFields}
      },
      categories[]-> {
        ${categoryFields}
      }
    },
    "total": count(*[_type == "post" && status == "published" && $slug in categories[]->slug.current])
  }
`;

// 🔖 TAG QUERIES

// Get all unique tags with count
export const allTagsQuery = groq`
  array::unique(*[_type == "post" && status == "published"].tags[])
`;

// Posts by tag
export const postsByTagQuery = groq`
  *[_type == "post" && status == "published" && $tag in tags] | order(publishedAt desc) {
    ${postFields},
    author-> {
      name,
      "slug": slug.current
    },
    mainImage {
      ${imageFields}
    },
    categories[]-> {
      ${categoryFields}
    },
    tags
  }
`;

// 📊 STATS QUERIES

// Blog statistics
export const blogStatsQuery = groq`
  {
    "totalPosts": count(*[_type == "post" && status == "published"]),
    "totalAuthors": count(*[_type == "author"]),
    "totalCategories": count(*[_type == "category"]),
    "recentPosts": *[_type == "post" && status == "published"] | order(publishedAt desc) [0...5] {
      title,
      "slug": slug.current,
      publishedAt
    }
  }
`;

// Archive (posts grouped by year/month)
export const archiveQuery = groq`
  *[_type == "post" && status == "published"] | order(publishedAt desc) {
    "year": string::split(publishedAt, "-")[0],
    "month": string::split(publishedAt, "-")[1],
    ${postFields},
    author-> {
      name,
      "slug": slug.current
    }
  }
`;

// 🎯 SITEMAP QUERY
export const sitemapQuery = groq`
  {
    "posts": *[_type == "post" && status == "published"] {
      "slug": slug.current,
      _updatedAt
    },
    "categories": *[_type == "category"] {
      "slug": slug.current,
      _updatedAt
    },
    "authors": *[_type == "author"] {
      "slug": slug.current,
      _updatedAt
    }
  }
`;
