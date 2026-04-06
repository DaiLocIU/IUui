import type { StyleCapableValue } from '../../../utils/resolveStyling'

/**
 * Decoded from the React useCometPressableStyles Stylex class map.
 * Each entry represents one possible layer in the original 8-layer style stack.
 */
export const PRESSABLE_STYLES = {
  root: [
    '[border-start-start-radius:inherit]',
    '[border-start-end-radius:inherit]',
    '[border-end-end-radius:inherit]',
    '[border-end-start-radius:inherit]',
    'inline-flex',
    'flex-row',
    '[-webkit-user-select:none]',
    'hover:no-underline',
  ].join(' '),
  rootInline: [
    '[border-start-start-radius:inherit]',
    '[border-start-end-radius:inherit]',
    '[border-end-end-radius:inherit]',
    '[border-end-start-radius:inherit]',
    'relative',
    '[-webkit-user-select:none]',
    'hover:no-underline',
  ].join(' '),
  defaultCursor: 'cursor-default',
  expanding: 'flex',
  linkBase: 'inline-block',
  hideOutline: 'outline-none',
  focusRing: [
    '[box-shadow:var(--focus-ring-shadow-default)]',
    'outline-none',
    'cp-focus-ring',
  ].join(' '),
  focusRingInset: '[box-shadow:var(--focus-ring-shadow-inset)]',
  zIndex: 'z-[1]',
} as const satisfies Record<string, StyleCapableValue>
