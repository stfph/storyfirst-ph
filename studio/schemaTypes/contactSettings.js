export default {
  name: 'contactSettings',
  title: 'Contact Settings',
  type: 'document',
  fields: [
    { name: 'badge', title: 'Section Badge', type: 'string', initialValue: 'Work With StoryFirst PH' },
    { name: 'headline', title: 'Headline', type: 'string', initialValue: 'Have a story, project, or idea worth telling?' },
    { name: 'highlightText', title: 'Gradient Highlight Text', type: 'string', initialValue: "Let's work together." },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
  ],
}