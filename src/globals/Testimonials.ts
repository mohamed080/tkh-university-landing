import { revalidateGlobalAfterChange } from '@/hooks/revalidateHomepage'
import type { GlobalConfig } from 'payload'

export const TestimonialsSection: GlobalConfig = {
  slug: 'testimonialsSection',
  label: 'Testimonials Section',
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      defaultValue: 'Build Your Career',
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
          defaultValue: 'Explore Our Career Services',
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
  ],
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
}
