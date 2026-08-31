export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'e.g., 1, 2, 3',
    },
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
      description: 'e.g., 01 — Documentary Production',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Service Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Hover Background Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
}