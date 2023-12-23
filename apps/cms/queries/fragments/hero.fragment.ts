import { q, InferType } from 'groqd'
import { marked } from 'marked'
import { links } from '../fragments/link.fragment'

export const heroFragment = q('hero').grab$({
  heading: q.string().transform((s) => marked.parseInline(s)),
  links: links.nullable(),
})

export type HeroFragment = InferType<typeof heroFragment>
