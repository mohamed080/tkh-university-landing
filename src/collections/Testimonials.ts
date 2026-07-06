import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidateHomepage'
import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  admin: {
    useAsTitle: 'studentName',
    defaultColumns: ['studentName', 'graduationYear', 'displayOrder', 'isActive'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'studentName',
      label: 'Student Name',
      type: 'text',
      required: true,
    },
    {
      name: 'studentAvatar',
      label: 'Student Avatar',
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
      name: 'universityLogo',
      label: 'University Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'graduationYear',
      label: 'Graduation Year',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'currentRole',
      label: 'Current Role',
      type: 'text',
      required: true,
    },
    {
      name: 'quote',
      label: 'Quote',
      type: 'textarea',
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
  },
}
