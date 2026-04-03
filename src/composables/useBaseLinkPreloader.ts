import { onBeforeUnmount } from 'vue'

const AGGRESSIVE_DELAY_MS = 80

export type PreloaderKind = 'button' | 'button_aggressive'

export interface UseBaseLinkPreloaderOptions {
  kind: PreloaderKind
  onHighIntent?: () => void
  onHoverIn?: () => void
  onHoverOut?: () => void
  onPressIn?: () => void
  onFocusIn?: () => void
  onFocusOut?: () => void
}

export const useBaseLinkPreloader = ({
  kind,
  onHighIntent,
  onHoverIn,
  onHoverOut,
  onPressIn,
  onFocusIn,
  onFocusOut,
}: UseBaseLinkPreloaderOptions) => {
  let aggressiveTimer: number | null = null

  const clearAggressiveTimer = (): void => {
    if (aggressiveTimer != null) {
      window.clearTimeout(aggressiveTimer)
      aggressiveTimer = null
    }
  }

  const onFocusInPreloader = (): void => {
    onFocusIn?.()
  }

  const onFocusOutPreloader = (): void => {
    clearAggressiveTimer()
    onFocusOut?.()
  }

  const onHighIntentPreloader = (): void => {
    onHighIntent?.()
  }

  const onHoverInPreloader = (): void => {
    onHoverIn?.()

    if (kind === 'button_aggressive') {
      clearAggressiveTimer()
      aggressiveTimer = window.setTimeout(() => {
        aggressiveTimer = null
        onHighIntent?.()
      }, AGGRESSIVE_DELAY_MS)
    }
  }

  const onHoverMovePreloader = (): void => undefined

  const onHoverOutPreloader = (): void => {
    clearAggressiveTimer()
    onHoverOut?.()
  }

  const onPressInPreloader = (event?: { pointerType?: string }): void => {
    if (event?.pointerType == null || event.pointerType === 'mouse') {
      onPressIn?.()
    }
  }

  onBeforeUnmount(() => {
    clearAggressiveTimer()
  })

  return {
    onFocusInPreloader,
    onFocusOutPreloader,
    onHighIntentPreloader,
    onHoverInPreloader,
    onHoverMovePreloader,
    onHoverOutPreloader,
    onPressInPreloader,
  }
}
