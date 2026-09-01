export default {
  name: 'client',
  title: 'Clients & Partners',
  type: 'document',
  fields: [
    {name: 'order', title: 'Sort Order', type: 'number'},
    {name: 'name', title: 'Client Name', type: 'string'},
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {list: ['media', 'brands', 'organizations', 'institutions']},
    },
    {name: 'websiteUrl', title: 'Website URL', type: 'url'},
    {name: 'logo', title: 'Client Logo (PNG)', type: 'image', options: {hotspot: true}},
  ],
}
