<template>
  <component
    :is="normalizedDisplay === 'inline' ? 'span' : 'div'"
    v-if="suppressInteractiveElements"
    ref="renderTargetRef"
    v-bind="passthroughAttrs"
    :class="suppressedClassName"
    :style="suppressedStyles"
    @contextmenu="handleRawContextMenu"
  >
    <slot v-bind="slotState" />
    <CometPressableOverlay
      v-if="showOverlay"
      v-bind="overlayProps"
    />
  </component>

  <BaseLink
    v-else-if="props.linkProps != null"
    ref="renderTargetRef"
    v-bind="baseLinkProps"
  >
    <slot v-bind="slotState" />
    <CometPressableOverlay
      v-if="showOverlay"
      v-bind="overlayProps"
    />
  </BaseLink>

  <BaseButton
    v-else
    ref="renderTargetRef"
    v-bind="baseButtonProps"
  >
    <slot v-bind="slotState" />
    <CometPressableOverlay
      v-if="showOverlay"
      v-bind="overlayProps"
    />
  </BaseButton>
</template>

<script setup lang="ts">
import {
  computed,
  h,
  ref,
  unref,
  useAttrs,
  watchEffect,
  type CSSProperties,
  type PropType,
  type StyleValue,
  type VNode,
} from 'vue'

import BaseLink from '../BaseLink.vue'
import BaseButton from '../BaseButton/BaseButton.vue'
import CometPressableOverlay from '../CometPressableOverlay.vue'
import type { StyleCapableValue } from '../../utils/resolveStyling'
import { useBaseDisabledContext } from '../../system/baseDisabledKeys'
import type {
  HoverEvent,
  LinkProps,
  PressEvent,
  PressableState,
  WebPressableProps,
} from '../WebPressable/types'
import { useCometPressableContextMenu } from './composables/useCometPressableContextMenu'
import { usePressableBehavior } from './composables/usePressableBehavior'
import { usePressableEventStates } from './composables/usePressableEventStates'
import { usePressableStyles } from './composables/usePressableStyles'

type OverlayOffset = number | {
  bottom: number
  left: number
  right: number
  top: number
}

type RenderTargetInstance = HTMLElement | {
  $el?: unknown
  el?: unknown
} | null

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  allowClickEventPropagation: {
    type: null as unknown as PropType<boolean | undefined>,
    default: undefined,
  },
  cursorDisabled: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  display: {
    type: String as PropType<'block' | 'inline' | undefined>,
    default: undefined,
  },
  dynamicHoverTiltAngle: {
    type: Number,
    default: undefined,
  },
  dynamicHoverTranslationPercent: {
    type: Number,
    default: undefined,
  },
  expanding: {
    type: null as unknown as PropType<boolean | undefined>,
    default: undefined,
  },
  hideFocusOverlay: {
    type: Boolean,
    default: false,
  },
  hideHoverOverlay: {
    type: Boolean,
    default: false,
  },
  isContainerTarget: {
    type: Boolean,
    default: false,
  },
  isUsingCustomFocusRing: {
    type: Boolean,
    default: false,
  },
  linkProps: {
    type: null as unknown as PropType<LinkProps | null>,
    default: null,
  },
  onContextMenu: {
    type: Function as PropType<(e: MouseEvent) => void>,
    default: undefined,
  },
  onFocusChange: {
    type: Function as PropType<(focused: boolean) => void>,
    default: undefined,
  },
  onFocusIn: {
    type: Function as PropType<(e: FocusEvent) => void>,
    default: undefined,
  },
  onFocusOut: {
    type: Function as PropType<(e: FocusEvent) => void>,
    default: undefined,
  },
  onFocusVisibleChange: {
    type: Function as PropType<(visible: boolean) => void>,
    default: undefined,
  },
  onHoverChange: {
    type: Function as PropType<(hovered: boolean) => void>,
    default: undefined,
  },
  onHoverIn: {
    type: Function as PropType<(e: HoverEvent) => void>,
    default: undefined,
  },
  onHoverMove: {
    type: Function as PropType<(e: HoverEvent) => void>,
    default: undefined,
  },
  onHoverOut: {
    type: Function as PropType<(e: HoverEvent) => void>,
    default: undefined,
  },
  onPress: {
    type: Function as PropType<(e: MouseEvent | KeyboardEvent) => void>,
    default: undefined,
  },
  onPressAction: {
    type: Function as PropType<() => void | Promise<void>>,
    default: undefined,
  },
  onPressChange: {
    type: Function as PropType<(pressed: boolean) => void>,
    default: undefined,
  },
  onPressIn: {
    type: Function as PropType<(e: PressEvent) => void>,
    default: undefined,
  },
  onPressOut: {
    type: Function as PropType<(e: PressEvent) => void>,
    default: undefined,
  },
  overlayDisabled: {
    type: Boolean,
    default: false,
  },
  overlayFocusRingPosition: {
    type: String as PropType<'default' | 'inset' | 'outside' | undefined>,
    default: undefined,
  },
  overlayFocusVisibleStyle: {
    type: null as unknown as PropType<StyleCapableValue>,
    default: undefined,
  },
  overlayFocused: {
    type: Boolean,
    default: false,
  },
  overlayHoveredStyle: {
    type: null as unknown as PropType<StyleCapableValue>,
    default: undefined,
  },
  overlayOffset: {
    type: null as unknown as PropType<OverlayOffset | undefined>,
    default: undefined,
  },
  overlayPressedStyle: {
    type: null as unknown as PropType<StyleCapableValue>,
    default: undefined,
  },
  overlayRadius: {
    type: null as unknown as PropType<number | string | undefined>,
    default: undefined,
  },
  overlayXStyle: {
    type: null as unknown as PropType<StyleCapableValue>,
    default: undefined,
  },
  preventContextMenu: {
    type: null as unknown as PropType<boolean | undefined>,
    default: undefined,
  },
  pressedStyleValue: {
    type: null as unknown as PropType<{
      opacity?: number
      scale?: number
    } | undefined>,
    default: undefined,
  },
  showDynamicHover: {
    type: null as unknown as PropType<boolean | undefined>,
    default: undefined,
  },
  style: {
    type: null as unknown as PropType<CSSProperties | undefined>,
    default: undefined,
  },
  suppressFocusRing: {
    type: Boolean,
    default: false,
  },
  testOnly_pressed: {
    type: Boolean,
    default: false,
  },
  testid: {
    type: String,
    default: undefined,
  },
  xstyle: {
    type: null as unknown as PropType<
      StyleCapableValue | ((state: PressableState) => StyleCapableValue) | undefined
    >,
    default: undefined,
  },
})

