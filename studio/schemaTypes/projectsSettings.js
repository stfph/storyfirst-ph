export default {
  name: "projectsSettings",
  title: "Projects Settings",
  type: "document",
  fields: [
    { name: "badge", title: "Section Badge", type: "string" },
    { name: "headline", title: "Headline", type: "string" },
    {
      name: "externalLinkText",
      title: "Pop-up External Link Button Text",
      type: "string",
      description: "e.g., Visit External Link or Watch Full Video",
      initialValue: "Visit External Link",
    },
  ],
};
