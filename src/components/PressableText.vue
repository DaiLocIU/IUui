<template>
  <component
    :is="tagName"
    ref="rootRef"
    v-bind="forwardedAttrs"
    :aria-activedescendant="accessibilityRelationship?.activedescendant"
    :aria-busy="accessibilityState?.busy"
    :aria-checked="accessibilityState?.checked"
    :aria-controls="accessibilityRelationship?.controls"
    :aria-current="accessibilityRelationship?.current"
    :aria-describedby="accessibilityRelationship?.describedby"
    :aria-details="accessibilityRelationship?.details"
    :aria-disabled="resolvedDisabled && normalizedRole !== 'presentation' ? resolvedDisabled : undefined"
    :aria-expanded="accessibilityState?.expanded"
    :aria-haspopup="accessibilityRelationship?.haspopup"
    :aria-hidden="hiddenState || undefined"
    :aria-invalid="accessibilityState?.invalid"
    :aria-label="accessibilityLabel"
    :aria-labelledby="accessibilityRelationship?.labelledby"
    :aria-owns="accessibilityRelationship?.owns"
    :aria-pressed="accessibilityState?.pressed"
    :aria-readonly="accessibilityState?.readonly"
    :aria-required="accessibilityState?.required"
    :aria-selected="accessibilityState?.selected"
    :attributionsrc="isEnabledLink ? link?.attributionsrc : undefined"
    :class="[baseClassName, ...resolvedStyling.className, attrs.class]"
    :dir="resolvedDirection"
    :download="downloadAttribute"
    :draggable="draggable"
    :href="isEnabledLink ? link?.url : undefined"
    :id="nativeID"
    :rel="isEnabledLink ? link?.rel : undefined"
    :role="normalizedRole"
    :style="[...resolvedStyling.style, attrs.style]"
    :tabindex="resolvedTabIndex"
    :target="isEnabledLink ? link?.target : undefined"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <slot v-bind="resolvedState" />
  </component>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import type { StyleValue } from 'vue'

import { useWebPressability } from '../composables/useWebPressability'
import { useWebPressableTouchStartHandler } from '../composables/useWebPressableTouchStartHandler'
import { useWebPressableGroupContext } from '../system/webPressableKeys'
import { resolveStyling, type StyleCapableValue } from '../utils/resolveStyling'
import {
  getPressableTag,
  shouldHandleKeyboardPress,
  shouldPreventDefaultForClick,
  type AccessibilityRelationship,
  type AccessibilityState,
  type PressableLink,
  type PressableState,
} from '../utils/webPressable'

defineOptions({
  inheritAttrs: false,
})

type PressableTextRole =
  | 'article'
  | 'banner'
  | 'button'
  | 'complementary'
  | 'contentinfo'
  | 'figure'
  | 'form'
  | 'heading'
  | 'label'
  | 'link'
  | 'list'
  | 'listitem'
  | 'main'
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio'
  | 'navigation'
  | 'none'
  | 'region'
  | 'tab'

const LINKISH_ROLES = new Set(['menuitem', 'tab', 'none'])

export interface TestOnlyState extends Partial<PressableState> {}

export interface Props {
  accessibilityLabel?: string
  accessibilityRelationship?: AccessibilityRelationship
  accessibilityRole?: PressableTextRole | string
  accessibilityState?: AccessibilityState
  children?: unknown
  className_DEPRECATED?: StyleCapableValue | ((state: PressableState) => StyleCapableValue)
  direction?: 'auto' | 'ltr' | 'rtl' | 'none'
  disabled?: boolean
  draggable?: boolean
  focusable?: boolean
  forwardedRef?: unknown
  link?: PressableLink
  nativeID?: string
  onBlur?: (event: FocusEvent) => void
  onContextMenu?: (event: MouseEvent) => void
  onFocus?: (event: FocusEvent) => void
  onFocusChange?: (value: boolean) => void
  onFocusVisibleChange?: (value: boolean) => void
  onHoverChange?: (value: boolean) => void
  onHoverEnd?: (event: unknown) => void
  onHoverMove?: (event: unknown) => void
  onHoverStart?: (event: unknown) => void
  onPress?: (event: MouseEvent | KeyboardEvent) => void
  onPressChange?: (value: boolean) => void
  onPressEnd?: (event: unknown) => void
  onPressMove?: (event: unknown) => void
  onPressStart?: (event: unknown) => void
  preventContextMenu?: boolean
  preventDefault?: boolean
  selectable?: boolean
  style?: StyleCapableValue | ((state: PressableState) => StyleCapableValue)
  suppressFocusRing?: boolean
  testID?: string
  testOnly_state?: TestOnlyState
  xstyle?: StyleCapableValue | ((state: PressableState) => StyleCapableValue)
}

