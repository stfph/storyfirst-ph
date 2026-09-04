export default {
  name: "collaborator",
  title: "Notable Collaborators",
  type: "document",
  fields: [
    {
      name: "isArchived",
      title: "Archive (Hide from website)",
      type: "boolean",
      initialValue: false,
    },
    { name: "order", title: "Sort Order", type: "number" },
    { name: "name", title: "Collaborator Name", type: "string" },
    {
      name: "country",
      title: "Country of Origin",
      type: "string",
      description: "e.g., (USA/Thailand)",
    },
    {
      name: "image",
      title: "Portrait Image (Card Thumbnail)",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "collaborations",
      title: "Projects / Works Together",
      type: "array",
      description:
        "Add one or more projects you did with this collaborator. These will appear in the pop-up modal.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "profile",
              title: "1-Liner Profile / Description",
              type: "text",
              rows: 2,
              description:
                "Brief description of what you did together in this specific project.",
            },
            {
              name: "videoEmbedUrl",
              title: "Video Embed URL",
              type: "url",
              description:
                "Paste the embed URL here (e.g., https://www.youtube.com/embed/VIDEO_ID).",
            },
            {
              name: "image",
              title: "Project Image (Fallback if no video)",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "linkUrl",
              title: "External Link",
              type: "url",
              description:
                "Secondary link for the button inside the pop-up modal.",
            },
          ],
          preview: {
            select: {
              title: "profile",
              media: "image",
            },
          },
        },
      ],
    },
    { name: "profile", title: "Legacy Profile", type: "text", hidden: true },
    { name: "videoEmbedUrl", title: "Legacy Video", type: "url", hidden: true },
    { name: "linkUrl", title: "Legacy Link", type: "url", hidden: true },
  ],
};
