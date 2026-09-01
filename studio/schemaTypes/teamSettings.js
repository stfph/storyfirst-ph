export default {
  name: 'teamSettings',
  title: 'Team Settings',
  type: 'document',
  fields: [
    {name: 'badge', title: 'Section Badge', type: 'string'},
    {name: 'headline', title: 'Headline', type: 'string'},
    {name: 'description', title: 'Description', type: 'text', rows: 3},
  ],
}
