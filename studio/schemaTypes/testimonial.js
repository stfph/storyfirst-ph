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
    {
      name: "image",
      title: "Testimonial Screenshot",
      type: "image",
      options: { hotspot: true },
    },
    { name: "name", title: "Author Name / Reference", type: "string" },
    { name: "position", title: "Job Position", type: "string" },
    { name: "company", title: "Company", type: "string" },
    {
      name: "linkUrl",
      title: "External Link / Reference",
      type: "url",
      description: "Optional link to the original work or company.",
    },
  ],
};
