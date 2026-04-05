<template>
  <component
    :is="resolvedTag"
    v-if="validationError == null"
    ref="elementRef"
    v-bind="passthroughAttrs"
    :id="nativeID"
    :class="resolvedStyling.className"
    :style="resolvedStyles"
    :draggable="draggable"
    :tabindex="tabIndex"
    :role="domRole"
    :dir="directionAttr"
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
    :aria-expanded="accessibilityState?.expanded"
    :aria-haspopup="accessibilityRelationship?.haspopup"
    :aria-hidden="isHidden"
    :aria-invalid="accessibilityState?.invalid"
    :aria-labelledby="accessibilityRelationship?.labelledby"
    :aria-owns="accessibilityRelationship?.owns"
    :aria-pressed="accessibilityState?.pressed"
    :aria-readonly="accessibilityState?.readonly"
    :aria-required="accessibilityState?.required"
    :aria-selected="accessibilityState?.selected"
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
  watchEffect,
  type StyleValue,
} from 'vue'

import { resolveStyling, type StyleCapableValue } from '../../utils/resolveStyling'
import { usePressability } from './composables/usePressability'
import { useTouchStartHandler } from './composables/useTouchStartHandler'
import { shouldPreventLinkNavigation } from './utils/pressable.utils'
import {
  PRESSABLE_GROUP_KEY,
  type PressabilityOptions,
  type PressableGroupContext,
  type PressableState,
  type PressableTextProps,
} from './types'

defineOptions({
  inheritAttrs: false,
})

const SPECIAL_LINK_ROLES = ['menuitem', 'tab', 'none'] as const
const SPACE_PRESS_ROLES = new Set([
  'button',
  'combobox',
  'menuitem',
  'menuitemradio',
  'option',
  'tab',
])

const props = withDefaults(defineProps<PressableTextProps>(), {
  direction: undefined,
  disabled: false,
  draggable: undefined,
  focusable: undefined,
  preventContextMenu: undefined,
  preventDefault: undefined,
  selectable: undefined,
  suppressFocusRing: false,
})

const attrs = useAttrs()
const pressableGroupContext = inject<PressableGroupContext | undefined>(PRESSABLE_GROUP_KEY, undefined) ?? null
const elementRef = ref<HTMLElement | null>(null)
const warnedValidationMessage = ref<string | null>(null)
const isFocused = ref(false)
const isFocusVisibleRaw = ref(false)
const isHovered = ref(false)
const isPressed = ref(false)

defineExpose({ el: elementRef })

const resolveTextTag = (
  role: string | undefined,
  link: PressableTextProps['link'],
): string => {
  if ((link?.url != null && link.url !== '#') || (role != null && SPECIAL_LINK_ROLES.includes(role as (typeof SPECIAL_LINK_ROLES)[number]) && link?.url != null)) {
    return 'a'
  }

  switch (role) {
    case 'article':
      return 'article'
    case 'banner':
      return 'header'
    case 'complementary':
      return 'aside'
    case 'contentinfo':
      return 'footer'
    case 'figure':
      return 'figure'
    case 'form':
      return 'form'
    case 'heading':
      return 'h1'
    case 'label':
      return 'label'
    case 'link':
      return 'a'
    case 'list':
      return 'ul'
    case 'listitem':
      return 'li'
    case 'main':
      return 'main'
    case 'navigation':
      return 'nav'
    case 'none':
      return 'div'
    case 'region':
      return 'section'
    default:
      return 'div'
  }
}

const shouldTriggerKeyboardPressText = (e: KeyboardEvent): boolean => {
  const target = e.target as HTMLElement
  const tagName = target.tagName
  const isNativeInteractive =
    target.isContentEditable
    || (tagName === 'A' && (target as HTMLAnchorElement).href != null)
    || tagName === 'BUTTON'
    || tagName === 'INPUT'
    || tagName === 'SELECT'
    || tagName === 'TEXTAREA'

  if (target.tabIndex !== 0 || isNativeInteractive) {
    return false
  }

  if (e.key === 'Enter') {
    return true
  }

  if (e.key === ' ' || e.key === 'Spacebar') {
    const role = target.getAttribute('role')
    return role != null && SPACE_PRESS_ROLES.has(role)
  }

  return false
}

