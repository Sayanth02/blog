// schemas/author.ts
import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,

  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Profile Picture",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      placeholder: "e.g., Content Writer, Marketing Manager",
    }),
    defineField({
      name: "social",
      title: "Social Media",
      type: "object",
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: "twitter",
          type: "url",
          title: "Twitter URL",
        },
        {
          name: "linkedin",
          type: "url",
          title: "LinkedIn URL",
        },
        {
          name: "github",
          type: "url",
          title: "GitHub URL",
        },
        {
          name: "website",
          type: "url",
          title: "Website URL",
        },
      ],
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
});
