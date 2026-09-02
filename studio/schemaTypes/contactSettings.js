export default {
  name: "contactSettings",
  title: "Contact Settings",
  type: "document",
  fields: [
    { name: "badge", title: "Section Badge", type: "string" },
    { name: "headline", title: "Headline", type: "string" },
    { name: "highlightText", title: "Gradient Highlight Text", type: "string" },
    { name: "description", title: "Description", type: "text", rows: 3 },
    {
      name: "web3formsAccessKey",
      title: "Web3Forms Access Key",
      type: "string",
      description:
        "Paste your Web3Forms access key here to enable email delivery. Get one for free at web3forms.com.",
    },
    { name: "nameLabel", title: "Name Field Label", type: "string" },
    {
      name: "namePlaceholder",
      title: "Name Field Placeholder",
      type: "string",
    },
    { name: "emailLabel", title: "Email Field Label", type: "string" },
    {
      name: "emailPlaceholder",
      title: "Email Field Placeholder",
      type: "string",
    },
    { name: "categoryLabel", title: "Category Dropdown Label", type: "string" },
    {
      name: "inquiryCategories",
      title: "Inquiry Categories (Dropdown Options)",
      type: "array",
      of: [{ type: "string" }],
    },
    { name: "messageLabel", title: "Message Field Label", type: "string" },
    {
      name: "messagePlaceholder",
      title: "Message Field Placeholder",
      type: "text",
      rows: 2,
    },
    { name: "submitButtonText", title: "Submit Button Text", type: "string" },
    { name: "successMessage", title: "Success Message", type: "string" },
  ],
};
