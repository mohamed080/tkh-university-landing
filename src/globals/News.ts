import type { GlobalConfig } from 'payload'

export const NewsSection: GlobalConfig = {
  slug: 'newsSection',
  label: 'News Section',
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      defaultValue: 'Stay Updated',
      required: true,
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'cta',
      label: 'CTA Button',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Explore Our All News',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          defaultValue: '#',
          required: true,
        },
      ],
    },
  ],
}