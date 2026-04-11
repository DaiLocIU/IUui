import { computed } from 'vue';

/**
 * Mapping of Comet icon color tokens to their respective CSS variables or values.
 * This mirrors the mapping provided in the original `useCometIconColors.js`.
 */
export const IconColorMap = {
  'active-tab': 'var(--primary-button-background)',
  baseCherry: 'var(--base-cherry)',
  baseLemon: 'var(--base-lemon)',
  baseLime: 'var(--base-lime)',
  black: 'var(--always-black)',
  blueLink: 'var(--blue-link)',
  disabled: 'var(--disabled-icon)',
  'fb-logo': 'var(--fb-logo)',
  'fb-wordmark': 'var(--fb-wordmark)',
  highlight: 'var(--accent)',
  'inactive-tab': 'var(--secondary-icon)',
  negative: 'var(--negative)',
  none: 'transparent',
  placeholder: 'var(--placeholder-icon)',
  positive: 'var(--positive)',
  primary: 'var(--primary-icon)',
  primaryAccent: 'var(--accent)',
  primaryButtonIconOnColor: 'var(--primary-button-icon-on-color)',
  primaryButtonIconOnMedia: 'var(--primary-button-icon-on-media)',
  primaryDeemphasizedButtonIcon: 'var(--primary-deemphasized-button-icon)',
  primaryIconOnMedia: 'var(--primary-icon-on-media)',
  'rating-star-active': 'var(--rating-star-active)',
  'rating-star-active-on-color': 'var(--rating-star-active-on-color)',
  'rating-star-active-on-media': 'var(--rating-star-active-on-media)',
  secondary: 'var(--secondary-icon)',
  secondaryButtonIconOnMedia: 'var(--secondary-button-icon-on-media)',
  secondaryIconOnColor: 'var(--secondary-icon-on-color)',
  secondaryIconOnMedia: 'var(--secondary-icon-on-media)',
  tertiary: 'var(--placeholder-icon)',
  warning: 'var(--warning)',
  white: 'var(--always-white)',
  'work-iris': 'var(--wig-iris-100)',
} as const;

export type IconColorToken = keyof typeof IconColorMap;

/**
 * Composable that returns the icon color mapping.
 * mirrors Facebook's `useCometIconColors.js`.
 */
export function useCometIconColors() {
  return IconColorMap;
}
