import { revalidateGlobalAfterChange } from '@/hooks/revalidateHomepage'
import type { GlobalConfig } from 'payload'

export const EventsSection: GlobalConfig = {
  slug: 'eventsSection',
  label: 'Events Section',
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      defaultValue: 'Events',
      required: true,
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
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
          defaultValue: 'Explore Our All Events',
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
