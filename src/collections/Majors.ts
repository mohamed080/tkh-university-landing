import type { CollectionConfig } from 'payload'

export const Majors: CollectionConfig = {
  slug: 'majors',
  labels: {
    singular: 'Major',
    plural: 'Majors',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'programsCount', 'displayOrder', 'isActive'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Major Name',
      type: 'text',
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
      name: 'programsCount',
      label: 'Programs Count',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'displayOrder',
      label: 'Display Order',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'isActive',
      label: 'Active',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}