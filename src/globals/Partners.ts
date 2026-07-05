import type { GlobalConfig } from 'payload'

export const PartnersSection: GlobalConfig = {
  slug: 'partnersSection',
  label: 'Partners Section',
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      defaultValue: 'Partner with Excellence',
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
  ],
}