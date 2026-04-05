<template>
  <component
    :is="resolvedTag"
    ref="elementRef"
    v-bind="passthroughAttrs"
    :id="nativeID"
    :class="resolvedStyling.className"
    :style="resolvedStyles"
    :draggable="draggable"
    :tabindex="tabIndex"
    :role="filteredRole"
    :href="isAnchorElement ? link?.url : undefined"
    :rel="isAnchorElement ? link?.rel : undefined"
    :target="isAnchorElement ? link?.target : undefined"
    :download="shouldDownload ? link?.download : undefined"
    :attributionsrc="isAnchorElement ? link?.attributionsrc : undefined"
    :aria-label="accessibilityLabel"
    :aria-activedescendant="accessibilityRelationship?.activedescendant"
    :aria-busy="accessibilityState?.busy"
    :aria-checked="accessibilityState?.checked"
    :aria-controls="accessibilityRelationship?.controls"
    :aria-current="accessibilityRelationship?.current"
    :aria-describedby="accessibilityRelationship?.describedby"
    :aria-details="accessibilityRelationship?.details"
    :aria-disabled="ariaDisabled"
    :aria-errormessage="accessibilityRelationship?.errormessage"
    :aria-expanded="accessibilityState?.expanded"
    :aria-haspopup="accessibilityRelationship?.haspopup"
    :aria-hidden="isHidden"
    :aria-invalid="accessibilityState?.invalid"
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
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <slot v-bind="pressableState" />
  </component>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  ref,
  useAttrs,
  type StyleValue,
} from 'vue'

import { resolveStyling, type StyleCapableValue } from '../../utils/resolveStyling'
import { usePressability } from './composables/usePressability'
import { useTouchStartHandler } from './composables/useTouchStartHandler'
import {
  filterRoleForDOM,
  resolveTag,
  shouldPreventLinkNavigation,
  shouldTriggerKeyboardPress,
} from './utils/pressable.utils'
import {
  PRESSABLE_GROUP_KEY,
  type PressabilityOptions,
  type PressableGroupContext,
  type PressableState,
  type WebPressableProps,
} from './types'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<WebPressableProps>(), {
  allowClickEventPropagation: false,
  disabled: false,
  suppressFocusRing: false,
  tabbable: true,
})

const attrs = useAttrs()
const pressableGroupContext = inject<PressableGroupContext | undefined>(PRESSABLE_GROUP_KEY, undefined) ?? null
const elementRef = ref<HTMLElement | null>(null)
const isFocused = ref(false)
const isFocusVisible = ref(false)
const isHovered = ref(false)
const isPressed = ref(false)

defineExpose({ el: elementRef })

const baseRootClasses = [
  '[WebkitTapHighlightColor:transparent]',
  'items-stretch',
  'bg-transparent',
  '[border-top-style:solid]',
  '[border-inline-end-style:solid]',
  '[border-bottom-style:solid]',
  '[border-inline-start-style:solid]',
  'border-t-0',
  '[border-inline-end-width:0]',
  'border-b-0',
  '[border-inline-start-width:0]',
  'box-border',
  'cursor-pointer',
  'flex',
  'basis-auto',
  'flex-col',
  'shrink-0',
  'list-none',
  'm-0',
  'min-h-0',
  'min-w-0',
  'p-0',
  'relative',
  '[text-align:inherit]',
  'no-underline',
  'touch-manipulation',
  'z-0',
].join(' ')

const disabledClasses = 'cursor-not-allowed'
const focusNotVisibleClasses = 'outline-none'
const rootInGroupClasses = '[touch-action:none]'

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

const isDisabled = computed(() =>
  props.disabled === true || props.accessibilityState?.disabled === true,
)

const isHidden = computed(() => props.accessibilityState?.hidden)

const resolvedTag = computed(() => resolveTag(props.accessibilityRole, props.link))

const isAnchorElement = computed(() =>
  resolvedTag.value === 'a' && !isDisabled.value,
)

const shouldDownload = computed(() => {
  const download = props.link?.download
  return (download === true || typeof download === 'string') && isAnchorElement.value
})

