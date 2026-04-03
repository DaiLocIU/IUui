import { ref, toValue, watch, type MaybeRefOrGetter, type Ref } from 'vue'

import { usePressEvent } from './usePressEvent'
import {
  canUseDOM,
  createHoverEvent,
  hasPointerEvents,
  isTextInputLike,
  isValidFocusVisibleKey,
  type HoverEventLike,
  type PressEventLike,
} from '../utils/webPressable'

export interface UseWebPressabilityOptions {
  disabled?: MaybeRefOrGetter<boolean>
  onBlur?: (event: FocusEvent) => void
  onContextMenu?: (event: MouseEvent) => void
  onFocus?: (event: FocusEvent) => void
  onFocusChange?: (value: boolean) => void
  onFocusVisibleChange?: (value: boolean) => void
  onHoverChange?: (value: boolean) => void
  onHoverEnd?: (event: HoverEventLike) => void
  onHoverMove?: (event: HoverEventLike) => void
  onHoverStart?: (event: HoverEventLike) => void
  onPressChange?: (value: boolean) => void
  onPressEnd?: (event: PressEventLike) => void
  onPressMove?: (event: PressEventLike) => void
  onPressStart?: (event: PressEventLike) => void
  preventContextMenu?: boolean
}

const HOVER_EVENT_TARGET = '__web_pressable_hover_target__'
const PASSIVE_OPTIONS: AddEventListenerOptions = { passive: true }

let isFocusVisibleByKeyboard = true
let focusListenersAttached = false

export const getGlobalFocusVisible = (): boolean => isFocusVisibleByKeyboard

const isDisabled = (disabled: UseWebPressabilityOptions['disabled']): boolean =>
  disabled == null ? false : toValue(disabled)

const isWithinHoverBoundary = (
  currentTarget: HTMLElement,
  relatedTarget: EventTarget | null,
): boolean => {
  let node = relatedTarget instanceof Node ? relatedTarget : null

  while (node != null) {
    if (node === currentTarget) {
      return true
    }

    if (
      node instanceof HTMLElement &&
      (node as HTMLElement & Record<string, unknown>)[HOVER_EVENT_TARGET] != null
    ) {
      return false
    }

    node = node.parentNode
  }

  return false
}

const ensureFocusVisibleListeners = (): void => {
  if (!canUseDOM || focusListenersAttached) {
    return
  }

  focusListenersAttached = true

  const trackedEvents = hasPointerEvents
    ? ['keydown', 'pointermove', 'pointerdown', 'pointerup']
    : ['keydown', 'mousedown', 'mousemove', 'mouseup', 'touchmove', 'touchstart', 'touchend']

  trackedEvents.forEach((eventName) => {
    window.addEventListener(
      eventName,
      (event) => {
        if (event.type === 'keydown') {
          const keyboardEvent = event as KeyboardEvent

          if (isValidFocusVisibleKey(keyboardEvent)) {
            isFocusVisibleByKeyboard = true
          }

          return
        }

        const target = event.target

        if (target instanceof HTMLElement && target.nodeName !== 'HTML') {
          isFocusVisibleByKeyboard = false
        }
      },
      true,
    )
  })
}

