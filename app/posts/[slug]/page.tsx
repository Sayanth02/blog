// app/blog/[slug]/page.tsx
import { client } from "@/sanity/lib/client";
import {
  postBySlugQuery,
  postPathsQuery,
  relatedPostsQuery,
} from "@/sanity/lib/queries";
import { Post } from "@/sanity/lib/types";
import {
  urlForImage,
  formatDate,
  calculateReadingTime,
} from "@/sanity/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogCard from "@/components/post/BlogCard";
import PortableTextContent from "@/components/post/PortableTextContent";

export async function generateStaticParams() {
  const posts = await client.fetch(postPathsQuery);
  return posts.map((post: any) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: Post = await client.fetch(postBySlugQuery, { slug });

  if (!post) return {};

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: post.mainImage
        ? [
            {
              url:
                urlForImage(post.mainImage)?.width(1200).height(630).url() ||
                "",
              width: 1200,
              height: 630,
            },
          ]
        : [],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  };
}

// ✅ Add await here too
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>; // ← Changed to Promise
}) {
  const { slug } = await params; // ← Await params
  const post: Post = await client.fetch(postBySlugQuery, { slug });

  if (!post) notFound();

  const relatedPosts = await client.fetch(relatedPostsQuery, {
    postId: post._id,
    categories: post.categories?.map((cat) => cat.slug) || [],
  });

  const readingTime = calculateReadingTime(post.body);

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-5xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center gap-2 md:gap-4 text-sm md:text-base text-gray-600 mb-6">
          <div className="flex items-center gap-2 ">
            {post.author.image && (
              <Image
                src={
                  urlForImage(post.author.image)?.width(40).height(40).url() ||
                  ""
                }
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <span>{post.author.name}</span>
          </div>
          <span>•</span>
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
          <span>•</span>
          <span>{readingTime} min read</span>
        </div>

        {post.categories && post.categories.length > 0 && (
          <div className="flex gap-2 mb-6">
            {post.categories.map((category) => (
              <span
                key={category._id}
                className="px-3 py-1 rounded-full text-sm"
                style={{ backgroundColor: category.color?.hex || "#e5e7eb" }}
              >
                {category.title}
              </span>
            ))}
          </div>
        )}

        {post.mainImage && (
          <Image
            src={
              urlForImage(post.mainImage)?.width(1200).height(630).url() || ""
            }
            alt={post.mainImage.alt || post.title}
            width={1200}
            height={630}
            className="w-full rounded-lg"
            priority
          />
        )}
      </header>

      <div className="prose prose-lg max-w-none mb-12">
        <PortableTextContent value={post.body} />
      </div>

      <div className="border-t pt-8 mb-12">
        <h3 className="text-xl font-bold mb-4">About the Author</h3>
        <div className="flex gap-4">
          {post.author.image && (
            <Image
              src={
                urlForImage(post.author.image)?.width(80).height(80).url() || ""
              }
              alt={post.author.name}
              width={80}
              height={80}
              className="rounded-full"
            />
          )}
          <div>
            <h4 className="font-bold">{post.author.name}</h4>
            {post.author.role && (
              <p className="text-sm text-gray-600">{post.author.role}</p>
            )}
            {post.author.bio && <p className="mt-2">{post.author.bio}</p>}
          </div>
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost: any) => (
              <BlogCard
                key={relatedPost._id}
                post={relatedPost}
                variant="vertical"
              />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
