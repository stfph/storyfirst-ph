import { defineField, defineType } from "sanity";

export default defineType({
  name: "globalSettings",
  title: "Global Settings & Contact",
  type: "document",
  fields: [
    defineField({
      name: "brandName",
      title: "Brand Name (Nav/Footer)",
      type: "string",
      initialValue: "STORYFIRST PH",
    }),
    defineField({
      name: "brandLogo",
      title: "Brand Logo / Icon",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "websiteIcon",
      title: "Website Favicon (Browser Tab Icon)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "emailLabel",
      title: "Email Label",
      type: "string",
      initialValue: "Email Inquiries",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "phoneLabel",
      title: "Phone Label",
      type: "string",
      initialValue: "Direct Line",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
    }),
    defineField({
      name: "locationLabel",
      title: "Location Label",
      type: "string",
      initialValue: "Location & Base",
    }),
    defineField({
      name: "contactLocation",
      title: "Location Base",
      type: "string",
    }),
    defineField({ name: "facebookUrl", title: "Facebook URL", type: "url" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "tiktokUrl", title: "TikTok URL", type: "url" }),
    defineField({
      name: "footerCopyright",
      title: "Footer Copyright Text",
      type: "string",
    }),
  ],
});
