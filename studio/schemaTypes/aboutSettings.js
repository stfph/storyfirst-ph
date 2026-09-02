export default {
  name: "aboutSettings",
  title: "About Settings",
  type: "document",
  fields: [
    { name: "badge", title: "Section Badge", type: "string" },
    { name: "headline", title: "Headline", type: "string" },
    { name: "highlightText", title: "Gradient Highlight Text", type: "string" },
    {
      name: "leadParagraph",
      title: "Lead Paragraph (Bold)",
      type: "text",
      rows: 3,
    },
    {
      name: "bodyParagraphs",
      title: "Body Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    },
    {
      name: "collageImages",
      title: "Collage Images (Portraits / Case Studies)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) =>
        Rule.max(14).warning(
          "You can upload up to 14 portraits for the best layout.",
        ),
    },
  ],
};
