export default {
  name: "servicesSettings",
  title: "Services Settings",
  type: "document",
  fields: [
    { name: "badge", title: "Section Badge", type: "string" },
    { name: "headline", title: "Headline", type: "string" },
    {
      name: "buttonText",
      title: "Service Button Text",
      type: "string",
      description: "e.g., Learn More / View Projects",
      initialValue: "Learn More / View Projects",
    },
    {
      name: "ctaBadge",
      title: "Call-to-Action Badge",
      type: "string",
      initialValue: "Let's Collaborate",
    },
    {
      name: "ctaHeadline",
      title: "Call-to-Action Headline",
      type: "string",
      initialValue: "Ready to tell your story?",
    },
    {
      name: "ctaDescription",
      title: "Call-to-Action Description",
      type: "text",
      rows: 2,
      initialValue:
        "Schedule a free 1-on-1 consultation or immersion setup. Available every Saturday and Sunday from 1:00 PM to 10:00 PM.",
    },
    {
      name: "ctaButtonText",
      title: "Call-to-Action Button Text",
      type: "string",
      initialValue: "BOOK A FREE CONSULTATION NOW!",
    },
    {
      name: "calendlyUrl",
      title: "Calendly URL",
      type: "url",
      description:
        "Paste your Calendly event link here (e.g., https://calendly.com/cabalhugsarahmae/free-consultation). The booking banner will only appear if this URL is provided.",
    },
  ],
};
