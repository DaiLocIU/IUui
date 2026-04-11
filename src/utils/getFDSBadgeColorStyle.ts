import type { StyleCapableValue } from './resolveStyling'

export type FDSBadgeColor =
  | 'blue'
  | 'gray'
  | 'darkGray'
  | 'green'
  | 'lightBlue'
  | 'red'
  | 'yellow'

export type FDSBadgeColorVersion = 'legacy' | '1dot1'

const BADGE_COLOR_STYLES: Record<FDSBadgeColor, Record<FDSBadgeColorVersion | 'default', StyleCapableValue>> = {
  blue: {
    '1dot1': 'bg-[var(--blue-link)]',
    default: 'bg-[var(--blue-link)]',
    legacy: 'bg-[var(--accent)]',
  },
  darkGray: {
    '1dot1': 'bg-[var(--badge-background-color-dark-gray)]',
    default: 'bg-[var(--badge-background-color-dark-gray)]',
    legacy: 'bg-[var(--badge-background-color-dark-gray)]',
  },
  gray: {
    '1dot1': 'bg-[var(--divider-on-color)]',
    default: 'bg-[var(--divider-on-color)]',
    legacy: 'bg-[var(--badge-background-color-gray)]',
  },
  green: {
    '1dot1': 'bg-[var(--badge-background-color-green)]',
    default: 'bg-[var(--badge-background-color-green)]',
    legacy: 'bg-[var(--positive)]',
  },
  lightBlue: {
    '1dot1': 'bg-[var(--badge-background-color-light-blue)]',
    default: 'bg-[var(--badge-background-color-light-blue)]',
    legacy: 'bg-[var(--badge-background-color-light-blue)]',
  },
  red: {
    '1dot1': 'bg-[var(--badge-background-color-red)]',
    default: 'bg-[var(--badge-background-color-red)]',
    legacy: 'bg-[var(--badge-background-color-red)]',
  },
  yellow: {
    '1dot1': 'bg-[var(--badge-background-color-yellow)]',
    default: 'bg-[var(--badge-background-color-yellow)]',
    legacy: 'bg-[var(--badge-background-color-yellow)]',
  },
}

export interface GetFDSBadgeColorStyleOptions {
  version?: FDSBadgeColorVersion
}

export default function getFDSBadgeColorStyle(
  color: FDSBadgeColor,
  options?: GetFDSBadgeColorStyleOptions,
): StyleCapableValue {
  const version = options?.version ?? '1dot1'
  const styleByVersion = BADGE_COLOR_STYLES[color]

  if (styleByVersion == null) {
    throw new Error('Invalid color in getFDSBadgeColorStyle')
  }

  return styleByVersion[version] ?? styleByVersion.default
}
