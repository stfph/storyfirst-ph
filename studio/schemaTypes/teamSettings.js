export default {
  name: 'teamSettings',
  title: 'Team Section Settings',
  type: 'document',
  fields: [
    { name: 'badge', title: 'Section Badge', type: 'string', initialValue: 'The People Behind The Stories' },
    { name: 'headline', title: 'Headline', type: 'string', initialValue: 'Our Team' },
    { name: 'description', title: 'Section Description', type: 'text', rows: 3 },
  ],
}