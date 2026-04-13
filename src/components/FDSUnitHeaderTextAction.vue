<template>
  <CometPressable
    ref="pressableRef"
    v-bind="forwardedBindings"
  >
    <FDSIcon
      v-if="props.icon != null"
      :color="resolvedColor"
      :icon="props.icon"
      :is-decorative="true"
      :size="16"
    />

    <FDSBaseTextImpl
      :color="resolvedColor"
      :number-of-lines="props.numberOfLines"
      :truncation-tooltip="props.truncationTooltip"
      :type="resolvedType"
    >
      {{ props.label }}
    </FDSBaseTextImpl>
  </CometPressable>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, type Component, type PropType } from 'vue'

import CometPressable from './CometPressable/CometPressable.vue'
import FDSBaseTextImpl from './FDSBaseTextImpl.vue'
import FDSIcon from './FDSIcon.vue'
import { useFDSUnitHeaderLevel } from '../composables/useFDSUnitHeaderLevel'
import type { StyleCapableValue } from '../utils/resolveStyling'
import type { LinkProps, HoverEvent, PressEvent } from './WebPressable/types'

defineOptions({
  inheritAttrs: false,
})

type CometPressableExpose = {
  el?: unknown
} | null

const ACTION_TEXT_OVERLAY_OFFSET = 8
const ACTION_TEXT_OVERLAY_RADIUS = 6
const ROOT_XSTYLE = 'flex items-center gap-1 pt-0 pe-0 pb-0 ps-0'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: [String, Object, Function] as PropType<string | Component | undefined>,
    default: undefined,
  },
  label: {
    type: String,
    required: true,
  },
  linkProps: {
    type: Object as PropType<LinkProps | null>,
    default: null,
  },
  numberOfLines: {
    type: Number as PropType<number | undefined>,
    default: undefined,
  },
  onFocusVisibleChange: {
    type: Function as PropType<(visible: boolean) => void>,
    default: undefined,
  },
  onHoverIn: {
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
  onPressIn: {
    type: Function as PropType<(event: PressEvent) => void>,
    default: undefined,
  },
  onPressOut: {
    type: Function as PropType<(event: PressEvent) => void>,
    default: undefined,
  },
  testOnlyActionPressed: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  testid: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
  truncationTooltip: {
    type: null,
    default: undefined,
  },
  xstyle: {
    type: null as unknown as PropType<StyleCapableValue>,
    default: undefined,
  },
})

const attrs = useAttrs()
const pressableRef = ref<CometPressableExpose>(null)
const headerLevel = useFDSUnitHeaderLevel()

const resolvedColor = computed(() => props.disabled ? 'disabled' : 'blueLink')
const resolvedType = computed(() => headerLevel === 2 ? 'body2' : 'body3')
const resolvedPressedState = computed(() => props.testOnlyActionPressed ?? false)

const forwardedBindings = computed<Record<string, unknown>>(() => ({
  ...attrs,
  'aria-disabled': props.disabled ? true : undefined,
  disabled: undefined,
  linkProps: props.linkProps,
  onFocusVisibleChange: props.onFocusVisibleChange,
  onHoverIn: props.onHoverIn,
  onHoverOut: props.onHoverOut,
  onPress: props.disabled ? undefined : props.onPress,
  onPressIn: props.disabled ? undefined : props.onPressIn,
  onPressOut: props.disabled ? undefined : props.onPressOut,
  overlayOffset: ACTION_TEXT_OVERLAY_OFFSET,
  overlayRadius: ACTION_TEXT_OVERLAY_RADIUS,
  testOnly_pressed: resolvedPressedState.value,
  testid: props.testid,
  xstyle: [ROOT_XSTYLE, props.xstyle],
}))

defineExpose({
  el: computed(() => pressableRef.value?.el ?? null),
})
</script>
