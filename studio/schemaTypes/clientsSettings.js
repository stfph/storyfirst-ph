export default {
  name: 'clientsSettings',
  title: 'Clients & Collabs Settings',
  type: 'document',
  fields: [
    // Clients Top Section
    { name: 'clientsBadge', title: 'Clients Badge', type: 'string', initialValue: 'Trusted By' },
    { name: 'clientsHeadline', title: 'Clients Headline', type: 'string', initialValue: 'Clients & Collaborators' },
    { name: 'clientsDescription', title: 'Clients Description', type: 'text', rows: 3 },
    // Collaborators Bottom Section
    { name: 'collabBadge', title: 'Collaborators Badge', type: 'string', initialValue: 'Notable Collaborators' },
    { name: 'collabHeadline', title: 'Collaborators Headline', type: 'string', initialValue: "People We've Worked With" },
  ],
}