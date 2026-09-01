export default {
  name: 'globalSettings',
  title: 'Global Settings & Contact',
  type: 'document',
  fields: [
    {
      name: 'brandName',
      title: 'Brand Name (Nav/Footer)',
      type: 'string',
      initialValue: 'STORYFIRST PH',
    },
    {name: 'emailLabel', title: 'Email Label', type: 'string', initialValue: 'Email Inquiries'},
    {name: 'contactEmail', title: 'Contact Email', type: 'string'},
    {name: 'phoneLabel', title: 'Phone Label', type: 'string', initialValue: 'Direct Line'},
    {name: 'contactPhone', title: 'Contact Phone', type: 'string'},
    {
      name: 'locationLabel',
      title: 'Location Label',
      type: 'string',
      initialValue: 'Location & Base',
    },
    {name: 'contactLocation', title: 'Location Base', type: 'string'},
    {name: 'facebookUrl', title: 'Facebook URL', type: 'url'},
    {name: 'instagramUrl', title: 'Instagram URL', type: 'url'},
    {name: 'tiktokUrl', title: 'TikTok URL', type: 'url'},
    {name: 'footerCopyright', title: 'Footer Copyright Text', type: 'string'},
  ],
}
