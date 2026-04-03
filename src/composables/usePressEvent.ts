import { ref, toValue, watch, type MaybeRefOrGetter, type Ref } from 'vue'

import {
  canUseDOM,
  containsNode,
  createPressEvent,
  hasPointerEvents,
  isMac,
  type PressEventLike,
} from '../utils/webPressable'

export interface UsePressEventOptions {
  disabled?: MaybeRefOrGetter<boolean>
  onPressChange?: (value: boolean) => void
  onPressEnd?: (event: PressEventLike) => void
  onPressMove?: (event: PressEventLike) => void
  onPressStart?: (event: PressEventLike) => void
}

interface PressState {
  activationEvent: MouseEvent | PointerEvent | null
  bounds: DOMRect | null
  buttons: number
  isPressActive: boolean
  isPressed: boolean
  pointerId: number | null
  pointerType: string
}

const PASSIVE_OPTIONS: AddEventListenerOptions = { passive: true }

const isPressDisabled = (disabled: UsePressEventOptions['disabled']): boolean =>
  disabled == null ? false : toValue(disabled)

export function usePressEvent(
  targetRef: Ref<HTMLElement | null>,
  options: UsePressEventOptions,
) {
  const pressed = ref(false)
  const state: PressState = {
    activationEvent: null,
    bounds: null,
    buttons: 0,
    isPressActive: false,
    isPressed: false,
    pointerId: null,
    pointerType: '',
  }

  const updatePressed = (nextValue: boolean): void => {
    if (pressed.value !== nextValue) {
      pressed.value = nextValue
    }

    options.onPressChange?.(nextValue)
  }

  const endPress = (
    event: MouseEvent | PointerEvent,
    element: HTMLElement,
  ): void => {
    if (!state.isPressed) {
      return
    }

    state.isPressed = false
    updatePressed(false)
    options.onPressEnd?.(
      createPressEvent(
        'pressend',
        state.buttons,
        state.pointerType,
        event,
        element,
      ),
    )
  }

  const detachDocumentListeners = (
    cleanupFns: Array<() => void>,
  ): void => {
    cleanupFns.splice(0).forEach((cleanup) => cleanup())
  }

  watch(
    targetRef,
    (element, _previousElement, onCleanup) => {
      if (!canUseDOM || element == null) {
        return
      }

      const cleanupFns: Array<() => void> = []

      const cleanupPress = (event: MouseEvent | PointerEvent): void => {
        state.isPressActive = false
        state.bounds = null
        state.activationEvent = null
        endPress(event, element)
        detachDocumentListeners(cleanupFns)
      }

      const activatePress = (event: MouseEvent | PointerEvent): void => {
        if (state.isPressed) {
          return
        }

        const pointerId =
          'pointerId' in event && typeof event.pointerId === 'number'
            ? event.pointerId
            : null
        const pointerType =
          'pointerType' in event && event.pointerType != null
            ? event.pointerType
            : 'mouse'

        state.isPressed = true
        state.isPressActive = true
        state.pointerId = pointerId
        state.pointerType = pointerType
        state.activationEvent = event
        state.bounds =
          pointerType !== 'mouse' ? element.getBoundingClientRect() : null

        updatePressed(true)
        options.onPressStart?.(
          createPressEvent(
            'pressstart',
            state.buttons,
            pointerType,
            event,
            element,
          ),
        )

        if (hasPointerEvents) {
          const pointerUpListener = (nextEvent: Event) =>
            cleanupPress(nextEvent as PointerEvent)
          const pointerMoveListener = (nextEvent: Event) =>
            handleMove(nextEvent as PointerEvent)
          const pointerCancelListener = (nextEvent: Event) =>
            cleanupPress(nextEvent as PointerEvent)

          document.addEventListener('pointerup', pointerUpListener, PASSIVE_OPTIONS)
          document.addEventListener(
            'pointermove',
            pointerMoveListener,
            PASSIVE_OPTIONS,
          )
          document.addEventListener(
            'pointercancel',
            pointerCancelListener,
            PASSIVE_OPTIONS,
          )

          cleanupFns.push(() =>
            document.removeEventListener('pointerup', pointerUpListener, false),
          )
          cleanupFns.push(() =>
            document.removeEventListener('pointermove', pointerMoveListener, false),
          )
          cleanupFns.push(() =>
            document.removeEventListener(
              'pointercancel',
              pointerCancelListener,
              false,
            ),
          )
        } else {
          const mouseMoveListener = (nextEvent: Event) =>
            handleMove(nextEvent as MouseEvent)
          const mouseUpListener = (nextEvent: Event) =>
            cleanupPress(nextEvent as MouseEvent)
          const dragStartListener = (nextEvent: Event) =>
            cleanupPress(nextEvent as MouseEvent)

          document.addEventListener('mousemove', mouseMoveListener, PASSIVE_OPTIONS)
          document.addEventListener('mouseup', mouseUpListener, PASSIVE_OPTIONS)
          document.addEventListener('dragstart', dragStartListener, PASSIVE_OPTIONS)

          cleanupFns.push(() =>
            document.removeEventListener('mousemove', mouseMoveListener, false),
          )
          cleanupFns.push(() =>
            document.removeEventListener('mouseup', mouseUpListener, false),
          )
          cleanupFns.push(() =>
            document.removeEventListener('dragstart', dragStartListener, false),
          )
        }
      }

      const handleMove = (event: MouseEvent | PointerEvent): void => {
        if (isPressDisabled(options.disabled)) {
          cleanupPress(event)
          return
        }

        if (!state.isPressActive) {
          return
        }

        const pointerType = state.pointerType
        const isCurrentlyPressed = state.isPressed
        let isWithinBounds = false

        if (pointerType === 'mouse') {
          isWithinBounds = containsNode(element, event.target)
        } else {
          const pointerId =
            'pointerId' in event && typeof event.pointerId === 'number'
              ? event.pointerId
              : null
          const bounds = state.bounds

          if (pointerId !== state.pointerId || bounds == null) {
            return
          }

          isWithinBounds =
            event.clientX >= bounds.left &&
            event.clientX <= bounds.right &&
            event.clientY >= bounds.top &&
            event.clientY <= bounds.bottom
        }

        if (isWithinBounds) {
          if (isCurrentlyPressed) {
            options.onPressMove?.(
              createPressEvent(
                'pressmove',
                state.buttons,
                pointerType,
                event,
                element,
              ),
            )
          } else {
            activatePress(event)
          }
        } else if (isCurrentlyPressed) {
          endPress(event, element)
        }
      }

      const handlePointerDown = (event: MouseEvent | PointerEvent): void => {
        if (isPressDisabled(options.disabled)) {
          cleanupPress(event)
          return
        }

        const pointerType =
          'pointerType' in event && event.pointerType != null
            ? event.pointerType
            : 'mouse'
        const eventButtons = event.buttons

        if (
          eventButtons === 2 ||
          eventButtons > 4 ||
          (isMac && pointerType === 'mouse' && event.ctrlKey)
        ) {
          return
        }

        state.buttons = eventButtons

        if (event.button === 1) {
          state.buttons = 4
        }

        activatePress(event)
      }

      const focusOutListener = (event: FocusEvent): void => {
        const activationEvent = state.activationEvent

        if (event.target === element && activationEvent != null) {
          cleanupPress(activationEvent)
        }
      }

      if (hasPointerEvents) {
        element.addEventListener('pointerdown', handlePointerDown as EventListener)
        cleanupFns.push(() =>
          element.removeEventListener(
            'pointerdown',
            handlePointerDown as EventListener,
          ),
        )
      } else {
        element.addEventListener('mousedown', handlePointerDown as EventListener)
        cleanupFns.push(() =>
          element.removeEventListener(
            'mousedown',
            handlePointerDown as EventListener,
          ),
        )
      }

      element.addEventListener('focusout', focusOutListener)
      cleanupFns.push(() => element.removeEventListener('focusout', focusOutListener))

      onCleanup(() => {
        const activationEvent = state.activationEvent

        if (activationEvent != null) {
          cleanupPress(activationEvent)
        } else {
          detachDocumentListeners(cleanupFns)
        }

        state.isPressed = false
        state.isPressActive = false
        state.pointerId = null
        state.bounds = null
        state.activationEvent = null
        updatePressed(false)
      })
    },
    { immediate: true },
  )

  return {
    pressed,
  }
}
