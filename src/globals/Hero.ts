import type { GlobalConfig } from 'payload'

export const Hero: GlobalConfig = {
  slug: 'hero',
  label: 'Hero',
  fields: [
    {
      name: 'headline',
      label: 'Headline',
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
      name: 'backgroundVideo',
      label: 'Background Video',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'fallbackImage',
      label: 'Fallback Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Used on mobile or if video fails to load',
      },
    },
     {
      name: 'primaryCTA',
      label: 'Primary CTA',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Explore Programs',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          defaultValue: '/programs',
          required: true,
        },
      ],
    },
     {
      name: 'secondaryCTA',
      label: 'Secondary CTA',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Start a Virtual Campus Tour',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          defaultValue: '/virtual-tour',
          required: true,
        },
      ],
    },
  ],
}
