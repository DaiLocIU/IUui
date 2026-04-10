import type { StyleCapableValue } from './resolveStyling'

export const fdsGlimmerStyles = {
  glimmer: '[background-color:var(--glimmer-base-opaque)]' satisfies StyleCapableValue,

  glimmerAnimation: [
    '[animation-name:iu-glimmer-pulse]',
    'fds-glimmer-high-contrast-animation',
    'fds-glimmer-high-contrast-surface',
  ] satisfies StyleCapableValue,
}

export default fdsGlimmerStyles
