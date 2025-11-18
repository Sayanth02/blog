// schemas/post.ts
import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  icon: DocumentTextIcon,

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(10).max(100),
      description: "Keep it concise and SEO-friendly",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: "Click generate to create from title",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          validation: (Rule) => Rule.required(),
          description: "Important for SEO and accessibility",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(200),
      description: "Brief summary for preview cards and SEO",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "estimatedReadingTime",
      title: "Estimated Reading Time (minutes)",
      type: "number",
      readOnly: true,
      description: "Auto-calculated based on content",
    }),
    defineField({
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      initialValue: false,
      description: "Show on homepage hero section",
    }),

    // 🎯 SEO Fields
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      description: "Override default SEO settings",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: "metaTitle",
          type: "string",
          title: "Meta Title",
          validation: (Rule) => Rule.max(60),
          description: "Override default title for SEO (60 chars max)",
        },
        {
          name: "metaDescription",
          type: "text",
          title: "Meta Description",
          rows: 3,
          validation: (Rule) => Rule.max(160),
          description: "Override excerpt for SEO (160 chars max)",
        },
        {
          name: "ogImage",
          type: "image",
          title: "Social Share Image",
          description:
            "Override main image for social sharing (1200x630px recommended)",
        },
        {
          name: "noIndex",
          type: "boolean",
          title: "No Index",
          description: "Prevent search engines from indexing this post",
          initialValue: false,
        },
      ],
    }),

    // 🚀 Status/Workflow
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "In Review", value: "review" },
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      status: "status",
      publishedAt: "publishedAt",
    },
    prepare(selection) {
      const { author, status, publishedAt } = selection;
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString()
        : "No date";

      return {
        ...selection,
        subtitle: `${author ? `by ${author}` : "No author"} • ${status} • ${date}`,
      };
    },
  },

  // 📋 Initial value for new posts
  initialValue: {
    status: "draft",
    featured: false,
    publishedAt: new Date().toISOString(),
  },

  // 🔍 Ordering in Studio
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Published Date, Old",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
