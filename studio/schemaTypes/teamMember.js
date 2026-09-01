export default {
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  fields: [
    {name: 'order', title: 'Sort Order', type: 'number'},
    {name: 'name', title: 'Full Name', type: 'string'},
    {name: 'position', title: 'Job Position', type: 'string'},
    {name: 'image', title: 'Portrait Image', type: 'image', options: {hotspot: true}},
  ],
}
