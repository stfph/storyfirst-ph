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
    {
      name: "linkedCategory",
      title: "Linked Project Category",
      type: "reference",
      to: [{ type: "projectCategory" }],
      description:
        "Select which project category this service links to when 'View Projects' is clicked.",
    },
  ],
};
