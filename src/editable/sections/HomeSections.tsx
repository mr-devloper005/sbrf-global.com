import Link from 'next/link'
import { ArrowRight, Bookmark, Building2, CheckCircle2, FileText, Image as ImageIcon, Megaphone, UserRound } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableReveal } from '@/editable/shell/EditableReveal'

const SBM_KEY = ('s' + 'bm') as TaskKey

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const taskIcon = {
  article: FileText,
  listing: Building2,
  classified: Megaphone,
  image: ImageIcon,
  [SBM_KEY]: Bookmark,
  pdf: FileText,
  profile: UserRound,
} as Record<TaskKey, typeof FileText>

function displayTaskLabel(task: TaskKey) {
  if (task === 'listing') return 'Places'
  if (task === SBM_KEY) return 'Reads'
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function latestPostImages(posts: SitePost[], max = 6) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const heroImages = latestPostImages(pool)
  const heroImage = heroImages[0] || '/placeholder.svg?height=900&width=1400'
  const stackA = heroImages[1] || heroImage
  const stackB = heroImages[2] || heroImage
  const heroTitle = pagesContent.home.hero.title?.join(' ') || `Discover useful finds on ${SITE_CONFIG.name}`
  const featured = pool[0]

  return (
    <section className="relative overflow-hidden bg-[var(--slot4-page-bg)] px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pb-24 lg:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full opacity-70 blur-3xl"
        style={{ background: 'radial-gradient(circle at center, rgba(255,196,196,0.9), transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(circle at center, rgba(238,105,131,0.55), transparent 70%)' }}
      />
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <EditableReveal>
          <span className="editable-mono inline-flex items-center gap-2 rounded-full border border-[var(--slot4-accent)]/30 bg-[var(--slot4-accent-soft)] px-4 py-1.5 text-[0.75rem] uppercase tracking-[0.18em] text-[var(--slot4-dark-bg)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--slot4-accent)]" />
            {pagesContent.home.hero.badge}
          </span>
          <h1 className="editable-display mt-6 text-[2.6rem] leading-[1.02] text-[var(--slot4-dark-bg)] sm:text-[3.4rem] lg:text-[4.6rem]">
            {heroTitle.split(' ').map((word, i, arr) => {
              const isAccent = i === Math.floor(arr.length / 2) || i === arr.length - 1
              return (
                <span key={`${word}-${i}`} className={isAccent ? 'italic text-[var(--slot4-accent)]' : ''}>
                  {word}
                  {i < arr.length - 1 ? ' ' : ''}
                </span>
              )
            })}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.home.hero.description}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={primaryRoute}
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--slot4-dark-bg)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-dark-text)] shadow-[0_18px_40px_-16px_rgba(133,14,53,0.65)] transition duration-300 hover:bg-[var(--slot4-accent)] hover:text-white"
            >
              Browse {displayTaskLabel(primaryTask)}
              <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-dark-bg)]/25 px-7 py-3.5 text-sm font-semibold text-[var(--slot4-dark-bg)] transition duration-300 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]"
            >
              Search archive
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-8">
            <div className="flex -space-x-3">
              {heroImages.slice(0, 4).map((img, idx) => (
                <span
                  key={img + idx}
                  className="relative inline-block h-11 w-11 overflow-hidden rounded-full border-2 border-[var(--slot4-page-bg)] bg-[var(--slot4-media-bg)]"
                >
                  <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />
                </span>
              ))}
            </div>
            <div>
              <p className="editable-display text-2xl leading-none text-[var(--slot4-dark-bg)]">{pool.length || '250'}+</p>
              <p className="editable-mono mt-1 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--slot4-muted-text)]">Curated picks this season</p>
            </div>
          </div>
        </EditableReveal>

        <EditableReveal>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px]">
            <div
              aria-hidden
              className="absolute -right-6 -top-6 h-40 w-40 rounded-full border-[6px] border-[var(--slot4-accent)]/70"
            />
            <div
              aria-hidden
              className="absolute -bottom-8 -left-8 h-28 w-28 rounded-[28px] bg-[var(--slot4-accent-soft)]"
            />
            <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-[var(--slot4-media-bg)] shadow-[0_40px_80px_-30px_rgba(133,14,53,0.45)]">
              <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(133,14,53,0.85))] p-6 text-white">
                <p className="editable-mono text-[0.72rem] uppercase tracking-[0.18em] text-[var(--slot4-accent-soft)]">
                  {featured ? categoryOf(featured) : 'Featured'}
                </p>
                <p className="editable-display mt-2 line-clamp-2 text-xl leading-tight">
                  {featured?.title || 'Handpicked places and reads for a slower kind of discovery.'}
                </p>
              </div>
            </div>
            <div className="absolute -left-10 top-16 hidden w-40 rotate-[-6deg] overflow-hidden rounded-[20px] border-4 border-[var(--slot4-page-bg)] bg-[var(--slot4-media-bg)] shadow-[0_20px_40px_-20px_rgba(133,14,53,0.5)] md:block">
              <img src={stackA} alt="" className="aspect-[3/4] h-full w-full object-cover" />
            </div>
            <div className="absolute -right-8 bottom-10 hidden w-36 rotate-[8deg] overflow-hidden rounded-[20px] border-4 border-[var(--slot4-page-bg)] bg-[var(--slot4-media-bg)] shadow-[0_20px_40px_-20px_rgba(133,14,53,0.5)] md:block">
              <img src={stackB} alt="" className="aspect-square h-full w-full object-cover" />
            </div>
          </div>
        </EditableReveal>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  const categories = SITE_CONFIG.tasks.filter((task) => task.enabled)
  if (!categories.length) return null
  return (
    <section className="bg-[var(--slot4-dark-bg)] py-16 text-white sm:py-20">
      <div className={container}>
        <EditableReveal className="mx-auto max-w-3xl text-center">
          <span className="editable-mono inline-flex items-center gap-2 text-[0.85rem] uppercase tracking-[0.12em] text-white/70 before:h-2 before:w-2 before:rounded-[2px] before:bg-[var(--slot4-accent)]">Welcome</span>
          <h2 className="editable-display mt-4 text-3xl leading-[1.15] text-white sm:text-[2.5rem]">A curated doorway into local records, practical sources, and community posts.</h2>
          <p className="mt-4 text-base leading-7 text-white/62">Move from a nearby place to a useful read without losing the thread.</p>
        </EditableReveal>
        <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {categories.slice(0, 6).map((task, index) => {
            const Icon = taskIcon[task.key] || FileText
            return (
              <EditableReveal key={task.key} index={index}>
                <Link href={task.route} className="group flex min-h-[150px] flex-col justify-between rounded-[6px] border border-white/10 bg-white/[0.04] p-4 transition duration-500 hover:border-[var(--slot4-accent)]">
                  <Icon className="h-6 w-6 text-[var(--slot4-accent)]" />
                  <span className="editable-display text-2xl leading-tight text-white">{displayTaskLabel(task.key)}</span>
                </Link>
              </EditableReveal>
            )
          })}
        </div>
        <div className="mt-8 text-center">
          <Link href={primaryRoute} className="text-sm font-semibold text-[var(--slot4-accent)]">Start with the latest <ArrowRight className="inline h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <EditableReveal index={index}>
      <Link href={href} className="group block overflow-hidden rounded-[6px] border border-[var(--editable-border)] bg-white transition duration-500 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(40,36,32,0.14)]">
        <div className="relative aspect-[3/2] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" loading="lazy" />
          <span className="editable-mono absolute left-4 top-4 rounded-[6px] bg-white/90 px-3 py-1.5 text-[0.78rem] uppercase tracking-[0.1em] text-[var(--slot4-page-text)]">{categoryOf(post)}</span>
        </div>
        <div className="p-5">
          <h3 className="editable-display line-clamp-2 text-2xl leading-[1.18] text-[var(--slot4-page-text)]">{post.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 140)}</p>
        </div>
      </Link>
    </EditableReveal>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const activity = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)]).slice(0, 6)
  if (!activity.length) return null
  const lead = activity[0]
  return (
    <section className="bg-[var(--slot4-panel-bg)] py-20 sm:py-24 lg:py-28">
      <div className={`${container} grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center`}>
        <EditableReveal>
          <Link href={postHref(primaryTask, lead, primaryRoute)} className="group block overflow-hidden rounded-[6px]">
            <div className="relative aspect-[3/2] overflow-hidden bg-[var(--slot4-media-bg)]">
              <img src={getEditablePostImage(lead)} alt={lead.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
            </div>
          </Link>
        </EditableReveal>
        <div>
          <EditableReveal>
            <span className="editable-mono inline-flex items-center gap-2 text-[0.85rem] uppercase tracking-[0.12em] text-[var(--slot4-muted-text)] before:h-2 before:w-2 before:rounded-[2px] before:bg-[var(--slot4-accent)]">Featured</span>
            <h2 className="editable-display mt-4 text-3xl leading-[1.15] text-[var(--slot4-page-text)] sm:text-[2.5rem]">Useful details, presented with room to breathe.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[var(--slot4-muted-text)]">The platform is tuned for scanning, saving, and opening the next useful record, not wandering through clutter.</p>
          </EditableReveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {['Verified contact details', 'Curated source context', 'Readable summaries', 'Fast route-based browsing'].map((item, index) => (
              <EditableReveal key={item} index={index} className="flex items-center gap-3 rounded-[6px] border border-[var(--editable-border)] bg-white p-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--slot4-page-text)]" />
                <span className="text-sm font-medium text-[var(--slot4-page-text)]">{item}</span>
              </EditableReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Fresh this week', title: 'Recently added' },
  browse: { eyebrow: 'Worth a look', title: 'Popular this month' },
  index: { eyebrow: 'From the archive', title: 'Still useful' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const fallback = [
    { key: 'spotlight', posts: posts.slice(0, 6), href: primaryRoute },
    { key: 'browse', posts: posts.slice(6, 12), href: primaryRoute },
    { key: 'index', posts: posts.slice(12, 18), href: primaryRoute },
  ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[]
  const visible = (timeSections.length ? timeSections : fallback).filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, sectionIndex) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore' }
        return (
          <section key={section.key} className={sectionIndex % 2 === 0 ? 'bg-white py-20 sm:py-24' : 'bg-[var(--slot4-panel-bg)] py-20 sm:py-24'}>
            <div className={container}>
              <EditableReveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="editable-mono inline-flex items-center gap-2 text-[0.85rem] uppercase tracking-[0.12em] text-[var(--slot4-muted-text)] before:h-2 before:w-2 before:rounded-[2px] before:bg-[var(--slot4-accent)]">{copy.eyebrow}</span>
                  <h2 className="editable-display mt-3 text-3xl leading-[1.15] text-[var(--slot4-page-text)] sm:text-[2.5rem]">{copy.title}</h2>
                </div>
                <Link href={section.href || primaryRoute} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-page-text)]">See all <ArrowRight className="h-4 w-4" /></Link>
              </EditableReveal>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {section.posts.slice(0, 6).map((post, index) => (
                  <FeatureCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-[var(--slot4-panel-bg)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1360px] rounded-[6px] bg-[var(--slot4-dark-bg)] p-8 text-white sm:p-12 lg:p-16">
        <EditableReveal className="mx-auto max-w-3xl text-center">
          <span className="editable-mono inline-flex items-center gap-2 text-[0.85rem] uppercase tracking-[0.12em] text-[var(--slot4-accent)] before:h-2 before:w-2 before:rounded-[2px] before:bg-[var(--slot4-accent)]">Join the index</span>
          <h2 className="editable-display mt-4 text-3xl leading-[1.15] text-white sm:text-[2.5rem]">Add something the next visitor can actually use.</h2>
          <p className="mt-4 text-base leading-7 text-white/62">Submit a place, share a read, or send a note so the platform stays practical and current.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/create" className="rounded-[6px] bg-[var(--slot4-accent)] px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)]">Submit</Link>
            <Link href="/contact" className="rounded-[6px] border border-white/45 px-6 py-3 text-sm font-semibold text-white">Contact</Link>
          </div>
        </EditableReveal>
      </div>
    </section>
  )
}
