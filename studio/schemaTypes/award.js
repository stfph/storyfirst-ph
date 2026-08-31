export default {
  name: 'award',
  title: 'Award',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Awarding Body / Festival',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'recognition',
      title: 'Recognition Received',
      type: 'string',
      description: 'e.g., Nominee for Current Affairs (2025)',
    },
    {
      name: 'project',
      title: 'Winning Project Name',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Your Role',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Award Logo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'verificationLink',
      title: 'Verification URL',
      type: 'url',
    },
  ],
}