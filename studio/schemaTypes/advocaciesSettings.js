export default {
  name: 'advocaciesSettings',
  title: 'Advocacies Settings',
  type: 'document',
  fields: [
    { name: 'badge', title: 'Section Badge', type: 'string', initialValue: 'Beyond Commercial Work' },
    { name: 'headline', title: 'Headline', type: 'string', initialValue: 'Our Advocacies' },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
  ],
}