const props = withDefaults(defineProps<Props>(), {
  accessibilityLabel: undefined,
  accessibilityRelationship: undefined,
  accessibilityRole: undefined,
  accessibilityState: undefined,
  className_DEPRECATED: undefined,
  direction: undefined,
  disabled: false,
  draggable: undefined,
  focusable: undefined,
  forwardedRef: undefined,
  link: undefined,
  nativeID: undefined,
  onBlur: undefined,
  onContextMenu: undefined,
  onFocus: undefined,
  onFocusChange: undefined,
  onFocusVisibleChange: undefined,
  onHoverChange: undefined,
  onHoverEnd: undefined,
  onHoverMove: undefined,
  onHoverStart: undefined,
  onPress: undefined,
  onPressChange: undefined,
  onPressEnd: undefined,
  onPressMove: undefined,
  onPressStart: undefined,
  preventContextMenu: undefined,
  preventDefault: true,
  selectable: true,
  style: undefined,
  suppressFocusRing: false,
  testID: undefined,
  testOnly_state: undefined,
  xstyle: undefined,
})

const attrs = useAttrs()
const rootRef = ref<HTMLElement | null>(null)
const groupContext = useWebPressableGroupContext()

const baseClassName = 'box-border relative z-0 touch-manipulation'

const rootBaseStyle = {
  WebkitTapHighlightColor: 'transparent',
  backgroundColor: 'transparent',
  border: '0 solid transparent',
  margin: 0,
  padding: 0,
  textDecoration: 'none',
} as const

const disabledStyle = {
  cursor: 'not-allowed',
} as const

const focusNotVisibleStyle = {
  outline: 'none',
} as const

const linkFocusRingStyle = {
  outline: '2px solid #1d4ed8',
  outlineOffset: '2px',
} as const

const notSelectableStyle = {
  userSelect: 'none',
} as const

const rootInGroupStyle = {
  touchAction: 'auto',
} as const

const resolvedDisabled = computed(
  () => props.disabled === true || props.accessibilityState?.disabled === true,
)
const hiddenState = computed(() => props.accessibilityState?.hidden === true)
const tagName = computed(() => {
  if ((props.link?.url != null && props.link.url !== '#') || LINKISH_ROLES.has(props.accessibilityRole ?? '')) {
    return getPressableTag(props.accessibilityRole, props.link)
  }

  return getPressableTag(props.accessibilityRole, undefined)
})
const isEnabledLink = computed(
  () => tagName.value === 'a' && resolvedDisabled.value !== true,
)

const {
  focused,
  focusVisible,
  hovered,
  pressed,
} = useWebPressability(rootRef, {
  disabled: resolvedDisabled,
  onBlur: props.onBlur,
  onContextMenu: props.onContextMenu,
  onFocus: props.onFocus,
  onFocusChange: props.onFocusChange,
  onFocusVisibleChange: props.onFocusVisibleChange,
  onHoverChange: props.onHoverChange,
  onHoverEnd: props.onHoverEnd as ((event: any) => void) | undefined,
  onHoverMove: props.onHoverMove as ((event: any) => void) | undefined,
  onHoverStart: props.onHoverStart as ((event: any) => void) | undefined,
  onPressChange: props.onPressChange,
  onPressEnd: props.onPressEnd as ((event: any) => void) | undefined,
  onPressMove: props.onPressMove as ((event: any) => void) | undefined,
  onPressStart: props.onPressStart as ((event: any) => void) | undefined,
  preventContextMenu: props.preventContextMenu,
})