export function useWebPressability(
  targetRef: Ref<HTMLElement | null>,
  options: UseWebPressabilityOptions,
) {
  const focused = ref(false)
  const focusVisible = ref(false)
  const hovered = ref(false)

  ensureFocusVisibleListeners()

  const { pressed } = usePressEvent(targetRef, {
    disabled: options.disabled,
    onPressChange: options.onPressChange,
    onPressEnd: options.onPressEnd,
    onPressMove: options.onPressMove,
    onPressStart: options.onPressStart,
  })

  watch(
    targetRef,
    (element, _previousElement, onCleanup) => {
      if (!canUseDOM || element == null) {
        return
      }

      ;(element as HTMLElement & Record<string, unknown>)[HOVER_EVENT_TARGET] = true

      const cleanupFns: Array<() => void> = []
      const hoverCleanupFns: Array<() => void> = []

      const addCleanup = (
        target: EventTarget,
        eventName: string,
        listener: EventListener,
        options?: AddEventListenerOptions | boolean,
      ): void => {
        target.addEventListener(eventName, listener, options)
        cleanupFns.push(() =>
          target.removeEventListener(
            eventName,
            listener,
            typeof options === 'boolean' ? options : options?.capture,
          ),
        )
      }

      const setFocusVisible = (nextValue: boolean): void => {
        if (focusVisible.value === nextValue) {
          return
        }

        focusVisible.value = nextValue
        options.onFocusVisibleChange?.(nextValue)
      }

      const blurListener = (event: FocusEvent): void => {
        if (isDisabled(options.disabled) || !focused.value) {
          return
        }

        focused.value = false
        options.onBlur?.(event)
        options.onFocusChange?.(false)

        if (focusVisible.value) {
          setFocusVisible(false)
        }

        focusVisible.value = isFocusVisibleByKeyboard
      }

      const focusListener = (event: FocusEvent): void => {
        if (isDisabled(options.disabled) || event.target !== element) {
          return
        }

        if (!focused.value) {
          focused.value = true
          focusVisible.value = isFocusVisibleByKeyboard
          options.onFocus?.(event)
          options.onFocusChange?.(true)

          if (focusVisible.value) {
            options.onFocusVisibleChange?.(true)
          }
        }
      }

      const updateFocusVisibilityFromKeyboard = (event: KeyboardEvent | MouseEvent | PointerEvent | TouchEvent): void => {
        if (event.type === 'keydown') {
          const keyboardEvent = event as KeyboardEvent

          if (
            isValidFocusVisibleKey(keyboardEvent) &&
            !isTextInputLike(keyboardEvent) &&
            focused.value
          ) {
            setFocusVisible(true)
          }

          return
        }

        if (focused.value) {
          setFocusVisible(false)
        } else {
          isFocusVisibleByKeyboard = false
        }
      }

      const focusVisibilityEvents = hasPointerEvents
        ? ['mousedown', 'pointerdown', 'keydown']
        : ['mousedown', 'touchstart', 'keydown']

      focusVisibilityEvents.forEach((eventName) => {
        addCleanup(
          element,
          eventName,
          updateFocusVisibilityFromKeyboard as EventListener,
          PASSIVE_OPTIONS,
        )
      })

      addCleanup(element, 'focusin', focusListener as EventListener, PASSIVE_OPTIONS)
      addCleanup(element, 'focusout', blurListener as EventListener, PASSIVE_OPTIONS)

      let isTouched = false

      const addHoverCleanup = (
        target: EventTarget,
        eventName: string,
        listener: EventListener,
        options?: AddEventListenerOptions | boolean,
      ): void => {
        target.addEventListener(eventName, listener, options)
        hoverCleanupFns.push(() =>
          target.removeEventListener(
            eventName,
            listener,
            typeof options === 'boolean' ? options : options?.capture,
          ),
        )
      }

      const clearHoverListeners = (): void => {
        while (hoverCleanupFns.length > 0) {
          hoverCleanupFns.pop()?.()
        }
      }

      const hoverEnd = (event: MouseEvent | PointerEvent): void => {
        if (!hovered.value || isWithinHoverBoundary(element, event.relatedTarget)) {
          return
        }

        hovered.value = false
        options.onHoverEnd?.(createHoverEvent('hoverend', event, element))
        options.onHoverChange?.(false)
        clearHoverListeners()
      }

      const hoverMove = (event: MouseEvent | PointerEvent): void => {
        isTouched = false

        if (isDisabled(options.disabled)) {
          hoverEnd(event)
          return
        }

        if (hovered.value) {
          options.onHoverMove?.(createHoverEvent('hovermove', event, element))
        }
      }

      const hoverStart = (event: MouseEvent | PointerEvent): void => {
        if (isDisabled(options.disabled) || hovered.value) {
          return
        }

        if (isWithinHoverBoundary(element, event.relatedTarget)) {
          return
        }

        hovered.value = true
        options.onHoverStart?.(createHoverEvent('hoverstart', event, element))
        options.onHoverChange?.(true)

        if (hasPointerEvents) {
          addHoverCleanup(document, 'pointermove', hoverMove as EventListener, PASSIVE_OPTIONS)
          addHoverCleanup(document, 'pointercancel', hoverEnd as EventListener, PASSIVE_OPTIONS)
          addHoverCleanup(document, 'pointerout', hoverEnd as EventListener, PASSIVE_OPTIONS)
        } else {
          addHoverCleanup(document, 'mouseout', hoverEnd as EventListener, PASSIVE_OPTIONS)
        }
      }

      if (hasPointerEvents) {
        addCleanup(
          element,
          'pointerover',
          ((event: PointerEvent) => {
            if (event.pointerType !== 'touch') {
              hoverStart(event)
            }
          }) as EventListener,
          PASSIVE_OPTIONS,
        )
      } else {
        addCleanup(
          element,
          'mouseover',
          ((event: MouseEvent) => {
            if (!isTouched) {
              hoverStart(event)
            }
          }) as EventListener,
          PASSIVE_OPTIONS,
        )
        addCleanup(
          element,
          'touchstart',
          (() => {
            isTouched = true
          }) as EventListener,
          PASSIVE_OPTIONS,
        )
        addCleanup(document, 'mousemove', hoverMove as EventListener, PASSIVE_OPTIONS)
      }

      const contextMenuListener = (event: MouseEvent): void => {
        if (isDisabled(options.disabled)) {
          return
        }

        if (options.preventContextMenu !== false && !event.defaultPrevented) {
          event.preventDefault()
        }

        options.onContextMenu?.(event)
      }

      addCleanup(element, 'contextmenu', contextMenuListener as EventListener)

      onCleanup(() => {
        clearHoverListeners()
        while (cleanupFns.length > 0) {
          cleanupFns.pop()?.()
        }

        if (focused.value) {
          focused.value = false
          options.onFocusChange?.(false)
          if (focusVisible.value) {
            options.onFocusVisibleChange?.(false)
          }
        }

        hovered.value = false
      })
    },
    { immediate: true },
  )

  return {
    focused,
    focusVisible,
    hovered,
    pressed,
  }
}
