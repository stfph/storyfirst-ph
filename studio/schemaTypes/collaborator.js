export default {
  name: 'collaborator',
  title: 'Notable Collaborator',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'context',
      title: 'Context / Tagline',
      type: 'string',
      description: 'e.g. Food Vlogger | Philippines Tour',
    },
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}