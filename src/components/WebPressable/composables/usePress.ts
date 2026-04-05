// React source: ReactPressEvent.react — usePress (p function)

import { onUnmounted, watch, type Ref } from 'vue'

import { createEventHandle } from '../utils/eventHandle'
import {
  hasHookPropagationStopped,
  stopHookPropagation,
} from '../utils/hookPropagation'
import {
  createPressEvent,
  hasPointerEvents,
  isMac,
} from '../utils/pressable.utils'
import type { PressEvent, PressStateRef } from '../types'

interface UsePressOptions {
  disabled: Ref<boolean>
  onPressChange?: (pressed: boolean) => void
  onPressEnd?: (e: PressEvent) => void
  onPressMove?: (e: PressEvent) => void
  onPressStart?: (e: PressEvent) => void
}

/**
 * React: usePress (p) in ReactPressEvent.react
 */
export function usePress(
  elementRef: Ref<HTMLElement | null>,
  options: UsePressOptions,
): void {
  const pressState: PressStateRef = {
    isPressed: false,
    isPressActive: false,
    pointerId: null,
    bounds: null,
    pointerType: '',
    buttons: 0,
    activationEvent: null,
  }

  const pointerdownHandle = createEventHandle('pointerdown')
  const mousedownHandle = createEventHandle('mousedown')
  const focusoutHandle = createEventHandle('focusout', { passive: true })
  const docPointerupHandle = createEventHandle('pointerup', { passive: true })
  const docPointermoveHandle = createEventHandle('pointermove', { passive: true })
  const docPointercancelHandle = createEventHandle('pointercancel', { passive: true })
  const docMouseupHandle = createEventHandle('mouseup', { passive: true })
  const docMousemoveHandle = createEventHandle('mousemove', { passive: true })
  const docDragstartHandle = createEventHandle('dragstart', { passive: true })

  watch(
    elementRef,
    (element, _previousElement, onCleanup) => {
      if (element == null) {
        return
      }

      const detachDocumentListeners = (): void => {
        docPointerupHandle.setListener(document, null)
        docPointermoveHandle.setListener(document, null)
        docPointercancelHandle.setListener(document, null)
        docMouseupHandle.setListener(document, null)
        docMousemoveHandle.setListener(document, null)
        docDragstartHandle.setListener(document, null)
      }

      const deactivatePress = (e: PointerEvent | MouseEvent): void => {
        if (!pressState.isPressed) {
          return
        }

        pressState.isPressed = false
        options.onPressEnd?.(
          createPressEvent(
            'pressend',
            pressState.buttons,
            pressState.pointerType,
            e,
            element,
          ),
        )
        options.onPressChange?.(false)
      }

      const cancelPress = (e: PointerEvent | MouseEvent): void => {
        pressState.isPressActive = false
        pressState.bounds = null
        pressState.activationEvent = null
        deactivatePress(e)
        detachDocumentListeners()
      }

      const attachDocumentListeners = (): void => {
        if (hasPointerEvents) {
          docPointerupHandle.setListener(document, (e: Event) =>
            cancelPress(e as PointerEvent))
          docPointermoveHandle.setListener(document, (e: Event) =>
            handleMove(e as PointerEvent))
          docPointercancelHandle.setListener(document, (e: Event) =>
            cancelPress(e as PointerEvent))
          return
        }

        docMouseupHandle.setListener(document, (e: Event) =>
          cancelPress(e as MouseEvent))
        docMousemoveHandle.setListener(document, (e: Event) =>
          handleMove(e as MouseEvent))
        docDragstartHandle.setListener(document, (e: Event) =>
          cancelPress(e as MouseEvent))
      }

      const activatePress = (e: PointerEvent | MouseEvent): void => {
        if (pressState.isPressed) {
          return
        }

        const pointerEvent = e as PointerEvent
        const pointerId = pointerEvent.pointerId
        const pointerType = pointerEvent.pointerType || 'mouse'

        pressState.isPressed = true
        pressState.isPressActive = true
        pressState.pointerId = pointerId !== undefined ? pointerId : null
        pressState.pointerType = pointerType
        pressState.activationEvent = e

        if (pointerType !== 'mouse') {
          pressState.bounds = element.getBoundingClientRect()
        }

        options.onPressStart?.(
          createPressEvent('pressstart', pressState.buttons, pointerType, e, element),
        )
        options.onPressChange?.(true)

        attachDocumentListeners()
      }

      const handleMove = (e: PointerEvent | MouseEvent): void => {
        if (options.disabled.value) {
          cancelPress(e)
          return
        }

        if (!pressState.isPressActive) {
          return
        }

        const pointerType = pressState.pointerType
        const wasPressed = pressState.isPressed
        let inBounds = false

        if (pointerType === 'mouse') {
          inBounds = element.contains(e.target as Node)
        } else {
          const pointerEvent = e as PointerEvent
          const bounds = pressState.bounds

          if (pointerEvent.pointerId !== pressState.pointerId || bounds === null) {
            return
          }

          const { clientX, clientY } = pointerEvent
          inBounds =
            clientX >= bounds.left
            && clientX <= bounds.right
            && clientY >= bounds.top
            && clientY <= bounds.bottom
        }

        if (inBounds) {
          if (wasPressed) {
            options.onPressMove?.(
              createPressEvent('pressmove', pressState.buttons, pointerType, e, element),
            )
          } else {
            activatePress(e)
          }

          return
        }

        if (wasPressed) {
          deactivatePress(e)
        }
      }

      const handlePointerDown = (e: PointerEvent | MouseEvent): void => {
        if (options.disabled.value) {
          cancelPress(e)
          return
        }

        if (hasHookPropagationStopped(e, 'usePress')) {
          return
        }

        stopHookPropagation(e, 'usePress')

        const pointerEvent = e as PointerEvent

        if (
          e.buttons === 2
          || e.buttons > 4
          || (isMac && pointerEvent.pointerType === 'mouse' && e.ctrlKey)
        ) {
          return
        }

        pressState.buttons = e.buttons

        if ((e as MouseEvent).button === 1) {
          pressState.buttons = 4
        }

        activatePress(e)
      }

      if (hasPointerEvents) {
        pointerdownHandle.setListener(element, (e: Event) =>
          handlePointerDown(e as PointerEvent))
      } else {
        mousedownHandle.setListener(element, (e: Event) =>
          handlePointerDown(e as MouseEvent))
      }

      focusoutHandle.setListener(element, (e: Event) => {
        const activationEvent = pressState.activationEvent

        if (e.target === element && activationEvent !== null) {
          cancelPress(activationEvent)
        }
      })

      if (pressState.isPressActive) {
        attachDocumentListeners()
      }

      onCleanup(() => {
        if (pressState.activationEvent !== null) {
          cancelPress(pressState.activationEvent)
        }

        detachDocumentListeners()
        pointerdownHandle.setListener(element, null)
        mousedownHandle.setListener(element, null)
        focusoutHandle.setListener(element, null)
      })
    },
    {
      immediate: true,
      flush: 'post',
    },
  )

  onUnmounted(() => {
    pointerdownHandle.clear()
    mousedownHandle.clear()
    focusoutHandle.clear()
    docPointerupHandle.clear()
    docPointermoveHandle.clear()
    docPointercancelHandle.clear()
    docMouseupHandle.clear()
    docMousemoveHandle.clear()
    docDragstartHandle.clear()
  })
}
