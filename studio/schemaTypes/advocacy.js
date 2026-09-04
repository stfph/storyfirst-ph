export default {
  name: "advocacy",
  title: "Advocacies",
  type: "document",
  fields: [
    {
      name: "isArchived",
      title: "Archive (Hide from website)",
      type: "boolean",
      initialValue: false,
    },
    { name: "order", title: "Sort Order", type: "number" },
    { name: "title", title: "Advocacy Title", type: "string" },
    { name: "description", title: "Description", type: "text", rows: 3 },
    {
      name: "image",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "linkUrl",
      title: "External Link / Hyperlink",
      type: "url",
      description: "Optional link when the advocacy card is clicked.",
    },
  ],
};
