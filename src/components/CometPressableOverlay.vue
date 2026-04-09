<template>
  <CometPressableOverlayContainer
    v-bind="attrs"
    role="none"
    :style="overlayStyle"
    :xstyle="overlayXStyle"
  />
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, watchEffect, type CSSProperties } from 'vue'

import CometPressableOverlayContainer from './CometPressableOverlayContainer.vue'
import type { StyleCapableValue } from '../utils/resolveStyling'

defineOptions({
  inheritAttrs: false,
})

type FocusRingPosition = 'default' | 'inset'
type VisualState = 'focused' | 'hovered' | 'pressed'
type OverlayOffset = number | {
  bottom: number
  left: number
  right: number
  top: number
}

interface Props {
  focusRingPosition?: FocusRingPosition
  focusVisible?: boolean
  focusVisibleStyle?: StyleCapableValue
  hovered?: boolean
  hoveredStyle?: StyleCapableValue
  offset?: OverlayOffset
  pressed?: boolean
  pressedStyle?: StyleCapableValue
  radius?: number | string
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

const attrs = useAttrs()
const lastVisualState = ref<VisualState | undefined>(undefined)

const circleXStyle = [
  '[border-start-start-radius:999px]',
  '[border-start-end-radius:999px]',
  '[border-end-end-radius:999px]',
  '[border-end-start-radius:999px]',
].join(' ')

const defaultHoveredXStyle = '[background-color:var(--hover-overlay,#0000000D)]'
const defaultPressedXStyle = '[background-color:var(--press-overlay,#00000019)]'

const focusRingDefaultXStyle = [
  '[box-shadow:var(--focus-ring-shadow-default)]',
  'outline-none',
  'cpo-focus-ring',
].join(' ')

const focusRingInsetXStyle = '[box-shadow:var(--focus-ring-shadow-inset)]'

const overlayBaseXStyle = [
  'absolute',
  'top-0',
  'bottom-0',
  '[inset-inline-start:0]',
  '[inset-inline-end:0]',
  'opacity-0',
  'pointer-events-none',
  'transition-opacity',
  '[transition-duration:var(--fds-duration-extra-extra-short-out)]',
  '[transition-timing-function:var(--fds-animation-fade-out)]',
].join(' ')

const overlayVisibleXStyle = [
  'opacity-100',
  '[transition-duration:0s]',
].join(' ')

const resolvedRadius = computed(() => {
  if (props.radius == null) {
    return undefined
  }

  return typeof props.radius === 'number'
    ? `${props.radius}px`
    : props.radius
})

const resolvedRadiusStyle = computed<CSSProperties | undefined>(() => {
  if (resolvedRadius.value == null) {
    return undefined
  }
  
  return {
    borderRadius: resolvedRadius.value,
    borderStartStartRadius: resolvedRadius.value,
    borderStartEndRadius: resolvedRadius.value,
    borderEndEndRadius: resolvedRadius.value,
    borderEndStartRadius: resolvedRadius.value,
  }
})

const overlayWebXStyle = computed<StyleCapableValue>(() => {
  return resolvedRadius.value == null
    ? [
        '[border-start-start-radius:inherit]',
        '[border-start-end-radius:inherit]',
        '[border-end-end-radius:inherit]',
        '[border-end-start-radius:inherit]',
      ].join(' ')
    : undefined
})

watchEffect(() => {
  if (props.pressed) {
    if (lastVisualState.value !== 'pressed') {
      lastVisualState.value = 'pressed'
    }
    return
  }

  if (props.focusVisible) {
    if (lastVisualState.value !== 'focused') {
      lastVisualState.value = 'focused'
    }
    return
  }

  if (props.hovered && lastVisualState.value !== 'hovered') {
    lastVisualState.value = 'hovered'
  }
})

const overlayStyle = computed<CSSProperties | undefined>(() => {
  let bottom = 0
  let left = 0
  let right = 0
  let top = 0

  if (props.offset != null) {
    if (typeof props.offset === 'number') {
      bottom = -props.offset
      left = -props.offset
      right = -props.offset
      top = -props.offset
    } else {
      bottom = -props.offset.bottom
      left = -props.offset.left
      right = -props.offset.right
      top = -props.offset.top
    }
  }

  if (resolvedRadiusStyle.value == null && props.offset == null) {
    return undefined
  }

  return {
    ...resolvedRadiusStyle.value,
    bottom,
    left,
    right,
    top,
  }
})

const resolvedHoveredStyle = computed<StyleCapableValue>(() =>
  props.hoveredStyle ?? defaultHoveredXStyle,
)

const resolvedPressedStyle = computed<StyleCapableValue>(() =>
  props.pressedStyle ?? defaultPressedXStyle,
)

const focusRingXStyle = computed<StyleCapableValue | undefined>(() => {
  const state = lastVisualState.value

  if (!props.showFocusRing) {
    return undefined
  }

  if (!(state === 'focused' || (state === 'pressed' && props.focusVisible))) {
    return undefined
  }

  return props.focusRingPosition === 'default'
    ? focusRingDefaultXStyle
    : focusRingInsetXStyle
})

const activeStateXStyle = computed<StyleCapableValue | undefined>(() => {
  if (!(props.pressed || props.focusVisible || props.hovered)) {
    return undefined
  }

  return [
    overlayVisibleXStyle,
    lastVisualState.value === 'pressed' && resolvedPressedStyle.value,
    lastVisualState.value === 'focused' && (props.focusVisibleStyle ?? resolvedHoveredStyle.value),
    lastVisualState.value === 'hovered' && resolvedHoveredStyle.value,
  ]
})

const overlayXStyle = computed<StyleCapableValue>(() => [
  overlayBaseXStyle,
  overlayWebXStyle.value,
  props.xstyle,
  activeStateXStyle.value,
  focusRingXStyle.value,
  resolvedRadius.value === '50%' && circleXStyle,
])
</script>

<style scoped>
@media (forced-colors: active) {
  .cpo-focus-ring.cpo-focus-ring {
    outline: var(--focus-ring-outline-forced-colors);
  }
}
</style>
