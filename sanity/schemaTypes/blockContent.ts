// schemas/blockContent.ts
import { defineType, defineArrayMember } from "sanity";

export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",

      // Styles
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],

      // Lists
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],

      // Marks (decorators and annotations)
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
          { title: "Underline", value: "underline" },
          { title: "Strike", value: "strike-through" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              },
              {
                title: "Open in new tab",
                name: "blank",
                type: "boolean",
                initialValue: true,
              },
            ],
          },
          {
            title: "Internal Link",
            name: "internalLink",
            type: "object",
            fields: [
              {
                name: "reference",
                type: "reference",
                title: "Reference",
                to: [{ type: "post" }],
              },
            ],
          },
        ],
      },
    }),

    // Images
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
      ],
    }),

    // Code blocks
    defineArrayMember({
      type: "code",
      title: "Code Block",
      options: {
        language: "javascript",
        languageAlternatives: [
          { title: "JavaScript", value: "javascript" },
          { title: "TypeScript", value: "typescript" },
          { title: "HTML", value: "html" },
          { title: "CSS", value: "css" },
          { title: "Python", value: "python" },
          { title: "JSON", value: "json" },
          { title: "Bash", value: "bash" },
        ],
        withFilename: true,
      },
    }),

    // YouTube embed (custom)
    defineArrayMember({
      name: "youtube",
      type: "object",
      title: "YouTube Video",
      fields: [
        {
          name: "url",
          type: "url",
          title: "YouTube URL",
        },
      ],
    }),

    // Callout/Alert box (custom)
    defineArrayMember({
      name: "callout",
      type: "object",
      title: "Callout",
      fields: [
        {
          name: "type",
          type: "string",
          title: "Type",
          options: {
            list: [
              { title: "Info", value: "info" },
              { title: "Warning", value: "warning" },
              { title: "Success", value: "success" },
              { title: "Error", value: "error" },
            ],
          },
        },
        {
          name: "text",
          type: "text",
          title: "Text",
        },
      ],
      preview: {
        select: {
          type: "type",
          text: "text",
        },
        prepare({ type, text }) {
          return {
            title: `${type.toUpperCase()}: ${text}`,
          };
        },
      },
    }),
  ],
});