const attrs = useAttrs()
const renderTargetRef = ref<RenderTargetInstance>(null)
const elementRef = ref<HTMLElement | null>(null)

function normalizeElement(value: RenderTargetInstance): HTMLElement | null {
  if (value instanceof HTMLElement) {
    return value
  }

  const exposedElement = unref(value?.el)

  if (exposedElement instanceof HTMLElement) {
    return exposedElement
  }

  return value?.$el instanceof HTMLElement ? value.$el : null
}

watchEffect(() => {
  elementRef.value = normalizeElement(renderTargetRef.value)
})

defineExpose({
  el: computed(() => elementRef.value),
})

const passthroughAttrs = computed(() => {
  const {
    class: _class,
    style: _style,
    testID: _testID,
    testid: _testid,
    'data-testid': _dataTestid,
    ...rest
  } = attrs as Record<string, unknown>

  void _class
  void _style
  void _testID
  void _testid
  void _dataTestid

  return rest
})

const baseDisabled = useBaseDisabledContext()
const effectiveDisabled = computed(() => baseDisabled === true || props.disabled === true)
const normalizedDisplay = computed<'block' | 'inline'>(() =>
  props.display === 'inline' ? 'inline' : 'block',
)
const expanding = computed(() =>
  props.expanding !== undefined ? props.expanding : props.display === 'block',
)
const normalizedOverlayFocusRingPosition = computed<'default' | 'inset'>(() =>
  props.overlayFocusRingPosition === 'inset' ? 'inset' : 'default',
)

const { isPlaceholder, suppressInteractiveElements } = usePressableBehavior()
void isPlaceholder

const {
  focused,
  focusVisible,
  hovered,
  pressed,
  onFocusChangeHandler,
  onFocusVisibleChangeHandler,
  onHoverChangeHandler,
  onPressChangesHandler,
} = usePressableEventStates({
  elementRef,
  onFocusChange: props.onFocusChange,
  onFocusVisibleChange: props.onFocusVisibleChange,
  onHoverChange: props.onHoverChange,
  onPressChange: props.onPressChange,
  testOnly_pressed: props.testOnly_pressed,
})

const handlePress = computed(() => {
  if (props.onPress == null && props.onPressAction == null) {
    return undefined
  }

  return (event: MouseEvent | KeyboardEvent): void => {
    props.onPress?.(event)

    if (!event.defaultPrevented && props.onPressAction != null) {
      void Promise.resolve().then(() => props.onPressAction?.())
    }
  }
})

