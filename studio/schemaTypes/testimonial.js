export default {
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    {
      name: "isArchived",
      title: "Archive (Hide from website)",
      type: "boolean",
      initialValue: false,
    },
    { name: "order", title: "Sort Order", type: "number" },
    { name: "name", title: "Author Name", type: "string" },
    { name: "position", title: "Job Position", type: "string" },
    { name: "company", title: "Company", type: "string" },
    { name: "quote", title: "Quote", type: "text", rows: 4 },
    {
      name: "linkUrl",
      title: "External Link / Reference",
      type: "url",
      description: "Optional link to the original work or company.",
    },
  ],
};
