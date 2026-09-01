export default {
  name: 'advocacy',
  title: 'Advocacies',
  type: 'document',
  fields: [
    {name: 'order', title: 'Sort Order', type: 'number'},
    {name: 'title', title: 'Advocacy Title', type: 'string'},
    {name: 'description', title: 'Description', type: 'text', rows: 3},
    {name: 'image', title: 'Background Image', type: 'image', options: {hotspot: true}},
  ],
}
