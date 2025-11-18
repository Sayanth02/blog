import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";

const components = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset) return null;

      const imageUrl = urlForImage(value)?.width(800).height(600).url();
      if (!imageUrl) return null;

      return (
        <figure className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || "Blog image"}
            width={800}
            height={600}
            className="w-full rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-600 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-4xl font-bold my-6">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-3xl font-bold my-5">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-2xl font-bold my-4">{children}</h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="text-xl font-bold my-3">{children}</h4>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="my-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside my-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside my-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <li className="ml-2">{children}</li>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <li className="ml-2">{children}</li>
    ),
  },
};

export default function PortableTextContent({ value }: { value: any }) {
  return <PortableText value={value} components={components} />;
}
