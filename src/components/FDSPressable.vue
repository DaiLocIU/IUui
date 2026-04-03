<template>
  <CometPressable
    ref="pressableRef"
    v-bind="resolvedProps"
  >
    <template #default="slotState">
      <slot v-bind="slotState" />
    </template>
  </CometPressable>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'

import CometPressable from './CometPressable.vue'
import type { StyleCapableValue } from '../utils/resolveStyling'
import type { PressedStyleValue } from '../composables/useCometPressableStyles'

defineOptions({
  inheritAttrs: false,
})

type DisplayMode = 'block' | 'inline'
type OverlayFocusRingPosition = 'default' | 'inset'

interface OverlayOffset {
  bottom?: number
  left?: number
  right?: number
  top?: number
}

interface LinkProps {
  attributionsrc?: string
  brid?: string
  download?: boolean | string
  fbclid?: string
  rel?: string
  target?: string
  url?: string
  [key: string]: unknown
}

interface Props {
  'aria-disabled'?: boolean
  allowClickEventPropagation?: boolean
  cursorDisabled?: boolean
  disabled?: boolean
  display?: DisplayMode
  dynamicHoverTiltAngle?: number
  dynamicHoverTranslationPercent?: number
  expanding?: boolean
  hideFocusOverlay?: boolean
  hideHoverOverlay?: boolean
  isContainerTarget?: boolean
  isUsingCustomFocusRing?: boolean
  linkProps?: LinkProps
  onContextMenu?: (event: MouseEvent) => void
  onFocusChange?: (value: boolean) => void
  onFocusIn?: (event: FocusEvent) => void
  onFocusOut?: (event: FocusEvent) => void
  onFocusVisibleChange?: (value: boolean) => void
  onHoverChange?: (value: boolean) => void
  onHoverIn?: (event: unknown) => void
  onHoverMove?: (event: unknown) => void
  onHoverOut?: (event: unknown) => void
  onPress?: (event: MouseEvent | KeyboardEvent) => void
  onPressAction?: () => Promise<void> | void
  onPressChange?: (value: boolean) => void
  onPressIn?: (event: unknown) => void
  onPressOut?: (event: unknown) => void
  overlayDisabled?: boolean
  overlayFocusRingPosition?: OverlayFocusRingPosition
  overlayFocusVisibleStyle?: StyleCapableValue
  overlayFocused?: boolean
  overlayHoveredStyle?: StyleCapableValue
  overlayOffset?: number | OverlayOffset
  overlayPressedStyle?: StyleCapableValue
  overlayRadius?: number | '50%'
  overlayXStyle?: StyleCapableValue
  preventContextMenu?: boolean
  pressedStyleValue?: PressedStyleValue
  showDynamicHover?: boolean
  style?: StyleCapableValue
  suppressFocusRing?: boolean
  testOnly_pressed?: boolean
  testid?: string
  xstyle?: StyleCapableValue | ((state: any) => StyleCapableValue)
}

const props = withDefaults(defineProps<Props>(), {
  'aria-disabled': undefined,
  allowClickEventPropagation: false,
  cursorDisabled: false,
  disabled: false,
  display: 'inline',
  dynamicHoverTiltAngle: undefined,
  dynamicHoverTranslationPercent: undefined,
  expanding: undefined,
  hideFocusOverlay: false,
  hideHoverOverlay: false,
  isContainerTarget: false,
  isUsingCustomFocusRing: false,
  linkProps: undefined,
  onContextMenu: undefined,
  onFocusChange: undefined,
  onFocusIn: undefined,
  onFocusOut: undefined,
  onFocusVisibleChange: undefined,
  onHoverChange: undefined,
  onHoverIn: undefined,
  onHoverMove: undefined,
  onHoverOut: undefined,
  onPress: undefined,
  onPressAction: undefined,
  onPressChange: undefined,
  onPressIn: undefined,
  onPressOut: undefined,
  overlayDisabled: false,
  overlayFocusRingPosition: undefined,
  overlayFocusVisibleStyle: undefined,
  overlayFocused: false,
  overlayHoveredStyle: undefined,
  overlayOffset: undefined,
  overlayPressedStyle: undefined,
  overlayRadius: undefined,
  overlayXStyle: undefined,
  preventContextMenu: undefined,
  pressedStyleValue: undefined,
  showDynamicHover: undefined,
  style: undefined,
  suppressFocusRing: false,
  testOnly_pressed: false,
  testid: undefined,
  xstyle: undefined,
})

const attrs = useAttrs()
const pressableRef = ref<unknown>(null)

const resolvedProps = computed(() => {
  const forwardedProps = {
    ...props,
    ...attrs,
  }

  if (props.disabled !== true) {
    return forwardedProps
  }

  return {
    ...forwardedProps,
    'aria-disabled': true,
    cursorDisabled: true,
    disabled: undefined,
    onContextMenu: undefined,
    onFocusChange: undefined,
    onFocusIn: undefined,
    onFocusOut: undefined,
    onFocusVisibleChange: undefined,
    onHoverChange: undefined,
    onHoverIn: undefined,
    onHoverMove: undefined,
    onHoverOut: undefined,
    onPress: undefined,
    onPressAction: undefined,
    onPressChange: undefined,
    onPressIn: undefined,
    onPressOut: undefined,
  }
})

defineExpose({
  el: pressableRef,
})
</script>
