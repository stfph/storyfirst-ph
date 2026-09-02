export default {
  name: "clientCategory",
  title: "Client Categories (Tabs)",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Category Name",
      type: "string",
      description: "e.g. Media & Production",
    },
    {
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "Used to order the tabs (1, 2, 3...)",
    },
  ],
};
