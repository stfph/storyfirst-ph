export default {
  name: "teamMember",
  title: "Team Members",
  type: "document",
  fields: [
    {
      name: "isArchived",
      title: "Archive (Hide from website)",
      type: "boolean",
      initialValue: false,
    },
    { name: "order", title: "Sort Order", type: "number" },
    { name: "name", title: "Full Name", type: "string" },
    { name: "position", title: "Job Position", type: "string" },
    {
      name: "image",
      title: "Portrait Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "linkUrl",
      title: "External Link / Portfolio",
      type: "url",
      description: "Optional link to their portfolio, LinkedIn, or video.",
    },
  ],
};
