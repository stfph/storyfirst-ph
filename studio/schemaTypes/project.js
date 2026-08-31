export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Documentaries', value: 'Documentaries' },
          { title: 'Content', value: 'Content' },
          { title: 'Events', value: 'Events' },
          { title: 'Workshops', value: 'Workshops' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'badge',
      title: 'Badge / Tag',
      type: 'string',
      description: 'e.g., TV Documentary, Digital Campaign',
    },
    {
      name: 'client',
      title: 'Client / Network',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Your Role',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true, // Enables UI for editors to crop/focus images
      },
    },
    {
      name: 'linkUrl',
      title: 'External Link (YouTube, Article, etc.)',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'image',
    },
  },
}