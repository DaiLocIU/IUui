<template>
  <component
    :is="nestedTag"
    v-if="isNestedLink"
    v-bind="passthroughAttrs"
    :id="id"
    :class="nestedResolvedStyling.className"
    :style="nestedResolvedStyles"
    :draggable="draggable"
    :role="normalizedRole"
    :tabindex="nestedTabIndex"
    :aria-activedescendant="accessibilityRelationship.activedescendant"
    :aria-checked="accessibilityState.checked"
    :aria-controls="accessibilityRelationship.controls"
    :aria-current="accessibilityRelationship.current"
    :aria-describedby="accessibilityRelationship.describedby"
    :aria-disabled="ariaDisabled"
    :aria-expanded="accessibilityState.expanded"
    :aria-haspopup="accessibilityRelationship.haspopup"
    :aria-hidden="accessibilityState.hidden"
    :aria-invalid="accessibilityState.invalid"
    :aria-label="resolvedLabel"
    :aria-labelledby="accessibilityRelationship.labelledby"
    :aria-owns="accessibilityRelationship.owns"
    :aria-selected="accessibilityState.selected"
    @blur="handleNestedBlur"
    @click="handleNestedClick"
    @contextmenu="handleNestedContextMenu"
    @focus="handleNestedFocus"
    @keydown="handleNestedKeyDown"
    @mouseleave="handleNestedHoverEnd"
    @mousemove="handleNestedHoverMove"
    @mouseenter="handleNestedHoverStart"
  >
    <slot />
  </component>
  <component
    :is="isBlockDisplay ? WebPressable : PressableText"
    v-else
    v-bind="resolvedPressableProps"
  >
    <BaseLinkNestedProvider>
      <slot />
    </BaseLinkNestedProvider>
  </component>
</template>

<script setup lang="ts">
import {
  computed,
  defineComponent,
  inject,
  provide,
  ref,
  unref,
  useAttrs,
  type CSSProperties,
  type StyleValue,
} from 'vue'

import PressableText from './WebPressable/PressableText.vue'
import WebPressable from './WebPressable/WebPressable.vue'
import { resolveStyling } from '../utils/resolveStyling'
import { createHoverEvent, shouldTriggerKeyboardPress } from './WebPressable/utils/pressable.utils'
import { LINK_DEFAULT_TARGET_KEY, NESTED_LINK_KEY } from '../system/baseLinkKeys'
import { analyzeHref, buildRelAttribute } from '../utils/link.utils'
import type {
  HoverEvent,
  LinkProps,
  PressEvent,
  PressableState,
  StyleCapableValue,
} from './WebPressable/types'

type BaseLinkDisplay = 'block' | 'inline'

interface BaseLinkProps {
  ariaActivedescendant?: string
  ariaChecked?: boolean | 'mixed'
  ariaControls?: string
  ariaCurrent?: string | boolean
  ariaDescribedby?: string
  ariaExpanded?: boolean
  ariaHaspopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
  ariaHidden?: boolean
  ariaInvalid?: boolean
  ariaLabel?: string
  ariaLabelledby?: string
  ariaOwns?: string
  ariaSelected?: boolean
  attributionsrc?: string | null
  className?: string | ((state: PressableState) => string | undefined)
  disabled?: boolean
  display?: BaseLinkDisplay
  download?: boolean | string
  draggable?: boolean
  focusable?: boolean
  href?: string
  id?: string
  label?: string
  onBlur?: (e: FocusEvent) => void
  onClick?: (e: MouseEvent | KeyboardEvent) => void
  onContextMenu?: (e: MouseEvent) => void
  onFocus?: (e: FocusEvent) => void
  onFocusChange?: (focused: boolean) => void
  onFocusVisibleChange?: (visible: boolean) => void
  onHoverChange?: (hovered: boolean) => void
  onHoverEnd?: (e: HoverEvent) => void
  onHoverMove?: (e: HoverEvent) => void
  onHoverStart?: (e: HoverEvent) => void
  onPressChange?: (pressed: boolean) => void
  onPressEnd?: (e: PressEvent) => void
  onPressMove?: (e: PressEvent) => void
  onPressStart?: (e: PressEvent) => void
  preventContextMenu?: boolean
  preventDefault?: boolean
  preventLocalNavigation?: boolean
  noReferrer?: boolean
  rel?: string | string[]
  role?: string
  style?: CSSProperties | ((state: PressableState) => CSSProperties)
  suppressFocusRing?: boolean
  target?: string
  testID?: string
  testOnlyPressed?: boolean
  xstyle?: StyleCapableValue | ((state: PressableState) => StyleCapableValue)
}

