export default {
  name: 'siteSettings',
  title: 'Site Settings & General Info',
  type: 'document',
  fields: [
    // --- BRAND & HERO ---
    {
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      initialValue: 'STORYFIRST PH',
    },
    {
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'e.g. STORIES FIRST. ALWAYS.',
    },
    {
      name: 'heroSubHeadline',
      title: 'Hero Sub-headline / Intro Paragraph',
      type: 'text',
      rows: 3,
    },
    {
      name: 'heroVideo',
      title: 'Hero Background Video URL / File',
      type: 'url',
      description: 'Link to background video (or keep default asset)',
    },

    // --- ABOUT & PHILOSOPHY ---
    {
      name: 'aboutHeader',
      title: 'About Section Headline',
      type: 'string',
      initialValue: 'The Story Comes First.',
    },
    {
      name: 'aboutLeadText',
      title: 'About Lead Paragraph (Bold)',
      type: 'text',
      rows: 2,
    },
    {
      name: 'aboutParagraphs',
      title: 'About Description Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
    },

    // --- CONTACT DETAILS ---
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'storyfirstph@gmail.com',
    },
    {
      name: 'contactPhone',
      title: 'Direct Line / Phone',
      type: 'string',
      initialValue: '+63 928 604 4120',
    },
    {
      name: 'contactLocation',
      title: 'Location & Base',
      type: 'string',
      initialValue: 'Philippines / Cebu',
    },

    // --- SOCIAL LINKS ---
    {
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
    },
    {
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    },
    {
      name: 'tiktokUrl',
      title: 'TikTok URL',
      type: 'url',
    },
  ],
}