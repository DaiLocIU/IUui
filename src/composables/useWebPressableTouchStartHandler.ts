import { watch, type Ref } from 'vue'

import { canUseDOM, isSafariBrowser } from '../utils/webPressable'
import type { WebPressableGroupContextValue } from '../system/webPressableKeys'

const createSafariTouchCleanup = (): (() => void) | undefined => {
  if (!isSafariBrowser()) {
    return undefined
  }

  const body = window.document?.body

  if (body == null) {
    return undefined
  }

  body.style.webkitUserSelect = 'none'

  const restore = () => {
    body.style.webkitUserSelect = ''
    document.removeEventListener('touchend', restore)
  }

  document.addEventListener('touchend', restore, { passive: true })

  return restore
}

export function useWebPressableTouchStartHandler(
  targetRef: Ref<HTMLElement | null>,
  groupContext: WebPressableGroupContextValue | undefined,
  callback: (event: MouseEvent | PointerEvent) => void,
) {
  watch(
    targetRef,
    (element, _previousElement, onCleanup) => {
      if (!canUseDOM || (!groupContext && !isSafariBrowser()) || element == null) {
        return
      }

      if (!document.contains(element)) {
        return
      }

      let safariCleanup: (() => void) | undefined

      if (groupContext != null) {
        groupContext.register(element, callback)
      }

      const touchStartListener = (event: TouchEvent) => {
        if (groupContext != null) {
          event.preventDefault()
          groupContext.onTouchStart()
        }

        safariCleanup?.()
        safariCleanup = createSafariTouchCleanup()
      }

      const touchOptions: AddEventListenerOptions = {
        passive: groupContext == null,
      }

      element.addEventListener('touchstart', touchStartListener, touchOptions)

      onCleanup(() => {
        safariCleanup?.()
        groupContext?.unRegister(element)
        element.removeEventListener(
          'touchstart',
          touchStartListener as EventListener,
          touchOptions.capture,
        )
      })
    },
    { immediate: true },
  )
}
