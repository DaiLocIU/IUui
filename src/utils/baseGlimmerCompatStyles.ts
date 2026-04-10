import type { StyleCapableValue } from './resolveStyling'

const DEFAULT_GLIMMER_STAGGER_MS = 200

function resolveIterationCountValue(iterationCount: number | string | null | undefined): string | number | undefined {
  return iterationCount ?? undefined
}

export const baseGlimmerCompatStyles = {
  root: [
    '[animation-direction:var(--glimmer-animation-direction)]',
    '[animation-duration:var(--glimmer-animation-duration)]',
    '[animation-iteration-count:infinite]',
    '[animation-name:iu-glimmer-pulse]',
    '[animation-timing-function:var(--glimmer-animation-timing-function)]',
    '[opacity:var(--glimmer-opacity-min)]',
  ] satisfies StyleCapableValue,

  paused: '[animation-play-state:paused]' satisfies StyleCapableValue,

  animationDelay(index: number | null | undefined): StyleCapableValue {
    const staggerIndex = ((index ?? 0) % 10 + 10) % 10

    return [
      '[animation-delay:var(--x-animationDelay)]',
      {
        '--x-animationDelay': `calc(${staggerIndex} * var(--glimmer-stagger-time, ${DEFAULT_GLIMMER_STAGGER_MS}ms))`,
      },
    ]
  },

  animationIterationCount(iterationCount: number | string | null | undefined): StyleCapableValue {
    const resolvedIterationCount = resolveIterationCountValue(iterationCount)

    if (resolvedIterationCount == null) {
      return undefined
    }

    return [
      '[animation-iteration-count:var(--x-animationIterationCount)]',
      {
        '--x-animationIterationCount': resolvedIterationCount,
      },
    ]
  },
}

export default baseGlimmerCompatStyles
