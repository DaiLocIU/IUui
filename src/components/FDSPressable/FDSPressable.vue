<template>
  <CometPressable
    ref="pressableRef"
    v-bind="forwardedBindings"
  >
    <slot />
  </CometPressable>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  useAttrs,
  type PropType,
} from 'vue'

import CometPressable from '../CometPressable/CometPressable.vue'
import type { HoverEvent, PressEvent } from '../WebPressable/types'

defineOptions({
  inheritAttrs: false,
})

type CometPressableExpose = {
  el?: unknown
} | null

const props = defineProps({
  ariaDisabled: {
    type: null as unknown as PropType<boolean | undefined>,
    default: undefined,
  },
  cursorDisabled: {
    type: null as unknown as PropType<boolean | undefined>,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  onContextMenu: {
    type: Function as PropType<(event: MouseEvent) => void>,
    default: undefined,
  },
  onFocusChange: {
    type: Function as PropType<(focused: boolean) => void>,
    default: undefined,
  },
  onFocusIn: {
    type: Function as PropType<(event: FocusEvent) => void>,
    default: undefined,
  },
  onFocusOut: {
    type: Function as PropType<(event: FocusEvent) => void>,
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
    type: Function as PropType<(event: HoverEvent) => void>,
    default: undefined,
  },
  onHoverMove: {
    type: Function as PropType<(event: HoverEvent) => void>,
    default: undefined,
  },
  onHoverOut: {
    type: Function as PropType<(event: HoverEvent) => void>,
    default: undefined,
  },
  onPress: {
    type: Function as PropType<(event: MouseEvent | KeyboardEvent) => void>,
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
    type: Function as PropType<(event: PressEvent) => void>,
    default: undefined,
  },
  onPressOut: {
    type: Function as PropType<(event: PressEvent) => void>,
    default: undefined,
  },
})

const attrs = useAttrs()

const forwardedBindings = computed<Record<string, unknown>>(() => ({
  ...attrs,
  'aria-disabled': props.disabled === true ? true : props.ariaDisabled,
  cursorDisabled: props.disabled === true ? true : props.cursorDisabled,
  disabled: props.disabled,
  onContextMenu: props.disabled === true ? undefined : props.onContextMenu,
  onFocusChange: props.disabled === true ? undefined : props.onFocusChange,
  onFocusIn: props.disabled === true ? undefined : props.onFocusIn,
  onFocusOut: props.disabled === true ? undefined : props.onFocusOut,
  onFocusVisibleChange: props.disabled === true ? undefined : props.onFocusVisibleChange,
  onHoverChange: props.disabled === true ? undefined : props.onHoverChange,
  onHoverIn: props.disabled === true ? undefined : props.onHoverIn,
  onHoverMove: props.disabled === true ? undefined : props.onHoverMove,
  onHoverOut: props.disabled === true ? undefined : props.onHoverOut,
  onPress: props.disabled === true ? undefined : props.onPress,
  onPressAction: props.disabled === true ? undefined : props.onPressAction,
  onPressChange: props.disabled === true ? undefined : props.onPressChange,
  onPressIn: props.disabled === true ? undefined : props.onPressIn,
  onPressOut: props.disabled === true ? undefined : props.onPressOut,
}))

const pressableRef = ref<CometPressableExpose>(null)

defineExpose({
  el: computed(() => pressableRef.value?.el ?? null),
})
</script>
