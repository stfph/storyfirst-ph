export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Client / Person Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'position',
      title: 'Position / Role',
      type: 'string',
    },
    {
      name: 'company',
      title: 'Company / Organization',
      type: 'string',
    },
    {
      name: 'quote',
      title: 'Feedback Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
  ],
}