// React source: module-level h, y, b(), R(), v(), S() in ReactFocusEvent.react

import { hasPointerEvents, isMac } from './pressable.utils'

// React: h — global flag, true = keyboard was last input device
// Module-level singleton — shared across all WebPressable instances.
let isKeyboardActive = true

// React: y — initialized guard
let isInitialized = false

// React: f — event list that resets keyboard mode
const RESET_EVENTS = hasPointerEvents
  ? ['pointermove', 'pointerdown', 'pointerup']
  : ['mousedown', 'mousemove', 'mouseup', 'touchmove', 'touchstart', 'touchend']

/**
 * React: v(e) — filter out system shortcuts from keyboard-mode activation.
 * Cmd+anything, Ctrl+anything, and Alt+anything on non-Mac do not count as
 * keyboard navigation.
 */
export function isNavigationKeydown(e: KeyboardEvent): boolean {
  return !(e.metaKey || (!isMac && e.altKey) || e.ctrlKey)
}

/**
 * React: S(e) — typing inside text inputs should not flip keyboard mode.
 * Only Tab and Escape inside inputs count as navigation.
 */
export function isTypingInTextInput(e: KeyboardEvent): boolean {
  const target = e.target as HTMLElement

  if (e.key === 'Tab' || e.key === 'Escape') {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA'
  )
}

/**
 * React: R(e) — the global window capture listener.
 * keydown -> keyboard mode on (if valid navigation key)
 * any pointer/mouse/touch -> keyboard mode off (unless target is <html>)
 */
function handleGlobalEvent(e: Event): void {
  if (e.type === 'keydown') {
    if (isNavigationKeydown(e as KeyboardEvent)) {
      isKeyboardActive = true
    }

    return
  }

  const nodeName = (e.target as HTMLElement | null)?.nodeName

  if (nodeName === 'HTML') {
    return
  }

  isKeyboardActive = false
}

/**
 * React: b() + T() — lazy singleton initialization.
 * Called from useFocus on first mount. Never adds listeners twice.
 */
export function initKeyboardTracker(): void {
  if (isInitialized || typeof window === 'undefined') {
    return
  }

  isInitialized = true

  window.addEventListener('keydown', handleGlobalEvent, true)

  RESET_EVENTS.forEach((type) => {
    window.addEventListener(type, handleGlobalEvent, true)
  })
}

/**
 * React: C() — getGlobalFocusVisible()
 * Read the current keyboard-active state.
 */
export function getIsKeyboardActive(): boolean {
  return isKeyboardActive
}
