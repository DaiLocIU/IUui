// React source: ReactHoverEvent.react — useHover (_ function)

import { onUnmounted, watch, type Ref } from 'vue'

import { createEventHandle } from '../utils/eventHandle'
import {
  hasHookPropagationStopped,
  stopHookPropagation,
} from '../utils/hookPropagation'
import {
  createHoverEvent,
  hasPointerEvents,
} from '../utils/pressable.utils'
import type { HoverEvent, HoverStateRef } from '../types'

interface UseHoverOptions {
  disabled: Ref<boolean>
  onHoverChange?: (hovered: boolean) => void
  onHoverEnd?: (e: HoverEvent) => void
  onHoverMove?: (e: HoverEvent) => void
  onHoverStart?: (e: HoverEvent) => void
}

const HOVER_TARGET_MARKER = '_hoverEventTarget'

function isStillWithinHoverTarget(
  element: HTMLElement,
  relatedTarget: EventTarget | null,
): boolean {
  let node = relatedTarget as HTMLElement | null

  while (node != null) {
    if (node === element) {
      return true
    }

    if ((node as HTMLElement & { [HOVER_TARGET_MARKER]?: boolean })[HOVER_TARGET_MARKER] != null) {
      return false
    }

    node = node.parentNode as HTMLElement | null
  }

  return false
}

/**
 * React: useHover (_) in ReactHoverEvent.react
 */
export function useHover(
  elementRef: Ref<HTMLElement | null>,
  options: UseHoverOptions,
): void {
  const hoverState: HoverStateRef = {
    isHovered: false,
    isTouched: false,
  }

  const touchstartHandle = createEventHandle('touchstart', { passive: true })
  const mouseoverHandle = createEventHandle('mouseover', { passive: true })
  const mouseoutHandle = createEventHandle('mouseout', { passive: true })
  const mousemoveHandle = createEventHandle('mousemove', { passive: true })
  const pointeroverHandle = createEventHandle('pointerover', { passive: true })
  const pointeroutHandle = createEventHandle('pointerout', { passive: true })
  const pointermoveHandle = createEventHandle('pointermove', { passive: true })
  const pointercancelHandle = createEventHandle('pointercancel', { passive: true })

  watch(
    elementRef,
    (element, previousElement, onCleanup) => {
      if (previousElement != null) {
        delete (previousElement as HTMLElement & { [HOVER_TARGET_MARKER]?: boolean })[HOVER_TARGET_MARKER]
      }

      if (element == null) {
        return
      }

      ;(element as HTMLElement & { [HOVER_TARGET_MARKER]?: boolean })[HOVER_TARGET_MARKER] = true

      const detachDocumentListeners = (): void => {
        pointermoveHandle.setListener(document, null)
        pointercancelHandle.setListener(document, null)
        pointeroutHandle.setListener(document, null)
        mousemoveHandle.setListener(document, null)
        mouseoutHandle.setListener(document, null)
      }

      const handleEnd = (e: PointerEvent | MouseEvent): void => {
        const relatedTarget = e.relatedTarget

        if (hoverState.isHovered && !isStillWithinHoverTarget(element, relatedTarget)) {
          hoverState.isHovered = false
          options.onHoverEnd?.(createHoverEvent('hoverend', e, element))
          options.onHoverChange?.(false)
          handleCancel(e)
        }
      }

      const handleCancel = (e: PointerEvent | MouseEvent): void => {
        hoverState.isTouched = false
        detachDocumentListeners()
        handleEnd(e)
      }

      const handleMove = (e: PointerEvent | MouseEvent): void => {
        hoverState.isTouched = false

        if (options.disabled.value) {
          handleCancel(e)
          return
        }

        if (hoverState.isHovered && options.onHoverMove != null) {
          options.onHoverMove(createHoverEvent('hovermove', e, element))
        }
      }

      const attachDocumentListeners = (): void => {
        if (hasPointerEvents) {
          pointermoveHandle.setListener(document, (e: Event) =>
            handleMove(e as PointerEvent))
          pointercancelHandle.setListener(document, (e: Event) =>
            handleCancel(e as PointerEvent))
          pointeroutHandle.setListener(document, (e: Event) =>
            handleEnd(e as PointerEvent))
          return
        }

        mouseoutHandle.setListener(document, (e: Event) =>
          handleEnd(e as MouseEvent))
      }

      const handleStart = (e: PointerEvent | MouseEvent): void => {
        if (options.disabled.value) {
          handleCancel(e)
          return
        }

        if (hasHookPropagationStopped(e, 'useHover')) {
          return
        }

        stopHookPropagation(e, 'useHover')

        if (!hoverState.isHovered && !isStillWithinHoverTarget(element, e.relatedTarget)) {
          hoverState.isHovered = true
          options.onHoverStart?.(createHoverEvent('hoverstart', e, element))
          options.onHoverChange?.(true)

          if (hasPointerEvents) {
            attachDocumentListeners()
          } else {
            mouseoutHandle.setListener(document, (event: Event) =>
              handleEnd(event as MouseEvent))
          }
        }
      }

      if (hasPointerEvents) {
        pointeroverHandle.setListener(element, (e: Event) => {
          if ((e as PointerEvent).pointerType !== 'touch') {
            handleStart(e as PointerEvent)
          }
        })

        if (hoverState.isHovered) {
          attachDocumentListeners()
        }
      } else {
        mouseoverHandle.setListener(element, (e: Event) => {
          if (!hoverState.isTouched) {
            handleStart(e as MouseEvent)
          }
        })

        touchstartHandle.setListener(element, () => {
          hoverState.isTouched = true
        })

        mousemoveHandle.setListener(document, (e: Event) =>
          handleMove(e as MouseEvent))

        if (hoverState.isHovered) {
          mouseoutHandle.setListener(document, (e: Event) =>
            handleEnd(e as MouseEvent))
        }
      }

      onCleanup(() => {
        delete (element as HTMLElement & { [HOVER_TARGET_MARKER]?: boolean })[HOVER_TARGET_MARKER]
        detachDocumentListeners()
        touchstartHandle.setListener(element, null)
        mouseoverHandle.setListener(element, null)
        pointeroverHandle.setListener(element, null)
      })
    },
    {
      immediate: true,
      flush: 'post',
    },
  )

  onUnmounted(() => {
    pointermoveHandle.clear()
    pointercancelHandle.clear()
    pointeroutHandle.clear()
    mousemoveHandle.clear()
    mouseoutHandle.clear()
    touchstartHandle.clear()
    mouseoverHandle.clear()
    pointeroverHandle.clear()
  })
}
