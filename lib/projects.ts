'use server'

import {client} from '@/sanity/lib/client'
import type {Project} from '@/types/project'
import {groq} from 'next-sanity'

type SanityProject = {
  _id: string
  title: string
  description: string
  category: Project['category']
  technologies?: string[]
  achievements?: string[]
  links?: Project['links']
  imageUrl?: string
  slug?: string
}

const projectsQuery = groq`
  *[_type == "project" && (!defined(locale) || locale == $locale)]
  | order(coalesce(order, 9999) asc, _createdAt desc) {
    _id,
    title,
    description,
    category,
    technologies,
    achievements,
    links,
    "imageUrl": image.asset->url,
    "slug": slug.current
  }
`

const token =
  process.env.SANITY_API_READ_TOKEN ??
  process.env.SANITY_API_TOKEN ??
  process.env.SANITY_API_WRITE_TOKEN

// Prefer an authenticated client when available (private datasets),
// otherwise rely on the public CDN client.
const readClient = token
  ? client.withConfig({
      token,
      useCdn: false,
    })
  : client

export async function getProjects(locale: string): Promise<Project[]> {
  const data = await readClient.fetch<SanityProject[]>(projectsQuery, {locale})
  return (data || []).map((project) => ({
    id: project._id,
    title: project.title,
    description: project.description,
    category: project.category,
    technologies: project.technologies ?? [],
    achievements: project.achievements ?? [],
    links: project.links ?? {},
    imageUrl: project.imageUrl,
    slug: project.slug,
  }))
}
