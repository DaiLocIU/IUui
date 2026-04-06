/**
 * Allowed ARIA roles per BaseButton display mode.
 *
 * block mode: div-based full press area via WebPressable
 * inline mode: span/div-based inline press area via PressableText
 *
 * Meta behavior: block mode does not accept "link" and falls back to "button".
 */

export const BLOCK_ALLOWED_ROLES = new Set([
  'menuitem',
  'menuitemradio',
  'none',
  'gridcell',
  'switch',
  'combobox',
  'checkbox',
  'tab',
  'radio',
  'option',
] as const)

export const INLINE_ALLOWED_ROLES = new Set([
  'combobox',
  'menuitem',
  'menuitemcheckbox',
  'menuitemradio',
  'option',
  'none',
  'link',
  'tab',
] as const)

export const DEFAULT_ROLE = 'button' as const
