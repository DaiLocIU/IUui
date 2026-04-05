// React source: ReactFocusEvent.react — useFocus (D function)

import { onUnmounted, watch, type Ref } from 'vue'

import { createEventHandle } from '../utils/eventHandle'
import {
  hasHookPropagationStopped,
  stopHookPropagation,
} from '../utils/hookPropagation'
import {
  getIsKeyboardActive,
  initKeyboardTracker,
  isNavigationKeydown,
  isTypingInTextInput,
} from '../utils/keyboardTracker'
import { hasPointerEvents } from '../utils/pressable.utils'
import type { FocusStateRef } from '../types'

interface UseFocusOptions {
  disabled: Ref<boolean>
  onFocus?: (e: FocusEvent) => void
  onBlur?: (e: FocusEvent) => void
  onFocusChange?: (focused: boolean) => void
  onFocusVisibleChange?: (visible: boolean) => void
}

/**
 * React: useFocus (D) in ReactFocusEvent.react
 */
export function useFocus(
  elementRef: Ref<HTMLElement | null>,
  options: UseFocusOptions,
): void {
  initKeyboardTracker()

  const focusState: FocusStateRef = {
    isFocused: false,
    isFocusVisible: false,
  }

  let capturedEl: HTMLElement | null = null

  const focusinHandle = createEventHandle('focusin', { passive: true })
  const focusoutHandle = createEventHandle('focusout', { passive: true })
  const mousedownHandle = createEventHandle('mousedown', { passive: true })
  const downHandle = createEventHandle(
    hasPointerEvents ? 'pointerdown' : 'touchstart',
    { passive: true },
  )
  const keydownHandle = createEventHandle('keydown', { passive: true })

  const updateFocusVisible = (nextValue: boolean): void => {
    if (focusState.isFocused && focusState.isFocusVisible !== nextValue) {
      focusState.isFocusVisible = nextValue
      options.onFocusVisibleChange?.(nextValue)
    }
  }

  const handleFocusVisibilityEvent = (e: Event): void => {
    if (e.type === 'keydown') {
      const keyboardEvent = e as KeyboardEvent

      if (isNavigationKeydown(keyboardEvent) && !isTypingInTextInput(keyboardEvent)) {
        updateFocusVisible(true)
      }

      return
    }

    updateFocusVisible(focusState.isFocusVisible)
  }

  const handleBlur = (e: FocusEvent): void => {
    if (!focusState.isFocused) {
      return
    }

    focusState.isFocused = false
    options.onBlur?.(e)
    options.onFocusChange?.(false)

    if (focusState.isFocusVisible) {
      options.onFocusVisibleChange?.(false)
    }

    focusState.isFocusVisible = getIsKeyboardActive()
  }

  watch(
    elementRef,
    (element, previousElement, onCleanup) => {
      if (
        previousElement != null
        && previousElement !== element
        && focusState.isFocused
        && capturedEl === previousElement
      ) {
        const blurEvent = new FocusEvent('blur')
        Object.defineProperty(blurEvent, 'target', {
          value: previousElement,
        })
        handleBlur(blurEvent)
      }

      if (element == null || element.nodeType !== 1) {
        return
      }

      capturedEl = element
      focusState.isFocused = document.activeElement === element

      mousedownHandle.setListener(element, handleFocusVisibilityEvent)
      downHandle.setListener(element, handleFocusVisibilityEvent)
      keydownHandle.setListener(element, handleFocusVisibilityEvent)

      focusinHandle.setListener(element, (e: Event) => {
        if (options.disabled.value) {
          return
        }

        if (hasHookPropagationStopped(e, 'useFocus')) {
          return
        }

        stopHookPropagation(e, 'useFocus')

        if (!focusState.isFocused && element === e.target) {
          focusState.isFocused = true
          focusState.isFocusVisible = getIsKeyboardActive()
          options.onFocus?.(e as FocusEvent)
          options.onFocusChange?.(true)

          if (focusState.isFocusVisible) {
            options.onFocusVisibleChange?.(true)
          }
        }
      })

      focusoutHandle.setListener(element, (e: Event) => {
        if (options.disabled.value) {
          return
        }

        if (hasHookPropagationStopped(e, 'useFocus')) {
          return
        }

        stopHookPropagation(e, 'useFocus')
        handleBlur(e as FocusEvent)
      })

      onCleanup(() => {
        focusinHandle.setListener(element, null)
        focusoutHandle.setListener(element, null)
        mousedownHandle.setListener(element, null)
        downHandle.setListener(element, null)
        keydownHandle.setListener(element, null)
      })
    },
    {
      immediate: true,
      flush: 'post',
    },
  )

  onUnmounted(() => {
    if (focusState.isFocused && capturedEl !== null) {
      focusState.isFocused = false

      const blurEvent = new FocusEvent('blur')
      Object.defineProperty(blurEvent, 'target', {
        value: capturedEl,
      })

      options.onBlur?.(blurEvent)
      options.onFocusChange?.(false)

      if (focusState.isFocusVisible) {
        options.onFocusVisibleChange?.(false)
      }

      focusState.isFocusVisible = getIsKeyboardActive()
    }

    focusinHandle.clear()
    focusoutHandle.clear()
    mousedownHandle.clear()
    downHandle.clear()
    keydownHandle.clear()
    capturedEl = null
  })
}
