export default {
  name: 'aboutSettings',
  title: 'About Settings',
  type: 'document',
  fields: [
    {name: 'badge', title: 'Section Badge', type: 'string'},
    {name: 'headline', title: 'Headline', type: 'string'},
    {name: 'highlightText', title: 'Gradient Highlight Text', type: 'string'},
    {name: 'leadParagraph', title: 'Lead Paragraph (Bold)', type: 'text', rows: 3},
    {
      name: 'bodyParagraphs',
      title: 'Body Paragraphs',
      type: 'array',
      of: [{type: 'text', rows: 4}],
    },
  ],
}
