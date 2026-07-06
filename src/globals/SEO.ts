import { revalidateGlobalAfterChange } from '@/hooks/revalidateHomepage'
import type { GlobalConfig } from 'payload'

export const SEO: GlobalConfig = {
  slug: 'seo',
  label: 'SEO',
  fields: [
    {
      name: 'title',
      label: 'Meta Title',
      type: 'text',
      required: true,
      defaultValue: 'TKH - The Knowledge Hub',
    },
    {
      name: 'description',
      label: 'Meta Description',
      type: 'textarea',
      required: true,
      defaultValue:
        'Earn a globally recognized degree from top-ranked partnered universities at The Knowledge Hub.',
    },
    {
      name: 'ogImage',
      label: 'Open Graph Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
}
