export default {
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    {
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "E.g., 1, 2, 3",
    },
    { name: "title", title: "Project Title", type: "string" },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "projectCategory" }],
    },
    {
      name: "badge",
      title: "Card Badge (e.g. TV Documentary)",
      type: "string",
    },
    {
      name: "image",
      title: "Project Image (Poster Background)",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "videoEmbedUrl",
      title: "Video Embed URL (For Pop-up)",
      type: "url",
      description:
        "Paste the embed URL here (e.g., https://www.youtube.com/embed/VIDEO_ID). This will play in the pop-up when the card is clicked.",
    },
    {
      name: "awardsList",
      title: "Awards / Laurels",
      type: "array",
      description:
        "Upload transparent PNG laurel logos and their corresponding award names.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "awardName",
              title: "Award Name / Recognition",
              type: "string",
            },
            {
              name: "laurelImage",
              title: "Award Laurel Logo",
              type: "image",
              options: { hotspot: true },
            },
          ],
        },
      ],
    },
    { name: "role", title: "Your Role/s", type: "string" },
    { name: "client", title: "Client / Network Text", type: "string" },
    {
      name: "clientLogo",
      title: "Client / Network Logo",
      type: "image",
      options: { hotspot: true },
    },
    { name: "year", title: "Year", type: "string" },
    {
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
    },
    {
      name: "linkUrl",
      title: "External Link",
      type: "url",
      description:
        "This is the link users will go to when they click the button inside the pop-up.",
    },
  ],
};
