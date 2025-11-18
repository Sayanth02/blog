// lib/sanity.utils.ts
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { Image } from "@/sanity/lib/types";

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlForImage(source: Image) {
  return builder.image(source).auto("format").fit("max");
}

export function urlForImageWithSize(
  source: Image,
  width: number,
  height?: number
) {
  const imageBuilder = builder.image(source).width(width).auto("format");
  if (height) {
    return imageBuilder.height(height).fit("crop");
  }
  return imageBuilder;
}

// Format date
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Format date with relative time (e.g., "3 hours ago")
export function formatRelativeDate(dateString?: string): string {
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
}

// Calculate reading time from blocks
export function calculateReadingTime(blocks: any[]): number {
  if (!blocks) return 0;

  const text = blocks
    .filter((block) => block._type === "block")
    .map((block) => block.children?.map((child: any) => child.text).join(""))
    .join(" ");

  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

  return readingTime || 1;
}

// Extract plain text from Portable Text
export function toPlainText(blocks: any[]): string {
  if (!blocks) return "";

  return blocks
    .filter((block) => block._type === "block")
    .map((block) => block.children?.map((child: any) => child.text).join(""))
    .join("\n\n");
}

// Group posts by year/month for archive
export function groupPostsByDate(posts: any[]) {
  return posts.reduce(
    (acc, post) => {
      const date = new Date(post.publishedAt);
      const year = date.getFullYear();
      const month = date.toLocaleDateString("en-US", { month: "long" });

      if (!acc[year]) acc[year] = {};
      if (!acc[year][month]) acc[year][month] = [];

      acc[year][month].push(post);
      return acc;
    },
    {} as Record<number, Record<string, any[]>>
  );
}
