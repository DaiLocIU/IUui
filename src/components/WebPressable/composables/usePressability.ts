// React source: WebPressability — usePressability (e function)

import { computed, type Ref } from 'vue'

import { useContextMenu } from './useContextMenu'
import { useFocus } from './useFocus'
import { useHover } from './useHover'
import { usePress } from './usePress'
import type { PressabilityOptions } from '../types'

/**
 * React: usePressability(elementRef, options)
 *
 * Pure orchestrator — wires all four event domains to the same element ref.
 */
export function usePressability(
  elementRef: Ref<HTMLElement | null>,
  options: PressabilityOptions,
): void {
  const disabled = computed(() => options.disabled)
  const preventContextMenu = computed(() => options.preventContextMenu ?? false)

  useHover(elementRef, {
    disabled,
    onHoverChange: options.onHoverChange,
    onHoverEnd: options.onHoverEnd,
    onHoverMove: options.onHoverMove,
    onHoverStart: options.onHoverStart,
  })

  usePress(elementRef, {
    disabled,
    onPressChange: options.onPressChange,
    onPressEnd: options.onPressEnd,
    onPressMove: options.onPressMove,
    onPressStart: options.onPressStart,
  })

  useFocus(elementRef, {
    disabled,
    onBlur: options.onBlur,
    onFocus: options.onFocus,
    onFocusChange: options.onFocusChange,
    onFocusVisibleChange: options.onFocusVisibleChange,
  })

  useContextMenu(elementRef, {
    disabled,
    preventContextMenu,
    onContextMenu: options.onContextMenu,
  })
}
