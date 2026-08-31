export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'position',
      title: 'Position / Title',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Portrait Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}