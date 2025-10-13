export type Project = {
  id: string
  title: string
  description: string
  category: 'mobile' | 'web' | 'fullstack'
  technologies: string[]
  achievements: string[]
  links?: { demo?: string; github?: string }
  imageUrl?: string
  slug?: string
}

