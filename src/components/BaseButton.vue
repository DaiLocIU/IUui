<template>
  <component
    :is="display === 'block' ? WebPressable : PressableText"
    ref="pressableRef"
    v-bind="pressableProps"
  >
    <template #default="slotState">
      <slot v-bind="slotState" />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'

import PressableText from './PressableText.vue'
import WebPressable from './WebPressable.vue'
import { useBaseButtonPopoverContext } from '../system/cometPressableKeys'
import type { StyleCapableValue } from '../utils/resolveStyling'

defineOptions({
  inheritAttrs: false,
})

type DisplayMode = 'block' | 'inline'

interface Props {
  'aria-activedescendant'?: string
  'aria-checked'?: boolean | 'mixed'
  'aria-controls'?: string
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time'
  'aria-describedby'?: string
  'aria-expanded'?: boolean
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
  'aria-hidden'?: boolean
  'aria-invalid'?: boolean | 'grammar' | 'spelling'
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-pressed'?: boolean | 'mixed'
  'aria-selected'?: boolean
  allowClickEventPropagation?: boolean
  disabled?: boolean
  display?: DisplayMode
  focusable?: boolean
  id?: string
  label?: string
  onBlur?: (event: FocusEvent) => void
  onClick?: (event: MouseEvent | KeyboardEvent) => void
  onContextMenu?: (event: MouseEvent) => void
  onFocus?: (event: FocusEvent) => void
  onFocusChange?: (value: boolean) => void
  onFocusVisibleChange?: (value: boolean) => void
  onHoverChange?: (value: boolean) => void
  onHoverEnd?: (event: unknown) => void
  onHoverMove?: (event: unknown) => void
  onHoverStart?: (event: unknown) => void
  onPressChange?: (value: boolean) => void
  onPressEnd?: (event: unknown) => void
  onPressStart?: (event: unknown) => void
  preventContextMenu?: boolean
  role?: string
  style?: StyleCapableValue | ((state: any) => StyleCapableValue)
  suppressFocusRing?: boolean
  suppressHydrationWarning?: boolean
  testid?: string
  testOnly_pressed?: boolean
  xstyle?: StyleCapableValue | ((state: any) => StyleCapableValue)
}

const props = withDefaults(defineProps<Props>(), {
  'aria-activedescendant': undefined,
  'aria-checked': undefined,
  'aria-controls': undefined,
  'aria-current': undefined,
  'aria-describedby': undefined,
  'aria-expanded': undefined,
  'aria-haspopup': undefined,
  'aria-hidden': undefined,
  'aria-invalid': undefined,
  'aria-label': undefined,
  'aria-labelledby': undefined,
  'aria-pressed': undefined,
  'aria-selected': undefined,
  allowClickEventPropagation: false,
  disabled: false,
  display: 'inline',
  focusable: undefined,
  id: undefined,
  label: undefined,
  onBlur: undefined,
  onClick: undefined,
  onContextMenu: undefined,
  onFocus: undefined,
  onFocusChange: undefined,
  onFocusVisibleChange: undefined,
  onHoverChange: undefined,
  onHoverEnd: undefined,
  onHoverMove: undefined,
  onHoverStart: undefined,
  onPressChange: undefined,
  onPressEnd: undefined,
  onPressStart: undefined,
  preventContextMenu: undefined,
  role: undefined,
  style: undefined,
  suppressFocusRing: false,
  suppressHydrationWarning: false,
  testid: undefined,
  testOnly_pressed: false,
  xstyle: undefined,
})

const attrs = useAttrs()
const pressableRef = ref<unknown>(null)
const popoverContext = useBaseButtonPopoverContext()

const resolvedAccessibilityRelationship = computed(() => ({
  activedescendant: props['aria-activedescendant'],
  controls: props['aria-controls'],
  current: props['aria-current'],
  describedby: props['aria-describedby'],
  haspopup: props['aria-haspopup'] ?? popoverContext?.haspopup,
  labelledby: props['aria-labelledby'],
}))

const resolvedAccessibilityState = computed(() => ({
  checked: props['aria-checked'],
  disabled: props.disabled,
  expanded: props['aria-expanded'] ?? popoverContext?.expanded,
  hidden: props['aria-hidden'],
  invalid: props['aria-invalid'],
  pressed: props['aria-pressed'],
  selected: props['aria-selected'],
}))

const resolvedLabel = computed(() =>
  props.role !== 'none' ? props['aria-label'] ?? props.label : undefined,
)

const blockRole = computed(() =>
  ['menuitem', 'menuitemradio', 'none', 'gridcell', 'switch', 'combobox', 'checkbox', 'tab', 'radio', 'option'].includes(props.role ?? '')
    ? props.role
    : 'button',
)

const inlineRole = computed(() =>
  ['combobox', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'none', 'link', 'tab'].includes(props.role ?? '')
    ? props.role
    : 'button',
)

const forwardedAttrs = computed(() => ({
  ...attrs,
}))

const pressableProps = computed(() => ({
  ...forwardedAttrs.value,
  accessibilityLabel: resolvedLabel.value,
  accessibilityRelationship: resolvedAccessibilityRelationship.value,
  accessibilityRole: props.display === 'block' ? blockRole.value : inlineRole.value,
  accessibilityState: resolvedAccessibilityState.value,
  allowClickEventPropagation:
    props.display === 'block' ? props.allowClickEventPropagation : undefined,
  disabled: props.disabled,
  focusable: props.display === 'inline' ? props.focusable : undefined,
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
  onPressStart: props.onPressStart,
  preventContextMenu: props.preventContextMenu,
  style: props.style,
  suppressHydrationWarning: props.suppressHydrationWarning,
  suppressFocusRing: props.suppressFocusRing,
  tabbable: props.display === 'block' ? props.focusable : undefined,
  testID: props.testid,
  testOnly_state: {
    disabled: false,
    focused: false,
    focusVisible: false,
    hovered: false,
    pressed: props.testOnly_pressed,
  },
  xstyle: props.xstyle,
}))

defineExpose({
  el: pressableRef,
})
</script>
