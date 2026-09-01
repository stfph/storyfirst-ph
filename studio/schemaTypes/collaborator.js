export default {
  name: 'collaborator',
  title: 'Notable Collaborators',
  type: 'document',
  fields: [
    {name: 'order', title: 'Sort Order', type: 'number'},
    {name: 'name', title: 'Collaborator Name', type: 'string'},
    {name: 'context', title: 'Context / Title', type: 'string'},
    {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
  ],
}
