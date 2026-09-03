export default {
  name: "globalSettings",
  title: "Global Settings & Contact",
  type: "document",
  fields: [
    {
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Display Name (e.g. Home)", type: "string" },
            { name: "href", title: "Link URL (e.g. #hero)", type: "string" },
          ],
        },
      ],
    },
    // --- SEO & META TAGS ---
    {
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description:
        "Title of the website (appears in search engines and browser tab).",
      initialValue: "StoryFirst PH | Creative Communications & Production",
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      description: "Short summary of the website for search engines.",
      initialValue:
        "StoryFirst PH is a Philippines-based communications consultancy and production company specializing in documentary production, content creation, and public speaking / workshops.",
    },
    {
      name: "seoKeywords",
      title: "SEO Keywords",
      type: "string",
      description:
        "Comma-separated keywords (e.g., StoryFirst PH, documentary production Philippines, content creation Cebu).",
    },
    {
      name: "seoImage",
      title: "SEO Social Share Image",
      type: "image",
      description:
        "Image displayed when the site is shared on social media (Facebook, Twitter).",
      options: { hotspot: true },
    },
    // --- BRAND & CONTACT ---
    {
      name: "brandName",
      title: "Brand Name (Nav/Footer)",
      type: "string",
      initialValue: "STORYFIRST PH",
    },
    {
      name: "brandLogo",
      title: "Brand Logo / Icon",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "websiteIcon",
      title: "Website Favicon (Browser Tab Icon)",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "emailLabel",
      title: "Email Label",
      type: "string",
      initialValue: "Email Inquiries",
    },
    { name: "contactEmail", title: "Contact Email", type: "string" },
    {
      name: "phoneLabel",
      title: "Phone Label",
      type: "string",
      initialValue: "Direct Line",
    },
    { name: "contactPhone", title: "Contact Phone", type: "string" },
    {
      name: "locationLabel",
      title: "Location Label",
      type: "string",
      initialValue: "Location & Base",
    },
    { name: "contactLocation", title: "Location Base", type: "string" },
    { name: "facebookUrl", title: "Facebook URL", type: "url" },
    { name: "instagramUrl", title: "Instagram URL", type: "url" },
    { name: "tiktokUrl", title: "TikTok URL", type: "url" },
    { name: "footerCopyright", title: "Footer Copyright Text", type: "string" },
  ],
};
