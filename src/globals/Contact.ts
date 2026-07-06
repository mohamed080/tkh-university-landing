import { revalidateGlobalAfterChange } from '@/hooks/revalidateHomepage'
import type { GlobalConfig } from 'payload'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact',
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      defaultValue: 'Take Action',
      required: true,
    },
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
      name: 'phonePlaceholder',
      label: 'Phone Placeholder',
      type: 'text',
      defaultValue: 'Your Phone Number',
      required: true,
    },
    {
      name: 'emailPlaceholder',
      label: 'Email Placeholder',
      type: 'text',
      defaultValue: 'Your Email',
      required: true,
    },
    {
      name: 'messagePlaceholder',
      label: 'Message Placeholder',
      type: 'text',
      defaultValue: 'Your Message',
      required: true,
    },
    {
      name: 'submitButtonLabel',
      label: 'Submit Button Label',
      type: 'text',
      defaultValue: 'Send Message',
      required: true,
    },
  ],
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
}
