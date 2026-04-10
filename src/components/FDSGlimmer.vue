<template>
  <BaseGlimmer
    v-bind="forwardedProps"
    :xstyle="resolvedXStyle"
  >
    <slot />
  </BaseGlimmer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import BaseGlimmer, { type BaseGlimmerVariant } from './BaseGlimmer.vue'
import fdsGlimmerStyles from '../utils/fdsGlimmerStyles'
import type { StyleCapableValue } from '../utils/resolveStyling'

interface Props {
  disableLoadingStateTracker?: boolean
  index?: number
  iteration?: number | string
  startPaused?: boolean
  variant?: BaseGlimmerVariant
  xstyle?: StyleCapableValue
}

const props = withDefaults(defineProps<Props>(), {
  disableLoadingStateTracker: false,
  index: undefined,
  iteration: undefined,
  startPaused: true,
  variant: undefined,
  xstyle: undefined,
})

const forwardedProps = computed(() => ({
  disableLoadingStateTracker: props.disableLoadingStateTracker,
  index: props.index,
  iteration: props.iteration,
  startPaused: props.startPaused,
  variant: props.variant,
}))

const resolvedXStyle = computed<StyleCapableValue>(() => [
  fdsGlimmerStyles.glimmer,
  fdsGlimmerStyles.glimmerAnimation,
  props.xstyle,
])
</script>
