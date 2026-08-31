export default {
  name: 'aboutSettings',
  title: 'About Section Settings',
  type: 'document',
  fields: [
    { name: 'badge', title: 'Section Badge', type: 'string', initialValue: 'Our Philosophy' },
    { name: 'headline', title: 'Headline', type: 'string', initialValue: 'The Story' },
    { name: 'highlightText', title: 'Gradient Highlight Text', type: 'string', initialValue: 'Comes First.' },
    { name: 'leadParagraph', title: 'Bold Lead Paragraph', type: 'text', rows: 3 },
    {
      name: 'bodyParagraphs',
      title: 'Body Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 4 }]
    },
  ],
}