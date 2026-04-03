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
    :aria-disabled="resolvedDisabled && accessibilityRole !== 'none' ? resolvedDisabled : undefined"
    :aria-errormessage="accessibilityRelationship?.errormessage"
    :aria-expanded="accessibilityState?.expanded"
    :aria-haspopup="accessibilityRelationship?.haspopup"
    :aria-hidden="isHidden || undefined"
    :aria-invalid="accessibilityState?.invalid"
    :aria-label="accessibilityLabel"
    :aria-labelledby="accessibilityRelationship?.labelledby"
    :aria-modal="accessibilityState?.modal"
    :aria-orientation="accessibilityState?.orientation"
    :aria-owns="accessibilityRelationship?.owns"
    :aria-pressed="accessibilityState?.pressed"
    :aria-readonly="accessibilityState?.readonly"
    :aria-required="accessibilityState?.required"
    :aria-selected="accessibilityState?.selected"
    :aria-valuemax="accessibilityValue?.max"
    :aria-valuemin="accessibilityValue?.min"
    :aria-valuenow="accessibilityValue?.now"
    :aria-valuetext="accessibilityValue?.text"
    :attributionsrc="isEnabledLink ? link?.attributionsrc : undefined"
    :class="[baseClassName, ...resolvedStyling.className, attrs.class]"
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

import { useWebPressability } from '../composables/useWebPressability'
import { useWebPressableTouchStartHandler } from '../composables/useWebPressableTouchStartHandler'
import { useWebPressableGroupContext } from '../system/webPressableKeys'
import { resolveStyling, type StyleCapableValue } from '../utils/resolveStyling'
import {
  getPressableTag,
  normalizeRole,
  shouldHandleKeyboardPress,
  shouldPreventDefaultForClick,
  type AccessibilityRelationship,
  type AccessibilityState,
  type AccessibilityValue,
  type PressableLink,
  type PressableState,
} from '../utils/webPressable'

defineOptions({
  inheritAttrs: false,
})

export interface TestOnlyState extends Partial<PressableState> {}

export interface Props {
  accessibilityLabel?: string
  accessibilityRelationship?: AccessibilityRelationship
  accessibilityRole?: string
  accessibilityState?: AccessibilityState
  accessibilityValue?: AccessibilityValue
  allowClickEventPropagation?: boolean
  className_DEPRECATED?: StyleCapableValue | ((state: PressableState) => StyleCapableValue)
  disabled?: boolean
  draggable?: boolean
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
  onKeyDown?: (event: KeyboardEvent) => void
  onPress?: (event: MouseEvent | KeyboardEvent) => void
  onPressChange?: (value: boolean) => void
  onPressEnd?: (event: unknown) => void
  onPressMove?: (event: unknown) => void
  onPressStart?: (event: unknown) => void
  preventContextMenu?: boolean
  preventDefault?: boolean
  style?: StyleCapableValue | ((state: PressableState) => StyleCapableValue)
  suppressFocusRing?: boolean
  tabbable?: boolean
  testID?: string
  testOnly_state?: TestOnlyState
  xstyle?: StyleCapableValue | ((state: PressableState) => StyleCapableValue)
}

const props = withDefaults(defineProps<Props>(), {
  accessibilityLabel: undefined,
  accessibilityRelationship: undefined,
  accessibilityRole: undefined,
  accessibilityState: undefined,
  accessibilityValue: undefined,
  allowClickEventPropagation: false,
  className_DEPRECATED: undefined,
  disabled: false,
  draggable: undefined,
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
  onKeyDown: undefined,
  onPress: undefined,
  onPressChange: undefined,
  onPressEnd: undefined,
  onPressMove: undefined,
  onPressStart: undefined,
  preventContextMenu: undefined,
  preventDefault: true,
  style: undefined,
  suppressFocusRing: false,
  tabbable: undefined,
  testID: undefined,
  testOnly_state: undefined,
  xstyle: undefined,
})

const attrs = useAttrs()
const rootRef = ref<HTMLElement | null>(null)
const groupContext = useWebPressableGroupContext()
const baseClassName = 'box-border flex min-h-0 min-w-0 shrink-0 flex-col items-stretch justify-end'

const rootBaseStyle = {
  WebkitTapHighlightColor: 'transparent',
  alignItems: 'stretch',
  backgroundColor: 'transparent',
  border: '0 solid transparent',
  boxSizing: 'border-box',
  cursor: 'pointer',
  display: 'flex',
  flexBasis: 'auto',
  flexDirection: 'column',
  flexShrink: 0,
  listStyle: 'none',
  margin: 0,
  minHeight: 0,
  minWidth: 0,
  padding: 0,
  position: 'relative',
  textAlign: 'inherit',
  textDecoration: 'none',
  touchAction: 'manipulation',
  zIndex: 0,
} as const

const disabledStyle = {
  cursor: 'not-allowed',
} as const

const focusNotVisibleStyle = {
  outline: 'none',
} as const

const rootInGroupStyle = {
  touchAction: 'auto',
} as const

const resolvedDisabled = computed(
  () => props.disabled === true || props.accessibilityState?.disabled === true,
)
const isHidden = computed(() => props.accessibilityState?.hidden === true)
const tagName = computed(() => getPressableTag(props.accessibilityRole, props.link))
const normalizedRole = computed(() => normalizeRole(props.accessibilityRole))
const isEnabledLink = computed(
  () => tagName.value === 'a' && resolvedDisabled.value !== true,
)
const isGrouped = computed(() => groupContext != null)

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
  focusVisible:
    focusVisible.value || props.testOnly_state?.focusVisible === true,
  focused: focused.value || props.testOnly_state?.focused === true,
  hovered: hovered.value || props.testOnly_state?.hovered === true,
  pressed: pressed.value || props.testOnly_state?.pressed === true,
}))

const hideFocusRing = computed(
  () => !resolvedState.value.focusVisible || props.suppressFocusRing === true,
)

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
    resolvedDisabled.value && disabledStyle,
    hideFocusRing.value && focusNotVisibleStyle,
    isGrouped.value && rootInGroupStyle,
    resolvedXStyle.value,
    resolvedStyleInput.value,
    resolvedClassName.value,
  ),
)

const resolvedTabIndex = computed(() => {
  if (
    resolvedDisabled.value !== true &&
    isHidden.value !== true &&
    props.tabbable !== false
  ) {
    return 0
  }

  return -1
})

const downloadAttribute = computed(() => {
  const download = props.link?.download

  return (download === true || typeof download === 'string') && isEnabledLink.value
    ? download
    : undefined
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

  if ((props.onPress != null || props.link != null) && props.allowClickEventPropagation !== true) {
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

  props.onKeyDown?.(event)

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
