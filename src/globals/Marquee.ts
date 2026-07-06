import { revalidateGlobalAfterChange } from '@/hooks/revalidateHomepage'
import type { GlobalConfig } from 'payload'

export const Marquee: GlobalConfig = {
  slug: 'marquee',
  label: 'Marquee',
  fields: [
    {
      name: 'rows',
      label: 'Marquee Rows',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'type',
          label: 'Row Type',
          type: 'select',
          required: true,
          defaultValue: 'logo',
          options: [
            {
              label: 'Logo',
              value: 'logo',
            },
            {
              label: 'Text',
              value: 'text',
            },
          ],
        },
        {
          name: 'logo',
          label: 'Logo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData.type === 'logo',
          },
        },
        {
          name: 'label',
          label: 'Text',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData.type === 'text',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
}
