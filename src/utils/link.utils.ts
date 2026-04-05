import type { Ref } from 'vue'

export interface LinkAnalysis {
  isExternal: boolean
  isRelative: boolean
  isTrusted: boolean
  protocol: string
  shouldOpenNewTab: boolean
}

const TRUSTED_DOMAINS = new Set([
  'yourdomain.com',
  'cdn.yourdomain.com',
])

const FALLBACK_ANALYSIS: LinkAnalysis = {
  isExternal: false,
  isRelative: true,
  isTrusted: true,
  protocol: '',
  shouldOpenNewTab: false,
}

const isRelativeHref = (href: string): boolean =>
  href.startsWith('/')
  || href.startsWith('.')
  || href.startsWith('#')
  || href.startsWith('?')

export function analyzeHref(href: string | undefined | null): LinkAnalysis {
  if (href == null || href === '' || href === '#') {
    return FALLBACK_ANALYSIS
  }

  if (isRelativeHref(href)) {
    return FALLBACK_ANALYSIS
  }

  try {
    const baseOrigin =
      typeof window !== 'undefined' && window.location != null
        ? window.location.origin
        : 'http://localhost'
    const currentHostname =
      typeof window !== 'undefined' && window.location != null
        ? window.location.hostname
        : 'localhost'
    const url = new URL(href, baseOrigin)
    const protocol = url.protocol
    const isExternal = url.hostname !== currentHostname
    const isTrusted = !isExternal || TRUSTED_DOMAINS.has(url.hostname)

    return {
      isExternal,
      isRelative: false,
      isTrusted,
      protocol,
      shouldOpenNewTab: isExternal,
    }
  } catch {
    return FALLBACK_ANALYSIS
  }
}

export function buildRelAttribute(args: {
  isExternal: boolean
  target: string | undefined
  rel?: string | string[]
  noReferrer?: boolean
}): string | undefined {
  const parts = new Set(
    Array.isArray(args.rel)
      ? args.rel
      : (args.rel ?? '').split(' ').filter(Boolean),
  )

  if (args.isExternal) {
    parts.add('nofollow')
  }

  if (args.target === '_blank') {
    parts.add('noopener')

    if (args.noReferrer !== false) {
      parts.add('noreferrer')
    }
  }

  const rel = [...parts].join(' ')
  return rel === '' ? undefined : rel
}
