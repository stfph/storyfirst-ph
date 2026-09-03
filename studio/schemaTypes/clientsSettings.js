export default {
  name: "clientsSettings",
  title: "Clients Settings",
  type: "document",
  fields: [
    { name: "clientsBadge", title: "Clients Section Badge", type: "string" },
    { name: "clientsHeadline", title: "Clients Headline", type: "string" },
    {
      name: "clientsDescription",
      title: "Clients Description",
      type: "text",
      rows: 3,
    },
    { name: "collabBadge", title: "Collaborators Badge", type: "string" },
    { name: "collabHeadline", title: "Collaborators Headline", type: "string" },
    {
      name: "collabHoverText",
      title: "Collaborator Hover Text",
      type: "string",
      initialValue: "See our work together →",
      description:
        "The text that appears when hovering over a collaborator card.",
    },
  ],
};
