import { revalidateGlobalAfterChange } from '@/hooks/revalidateHomepage'
import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  fields: [
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'contact',
      label: 'Contact',
      type: 'group',
      fields: [
        { name: 'phone', label: 'Phone', type: 'text', required: true },
        { name: 'address', label: 'Address', type: 'textarea', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
      ],
    },
    {
      name: 'searchTitle',
      label: 'Search Title',
      type: 'text',
      defaultValue: "Can't find what you're looking for?",
      required: true,
    },
    {
      name: 'search',
      label: 'Search',
      type: 'group',
      fields: [
        {
          name: 'placeholder',
          label: 'Placeholder',
          type: 'text',
          defaultValue: 'Search for programs, fees, university...',
          required: true,
        },
        {
          name: 'buttonLabel',
          label: 'Button Label',
          type: 'text',
          defaultValue: 'Search',
          required: true,
        },
      ],
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
          defaultValue: 'Apply Now',
          required: true,
        },
        { name: 'href', label: 'Button URL', type: 'text', defaultValue: '#', required: true },
      ],
    },
    {
      name: 'socialLinks',
      label: 'Social Links',
      type: 'array',
      fields: [
        {
          name: 'platform',
          label: 'Platform',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
          ],
          required: true,
        },
        { name: 'url', label: 'URL', type: 'text', defaultValue: '#', required: true },
      ],
    },
    {
      name: 'navigationGroups',
      label: 'Navigation Groups',
      type: 'array',
      fields: [
        { name: 'title', label: 'Group Title', type: 'text', required: false },
        {
          name: 'links',
          label: 'Links',
          type: 'array',
          fields: [
            { name: 'label', label: 'Label', type: 'text', required: true },
            { name: 'href', label: 'URL', type: 'text', defaultValue: '#', required: true },
          ],
        },
      ],
    },
    {
      name: 'bottomLinks',
      label: 'Bottom Links',
      type: 'array',
      fields: [
        { name: 'label', label: 'Label', type: 'text', required: true },
        { name: 'href', label: 'URL', type: 'text', defaultValue: '#', required: true },
      ],
    },
    {
      name: 'copyright',
      label: 'Copyright',
      type: 'text',
      required: true,
    },
  ],
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
}
