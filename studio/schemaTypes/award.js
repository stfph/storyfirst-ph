export default {
  name: 'award',
  title: 'Awards',
  type: 'document',
  fields: [
    {name: 'order', title: 'Sort Order', type: 'number'},
    {name: 'title', title: 'Award Title / Body', type: 'string'},
    {name: 'recognition', title: 'Recognition (e.g. Gold Medalist)', type: 'string'},
    {name: 'project', title: 'Winning Project', type: 'string'},
    {name: 'role', title: 'Your Role', type: 'string'},
    {name: 'verificationLink', title: 'Verification Link', type: 'url'},
    {name: 'logo', title: 'Award Logo', type: 'image', options: {hotspot: true}},
  ],
}
