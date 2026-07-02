import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured read' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group block min-w-0 overflow-hidden ${dc.surface.dark} ${dc.motion.lift}`}>
      <div className="relative min-h-[520px] p-6 sm:p-8 lg:min-h-[620px]">
        <img src={getEditablePostImage(post)} alt={post.title} className={`absolute inset-0 h-full w-full object-cover opacity-70 ${dc.motion.zoom}`} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,36,32,0.04),rgba(40,36,32,0.86))]" />
        <div className="relative z-10 flex h-full min-h-[460px] flex-col justify-end lg:min-h-[560px]">
          <span className="editable-mono inline-flex items-center gap-2 text-[0.85rem] uppercase tracking-[0.12em] text-white/82 before:h-2 before:w-2 before:rounded-[2px] before:bg-[var(--slot4-accent)]">{label}</span>
          <h3 className="editable-display mt-5 max-w-3xl text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">{post.title}</h3>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">{getEditableExcerpt(post, 190)}</p>
          <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-[6px] bg-[var(--slot4-accent)] px-5 py-3 text-sm font-semibold text-[var(--slot4-on-accent)]">
            Open <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group ${dc.layout.minRailCard} block overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}>
      <div className={`${dc.media.frame} ${dc.media.ratio}`}>
        <img src={getEditablePostImage(post)} alt={post.title} className={`absolute inset-0 h-full w-full object-cover ${dc.motion.zoom}`} />
        <span className="editable-mono absolute left-3 top-3 rounded-[6px] bg-white/90 px-2.5 py-1 text-[0.78rem] uppercase tracking-[0.1em] text-[var(--slot4-page-text)]">No. {String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="p-4">
        <p className="editable-mono text-[0.78rem] uppercase tracking-[0.1em] text-[var(--slot4-muted-text)]">{getEditableCategory(post)}</p>
        <h3 className="editable-display mt-3 line-clamp-3 text-2xl leading-[1.16] text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 120)}</p>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group block min-w-0 ${dc.surface.soft} p-5 ${dc.motion.lift}`}>
      <div className="flex items-start gap-4">
        <span className="editable-mono flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] bg-[var(--slot4-page-bg)] text-sm text-white">{index + 1}</span>
        <div className="min-w-0">
          <p className="editable-mono flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.1em] text-[var(--slot4-muted-text)]"><Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}</p>
          <h3 className="editable-display mt-2 line-clamp-2 text-xl leading-tight text-[var(--slot4-page-text)]">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 105)}</p>
        </div>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group grid min-w-0 gap-5 overflow-hidden ${dc.surface.card} p-4 ${dc.motion.lift} sm:grid-cols-[220px_minmax(0,1fr)]`}>
      <div className={`${dc.media.frame} aspect-[16/12] sm:aspect-auto sm:min-h-[190px]`}>
        <img src={getEditablePostImage(post)} alt={post.title} className={`absolute inset-0 h-full w-full object-cover ${dc.motion.zoom}`} />
      </div>
      <div className="min-w-0 p-2 sm:py-4 sm:pr-5">
        <p className="editable-mono text-[0.78rem] uppercase tracking-[0.1em] text-[var(--slot4-muted-text)]">Read {String(index + 1).padStart(2, '0')}</p>
        <h2 className="editable-display mt-3 line-clamp-3 text-2xl leading-[1.14] text-[var(--slot4-page-text)] sm:text-3xl">{post.title}</h2>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 180)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-page-text)]">Open <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}