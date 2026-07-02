import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Places, reads, and useful community posts',
      description: 'Explore local records, curated links, articles, documents, photos, and profiles through one warm discovery experience.',
      openGraphTitle: 'Places, reads, and useful community posts',
      openGraphDescription: 'Find practical local records and hand-picked links in a calmer community directory.',
      keywords: ['places', 'curated links', 'local records', 'community posts'],
    },
    hero: {
      badge: 'Welcome to the index',
      title: ['Places worth knowing.', 'Reads worth opening.'],
      description: 'Browse practical local records, curated sources, and fresh community posts through one calm, well-paced discovery surface.',
      primaryCta: { label: 'Explore Places', href: '/listing' },
      secondaryCta: { label: 'Open Reads', href: '/s' + 'bm' },
      searchPlaceholder: 'Search places, reads, topics, and posts',
      focusLabel: 'Focus',
      featureCardBadge: 'latest picks',
      featureCardTitle: 'Fresh posts shape the visual rhythm of the homepage.',
      featureCardDescription: 'Recent places and reads stay at the center without changing platform behavior.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for finding useful records and opening the right source next.',
      paragraphs: [
        'The site brings together local records, curated links, articles, photos, documents, and profiles in one connected browsing experience.',
        'Visitors can move from a place to a source, from a source to a story, and from a story to a contact without losing context.',
      ],
      sideBadge: 'At a glance',
      sidePoints: ['Clean route-based browsing.', 'Useful metadata before decoration.', 'Submission paths for fresh community posts.', 'Search that spans every active surface.'],
      primaryLink: { label: 'Browse Places', href: '/listing' },
      secondaryLink: { label: 'Open Reads', href: '/s' + 'bm' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Find a place, open a read, or add something useful.',
      description: 'Move through one connected index of local records and hand-picked sources.',
      primaryCta: { label: 'Browse Places', href: '/listing' },
      secondaryCta: { label: 'Contact', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'A calmer way to browse practical community knowledge.',
    description: `${slot4BrandConfig.siteName} helps visitors discover useful places, curated reads, articles, documents, photos, and profiles without noisy navigation.`,
    paragraphs: ['The platform keeps related content close together so discovery feels natural.', 'Every page is shaped around usefulness: clear context, simple actions, and routes that stay predictable.'],
    values: [
      { title: 'Useful first', description: 'We prioritize records, sources, and summaries people can act on quickly.' },
      { title: 'Connected surfaces', description: 'Places, reads, articles, documents, photos, and profiles stay part of one browsing rhythm.' },
      { title: 'Trust through clarity', description: 'Metadata, contact details, and source context are surfaced before decoration.' },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Tell us what you want to publish, update, or find.',
    description: 'Send a note about a place, read, correction, partnership, or publishing request.',
    formTitle: 'Send a message',
  },
  search: {
    metadata: { title: 'Search', description: 'Search places, reads, topics, and posts across the site.' },
    hero: {
      badge: 'Search the archive',
      title: 'Find places, reads, and useful posts faster.',
      description: 'Use keywords, categories, and content types to discover posts from every active section.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest searchable posts',
  },
  create: {
    metadata: { title: 'Submit', description: 'Submit new content for the site.' },
    locked: { badge: 'Member access', title: 'Sign in to submit something useful.', description: 'Use your account to open the publishing workspace and draft posts for active sections.' },
    hero: { badge: 'Publishing workspace', title: 'Submit a place, read, story, or resource.', description: 'Choose the content type, add details, and prepare a clean post with links, summary, and body content.' },
    formTitle: 'Post details', submitLabel: 'Submit post', successTitle: 'Post saved locally.',
  },
  auth: {
    login: { metadataDescription: 'Login page for this site.', badge: 'Member access', title: 'Welcome back.', description: 'Sign in to manage submissions and continue browsing.', formTitle: 'Sign in', submitLabel: 'Continue', noAccount: 'No account matched these details. Create an account first, then sign in.', success: 'Sign-in successful. Redirecting...', createCta: 'Create an account' },
    signup: { metadataDescription: 'Signup page for this site.', badge: 'Site access', title: 'Create your account.', description: 'Create an account to submit posts and manage local drafts.', formTitle: 'Create account', submitLabel: 'Create account', passwordShort: 'Use at least 4 characters for the password.', success: 'Account created successfully. Redirecting...', loginCta: 'Sign in' },
  },
  detailPages: {
    article: { relatedTitle: 'Related articles', fallbackTitle: 'Article details' },
    listing: { relatedTitle: 'More places', fallbackTitle: 'Place details' },
    image: { relatedTitle: 'Related visuals', fallbackTitle: 'Image details' },
    profile: { relatedTitle: 'Suggested profiles', fallbackDescription: 'Profile details will appear here once available.', visitButton: 'Visit official site' },
  },
} as const