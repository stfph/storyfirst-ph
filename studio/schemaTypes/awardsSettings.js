export default {
  name: 'awardsSettings',
  title: 'Awards Settings',
  type: 'document',
  fields: [
    {name: 'badge', title: 'Section Badge', type: 'string'},
    {name: 'headline', title: 'Headline', type: 'string'},
    {name: 'highlightText', title: 'Gradient Highlight Text', type: 'string'},
    {name: 'description', title: 'Description', type: 'text', rows: 3},
  ],
}
