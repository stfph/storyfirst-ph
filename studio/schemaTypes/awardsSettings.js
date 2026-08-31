export default {
  name: 'awardsSettings',
  title: 'Awards Settings',
  type: 'document',
  fields: [
    { name: 'badge', title: 'Section Badge', type: 'string', initialValue: 'Global & Local Excellence' },
    { name: 'headline', title: 'Headline', type: 'string', initialValue: 'Awards &' },
    { name: 'highlightText', title: 'Gradient Highlight Text', type: 'string', initialValue: 'Recognitions.' },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
  ],
}