import { computed, toValue, type CSSProperties, type MaybeRefOrGetter } from 'vue'

import type { StyleCapableValue } from '../utils/resolveStyling'
import { useCometContainerPressableContext } from '../system/cometPressableKeys'

export interface PressedStyleValue {
  opacity?: number
  scale?: number
}

export interface UseCometPressableStylesOptions {
  cursorDisabled?: boolean
  disabled?: MaybeRefOrGetter<boolean>
  display?: 'block' | 'inline'
  expanding?: boolean
  focused: MaybeRefOrGetter<boolean>
  focusVisible: MaybeRefOrGetter<boolean>
  hideFocusOverlay?: boolean
  hovered: MaybeRefOrGetter<boolean>
  isLink: boolean
  overlayDisabled?: boolean
  overlayFocusRingPosition?: 'default' | 'inset'
  pressed: MaybeRefOrGetter<boolean>
  pressedStyleValue?: PressedStyleValue
  suppressFocusRing?: boolean
  xstyle?: StyleCapableValue | ((state: {
    disabled: boolean
    focused: boolean
    focusVisible: boolean
    hovered: boolean
    pressed: boolean
  }) => StyleCapableValue)
}

const DEFAULT_CURSOR_STYLE: CSSProperties = {
  cursor: 'default',
}

const EXPANDING_STYLE: CSSProperties = {
  display: 'flex',
}

const FOCUS_RING_STYLE: CSSProperties = {
  boxShadow: '0 0 0 2px rgba(29, 78, 216, 0.25)',
  outline: '2px solid #1d4ed8',
}

const FOCUS_RING_INSET_STYLE: CSSProperties = {
  boxShadow: 'inset 0 0 0 2px rgba(29, 78, 216, 0.85)',
}

const HIDE_OUTLINE_STYLE: CSSProperties = {
  outline: 'none',
}

const LINK_BASE_STYLE: CSSProperties = {
  display: 'inline-flex',
}

const ROOT_STYLE: CSSProperties = {
  borderEndEndRadius: 'inherit',
  borderEndStartRadius: 'inherit',
  borderStartEndRadius: 'inherit',
  borderStartStartRadius: 'inherit',
  display: 'flex',
  flexDirection: 'row',
  userSelect: 'none',
}

const ROOT_INLINE_STYLE: CSSProperties = {
  borderEndEndRadius: 'inherit',
  borderEndStartRadius: 'inherit',
  borderStartEndRadius: 'inherit',
  borderStartStartRadius: 'inherit',
  position: 'relative',
  userSelect: 'none',
}

const Z_INDEX_STYLE: CSSProperties = {
  zIndex: 1,
}

export const useCometPressableStyles = (
  options: UseCometPressableStylesOptions,
) => {
  const containerContext = useCometContainerPressableContext()

  return computed(() => {
    const display = options.display
    const disabled = options.disabled == null ? false : toValue(options.disabled)
    const focused = toValue(options.focused)
    const focusVisible = toValue(options.focusVisible)
    const hovered = toValue(options.hovered)
    const pressed = toValue(options.pressed)
    const expanding = options.expanding ?? display === 'block'
    const fallbackFocusRing =
      focusVisible &&
      (options.hideFocusOverlay === true || options.overlayDisabled === true) &&
      options.suppressFocusRing !== true

    const resolvedXStyle =
      typeof options.xstyle === 'function'
        ? options.xstyle({
            disabled,
            focused,
            focusVisible,
            hovered,
            pressed,
          })
        : options.xstyle

    const xstyle: StyleCapableValue[] = [
      display === 'inline' ? ROOT_INLINE_STYLE : ROOT_STYLE,
      options.cursorDisabled === true ? DEFAULT_CURSOR_STYLE : undefined,
      expanding ? EXPANDING_STYLE : undefined,
      options.isLink ? LINK_BASE_STYLE : undefined,
      !focusVisible ? HIDE_OUTLINE_STYLE : undefined,
      resolvedXStyle,
      fallbackFocusRing
        ? options.overlayFocusRingPosition === 'inset'
          ? FOCUS_RING_INSET_STYLE
          : FOCUS_RING_STYLE
        : undefined,
      containerContext != null ? Z_INDEX_STYLE : undefined,
    ]

    const pressedStyle: CSSProperties = {}

    if (pressed && options.pressedStyleValue != null) {
      if (options.pressedStyleValue.opacity != null) {
        pressedStyle.opacity = options.pressedStyleValue.opacity
      }

      if (options.pressedStyleValue.scale != null) {
        pressedStyle.transform = `scale(${options.pressedStyleValue.scale})`
      }
    }

    return {
      pressedStyle,
      xstyle,
    }
  })
}
