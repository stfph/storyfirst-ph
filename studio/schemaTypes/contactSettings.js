export default {
  name: 'contactSettings',
  title: 'Contact Settings',
  type: 'document',
  fields: [
    // --- SECTION HEADERS ---
    { name: 'badge', title: 'Section Badge', type: 'string', initialValue: 'Work With StoryFirst PH' },
    { name: 'headline', title: 'Headline', type: 'string', initialValue: 'Have a story, project, or idea worth telling?' },
    { name: 'highlightText', title: 'Gradient Highlight Text', type: 'string', initialValue: "Let's work together." },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },

    // --- FORM SETTINGS ---
    {
      name: 'nameLabel',
      title: 'Name Field Label',
      type: 'string',
      initialValue: 'Your Name *'
    },
    {
      name: 'namePlaceholder',
      title: 'Name Field Placeholder',
      type: 'string',
      initialValue: 'Juan Dela Cruz'
    },
    {
      name: 'emailLabel',
      title: 'Email Field Label',
      type: 'string',
      initialValue: 'Email Address *'
    },
    {
      name: 'emailPlaceholder',
      title: 'Email Field Placeholder',
      type: 'string',
      initialValue: 'juan@company.com'
    },
    {
      name: 'categoryLabel',
      title: 'Category Dropdown Label',
      type: 'string',
      initialValue: 'Inquiry Category *'
    },
    {
      name: 'inquiryCategories',
      title: 'Inquiry Categories (Dropdown Options)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add the options you want to appear in the dropdown menu.',
      initialValue: [
        "Documentary / Production", "Content Creation", "Events Hosting",
        "Workshops / Speaking", "Partnerships", "Media / Press", "Other Inquiries"
      ]
    },
    {
      name: 'messageLabel',
      title: 'Message Field Label',
      type: 'string',
      initialValue: 'Project Details / Message *'
    },
    {
      name: 'messagePlaceholder',
      title: 'Message Field Placeholder',
      type: 'text',
      rows: 2,
      initialValue: 'Tell us about the story, timeline, or scope of your project...'
    },
    {
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'SEND INQUIRY'
    },
    {
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
      initialValue: 'INQUIRY SENT SUCCESSFULLY!'
    }
  ],
}