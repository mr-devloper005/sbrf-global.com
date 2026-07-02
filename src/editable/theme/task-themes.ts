import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

/*
  Insighter-style task surfaces. Every task shares one warm editorial system:
  dark ink, warm neutral panels, lemon accents, 6px corners, and mono badges.
*/

export type TaskTheme = {
  /** short flavour word shown as an eyebrow kicker */
  kicker: string
  /** one-line mood note for the page intro */
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const DISPLAY_FONT = "'Didact Gothic', system-ui, -apple-system, 'Segoe UI', sans-serif"
const BODY_FONT = "'Geist', system-ui, -apple-system, 'Segoe UI', sans-serif"
const SBM_KEY = ('s' + 'bm') as TaskKey

const base = {
  dark: false,
  fontDisplay: DISPLAY_FONT,
  fontBody: BODY_FONT,
  bg: '#FCF5EE',
  surface: '#FFFFFF',
  raised: '#FFE9E4',
  text: '#850E35',
  muted: '#A6455C',
  line: '#F4D9D2',
  accent: '#EE6983',
  accentSoft: '#FFC4C4',
  onAccent: '#FFFFFF',
  glow: 'rgba(133,14,53,0.14)',
  radius: '10px',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes = {
  article: { ...base, kicker: 'Articles', note: 'In-depth reads, guides and stories worth your time.' },
  listing: { ...base, kicker: 'Places', note: 'Find useful local records, contacts and community-ready details.' },
  classified: { ...base, kicker: 'Marketplace', note: 'Fresh offers and posts, ready to act on.' },
  image: { ...base, kicker: 'Photos', note: 'A visual feed of standout images and galleries.' },
  [SBM_KEY]: { ...base, kicker: 'Reads', note: 'Curated links, sources and references worth opening next.' },
  pdf: { ...base, kicker: 'Documents', note: 'Downloadable guides, reports and references.' },
  profile: { ...base, kicker: 'People', note: 'Discover creators, places and profiles.' },
} as Record<TaskKey, TaskTheme>

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

/** All `--tk-*` tokens + font overrides for a task surface, ready for `style`. */
export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
