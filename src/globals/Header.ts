import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  fields: [
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    {
      name: 'topNavigation',
      label: 'Top Navigation',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },

    {
      name: 'mainNavigation',
      label: 'Main Navigation',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
        {
          name: 'children',
          label: 'Dropdown Items',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    {
      name: 'contactLink',
      label: 'Contact Link',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Contact Us',
        },
        {
          name: 'href',
          type: 'text',
          defaultValue: '/contact',
        },
      ],
    },

    {
      name: 'primaryCTA',
      label: 'Primary CTA',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Apply Now',
        },
        {
          name: 'href',
          type: 'text',
          defaultValue: '/apply',
        },
      ],
    },
  ],
}