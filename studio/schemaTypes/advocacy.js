export default {
  name: 'advocacy',
  title: 'Advocacy',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Advocacy Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Card Background Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}