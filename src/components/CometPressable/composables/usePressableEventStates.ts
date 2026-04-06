import { onMounted, ref, type Ref } from 'vue'

import {
  getIsKeyboardActive,
  initKeyboardTracker,
} from '../../WebPressable/utils/keyboardTracker'

export interface UsePressableEventStatesArgs {
  elementRef: Ref<HTMLElement | null>
  testOnly_pressed?: boolean
  onFocusChange?: (val: boolean) => void
  onFocusVisibleChange?: (val: boolean) => void
  onHoverChange?: (val: boolean) => void
  onPressChange?: (val: boolean) => void
}

export interface UsePressableEventStatesResult {
  focused: Ref<boolean>
  focusVisible: Ref<boolean>
  hovered: Ref<boolean>
  pressed: Ref<boolean>
  onFocusChangeHandler: (val: boolean) => void
  onFocusVisibleChangeHandler: (val: boolean) => void
  onHoverChangeHandler: (val: boolean) => void
  onPressChangesHandler: (val: boolean) => void
}

function createSSRStates(testOnlyPressed = false): UsePressableEventStatesResult {
  const noop = (_val: boolean): void => {}

  return {
    focused: ref(false),
    focusVisible: ref(false),
    hovered: ref(false),
    pressed: ref(testOnlyPressed),
    onFocusChangeHandler: noop,
    onFocusVisibleChangeHandler: noop,
    onHoverChangeHandler: noop,
    onPressChangesHandler: noop,
  }
}

function createBrowserStates(
  args: UsePressableEventStatesArgs,
): UsePressableEventStatesResult {
  const {
    elementRef,
    testOnly_pressed = false,
    onFocusChange,
    onFocusVisibleChange,
    onHoverChange,
    onPressChange,
  } = args

  initKeyboardTracker()

  const pressed = ref(testOnly_pressed)
  const focused = ref(false)
  const focusVisible = ref(false)
  const hovered = ref(false)

  const onPressChangesHandler = (val: boolean): void => {
    pressed.value = val || testOnly_pressed
    onPressChange?.(val)
  }

  const onFocusChangeHandler = (val: boolean): void => {
    focused.value = val
    onFocusChange?.(val)
  }

  const onFocusVisibleChangeHandler = (val: boolean): void => {
    focusVisible.value = val
    onFocusVisibleChange?.(val)
  }

  const onHoverChangeHandler = (val: boolean): void => {
    hovered.value = val
    onHoverChange?.(val)
  }

  onMounted(() => {
    const element = elementRef.value

    if (element == null || element !== document.activeElement) {
      return
    }

    onFocusChangeHandler(true)

    if (getIsKeyboardActive()) {
      onFocusVisibleChangeHandler(true)
    }
  })

  return {
    focused,
    focusVisible,
    hovered,
    pressed,
    onFocusChangeHandler,
    onFocusVisibleChangeHandler,
    onHoverChangeHandler,
    onPressChangesHandler,
  }
}

export function usePressableEventStates(
  args: UsePressableEventStatesArgs,
): UsePressableEventStatesResult {
  if (typeof window === 'undefined') {
    return createSSRStates(args.testOnly_pressed ?? false)
  }

  return createBrowserStates(args)
}
