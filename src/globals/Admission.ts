import { revalidateGlobalAfterChange } from '@/hooks/revalidateHomepage'
import type { GlobalConfig } from 'payload'

export const Admissions: GlobalConfig = {
  slug: 'admissions',
  label: 'Admissions',
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      defaultValue: 'Take Action',
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
          label: 'Button Label',
          type: 'text',
          defaultValue: 'Apply For 2026 Year',
          required: true,
        },
        {
          name: 'href',
          label: 'Button URL',
          type: 'text',
          defaultValue: '#',
          required: true,
        },
      ],
    },
    {
      name: 'steps',
      label: 'Admission Steps',
      type: 'array',
      minRows: 1,
      maxRows: 10,
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
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  }
}