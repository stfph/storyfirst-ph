export default {
  name: "collaborator",
  title: "Notable Collaborators",
  type: "document",
  fields: [
    { name: "order", title: "Sort Order", type: "number" },
    { name: "name", title: "Collaborator Name", type: "string" },
    {
      name: "country",
      title: "Country of Origin",
      type: "string",
      description: "e.g., (USA/Thailand)",
    },
    {
      name: "context",
      title: "Context / Title (Optional)",
      type: "string",
    },
    {
      name: "profile",
      title: "1-Liner Profile",
      type: "text",
      rows: 2,
      description:
        "Brief description of who they are and what you did together.",
    },
    {
      name: "image",
      title: "Portrait Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "videoEmbedUrl",
      title: "Video Embed URL (For Pop-up)",
      type: "url",
      description:
        "Paste the embed URL here (e.g., https://www.youtube.com/embed/VIDEO_ID).",
    },
    {
      name: "linkUrl",
      title: "External Link",
      type: "url",
      description: "Secondary link for the button inside the pop-up modal.",
    },
  ],
};
