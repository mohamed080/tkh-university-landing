import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidateHomepage'
import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: {
    singular: 'Partner',
    plural: 'Partners',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'displayOrder', 'isActive'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Partner Name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      label: 'Partner Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'coverImage',
      label: 'Cover Image',
      type: 'upload',
      relationTo: 'media',
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
          defaultValue: 'Explore',
          required: true,
        },
        {
          name: 'href',
          label: 'Button URL',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'facts',
      label: 'Facts Badges',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          label: 'Fact Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Fact Description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'displayOrder',
      label: 'Display Order',
      type: 'number',
      defaultValue: 0,
      required: true,
    },
    {
      name: 'isActive',
      label: 'Active',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
}
