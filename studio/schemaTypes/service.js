export default {
  name: "service",
  title: "Services",
  type: "document",
  fields: [
    {
      name: "isArchived",
      title: "Archive (Hide from website)",
      type: "boolean",
      initialValue: false,
    },
    { name: "order", title: "Sort Order", type: "number" },
    { name: "title", title: "Service Title", type: "string" },
    { name: "description", title: "Description", type: "text", rows: 3 },
    {
      name: "image",
      title: "Hover Background Image",
      type: "image",
      options: { hotspot: true },
    },
  ],
};
