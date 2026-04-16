<template>
  <div
    :aria-label="props.ariaLabel"
    class="flex justify-center [flex-basis:auto]"
  >
    <CometPressableChildrenWithOverlay_DEPRECATED :overlay="overlay">
      <div :class="pillClassName">
        <span :class="contentClassName">
          <slot />
        </span>
      </div>
    </CometPressableChildrenWithOverlay_DEPRECATED>
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'

import CometPressableChildrenWithOverlay_DEPRECATED from './CometPressableChildrenWithOverlay_DEPRECATED.vue'
import CometPressableOverlay from './CometPressableOverlay.vue'

type FDSProfilePhotoActivePillBorder =
  | 'card-background'
  | 'secondary-button-background-floating'
  | 'web-wash'

type OverlayRenderable = {
  component: Component | string
  props?: Record<string, unknown>
}

const BORDER_CLASS_MAP: Record<FDSProfilePhotoActivePillBorder, string> = {
  'card-background': '[border-top-color:var(--card-background)] [border-inline-end-color:var(--card-background)] [border-bottom-color:var(--card-background)] [border-inline-start-color:var(--card-background)]',
  'secondary-button-background-floating': '[border-top-color:var(--secondary-button-background-floating)] [border-inline-end-color:var(--secondary-button-background-floating)] [border-bottom-color:var(--secondary-button-background-floating)] [border-inline-start-color:var(--secondary-button-background-floating)]',
  'web-wash': '[border-top-color:var(--web-wash)] [border-inline-end-color:var(--web-wash)] [border-bottom-color:var(--web-wash)] [border-inline-start-color:var(--web-wash)]',
}

const props = defineProps({
  ariaLabel: {
    type: String,
    default: undefined,
  },
  border: {
    type: String as () => FDSProfilePhotoActivePillBorder,
    default: 'card-background',
  },
  pressed: {
    type: Boolean,
    default: false,
  },
})

const overlay = computed<OverlayRenderable>(() => ({
  component: CometPressableOverlay,
  props: {
    pressed: props.pressed,
    radius: 7,
  },
}))

const pillClassName = computed(() => [
  'box-border',
  'flex',
  'justify-center',
  'font-bold',
  'rounded-[14px]',
  'border-solid',
  'border-t-[2px]',
  '[border-inline-end-width:2px]',
  'border-b-[2px]',
  '[border-inline-start-width:2px]',
  '-mt-[2px]',
  '-me-[2px]',
  '-mb-[2px]',
  '-ms-[2px]',
  'ps-[2px]',
  'pe-[2px]',
  '[background-color:var(--last-active-state-background)]',
  BORDER_CLASS_MAP[props.border],
])

const contentClassName = 'text-[0.625rem] leading-[1.25] whitespace-nowrap'
</script>
