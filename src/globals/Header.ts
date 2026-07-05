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
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', defaultValue: '#', required: true },
        { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
      ],
    },

    {
      name: 'searchAction',
      label: 'Search Action',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Search', required: true },
        { name: 'href', type: 'text', defaultValue: '#', required: true },
      ],
    },

    {
      name: 'contactLink',
      label: 'Contact Link',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Contact Us', required: true },
        { name: 'href', type: 'text', defaultValue: '#', required: true },
      ],
    },

    {
      name: 'primaryCTA',
      label: 'Primary CTA',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Apply Now', required: true },
        { name: 'href', type: 'text', defaultValue: '#', required: true },
      ],
    },

    {
      name: 'mainNavigation',
      label: 'Main Navigation',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', defaultValue: '#', required: true },

        {
          name: 'megaMenu',
          label: 'Mega Menu',
          type: 'group',
          fields: [
            {
              name: 'cards',
              label: 'Featured Cards',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
                {
                  name: 'image',
                  label: 'Card Image / Logo',
                  type: 'upload',
                  relationTo: 'media',
                },
                { name: 'href', type: 'text', defaultValue: '#', required: true },
              ],
            },
            {
              name: 'links',
              label: 'Middle Links',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', defaultValue: '#', required: true },
              ],
            },
            {
              name: 'previewImage',
              label: 'Preview Image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'previewImages',
              label: 'Preview Images',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  label: 'Image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