const resolvedState = computed<PressableState>(() => ({
  disabled:
    resolvedDisabled.value === true ||
    props.testOnly_state?.disabled === true ||
    false,
  focused: focused.value || props.testOnly_state?.focused === true,
  focusVisible:
    (focusVisible.value && props.suppressFocusRing !== true) ||
    props.testOnly_state?.focusVisible === true,
  hovered: hovered.value || props.testOnly_state?.hovered === true,
  pressed: pressed.value || props.testOnly_state?.pressed === true,
}))

const resolvedClassName = computed(() =>
  typeof props.className_DEPRECATED === 'function'
    ? props.className_DEPRECATED(resolvedState.value)
    : props.className_DEPRECATED,
)
const resolvedStyleInput = computed(() =>
  typeof props.style === 'function' ? props.style(resolvedState.value) : props.style,
)
const resolvedXStyle = computed(() =>
  typeof props.xstyle === 'function' ? props.xstyle(resolvedState.value) : props.xstyle,
)

const resolvedStyling = computed(() =>
  resolveStyling(
    rootBaseStyle,
    props.selectable === false ? notSelectableStyle : undefined,
    resolvedState.value.disabled ? disabledStyle : undefined,
    !resolvedState.value.focusVisible ? focusNotVisibleStyle : undefined,
    resolvedState.value.focusVisible && (tagName.value === 'a' || props.accessibilityRole === 'button')
      ? linkFocusRingStyle
      : undefined,
    groupContext != null ? rootInGroupStyle : undefined,
    resolvedXStyle.value,
    resolvedStyleInput.value,
    resolvedClassName.value,
  ),
)

const resolvedDirection = computed(() =>
  props.direction == null || props.direction === 'none' ? undefined : props.direction,
)

const resolvedTabIndex = computed(() => {
  const rendersLinkOrButton = tagName.value === 'a' || props.accessibilityRole === 'button'

  if (rendersLinkOrButton) {
    return hiddenState.value === true || props.focusable === false || resolvedDisabled.value
      ? -1
      : 0
  }

  if (
    resolvedDisabled.value !== true &&
    hiddenState.value !== true &&
    props.focusable !== false &&
    props.accessibilityRole !== 'none'
  ) {
    return 0
  }

  return undefined
})

const downloadAttribute = computed(() => {
  const download = props.link?.download

  return (download === true || typeof download === 'string') && isEnabledLink.value
    ? download
    : undefined
})

const normalizedRole = computed(() => {
  if (props.accessibilityRole === 'none') {
    return 'presentation'
  }

  if (props.accessibilityRole === 'label') {
    return undefined
  }

  return props.accessibilityRole
})

const forwardedAttrs = computed(() => {
  const {
    testid: _testid,
    'data-testid': _dataTestid,
    class: _class,
    style: _style,
    tabindex: _tabIndex,
    tabIndex: _tabIndexAlt,
    ...rest
  } = attrs as Record<string, unknown>

  void _testid
  void _dataTestid
  void _class
  void _style
  void _tabIndex
  void _tabIndexAlt

  return {
    ...rest,
    ...(props.testID != null ? { 'data-testid': props.testID } : {}),
  }
})

const handleClick = (event: MouseEvent): void => {
  if (resolvedDisabled.value) {
    return
  }

  props.onPress?.(event)

  if ((props.onPress != null || props.link != null) && shouldPreventDefaultForClick(event, false)) {
    event.stopPropagation()
  } else if ((props.onPress != null || props.link != null) && props.preventDefault !== false) {
    event.stopPropagation()
  }

  if (shouldPreventDefaultForClick(event, props.preventDefault)) {
    event.preventDefault()
  }
}

const handleKeyDown = (event: KeyboardEvent): void => {
  if (resolvedDisabled.value) {
    return
  }

  if (shouldHandleKeyboardPress(event)) {
    if (event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault()
    }

    props.onPress?.(event)
    event.stopPropagation()
  }
}

useWebPressableTouchStartHandler(rootRef, groupContext, (event) => {
  handleClick(event as unknown as MouseEvent)
})

defineExpose({
  el: rootRef,
})
</script>