const pressableState = computed<PressableState>(() => ({
  disabled: isDisabled.value || props.testOnly_state?.disabled === true,
  focused: isFocused.value || props.testOnly_state?.focused === true,
  focusVisible: isFocusVisible.value || props.testOnly_state?.focusVisible === true,
  hovered: isHovered.value || props.testOnly_state?.hovered === true,
  pressed: isPressed.value || props.testOnly_state?.pressed === true,
}))

const resolvedXstyle = computed(() => {
  const xstyle = props.xstyle
  return typeof xstyle === 'function' ? xstyle(pressableState.value) : xstyle
})

const resolvedClassName = computed(() => {
  const className = props.className
  return typeof className === 'function'
    ? className(pressableState.value)
    : className
})

const resolvedInlineStyle = computed(() => {
  const style = props.style
  return typeof style === 'function'
    ? style(pressableState.value)
    : style
})

const resolvedStyling = computed(() =>
  resolveStyling(
    baseRootClasses,
    pressableState.value.disabled && disabledClasses,
    (!pressableState.value.focusVisible || props.suppressFocusRing === true) && focusNotVisibleClasses,
    pressableGroupContext != null && rootInGroupClasses,
    resolvedXstyle.value,
    resolvedClassName.value,
    resolvedInlineStyle.value,
    attrs.class as StyleCapableValue,
  ),
)

const resolvedStyles = computed<StyleValue[]>(() => {
  const styles = [...resolvedStyling.value.style]

  if (attrs.style != null) {
    styles.push(attrs.style as StyleValue)
  }

  return styles
})

const filteredRole = computed(() => filterRoleForDOM(props.accessibilityRole))

const ariaDisabled = computed(() =>
  isDisabled.value && props.accessibilityRole !== 'none'
    ? true
    : undefined,
)

const tabIndex = computed(() => {
  if (isDisabled.value || isHidden.value || props.tabbable === false) {
    return -1
  }

  return 0
})

function handleClick(e: MouseEvent): void {
  if (isDisabled.value) {
    return
  }

  props.onPress?.(e)

  if ((props.onPress != null || props.link != null) && !props.allowClickEventPropagation) {
    e.stopPropagation()
  }

  if (shouldPreventLinkNavigation(e, props.preventDefault)) {
    e.preventDefault()
  }
}

function handleKeyDown(e: KeyboardEvent): void {
  if (isDisabled.value) {
    return
  }

  props.onKeyDown?.(e)

  if (!shouldTriggerKeyboardPress(e)) {
    return
  }

  if (e.key === ' ' || e.key === 'Spacebar') {
    e.preventDefault()
  }

  if (props.onPress != null) {
    props.onPress(e)
    e.stopPropagation()
  }
}

const pressabilityOptions: PressabilityOptions = {
  get disabled() {
    return isDisabled.value
  },
  onFocusChange(value) {
    isFocused.value = value
    props.onFocusChange?.(value)
  },
  onFocusVisibleChange(value) {
    isFocusVisible.value = value
    props.onFocusVisibleChange?.(value)
  },
  onFocus: props.onFocus,
  onBlur: props.onBlur,
  onHoverChange(value) {
    isHovered.value = value
    props.onHoverChange?.(value)
  },
  onHoverStart: props.onHoverStart,
  onHoverEnd: props.onHoverEnd,
  onHoverMove: props.onHoverMove,
  onPressChange(value) {
    isPressed.value = value
    props.onPressChange?.(value)
  },
  onPressStart: props.onPressStart,
  onPressEnd: props.onPressEnd,
  onPressMove: props.onPressMove,
  onContextMenu: props.onContextMenu,
  get preventContextMenu() {
    return props.preventContextMenu ?? false
  },
  get preventDefault() {
    return props.preventDefault ?? true
  },
}

const clickHandlerRef = computed<(e: Event) => void>(() => handleClick as (e: Event) => void)

usePressability(elementRef, pressabilityOptions)
useTouchStartHandler(elementRef, pressableGroupContext, clickHandlerRef)
</script>
