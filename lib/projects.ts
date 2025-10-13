'use server'

import {client} from '@/sanity/lib/client'
import type {Project} from '@/types/project'
import {groq} from 'next-sanity'

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
  const data = await readClient.fetch(projectsQuery, {locale})
  return (data || []).map((p: any) => ({
    id: p._id,
    title: p.title,
    description: p.description,
    category: p.category,
    technologies: p.technologies ?? [],
    achievements: p.achievements ?? [],
    links: p.links ?? {},
    imageUrl: p.imageUrl,
    slug: p.slug,
  }))
}
