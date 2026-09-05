export default {
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    {
      name: "isArchived",
      title: "Archive (Hide from website)",
      type: "boolean",
      initialValue: false,
    },
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
      name: "galleryItems",
      title: "Project Media Items (Pop-up Carousel)",
      type: "array",
      description:
        "Add one or more photos or video links here. If you add multiple, the pop-up will turn into a slider. If left empty, it will fall back to the legacy fields below.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "videoEmbedUrl",
              title: "Video Embed URL",
              type: "url",
              description: "Paste the embed URL here (e.g., YouTube/TikTok).",
            },
            {
              name: "image",
              title: "Project Image (Fallback if no video)",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "linkUrl",
              title: "External Link (Specific to this item)",
              type: "url",
            },
          ],
        },
      ],
    },
    // Legacy fields kept for backward compatibility
    {
      name: "videoEmbedUrl",
      title: "Legacy Video Embed URL",
      type: "url",
      hidden: true,
    },
    {
      name: "linkUrl",
      title: "Legacy External Link",
      type: "url",
      hidden: true,
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
    {
      name: "role",
      title: "Your Role/s (Leave blank to hide completely)",
      type: "string",
    },
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
  ],
};
