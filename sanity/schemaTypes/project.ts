import type {DocumentDefinition, Rule} from 'sanity'

const project: DocumentDefinition = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule: Rule) => rule.required().min(3),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule: Rule) => rule.required().min(10),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Mobile', value: 'mobile'},
          {title: 'Web', value: 'web'},
          {title: 'Fullstack', value: 'fullstack'},
        ],
        layout: 'radio',
      },
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    },
    {
      name: 'achievements',
      title: 'Key Achievements',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'links',
      title: 'Links',
      type: 'object',
      fields: [
        {
          name: 'demo',
          title: 'Demo URL',
          type: 'url',
        },
        {
          name: 'github',
          title: 'GitHub URL',
          type: 'url',
        },
      ],
    },
    {
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Important for accessibility and SEO',
        },
      ],
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Smaller numbers appear first in listings',
    },
    {
      name: 'locale',
      title: 'Locale',
      type: 'string',
      description: 'e.g. en, id, my. Leave empty for all locales.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'category',
    },
    prepare({title, media, subtitle}) {
      return {
        title,
        media,
        subtitle: subtitle ? `Category: ${subtitle}` : undefined,
      }
    },
  },
}

export default project