const { resolvedStyling, pressedStyle } = usePressableStyles({
  cursorDisabled: computed(() => props.cursorDisabled),
  disabled: effectiveDisabled,
  display: computed(() => props.display),
  expanding,
  focused,
  focusVisible,
  hideFocusOverlay: computed(() => props.hideFocusOverlay),
  hovered,
  isLink: computed(() => props.linkProps != null),
  overlayDisabled: computed(() => props.overlayDisabled),
  overlayFocusRingPosition: normalizedOverlayFocusRingPosition,
  pressed,
  pressedStyleValue: computed(() => props.pressedStyleValue),
  suppressFocusRing: computed(() => props.suppressFocusRing),
  xstyle: computed(() => props.xstyle),
})

useCometPressableContextMenu({
  isContainerTarget: props.isContainerTarget,
  linkProps: props.linkProps ?? undefined,
  localRef: elementRef,
  onContextMenu: props.onContextMenu,
  preventContextMenu: props.preventContextMenu,
})

const hasPressedStyle = computed(() => Object.keys(pressedStyle.value).length > 0)

const interactiveXStyle = computed<StyleCapableValue>(() => [
  resolvedStyling.value.className,
  ...resolvedStyling.value.style,
  attrs.class as StyleCapableValue,
])

const interactiveAttrsStyle = computed<StyleValue | undefined>(() =>
  typeof attrs.style === 'string' ? undefined : attrs.style as StyleValue | undefined,
)

const interactiveStyle = computed<StyleValue[]>(() => {
  const styles: StyleValue[] = []

  if (props.style != null) {
    styles.push(props.style)
  }

  if (hasPressedStyle.value) {
    styles.push(pressedStyle.value)
  }

  if (interactiveAttrsStyle.value != null) {
    styles.push(interactiveAttrsStyle.value)
  }

  return styles
})

const suppressedClassName = computed(() => [
  resolvedStyling.value.className,
  attrs.class as StyleCapableValue,
])

const suppressedStyles = computed<StyleValue[]>(() => {
  const styles: StyleValue[] = [...resolvedStyling.value.style]

  if (props.style != null) {
    styles.push(props.style)
  }

  if (hasPressedStyle.value) {
    styles.push(pressedStyle.value)
  }

  if (attrs.style != null) {
    styles.push(attrs.style as StyleValue)
  }

  return styles
})

const showOverlay = computed(() => props.overlayDisabled !== true)

const overlayProps = computed(() => ({
  focusRingPosition: normalizedOverlayFocusRingPosition.value,
  focusVisible:
    !props.hideFocusOverlay
    && (focusVisible.value || props.overlayFocused === true),
  focusVisibleStyle: props.overlayFocusVisibleStyle,
  hovered: !props.hideHoverOverlay && hovered.value,
  hoveredStyle: props.overlayHoveredStyle,
  offset: props.overlayOffset,
  pressed: pressed.value,
  pressedStyle: props.overlayPressedStyle,
  radius: props.overlayRadius,
  showFocusRing: !props.isUsingCustomFocusRing,
  xstyle: props.overlayXStyle,
}))

const overlayVNode = computed<VNode | null>(() =>
  showOverlay.value ? h(CometPressableOverlay, overlayProps.value) : null,
)

const slotState = computed(() => ({
  disabled: effectiveDisabled.value,
  focused: focused.value,
  focusVisible: focusVisible.value,
  hovered: hovered.value,
  overlay: overlayVNode.value,
  pressed: pressed.value,
}))

const sharedBranchProps = computed(() => ({
  ...passthroughAttrs.value,
  disabled: effectiveDisabled.value,
  display: normalizedDisplay.value,
  onBlur: props.onFocusOut,
  onClick: handlePress.value,
  onContextMenu: props.onContextMenu,
  onFocus: props.onFocusIn,
  onFocusChange: onFocusChangeHandler,
  onFocusVisibleChange: onFocusVisibleChangeHandler,
  onHoverChange: onHoverChangeHandler,
  onHoverEnd: props.onHoverOut,
  onHoverMove: props.onHoverMove,
  onHoverStart: props.onHoverIn,
  onPressChange: onPressChangesHandler,
  onPressEnd: props.onPressOut,
  onPressStart: props.onPressIn,
  preventContextMenu: props.preventContextMenu,
  style: interactiveStyle.value as unknown as WebPressableProps['style'],
  suppressFocusRing: true,
  xstyle: interactiveXStyle.value,
}))

const baseButtonProps = computed(() => ({
  ...sharedBranchProps.value,
  allowClickEventPropagation: props.allowClickEventPropagation,
}))

const baseLinkProps = computed(() => ({
  ...sharedBranchProps.value,
  attributionsrc: props.linkProps?.attributionsrc,
  download: props.linkProps?.download,
  href: props.linkProps?.url,
  rel: props.linkProps?.rel,
  target: props.linkProps?.target,
}))

function handleRawContextMenu(event: MouseEvent): void {
  props.onContextMenu?.(event)
}
</script>
