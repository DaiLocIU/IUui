import type { CSSProperties, StyleValue } from 'vue'

export interface LinkShimResult {
  clickIDAppended: boolean
  ghlEncrypted: boolean
  href: string | null
  shimmed: boolean
  unshimmedHref: string | null
}

export interface LinkNormalizationOptions {
  brid?: string | null
  customHash?: string | null
  disableLinkShim?: boolean
  disableLinkShimForFollowLinkButton?: boolean
  download?: boolean | string | undefined
  fbclid?: string | null
  href?: string | null
  preserveQueryInShim?: boolean
  trackingNodes?: string[]
  trackingToken?: string | null
}

const TRUSTED_HOST_PATTERNS = [
  /(^|\.)facebook\.com$/i,
  /(^|\.)messenger\.com$/i,
  /(^|\.)instagram\.com$/i,
  /(^|\.)threads\.com$/i,
  /(^|\.)meta\.(com|ai)$/i,
]

const SHIM_PATH = '/l.php'

const getBaseOrigin = (): string => {
  if (typeof window !== 'undefined' && window.location?.origin != null) {
    return window.location.origin
  }

  return 'https://example.com'
}

export const appendPersistQueryParamsToUrl = (
  href: string | null | undefined,
): string | null | undefined => href

export const parseHref = (href: string): URL | null => {
  try {
    return new URL(href, getBaseOrigin())
  } catch {
    return null
  }
}

export const isRelativeHref = (href: string): boolean =>
  href.startsWith('/') || href.startsWith('?') || href.startsWith('#')

export const isCometRouterUrl = (href: string | null | undefined): boolean => {
  if (href == null || href === '' || href === '#') {
    return false
  }

  if (isRelativeHref(href)) {
    return true
  }

  const parsed = parseHref(href)

  if (parsed == null) {
    return false
  }

  return parsed.origin === getBaseOrigin() && /^https?:$/.test(parsed.protocol)
}

export const isTrustedDestination = (value: string | URL): boolean => {
  const parsed = typeof value === 'string' ? parseHref(value) : value

  if (parsed == null) {
    return false
  }

  if (parsed.origin === getBaseOrigin()) {
    return true
  }

  return TRUSTED_HOST_PATTERNS.some((pattern) => pattern.test(parsed.hostname))
}

const isExternalHttpDestination = (parsed: URL): boolean =>
  /^https?:$/.test(parsed.protocol) && !isTrustedDestination(parsed)

const appendQueryParam = (parsed: URL, key: string, value: string | null | undefined): boolean => {
  if (value == null || value === '') {
    return false
  }

  parsed.searchParams.set(key, value)
  return true
}

export const decorateHrefWithTrackingInfo = (
  href: string | null,
  trackingNodes: string[] = [],
  encryptedClickTracking: string | null | undefined = null,
): string | null => {
  if (href == null) {
    return null
  }

  const parsed = parseHref(href)

  if (parsed == null) {
    return href
  }

  if (trackingNodes.length > 0) {
    parsed.searchParams.set('__tn__', trackingNodes.join(','))
  }

  if (encryptedClickTracking != null && encryptedClickTracking !== '') {
    parsed.searchParams.set('enc', encryptedClickTracking)
  }

  if (isRelativeHref(href)) {
    return `${parsed.pathname}${parsed.search}${parsed.hash}`
  }

  return parsed.toString()
}

export const getLinkShimInfo = ({
  brid,
  customHash,
  disableLinkShim,
  fbclid,
  href,
  preserveQueryInShim = false,
}: LinkNormalizationOptions): LinkShimResult => {
  if (href == null || href === '#') {
    return {
      clickIDAppended: false,
      ghlEncrypted: false,
      href: href ?? '#',
      shimmed: false,
      unshimmedHref: null,
    }
  }

  const parsed = parseHref(href)

  if (parsed == null) {
    return {
      clickIDAppended: false,
      ghlEncrypted: false,
      href,
      shimmed: false,
      unshimmedHref: null,
    }
  }

  const clickIDAppended =
    appendQueryParam(parsed, 'fbclid', fbclid) ||
    appendQueryParam(parsed, 'brid', brid)

  const unshimmedHref = preserveQueryInShim
    ? parsed.toString()
    : `${parsed.origin}${parsed.pathname}${parsed.search}${parsed.hash}`

  if (!isExternalHttpDestination(parsed) || disableLinkShim === true) {
    return {
      clickIDAppended,
      ghlEncrypted: parsed.searchParams.get('enc') === '1',
      href: isRelativeHref(href)
        ? `${parsed.pathname}${parsed.search}${parsed.hash}`
        : parsed.toString(),
      shimmed: false,
      unshimmedHref: null,
    }
  }

  const shimmedHref = new URL(SHIM_PATH, getBaseOrigin())
  shimmedHref.searchParams.set('u', unshimmedHref)

  if (customHash != null && customHash !== '') {
    shimmedHref.searchParams.set('h', customHash)
  }

  return {
    clickIDAppended,
    ghlEncrypted: parsed.searchParams.get('enc') === '1',
    href: `${shimmedHref.pathname}${shimmedHref.search}${shimmedHref.hash}`,
    shimmed: true,
    unshimmedHref,
  }
}

export interface DerivedRelTargetOptions {
  defaultTarget?: string | undefined
  disableLinkShimForFollowLinkButton?: boolean
  explicitRel?: string | undefined
  explicitTarget?: string | undefined
  ghlEncrypted?: boolean
  isExternalLink?: boolean
  shimmed?: boolean
}

export const deriveRelAndTarget = ({
  defaultTarget,
  disableLinkShimForFollowLinkButton,
  explicitRel,
  explicitTarget,
  ghlEncrypted = false,
  isExternalLink = false,
  shimmed = false,
}: DerivedRelTargetOptions): { rel: string | undefined; target: string | undefined } => {
  let target = explicitTarget ?? defaultTarget
  let rel = explicitRel

  const shouldOpenInBlank =
    shimmed ||
    ghlEncrypted ||
    (isExternalLink && disableLinkShimForFollowLinkButton !== true)

  if (shouldOpenInBlank) {
    target = target ?? '_blank'
  }

  const relParts = new Set((rel ?? '').split(/\s+/).filter(Boolean))

  if (shouldOpenInBlank) {
    relParts.add('nofollow')
  }

  if (target === '_blank') {
    relParts.add('noreferrer')
  }

  rel = relParts.size > 0 ? Array.from(relParts).join(' ') : undefined

  return { rel, target }
}

export const transformRelativeUri = (href: string | null | undefined): string | null => {
  if (href == null) {
    return null
  }

  const parsed = parseHref(href)

  if (parsed == null) {
    return href
  }

  if (isRelativeHref(href) || parsed.origin === getBaseOrigin()) {
    return `${parsed.pathname}${parsed.search}${parsed.hash}` || '/'
  }

  return parsed.toString()
}

export const hasModifierKey = (
  event: Pick<MouseEvent, 'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey'>,
): boolean => event.altKey || event.ctrlKey || event.metaKey || event.shiftKey

export type StyleResolverState = {
  disabled: boolean
  focusVisible: boolean
  focused: boolean
  hovered: boolean
  pressed: boolean
}

export type StateAwareStyling =
  | StyleValue
  | CSSProperties
  | string
  | Record<string, boolean>
  | Array<unknown>
  | ((state: StyleResolverState) => unknown)
