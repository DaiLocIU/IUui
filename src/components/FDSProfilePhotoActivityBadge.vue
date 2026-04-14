<template>
  <CometPressableChildrenWithOverlay_DEPRECATED :overlay="overlay">
    <div
      :aria-hidden="props.isDecorative ? 'true' : undefined"
      :class="badgeClassName"
      :style="badgeStyle"
    >
      <slot v-if="$slots.default != null" />

      <component
        :is="props.icon.component"
        v-else-if="props.icon != null"
        v-bind="resolvedIconProps"
      />
    </div>
  </CometPressableChildrenWithOverlay_DEPRECATED>
</template>

<script setup lang="ts">
import { computed, type CSSProperties, type Component, type PropType } from 'vue'

import CometPressableChildrenWithOverlay_DEPRECATED from './CometPressableChildrenWithOverlay_DEPRECATED.vue'
import CometPressableOverlay from './CometPressableOverlay.vue'

export type FDSProfilePhotoActivityBadgeIcon = {
  component: Component | string
  props?: Record<string, unknown>
}

const props = defineProps({
  backgroundColor: {
    type: String,
    default: 'white',
  },
  icon: {
    type: Object as PropType<FDSProfilePhotoActivityBadgeIcon | undefined>,
    default: undefined,
  },
  isDecorative: {
    type: Boolean,
    default: true,
  },
  overflow: {
    type: String as PropType<CSSProperties['overflow'] | undefined>,
    default: undefined,
  },
  pressed: {
    type: Boolean,
    default: false,
  },
  size: {
    type: Number,
    required: true,
  },
})

const overlay = computed<FDSProfilePhotoActivityBadgeIcon>(() => ({
  component: CometPressableOverlay,
  props: {
    offset: 0,
    pressed: props.pressed,
    radius: '50%',
  },
}))

const resolvedIconProps = computed<Record<string, unknown> | undefined>(() => {
  if (props.icon == null) {
    return undefined
  }

  return {
    size: 24,
    ...props.icon.props,
  }
})

const badgeClassName = computed(() => [
  'box-border',
  'flex',
  'flex-col',
  'grow',
  'shrink',
  'min-h-0',
  'min-w-0',
  'relative',
  'overflow-x-hidden',
  'overflow-y-hidden',
  'm-0',
  'pt-0',
  'pe-0',
  'pb-0',
  'ps-0',
  'border-t-0',
  'border-e-0',
  'border-b-0',
  'border-s-0',
  'border-solid',
  'rounded-full',
  `h-${props.size}px`,
  `w-${props.size}px`
])

const badgeStyle = computed<CSSProperties>(() => ({
  backgroundColor: props.backgroundColor,
  overflow: props.overflow,
}))
</script>
