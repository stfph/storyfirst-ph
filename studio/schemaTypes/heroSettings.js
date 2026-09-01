export default {
  name: 'heroSettings',
  title: 'Hero Settings',
  type: 'document',
  fields: [
    {name: 'topBadge', title: 'Top Badge', type: 'string'},
    {name: 'headline', title: 'Headline', type: 'text', rows: 3},
    {name: 'highlightWord', title: 'Highlighted Word (Yellow Box)', type: 'string'},
    {name: 'subtext', title: 'Subtext', type: 'text', rows: 3},
    {name: 'primaryButtonText', title: 'Primary Button Text', type: 'string'},
    {name: 'secondaryButtonText', title: 'Secondary Button Text', type: 'string'},
    {
      name: 'heroVideo',
      title: 'Hero Background Video (URL)',
      type: 'url',
      description: 'Link to an MP4 video file',
    },
  ],
}
