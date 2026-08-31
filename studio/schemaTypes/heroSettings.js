export default {
  name: 'heroSettings',
  title: 'Hero Section Settings',
  type: 'document',
  fields: [
    { name: 'topBadge', title: 'Top Badge Text', type: 'string', initialValue: 'Creative Communications & Production' },
    { name: 'headline', title: 'Main Headline', type: 'text', rows: 2, description: 'Use a new line for line breaks.' },
    { name: 'highlightWord', title: 'Highlight Word (Yellow Box)', type: 'string', initialValue: 'Always.' },
    { name: 'subtext', title: 'Sub-headline Text', type: 'text', rows: 3 },
    { name: 'primaryButtonText', title: 'Primary Button Text', type: 'string', initialValue: 'View Projects' },
    { name: 'secondaryButtonText', title: 'Secondary Button Text', type: 'string', initialValue: 'Work With Us' },
  ],
}