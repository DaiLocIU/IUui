<template>
  <CometPressableOverlayContainer
    role="none"
    :style="inlineStyle"
    :xstyle="overlayXStyle"
  />
</template>

<script setup lang="ts">
import { computed, ref, watchEffect, type CSSProperties } from 'vue'

import CometPressableOverlayContainer from './CometPressableOverlayContainer.vue'
import type { StyleCapableValue } from '../utils/resolveStyling'

export type OverlayFocusRingPosition = 'default' | 'inset'
type OverlayState = 'focused' | 'hovered' | 'pressed' | null

export interface OverlayOffset {
  bottom?: number
  left?: number
  right?: number
  top?: number
}

interface Props {
  focusRingPosition?: OverlayFocusRingPosition
  focusVisible?: boolean
  focusVisibleStyle?: StyleCapableValue
  hovered?: boolean
  hoveredStyle?: StyleCapableValue
  offset?: number | OverlayOffset
  pressed?: boolean
  pressedStyle?: StyleCapableValue
  radius?: number | '50%'
  showFocusRing?: boolean
  xstyle?: StyleCapableValue
}

const props = withDefaults(defineProps<Props>(), {
  focusRingPosition: 'default',
  focusVisible: false,
  focusVisibleStyle: undefined,
  hovered: false,
  hoveredStyle: undefined,
  offset: undefined,
  pressed: false,
  pressedStyle: undefined,
  radius: undefined,
  showFocusRing: false,
  xstyle: undefined,
})

const DEFAULT_HOVERED_STYLE: CSSProperties = {
  backgroundColor: 'rgba(15, 23, 42, 0.06)',
}

const DEFAULT_PRESSED_STYLE: CSSProperties = {
  backgroundColor: 'rgba(15, 23, 42, 0.12)',
}

const FOCUS_RING_STYLE: CSSProperties = {
  boxShadow: '0 0 0 2px rgba(29, 78, 216, 0.25)',
  outline: '2px solid #1d4ed8',
}

const FOCUS_RING_INSET_STYLE: CSSProperties = {
  boxShadow: 'inset 0 0 0 2px rgba(29, 78, 216, 0.85)',
}

const OVERLAY_STYLE: CSSProperties = {
  bottom: 0,
  insetInlineEnd: 0,
  insetInlineStart: 0,
  opacity: 0,
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
  transitionDuration: '150ms',
  transitionProperty: 'opacity, transform, background-color, box-shadow',
  transitionTimingFunction: 'ease',
}

const OVERLAY_VISIBLE_STYLE: CSSProperties = {
  opacity: 1,
  transitionDuration: '75ms',
}

const OVERLAY_WEB_STYLE: CSSProperties = {
  borderEndEndRadius: 'inherit',
  borderEndStartRadius: 'inherit',
  borderStartEndRadius: 'inherit',
  borderStartStartRadius: 'inherit',
}

const CIRCLE_STYLE: CSSProperties = {
  borderRadius: '50%',
}

const activeState = ref<OverlayState>(null)

watchEffect(() => {
  if (props.pressed) {
    activeState.value = 'pressed'
    return
  }

  if (props.focusVisible) {
    activeState.value = 'focused'
    return
  }

  if (props.hovered) {
    activeState.value = 'hovered'
  }
})

const visible = computed(
  () => props.pressed || props.focusVisible || props.hovered,
)

const resolvedOffset = computed(() => {
  const offset = props.offset

  if (typeof offset === 'number') {
    return {
      bottom: -offset,
      left: -offset,
      right: -offset,
      top: -offset,
    }
  }

  return {
    bottom: -(offset?.bottom ?? 0),
    left: -(offset?.left ?? 0),
    right: -(offset?.right ?? 0),
    top: -(offset?.top ?? 0),
  }
})

const focusRingStyle = computed<StyleCapableValue>(() => {
  if (
    props.showFocusRing !== true ||
    !(
      activeState.value === 'focused' ||
      (activeState.value === 'pressed' && props.focusVisible)
    )
  ) {
    return undefined
  }

  return props.focusRingPosition === 'inset'
    ? FOCUS_RING_INSET_STYLE
    : FOCUS_RING_STYLE
})

const stateStyle = computed<StyleCapableValue>(() => {
  if (!visible.value) {
    return undefined
  }

  if (activeState.value === 'pressed') {
    return props.pressedStyle ?? DEFAULT_PRESSED_STYLE
  }

  if (activeState.value === 'focused') {
    return props.focusVisibleStyle ?? props.hoveredStyle ?? DEFAULT_HOVERED_STYLE
  }

  if (activeState.value === 'hovered') {
    return props.hoveredStyle ?? DEFAULT_HOVERED_STYLE
  }

  return undefined
})

const inlineStyle = computed<CSSProperties>(() => ({
  ...(typeof props.radius === 'number' ? { borderRadius: `${props.radius}px` } : {}),
  bottom: resolvedOffset.value.bottom,
  left: resolvedOffset.value.left,
  right: resolvedOffset.value.right,
  top: resolvedOffset.value.top,
}))

const overlayXStyle = computed<StyleCapableValue>(() => [
  OVERLAY_STYLE,
  OVERLAY_WEB_STYLE,
  props.xstyle,
  visible.value ? [OVERLAY_VISIBLE_STYLE, stateStyle.value] : undefined,
  focusRingStyle.value,
  props.radius === '50%' ? CIRCLE_STYLE : undefined,
])
</script>
