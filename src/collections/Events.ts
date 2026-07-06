import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidateHomepage'
import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Event',
    plural: 'Events',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'displayOrder', 'isActive'],
  },
  access: {
    read: () => true,
  },
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
      type: 'textarea',
      required: true,
    },
    {
      name: 'date',
      label: 'Event Date',
      type: 'date',
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
  }
}