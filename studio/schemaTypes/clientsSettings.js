export default {
  name: 'clientsSettings',
  title: 'Clients Settings',
  type: 'document',
  fields: [
    {name: 'clientsBadge', title: 'Clients Section Badge', type: 'string'},
    {name: 'clientsHeadline', title: 'Clients Headline', type: 'string'},
    {name: 'clientsDescription', title: 'Clients Description', type: 'text', rows: 3},
    {name: 'collabBadge', title: 'Collaborators Badge', type: 'string'},
    {name: 'collabHeadline', title: 'Collaborators Headline', type: 'string'},
  ],
}
