export default {
  name: 'client',
  title: 'Client & Partner Logo',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Client / Organization Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category Tab',
      type: 'string',
      options: {
        list: [
          { title: 'Media & Production', value: 'media' },
          { title: 'Brands & Corporations', value: 'brands' },
          { title: 'Organizations & NGOs', value: 'organizations' },
          { title: 'Education & Institutions', value: 'institutions' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Client Logo (PNG recommended)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'websiteUrl',
      title: 'Website Link',
      type: 'url',
    },
  ],
}