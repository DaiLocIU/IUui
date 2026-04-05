// React source: useWebPressableTouchStartHandler

import { onUnmounted, watch, type Ref } from 'vue'

import { isInDocument, isSafari } from '../utils/pressable.utils'
import type { PressableGroupContext } from '../types'

/**
 * React: d — Safari webkit-user-select fix.
 * Momentarily disables text selection on touchstart and self-removes on touchend.
 */
function applySafariUserSelectFix(): (() => void) | undefined {
  const body = window.document?.body

  if (body == null) {
    return undefined
  }

  body.style.webkitUserSelect = 'none'

  const cleanup = (): void => {
    body.style.webkitUserSelect = ''
    document.removeEventListener('touchend', cleanup, true)
  }

  document.addEventListener('touchend', cleanup, true)
  return cleanup
}

/**
 * React: m(elementRef, groupContext, clickHandler)
 */
export function useTouchStartHandler(
  elementRef: Ref<HTMLElement | null>,
  groupContext: PressableGroupContext | null,
  clickHandler: Ref<(e: Event) => void>,
): void {
  if (groupContext == null && !isSafari) {
    return
  }

  let safariCleanup: (() => void) | undefined

  watch(
    [elementRef, clickHandler],
    ([element, handler], _previousValue, onCleanup) => {
      const body = window.document?.body

      if (
        element == null
        || body == null
        || typeof element.addEventListener !== 'function'
        || !isInDocument(element)
      ) {
        return
      }

      let groupHandler: ((e: TouchEvent) => void) | null = null

      if (groupContext != null) {
        groupContext.register(element, handler)
        groupHandler = (e: TouchEvent) => {
          e.preventDefault()
          groupContext.onTouchStart()
        }
      }

      const touchStartHandler = groupHandler != null || isSafari
        ? (e: TouchEvent) => {
            groupHandler?.(e)
            safariCleanup = isSafari ? applySafariUserSelectFix() : undefined
          }
        : null

      const listenerOptions = touchStartHandler == null
        ? null
        : { passive: groupContext == null }

      if (touchStartHandler != null && listenerOptions != null) {
        element.addEventListener('touchstart', touchStartHandler as EventListener, listenerOptions)
      }

      onCleanup(() => {
        safariCleanup?.()
        safariCleanup = undefined
        groupContext?.unRegister(element)

        if (touchStartHandler != null && listenerOptions != null) {
          element.removeEventListener(
            'touchstart',
            touchStartHandler as EventListener,
            false,
          )
        }
      })
    },
    {
      immediate: true,
      flush: 'post',
    },
  )

  onUnmounted(() => {
    safariCleanup?.()
    safariCleanup = undefined
  })
}
