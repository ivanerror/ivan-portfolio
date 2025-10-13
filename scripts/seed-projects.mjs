#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import {createClient} from '@sanity/client'

function loadEnv() {
  const tryFiles = ['.env.local', '.env']
  for (const file of tryFiles) {
    const p = path.resolve(process.cwd(), file)
    if (fs.existsSync(p)) {
      const txt = fs.readFileSync(p, 'utf8')
      for (const line of txt.split(/\r?\n/)) {
        if (!line || line.trim().startsWith('#') || !line.includes('=')) continue
        const idx = line.indexOf('=')
        const key = line.slice(0, idx).trim()
        let val = line.slice(idx + 1).trim()
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1)
        }
        if (!(key in process.env)) process.env[key] = val
      }
    }
  }
}

loadEnv()

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01'
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN

if (!projectId || !dataset) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in env')
  process.exit(1)
}
if (!token) {
  console.error('Missing SANITY_API_WRITE_TOKEN (or SANITY_API_TOKEN / SANITY_WRITE_TOKEN) in env')
  process.exit(1)
}

const client = createClient({projectId, dataset, apiVersion, token, useCdn: false})

const baseMap = {
  grabMexApp: {
    key: 'grab-mex-app',
    category: 'mobile',
    technologies: ['Flutter', 'Dart', 'WebView', 'JSON SDUI', 'AI Integration'],
    links: { demo: 'https://play.google.com/store/apps/details?id=com.grab.merchant&hl=en' },
    imagePath: '/projects/grab-mex.jpg',
    order: 1,
  },
  grabPos: {
    key: 'grab-pos',
    category: 'fullstack',
    technologies: ['Flutter', 'React.js', 'TypeScript', 'QR Code', 'Design System'],
    links: { demo: 'https://hubbopos.com/my' },
    imagePath: '/projects/grab-pos.jpg',
    order: 2,
  },
  crmSystem: {
    key: 'crm-system',
    category: 'fullstack',
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT'],
    links: { github: 'https://github.com/ivanerror' },
    imagePath: '/projects/crm-system.jpg',
    order: 3,
  },
  portfolio: {
    key: 'portfolio-website',
    category: 'web',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'next-intl'],
    links: { demo: 'https://ivanerror.is-a.dev/', github: 'https://github.com/ivanerror/ivan-portfolio' },
    imagePath: '/projects/portfolio.jpg',
    order: 4,
  },
  streamq: {
    key: 'streamq',
    category: 'fullstack',
    technologies: ['Python', 'Tkinter', 'yt-dlp', 'FFmpeg', 'Threading', 'GUI Development'],
    links: { github: 'https://github.com/ivanerror/StreamQ' },
    imagePath: '/projects/streamq.svg',
    order: 5,
  },
}

async function readMessages(dir) {
  const full = path.resolve(process.cwd(), dir)
  const files = fs.readdirSync(full).filter((f) => f.endsWith('.json'))
  const out = []
  for (const file of files) {
    const locale = path.basename(file, '.json')
    const txt = fs.readFileSync(path.join(full, file), 'utf8')
    try {
      const json = JSON.parse(txt)
      out.push({locale, json})
    } catch (e) {
      console.warn(`Skipping ${file}: invalid JSON`)
    }
  }
  return out
}

function mkSlugFromKey(key) {
  return key.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

async function seed() {
  const messages = await readMessages('messages')
  if (!messages.length) {
    console.error('No messages/*.json found. Nothing to seed.')
    process.exit(1)
  }
  let created = 0
  for (const {locale, json} of messages) {
    const projectTexts = json?.projects?.projects
    if (!projectTexts) continue
    for (const [textKey, base] of Object.entries(baseMap)) {
      const t = projectTexts[textKey]
      if (!t) continue
      const idKey = base.key || textKey
      const _id = `project.${idKey}.${locale}`
      let imageField = undefined
      if (base.imagePath) {
        const abs = path.resolve(process.cwd(), 'public', base.imagePath.replace(/^\//, ''))
        if (fs.existsSync(abs)) {
          try {
            const asset = await client.assets.upload('image', fs.createReadStream(abs))
            imageField = { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, alt: t.title }
          } catch (e) {
            console.warn(`Image upload failed for ${abs}:`, e?.message || e)
          }
        }
      }
      const doc = {
        _id,
        _type: 'project',
        title: t.title,
        description: t.description,
        category: base.category,
        technologies: base.technologies,
        achievements: Array.isArray(t.achievements) ? t.achievements : [],
        links: base.links,
        order: base.order,
        locale,
        slug: { current: mkSlugFromKey(idKey) },
        ...(imageField ? { image: imageField } : {}),
      }
      await client.createOrReplace(doc)
      console.log(`Upserted ${_id}`)
      created++
    }
  }
  if (created === 0) {
    console.warn('No matching projects found to seed. Check messages structure.')
  } else {
    console.log(`Done. Upserted ${created} documents.`)
  }
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
