<template>
  <WebPressable
    v-if="isBlockDisplay"
    ref="pressableRef"
    v-bind="blockPressableProps"
  >
    <slot />
  </WebPressable>
  <PressableText
    v-else
    ref="pressableRef"
    v-bind="inlinePressableProps"
  >
    <slot />
  </PressableText>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  toRef,
  useAttrs,
  type PropType,
} from 'vue'

import PressableText from '../WebPressable/PressableText.vue'
import WebPressable from '../WebPressable/WebPressable.vue'
import { useBaseButtonPopoverContext } from '../../system/baseButtonPopoverKeys'
import { useButtonRole } from './composables/useButtonRole'
import type {
  AccessibilityRelationship,
  AccessibilityState,
  HoverEvent,
  PressEvent,
  PressableTextProps,
  WebPressableProps,
} from '../WebPressable/types'

type BaseButtonDisplay = 'block' | 'inline'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  allowClickEventPropagation: {
    type: Boolean,
    default: false,
  },
  ariaActivedescendant: {
    type: String,
    default: undefined,
  },
  ariaChecked: {
    type: null as unknown as PropType<AccessibilityState['checked']>,
    default: undefined,
  },
  ariaControls: {
    type: String,
    default: undefined,
  },
  ariaCurrent: {
    type: null as unknown as PropType<AccessibilityRelationship['current']>,
    default: undefined,
  },
  ariaDescribedby: {
    type: String,
    default: undefined,
  },
  ariaExpanded: {
    type: null as unknown as PropType<AccessibilityState['expanded']>,
    default: undefined,
  },
  ariaHaspopup: {
    type: null as unknown as PropType<AccessibilityRelationship['haspopup']>,
    default: undefined,
  },
  ariaHidden: {
    type: null as unknown as PropType<AccessibilityState['hidden']>,
    default: undefined,
  },
  ariaInvalid: {
    type: null as unknown as PropType<AccessibilityState['invalid']>,
    default: undefined,
  },
  ariaLabel: {
    type: String,
    default: undefined,
  },
  ariaLabelledby: {
    type: String,
    default: undefined,
  },
  ariaPressed: {
    type: null as unknown as PropType<AccessibilityState['pressed']>,
    default: undefined,
  },
  ariaSelected: {
    type: null as unknown as PropType<AccessibilityState['selected']>,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  display: {
    type: String as PropType<BaseButtonDisplay>,
    default: 'inline',
  },
  focusable: {
    type: null as unknown as PropType<boolean | undefined>,
    default: undefined,
  },
  id: {
    type: String,
    default: undefined,
  },
  label: {
    type: String,
    default: undefined,
  },
  onBlur: {
    type: Function as PropType<(e: FocusEvent) => void>,
    default: undefined,
  },
  onClick: {
    type: Function as PropType<(e: MouseEvent | KeyboardEvent) => void>,
    default: undefined,
  },
  onContextMenu: {
    type: Function as PropType<(e: MouseEvent) => void>,
    default: undefined,
  },
  onFocus: {
    type: Function as PropType<(e: FocusEvent) => void>,
    default: undefined,
  },
  onFocusChange: {
    type: Function as PropType<(focused: boolean) => void>,
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
  onHoverEnd: {
    type: Function as PropType<(e: HoverEvent) => void>,
    default: undefined,
  },
  onHoverMove: {
    type: Function as PropType<(e: HoverEvent) => void>,
    default: undefined,
  },
  onHoverStart: {
    type: Function as PropType<(e: HoverEvent) => void>,
    default: undefined,
  },
  onPressChange: {
    type: Function as PropType<(pressed: boolean) => void>,
    default: undefined,
  },
  onPressEnd: {
    type: Function as PropType<(e: PressEvent) => void>,
    default: undefined,
  },
  onPressStart: {
    type: Function as PropType<(e: PressEvent) => void>,
    default: undefined,
  },
  preventContextMenu: {
    type: null as unknown as PropType<boolean | undefined>,
    default: undefined,
  },
  role: {
    type: String,
    default: undefined,
  },
  style: {
    type: null as unknown as PropType<WebPressableProps['style']>,
    default: undefined,
  },
  suppressFocusRing: {
    type: Boolean,
    default: false,
  },
  suppressHydrationWarning: {
    type: null as unknown as PropType<boolean | undefined>,
    default: undefined,
  },
  testID: {
    type: String,
    default: undefined,
  },
  testOnlyPressed: {
    type: Boolean,
    default: false,
  },
  xstyle: {
    type: null as unknown as PropType<WebPressableProps['xstyle']>,
    default: undefined,
  },
})

const attrs = useAttrs()

const { haspopup: resolvedHaspopup, expanded: resolvedExpanded } =
  useBaseButtonPopoverContext({
    haspopup: toRef(props, 'ariaHaspopup'),
    expanded: toRef(props, 'ariaExpanded'),
  })

const { resolvedRole, accessibilityLabel } = useButtonRole({
  role: toRef(props, 'role'),
  display: toRef(props, 'display'),
  ariaLabel: toRef(props, 'ariaLabel'),
  label: toRef(props, 'label'),
})

const isBlockDisplay = computed(() => props.display === 'block')

const accessibilityRelationship = computed<AccessibilityRelationship>(() => ({
  activedescendant: props.ariaActivedescendant,
  controls: props.ariaControls,
  current: props.ariaCurrent,
  describedby: props.ariaDescribedby,
  haspopup: resolvedHaspopup.value,
  labelledby: props.ariaLabelledby,
}))

const accessibilityState = computed<AccessibilityState>(() => ({
  checked: props.ariaChecked,
  disabled: props.disabled,
  expanded: resolvedExpanded.value,
  hidden: props.ariaHidden,
  invalid: props.ariaInvalid,
  pressed: props.ariaPressed,
  selected: props.ariaSelected,
}))

const testOnlyState = computed(() => ({
  disabled: false,
  focused: false,
  focusVisible: false,
  hovered: false,
  pressed: props.testOnlyPressed === true,
}))

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

const sharedPressableProps = computed(() => ({
  ...passthroughAttrs.value,
  accessibilityLabel: accessibilityLabel.value,
  accessibilityRelationship: accessibilityRelationship.value,
  accessibilityRole: resolvedRole.value,
  accessibilityState: accessibilityState.value,
  class: attrs.class,
  disabled: props.disabled,
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
  testID: props.testID,
  testOnly_state: testOnlyState.value,
  xstyle: props.xstyle,
}))

const blockPressableProps = computed<WebPressableProps & Record<string, unknown>>(() => ({
  ...sharedPressableProps.value,
  allowClickEventPropagation: props.allowClickEventPropagation,
  tabbable: props.focusable,
}))

const inlinePressableProps = computed<PressableTextProps & Record<string, unknown>>(() => ({
  ...sharedPressableProps.value,
  direction: 'none',
  focusable: props.focusable,
}))

const pressableRef = ref<{
  el?: HTMLElement | null
} | null>(null)

defineExpose({
  el: computed(() => {
    return pressableRef.value?.el ?? null
  }),
})
</script>
