import { computed, onUnmounted, ref, unref, watch, type Ref } from 'vue'

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

export interface UseFocusWithinOptions {
  disabled?: Ref<boolean> | boolean
  onBlurWithin?: (event: FocusEvent) => void
  onFocusWithin?: (event: FocusEvent) => void
  onFocusWithinChange?: (focused: boolean) => void
  onFocusWithinVisibleChange?: (visible: boolean) => void
}

export interface UseFocusWithinReturn {
  focusedWithin: Ref<boolean>
  focusVisibleWithin: Ref<boolean>
}

interface FocusWithinState {
  isFocusedWithin: boolean
  isFocusVisibleWithin: boolean
}

function createSyntheticFocusEvent(
  type: 'blur' | 'focusout',
  target: HTMLElement,
): FocusEvent {
  const event =
    typeof FocusEvent === 'function'
      ? new FocusEvent(type)
      : (new Event(type) as FocusEvent)

  Object.defineProperty(event, 'target', {
    configurable: true,
    value: target,
  })

  return event
}

function containsRelatedTarget(
  element: HTMLElement,
  relatedTarget: EventTarget | null,
): boolean {
  return relatedTarget != null && element.contains(relatedTarget as Node)
}

export function useFocusWithin(
  elementRef: Ref<HTMLElement | null>,
  options: UseFocusWithinOptions = {},
): UseFocusWithinReturn {
  initKeyboardTracker()

  const focusedWithin = ref(false)
  const focusVisibleWithin = ref(false)

  const focusState: FocusWithinState = {
    isFocusedWithin: false,
    isFocusVisibleWithin: false,
  }

  const focusinHandle = createEventHandle('focusin', { passive: true })
  const focusoutHandle = createEventHandle('focusout', { passive: true })
  const keydownHandle = createEventHandle('keydown', { passive: true })
  let capturedElement: HTMLElement | null = null

  const disabled = computed(() => unref(options.disabled ?? false))

  const updateFocusVisibleWithin = (nextValue: boolean): void => {
    if (focusState.isFocusedWithin && focusState.isFocusVisibleWithin !== nextValue) {
      focusState.isFocusVisibleWithin = nextValue
      focusVisibleWithin.value = nextValue
      options.onFocusWithinVisibleChange?.(nextValue)
    }
  }

  const resetFocusState = (event?: FocusEvent): void => {
    if (!focusState.isFocusedWithin) {
      return
    }

    focusState.isFocusedWithin = false
    focusedWithin.value = false
    options.onFocusWithinChange?.(false)

    if (focusState.isFocusVisibleWithin) {
      focusState.isFocusVisibleWithin = false
      focusVisibleWithin.value = false
      options.onFocusWithinVisibleChange?.(false)
    } else {
      focusVisibleWithin.value = false
    }

    if (event != null) {
      options.onBlurWithin?.(event)
    }
  }

  watch(disabled, (isDisabled) => {
    if (isDisabled) {
      resetFocusState()
    }
  })

  watch(
    elementRef,
    (element, previousElement, onCleanup) => {
      if (previousElement != null && previousElement !== element) {
        resetFocusState(createSyntheticFocusEvent('focusout', previousElement))
      }

      if (element == null || element.nodeType !== 1) {
        return
      }

      capturedElement = element

      const activeElement =
        typeof document !== 'undefined' ? (document.activeElement as Node | null) : null

      if (activeElement != null && element.contains(activeElement)) {
        focusState.isFocusedWithin = true
        focusedWithin.value = true
        focusState.isFocusVisibleWithin = getIsKeyboardActive()
        focusVisibleWithin.value = focusState.isFocusVisibleWithin
      }

      keydownHandle.setListener(element, (event: Event) => {
        if (disabled.value || !focusState.isFocusedWithin) {
          return
        }

        const keyboardEvent = event as KeyboardEvent

        if (
          isNavigationKeydown(keyboardEvent)
          && !isTypingInTextInput(keyboardEvent)
        ) {
          updateFocusVisibleWithin(true)
        }
      })

      focusinHandle.setListener(element, (event: Event) => {
        if (disabled.value || hasHookPropagationStopped(event, 'useFocusWithin')) {
          return
        }

        const keyboardActive = getIsKeyboardActive()

        if (!focusState.isFocusedWithin) {
          focusState.isFocusedWithin = true
          focusedWithin.value = true
          options.onFocusWithinChange?.(true)

          focusState.isFocusVisibleWithin = keyboardActive
          focusVisibleWithin.value = keyboardActive

          if (keyboardActive) {
            options.onFocusWithinVisibleChange?.(true)
          }
        } else if (!focusState.isFocusVisibleWithin && keyboardActive) {
          focusState.isFocusVisibleWithin = true
          focusVisibleWithin.value = true
          options.onFocusWithinVisibleChange?.(true)
        }

        options.onFocusWithin?.(event as FocusEvent)
      })

      focusoutHandle.setListener(element, (event: Event) => {
        if (disabled.value || hasHookPropagationStopped(event, 'useFocusWithin')) {
          return
        }

        const focusEvent = event as FocusEvent
        const relatedTarget =
          'nativeEvent' in focusEvent && focusEvent.nativeEvent != null
            ? (focusEvent.nativeEvent as FocusEvent).relatedTarget
            : focusEvent.relatedTarget

        if (
          focusState.isFocusedWithin
          && !containsRelatedTarget(element, relatedTarget)
        ) {
          resetFocusState(focusEvent)
          return
        }

        stopHookPropagation(event, 'useFocusWithin')
      })

      onCleanup(() => {
        focusinHandle.setListener(element, null)
        focusoutHandle.setListener(element, null)
        keydownHandle.setListener(element, null)
      })
    },
    {
      immediate: true,
      flush: 'post',
    },
  )

  onUnmounted(() => {
    const element = elementRef.value ?? capturedElement

    if (element != null) {
      resetFocusState(createSyntheticFocusEvent('blur', element))
    }

    focusinHandle.clear()
    focusoutHandle.clear()
    keydownHandle.clear()
    capturedElement = null
  })

  return {
    focusedWithin,
    focusVisibleWithin,
  }
}

export default useFocusWithin
