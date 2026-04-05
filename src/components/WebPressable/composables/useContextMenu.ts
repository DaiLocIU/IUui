// React source: ReactContextMenuEvent.react — useContextMenu

import { onUnmounted, watch, type Ref } from 'vue'

import { createEventHandle } from '../utils/eventHandle'
import {
  hasHookPropagationStopped,
  stopHookPropagation,
} from '../utils/hookPropagation'

interface UseContextMenuOptions {
  disabled: Ref<boolean>
  /** React: ae — preventContextMenu */
  preventContextMenu: Ref<boolean>
  onContextMenu?: (e: MouseEvent) => void
}

/**
 * React: useContextMenu(elementRef, options)
 *
 * Behavior:
 * - Fires onContextMenu on right-click / long-press
 * - Calls preventDefault() unless preventContextMenu===false
 * - Respects hook propagation — inner element wins
 * - NOT passive — must be able to preventDefault
 */
export function useContextMenu(
  elementRef: Ref<HTMLElement | null>,
  options: UseContextMenuOptions,
): void {
  const handle = createEventHandle('contextmenu')

  watch(
    elementRef,
    (element, _previousElement, onCleanup) => {
      if (element == null) {
        return
      }

      handle.setListener(element, (e: Event) => {
        if (options.disabled.value) {
          return
        }

        if (hasHookPropagationStopped(e, 'useContextMenu')) {
          return
        }

        stopHookPropagation(e, 'useContextMenu')

        if (options.preventContextMenu.value !== false && !e.defaultPrevented) {
          e.preventDefault()
        }

        options.onContextMenu?.(e as MouseEvent)
      })

      onCleanup(() => {
        handle.setListener(element, null)
      })
    },
    {
      immediate: true,
      flush: 'post',
    },
  )

  onUnmounted(() => {
    handle.clear()
  })
}