const getValidationError = (): string | null => {
  const role = props.accessibilityRole
  const link = props.link

  if (role === 'link' && link == null) {
    return "The 'link' prop is required with an 'accessibilityRole' of 'link'."
  }

  if (link != null) {
    const linkUrl = (link as { url?: unknown }).url

    if (role === 'link' || (role != null && SPECIAL_LINK_ROLES.includes(role as (typeof SPECIAL_LINK_ROLES)[number]))) {
      if (typeof linkUrl !== 'string') {
        return "The value of 'link.url' must be a valid string."
      }

      if (linkUrl === '') {
        return "An empty string is not valid for 'link.url'. Did you mean '#'?"
      }
    } else if (link.url != null && link.url !== '' && link.url !== '#') {
      return `The 'link' prop can only be used with an 'accessibilityRole' of 'link', ${SPECIAL_LINK_ROLES.toString()}`
    }
  }

  return null
}

const validationError = computed(() => getValidationError())

watchEffect(() => {
  if (!import.meta.env.DEV || validationError.value == null) {
    return
  }

  if (warnedValidationMessage.value === validationError.value) {
    return
  }

  console.warn(`[PressableText] ${validationError.value}`)
  warnedValidationMessage.value = validationError.value
})

const baseRootClasses = [
  '[WebkitTapHighlightColor:transparent]',
  'bg-transparent',
  '[border-top-style:none]',
  '[border-inline-end-style:none]',
  '[border-bottom-style:none]',
  '[border-inline-start-style:none]',
  'border-t-0',
  '[border-inline-end-width:0]',
  'border-b-0',
  '[border-inline-start-width:0]',
  'box-border',
  'cursor-pointer',
  'inline',
  'list-none',
  'm-0',
  'p-0',
  '[text-align:inherit]',
  'no-underline',
  'touch-manipulation',
].join(' ')

const disabledClasses = 'cursor-not-allowed'
const focusNotVisibleClasses = 'outline-none'
const linkFocusRingClasses = '[outline:var(--focus-ring-outline-link)]'
const notSelectableClasses = '[-webkit-user-select:none]'
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

const resolvedTag = computed(() => resolveTextTag(props.accessibilityRole, props.link))
const isAnchorElement = computed(() => resolvedTag.value === 'a' && !isDisabled.value)
const isAnchorOrButtonRole = computed(() => resolvedTag.value === 'a' || props.accessibilityRole === 'button')

const shouldDownload = computed(() => {
  const download = props.link?.download
  return (download === true || typeof download === 'string') && isAnchorElement.value
})

const pressableState = computed<PressableState>(() => ({
  disabled: isDisabled.value || props.testOnly_state?.disabled === true,
  focused: isFocused.value || props.testOnly_state?.focused === true,
  focusVisible: (isFocusVisibleRaw.value && props.suppressFocusRing !== true) || props.testOnly_state?.focusVisible === true,
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
    props.selectable === false && notSelectableClasses,
    pressableState.value.disabled && disabledClasses,
    !pressableState.value.focusVisible && focusNotVisibleClasses,
    pressableState.value.focusVisible && isAnchorOrButtonRole.value && linkFocusRingClasses,
    resolvedXstyle.value,
    pressableGroupContext != null && rootInGroupClasses,
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

const directionAttr = computed(() => props.direction === 'none' ? undefined : props.direction)
const domRole = computed(() => props.accessibilityRole === 'none' ? 'presentation' : props.accessibilityRole)

const ariaDisabled = computed(() =>
  isDisabled.value && domRole.value !== 'presentation'
    ? true
    : undefined,
)

const tabIndex = computed<number | undefined>(() => {
  if (isAnchorOrButtonRole.value) {
    return isHidden.value === true || props.focusable === false || isDisabled.value ? -1 : 0
  }

  if (!isDisabled.value && isHidden.value !== true && props.focusable !== false && props.accessibilityRole !== 'none') {
    return 0
  }

  return undefined
})

function handleClick(e: MouseEvent): void {
  if (isDisabled.value) {
    return
  }

  props.onPress?.(e)
  if (props.onPress != null || props.link != null) {
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

  if (shouldTriggerKeyboardPressText(e)) {
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault()
    }

    if (props.onPress != null) {
      props.onPress(e)
      e.stopPropagation()
    }
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
    isFocusVisibleRaw.value = value
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
    return props.preventContextMenu
  },
  get preventDefault() {
    return props.preventDefault ?? true
  },
}

const clickHandlerRef = computed<(e: Event) => void>(() => handleClick as (e: Event) => void)

usePressability(elementRef, pressabilityOptions)
useTouchStartHandler(elementRef, pressableGroupContext, clickHandlerRef)
</script>
