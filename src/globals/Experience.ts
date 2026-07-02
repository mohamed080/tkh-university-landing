import type { GlobalConfig } from 'payload'

export const Experience: GlobalConfig = {
  slug: 'experience',
  label: 'Experience',
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      defaultValue: 'Experience TKH',
    },
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      required: true,
    },
    {
      name: 'tabs',
      label: 'Experience Tabs',
      type: 'array',
      minRows: 1,
      required: true,
      fields: [
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
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'statBadge',
          label: 'Statistics Badge',
          type: 'group',
          fields: [
            {
              name: 'label',
              label: 'Label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              label: 'Value',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'cta',
      label: 'CTA Button',
      type: 'group',
      fields: [
        {
          name: 'label',
          label: 'Button Label',
          type: 'text',
          defaultValue: 'Know More About TKH',
          required: true,
        },
        {
          name: 'href',
          label: 'Button URL',
          type: 'text',
          defaultValue: '/about',
          required: true,
        },
      ],
    },
  ],
}
