import { revalidateGlobalAfterChange } from '@/hooks/revalidateHomepage'
import type { GlobalConfig } from 'payload'

export const MajorsSection: GlobalConfig = {
  slug: 'majorsSection',
  label: 'Majors Section',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Choose Your Future',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
}
