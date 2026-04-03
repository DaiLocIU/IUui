import { computed, onMounted, ref, watch, type Ref } from 'vue'

import { canUseDOM } from '../utils/webPressable'
import { getGlobalFocusVisible } from './useWebPressability'

const resolveElement = (target: unknown): HTMLElement | null => {
  if (target instanceof HTMLElement) {
    return target
  }

  if (target != null && typeof target === 'object') {
    const candidate = target as {
      $el?: unknown
      el?: HTMLElement | Ref<HTMLElement | null> | null
    }

    if (candidate.el instanceof HTMLElement) {
      return candidate.el
    }

    if (
      candidate.el != null &&
      typeof candidate.el === 'object' &&
      'value' in candidate.el &&
      candidate.el.value instanceof HTMLElement
    ) {
      return candidate.el.value
    }

    if (candidate.$el instanceof HTMLElement) {
      return candidate.$el
    }
  }

  return null
}

export interface UseCometPressableEventStatesOptions {
  onFocusChange?: (value: boolean) => void
  onFocusVisibleChange?: (value: boolean) => void
  onHoverChange?: (value: boolean) => void
  onPressChange?: (value: boolean) => void
  ref: Ref<unknown>
  testOnly_pressed?: boolean
}

export const useCometPressableEventStates = (
  options: UseCometPressableEventStatesOptions,
) => {
  const focused = ref(false)
  const focusVisible = ref(false)
  const hovered = ref(false)
  const pressed = ref(options.testOnly_pressed ?? false)

  const onPressChangesHandler = (value: boolean): void => {
    pressed.value = value || options.testOnly_pressed === true
    options.onPressChange?.(value)
  }

  const onFocusChangeHandler = (value: boolean): void => {
    focused.value = value
    options.onFocusChange?.(value)
  }

  const onFocusVisibleChangeHandler = (value: boolean): void => {
    focusVisible.value = value
    options.onFocusVisibleChange?.(value)
  }

  const onHoverChangeHandler = (value: boolean): void => {
    hovered.value = value
    options.onHoverChange?.(value)
  }

  const syncFocusedElementState = (): void => {
    if (!canUseDOM) {
      return
    }

    const element = resolveElement(options.ref.value)

    if (element != null && element === document.activeElement) {
      onFocusChangeHandler(true)

      if (getGlobalFocusVisible()) {
        onFocusVisibleChangeHandler(true)
      }
    }
  }

  onMounted(syncFocusedElementState)
  watch(
    () => options.ref.value,
    () => {
      syncFocusedElementState()
    },
  )

  return computed(() => ({
    focused: focused.value,
    focusVisible: focusVisible.value,
    hovered: hovered.value,
    onFocusChangeHandler,
    onFocusVisibleChangeHandler,
    onHoverChangeHandler,
    onPressChangesHandler,
    pressed: pressed.value,
  }))
}
