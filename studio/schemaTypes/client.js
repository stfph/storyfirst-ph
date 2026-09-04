export default {
  name: "client",
  title: "Clients & Partners",
  type: "document",
  fields: [
    {
      name: "isArchived",
      title: "Archive (Hide from website)",
      type: "boolean",
      initialValue: false,
    },
    { name: "order", title: "Sort Order", type: "number" },
    { name: "name", title: "Client Name", type: "string" },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "clientCategory" }],
    },
    { name: "websiteUrl", title: "Website URL", type: "url" },
    {
      name: "logo",
      title: "Client Logo (PNG)",
      type: "image",
      options: { hotspot: true },
    },
  ],
};
