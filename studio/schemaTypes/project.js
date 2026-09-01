export default {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    {name: 'order', title: 'Sort Order', type: 'number', description: 'E.g., 1, 2, 3'},
    {name: 'title', title: 'Project Title', type: 'string'},
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {list: ['Documentaries', 'Content', 'Events', 'Workshops']},
    },
    {name: 'badge', title: 'Card Badge (e.g. TV Documentary)', type: 'string'},
    {name: 'client', title: 'Client / Network', type: 'string'},
    {name: 'role', title: 'Your Role', type: 'string'},
    {name: 'year', title: 'Year', type: 'string'},
    {name: 'shortDescription', title: 'Short Description', type: 'text', rows: 3},
    {name: 'image', title: 'Project Image', type: 'image', options: {hotspot: true}},
    {name: 'linkUrl', title: 'External Link', type: 'url'},
  ],
}
