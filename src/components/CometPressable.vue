<template>
  <component
    :is="resolvedComponent"
    ref="targetRef"
    v-bind="resolvedBindings"
    :class="[suppressedStyling?.className, attrs.class]"
    :style="suppressedStyle"
  >
    <slot
      v-if="hasScopedDefaultSlot"
      v-bind="slotState"
    />
    <template v-else>
      <slot v-bind="slotState" />
      <CometPressableOverlay
        v-if="overlayEnabled"
        v-bind="overlayProps"
      />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'

import BaseButton from './BaseButton.vue'
import BaseLink from './BaseLink.vue'
import CometPressableOverlay from './CometPressableOverlay.vue'
import { useCometPressableBehavior } from '../composables/useCometPressableBehavior'
import { useCometPressableContextMenu } from '../composables/useCometPressableContextMenu'
import { useCometPressableEventStates } from '../composables/useCometPressableEventStates'
import {
  useCometPressableStyles,
  type PressedStyleValue,
} from '../composables/useCometPressableStyles'
import { useBaseDisabledContext } from '../system/cometPressableKeys'
import { resolveStyling, type StyleCapableValue } from '../utils/resolveStyling'

defineOptions({
  inheritAttrs: false,
})

export type DisplayMode = 'block' | 'inline'
export type OverlayFocusRingPosition = 'default' | 'inset'

export interface OverlayOffset {
  bottom?: number
  left?: number
  right?: number
  top?: number
}

export interface LinkProps {
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
const slots = useSlots()
const targetRef = ref<unknown>(null)

const inheritedDisabled = useBaseDisabledContext()
const disabled = computed(() => inheritedDisabled || props.disabled)

const handlePress = async (event: MouseEvent | KeyboardEvent): Promise<void> => {
  props.onPress?.(event)

  if (!event.defaultPrevented && props.onPressAction != null) {
    await Promise.resolve(props.onPressAction())
  }
}

const clickHandler = computed(() =>
  props.onPress != null || props.onPressAction != null ? handlePress : undefined,
)

const eventState = useCometPressableEventStates({
  onFocusChange: props.onFocusChange,
  onFocusVisibleChange: props.onFocusVisibleChange,
  onHoverChange: props.onHoverChange,
  onPressChange: props.onPressChange,
  ref: targetRef,
  testOnly_pressed: props.testOnly_pressed,
})

const pressableStyles = useCometPressableStyles({
  cursorDisabled: props.cursorDisabled,
  disabled,
  display: props.display,
  expanding: props.expanding,
  focused: computed(() => eventState.value.focused),
  focusVisible: computed(() => eventState.value.focusVisible),
  hideFocusOverlay: props.hideFocusOverlay,
  hovered: computed(() => eventState.value.hovered),
  isLink: props.linkProps != null,
  overlayDisabled: props.overlayDisabled,
  overlayFocusRingPosition: props.overlayFocusRingPosition,
  pressed: computed(() => eventState.value.pressed),
  pressedStyleValue: props.pressedStyleValue,
  suppressFocusRing: props.suppressFocusRing,
  xstyle: props.xstyle,
})

useCometPressableContextMenu({
  isContainerTarget: props.isContainerTarget,
  linkProps: props.linkProps,
  localRef: targetRef,
  onContextMenu: attrs.onContextmenu as ((event: MouseEvent) => void) | undefined,
  preventContextMenu: props.preventContextMenu,
})

const behavior = useCometPressableBehavior()

const overlayProps = computed(() => ({
  focusRingPosition: props.overlayFocusRingPosition,
  focusVisible:
    props.hideFocusOverlay !== true &&
    (eventState.value.focusVisible || props.overlayFocused === true),
  focusVisibleStyle: props.overlayFocusVisibleStyle,
  hovered: props.hideHoverOverlay !== true && eventState.value.hovered,
  hoveredStyle: props.overlayHoveredStyle,
  offset: props.overlayOffset,
  pressed: eventState.value.pressed,
  pressedStyle: props.overlayPressedStyle,
  radius: props.overlayRadius,
  showFocusRing: !props.isUsingCustomFocusRing,
  xstyle: props.overlayXStyle,
}))

const overlayEnabled = computed(() => props.overlayDisabled !== true)

const slotState = computed(() => ({
  disabled: disabled.value,
  focused: eventState.value.focused,
  focusVisible: eventState.value.focusVisible,
  hovered: eventState.value.hovered,
  overlay: overlayEnabled.value
    ? {
        component: CometPressableOverlay,
        props: overlayProps.value,
      }
    : null,
  pressed: eventState.value.pressed,
}))

const mergedStyle = computed(() => [
  props.style,
  pressableStyles.value.pressedStyle,
])

const hasScopedDefaultSlot = computed(
  () => (slots.default?.length ?? 0) > 0,
)

const suppressedStyling = computed(() => {
  if (!behavior.value.suppressInteractiveElements) {
    return null
  }

  return resolveStyling(pressableStyles.value.xstyle)
})

const suppressedStyle = computed(() =>
  behavior.value.suppressInteractiveElements
    ? [...(suppressedStyling.value?.style ?? []), mergedStyle.value, attrs.style]
    : undefined,
)

const forwardedAttrs = computed(() => {
  const {
    class: _class,
    style: _style,
    onContextmenu: _onContextmenu,
    ...rest
  } = attrs as Record<string, unknown>

  void _class
  void _style
  void _onContextmenu

  return rest
})

const sharedBindings = computed(() => ({
  ...forwardedAttrs.value,
  onBlur: props.onFocusOut,
  onClick: clickHandler.value ?? props.onPress,
  onContextMenu: attrs.onContextmenu,
  onFocus: props.onFocusIn,
  onFocusChange: eventState.value.onFocusChangeHandler,
  onFocusVisibleChange: eventState.value.onFocusVisibleChangeHandler,
  onHoverChange: eventState.value.onHoverChangeHandler,
  onHoverEnd: props.onHoverOut,
  onHoverMove: props.onHoverMove,
  onHoverStart: props.onHoverIn,
  onPressChange: eventState.value.onPressChangesHandler,
  onPressEnd: props.onPressOut,
  onPressStart: props.onPressIn,
}))

const resolvedComponent = computed(() => {
  if (behavior.value.suppressInteractiveElements) {
    return props.display === 'inline' ? 'span' : 'div'
  }

  return props.linkProps != null ? BaseLink : BaseButton
})

const resolvedBindings = computed(() => {
  if (behavior.value.suppressInteractiveElements) {
    return {
      ...forwardedAttrs.value,
      'data-testid': undefined,
      onContextmenu: attrs.onContextmenu,
    }
  }

  if (props.linkProps != null) {
    const {
      url: _url,
      ...linkPropsWithoutUrl
    } = props.linkProps

    void _url

    return {
      ...sharedBindings.value,
      ...linkPropsWithoutUrl,
      disabled: disabled.value,
      display: props.display === 'inline' ? 'inline' : 'block',
      href: props.linkProps.url,
      preventContextMenu: props.preventContextMenu,
      style: mergedStyle.value,
      suppressFocusRing: true,
      testid: undefined,
      xstyle: pressableStyles.value.xstyle,
    }
  }

  return {
    ...sharedBindings.value,
    allowClickEventPropagation: props.allowClickEventPropagation,
    disabled: disabled.value,
    display: props.display === 'inline' ? 'inline' : 'block',
    preventContextMenu: props.preventContextMenu,
    style: mergedStyle.value,
    suppressFocusRing: true,
    testid: undefined,
    xstyle: pressableStyles.value.xstyle,
  }
})

defineExpose({
  el: targetRef,
})
</script>