defineOptions({
  inheritAttrs: false,
})

const BLOCK_ROLES = new Set([
  'article',
  'button',
  'checkbox',
  'menuitem',
  'none',
  'radio',
  'switch',
  'tab',
])

const INLINE_ROLES = new Set([
  'button',
  'menuitem',
  'menuitemcheckbox',
  'menuitemradio',
  'none',
  'tab',
])

const props = withDefaults(defineProps<BaseLinkProps>(), {
  disabled: false,
  display: 'inline',
  draggable: undefined,
  focusable: undefined,
  preventContextMenu: undefined,
  preventDefault: undefined,
  preventLocalNavigation: false,
  suppressFocusRing: false,
  target: undefined,
})

const attrs = useAttrs()
const defaultTarget = inject(LINK_DEFAULT_TARGET_KEY, undefined)
const isNestedLink = inject(NESTED_LINK_KEY, false)
const isNestedHovered = ref(false)
const isNestedFocused = ref(false)
const nestedStaticState = computed<PressableState>(() => ({
  disabled: props.disabled === true,
  focused: isNestedFocused.value,
  focusVisible: false,
  hovered: isNestedHovered.value,
  pressed: props.testOnlyPressed === true,
}))

const BaseLinkNestedProvider = defineComponent({
  name: 'BaseLinkNestedProvider',
  setup(_, { slots }) {
    provide(NESTED_LINK_KEY, true)
    return () => slots.default?.()
  },
})

const isBlockDisplay = computed(() => props.display === 'block')

const normalizedRole = computed(() => {
  const role = props.role

  if (isBlockDisplay.value) {
    return role != null && BLOCK_ROLES.has(role) ? role : 'link'
  }

  return role != null && INLINE_ROLES.has(role) ? role : 'link'
})

const resolvedHref = computed(() => props.href ?? '#')
const analysis = computed(() => analyzeHref(props.href))

const resolvedTarget = computed(() =>
  props.target
  ?? unref(defaultTarget)
  ?? (analysis.value.shouldOpenNewTab ? '_blank' : undefined),
)

const resolvedRel = computed(() =>
  buildRelAttribute({
    isExternal: analysis.value.isExternal,
    target: resolvedTarget.value,
    rel: props.rel,
    noReferrer: props.noReferrer,
  }),
)

const resolvedLabel = computed(() =>
  props.label != null && normalizedRole.value !== 'none'
    ? props.label
    : props.ariaLabel,
)

const accessibilityRelationship = computed(() => ({
  activedescendant: props.ariaActivedescendant,
  controls: props.ariaControls,
  current: props.ariaCurrent,
  describedby: props.ariaDescribedby,
  haspopup: props.ariaHaspopup,
  labelledby: props.ariaLabelledby,
  owns: props.ariaOwns,
}))

const accessibilityState = computed(() => ({
  checked: props.ariaChecked,
  disabled: props.disabled,
  expanded: props.ariaExpanded,
  hidden: props.ariaHidden,
  invalid: props.ariaInvalid,
  selected: props.ariaSelected,
}))

const link = computed<LinkProps>(() => ({
  attributionsrc: props.attributionsrc ?? undefined,
  download: props.download,
  rel: resolvedRel.value,
  target: resolvedTarget.value,
  url: resolvedHref.value,
}))

const resolvedPreventDefault = computed(() =>
  props.preventDefault ?? (resolvedHref.value === '#' || props.preventLocalNavigation === true),
)

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

const resolvedNestedClassName = computed(() => {
  const className = props.className
  return typeof className === 'function'
    ? className(nestedStaticState.value)
    : className
})

const resolvedNestedInlineStyle = computed(() => {
  const style = props.style
  return typeof style === 'function'
    ? style(nestedStaticState.value)
    : style
})

const resolvedNestedXStyle = computed(() => {
  const xstyle = props.xstyle
  return typeof xstyle === 'function'
    ? xstyle(nestedStaticState.value)
    : xstyle
})

const nestedResolvedStyling = computed(() =>
  resolveStyling(
    resolvedNestedXStyle.value,
    resolvedNestedClassName.value,
    resolvedNestedInlineStyle.value,
    attrs.class as StyleCapableValue,
  ),
)

const nestedResolvedStyles = computed<StyleValue[]>(() => {
  const styles = [...nestedResolvedStyling.value.style]

  if (attrs.style != null) {
    styles.push(attrs.style as StyleValue)
  }

  return styles
})

