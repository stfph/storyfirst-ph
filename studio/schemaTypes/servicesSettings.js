export default {
  name: "servicesSettings",
  title: "Services Settings",
  type: "document",
  fields: [
    { name: "badge", title: "Section Badge", type: "string" },
    { name: "headline", title: "Headline", type: "string" },
    {
      name: "buttonText",
      title: "Button Text",
      type: "string",
      description: "e.g., Learn More / View Projects",
      initialValue: "Learn More / View Projects",
    },
  ],
};