const sharedPressableProps = computed(() => ({
  accessibilityLabel: resolvedLabel.value,
  accessibilityRelationship: accessibilityRelationship.value,
  accessibilityRole: normalizedRole.value,
  accessibilityState: accessibilityState.value,
  className: props.className,
  disabled: props.disabled,
  draggable: props.draggable,
  link: link.value,
  nativeID: props.id,
  onBlur: props.onBlur,
  onContextMenu: props.onContextMenu,
  onFocus: props.onFocus,
  onFocusChange: props.onFocusChange,
  onFocusVisibleChange: props.onFocusVisibleChange,
  onHoverChange: props.onHoverChange,
  onHoverEnd: props.onHoverEnd,
  onHoverMove: props.onHoverMove,
  onHoverStart: props.onHoverStart,
  onPress: props.onClick,
  onPressChange: props.onPressChange,
  onPressEnd: props.onPressEnd,
  onPressMove: props.onPressMove,
  onPressStart: props.onPressStart,
  preventContextMenu: props.preventContextMenu,
  preventDefault: resolvedPreventDefault.value,
  style: props.style,
  suppressFocusRing: props.suppressFocusRing,
  testID: props.testID,
  testOnly_state: {
    disabled: false,
    focused: false,
    focusVisible: false,
    hovered: false,
    pressed: props.testOnlyPressed === true,
  },
  xstyle: props.xstyle,
}))

const nestedTag = computed(() => isBlockDisplay.value ? 'div' : 'span')
const nestedTabIndex = computed(() => props.disabled === true ? -1 : 0)
const ariaDisabled = computed(() => props.disabled === true ? true : undefined)

const displaySpecificProps = computed(() =>
  isBlockDisplay.value
    ? {
        tabbable: props.focusable,
      }
    : {
        direction: 'none' as const,
        focusable: props.focusable,
      },
)

const resolvedPressableProps = computed(() => ({
  ...passthroughAttrs.value,
  ...sharedPressableProps.value,
  ...displaySpecificProps.value,
}))

function navigateNestedLink(event: MouseEvent | KeyboardEvent): void {
  if (resolvedPreventDefault.value || props.disabled === true || resolvedHref.value === '#') {
    return
  }

  if (typeof window === 'undefined') {
    return
  }

  if ('defaultPrevented' in event && event.defaultPrevented) {
    return
  }

  if ('metaKey' in event && (event.metaKey || event.ctrlKey)) {
    window.open(resolvedHref.value, '_blank', 'noopener')
    return
  }

  const target = resolvedTarget.value

  if (target != null && target !== '' && target !== '_self') {
    window.open(resolvedHref.value, target, target === '_blank' ? 'noopener' : undefined)
    return
  }

  window.location.assign(resolvedHref.value)
}

function activateNestedLink(event: MouseEvent | KeyboardEvent): void {
  if (props.disabled === true) {
    event.preventDefault()
    return
  }

  props.onClick?.(event)
  navigateNestedLink(event)
}

function handleNestedClick(event: MouseEvent): void {
  activateNestedLink(event)
}

function handleNestedKeyDown(event: KeyboardEvent): void {
  if (!shouldTriggerKeyboardPress(event)) {
    return
  }

  if (event.key === ' ' || event.key === 'Spacebar') {
    event.preventDefault()
  }

  activateNestedLink(event)
}

function handleNestedContextMenu(event: MouseEvent): void {
  if (props.disabled === true) {
    event.preventDefault()
    return
  }

  props.onContextMenu?.(event)
}

function handleNestedFocus(event: FocusEvent): void {
  if (isNestedFocused.value) {
    return
  }

  isNestedFocused.value = true
  props.onFocus?.(event)
  props.onFocusChange?.(true)
}

function handleNestedBlur(event: FocusEvent): void {
  if (!isNestedFocused.value) {
    return
  }

  isNestedFocused.value = false
  props.onBlur?.(event)
  props.onFocusChange?.(false)
}

function handleNestedHoverStart(event: MouseEvent): void {
  if (props.disabled === true || isNestedHovered.value) {
    return
  }

  isNestedHovered.value = true
  props.onHoverStart?.(createHoverEvent('hoverstart', event, event.currentTarget as HTMLElement))
  props.onHoverChange?.(true)
}

function handleNestedHoverMove(event: MouseEvent): void {
  if (props.disabled === true || !isNestedHovered.value) {
    return
  }

  props.onHoverMove?.(createHoverEvent('hovermove', event, event.currentTarget as HTMLElement))
}

function handleNestedHoverEnd(event: MouseEvent): void {
  if (!isNestedHovered.value) {
    return
  }

  isNestedHovered.value = false
  props.onHoverEnd?.(createHoverEvent('hoverend', event, event.currentTarget as HTMLElement))
  props.onHoverChange?.(false)
}
</script>
