<template>
  <BaseLoadingStateElement
    ref="loadingStateElementRef"
    v-bind="attrs"
    :disable-loading-state-tracker="disableLoadingStateTracker"
    :xstyle="resolvedXStyle"
  >
    <slot />
  </BaseLoadingStateElement>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  watchEffect,
  useAttrs,
} from 'vue'

import BaseLoadingStateElement from './BaseLoadingStateElement.vue'
import useGlimmerPausedState from '../composables/useGlimmerPausedState'
import baseGlimmerCompatStyles from '../utils/baseGlimmerCompatStyles'
import type { StyleCapableValue } from '../utils/resolveStyling'

defineOptions({
  inheritAttrs: false,
})

export interface BaseGlimmerVariantXStyleConfig {
  animation?: StyleCapableValue
  animationDelay?: StyleCapableValue
  animationIteration?: StyleCapableValue
  container?: StyleCapableValue
}

export interface BaseGlimmerVariant {
  xstyleConfig: BaseGlimmerVariantXStyleConfig
}

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

const attrs = useAttrs()
const loadingStateElementRef = ref<{ el?: HTMLElement | null } | null>(null)
const { paused, ref: glimmerRef } = useGlimmerPausedState(props.startPaused)

watchEffect(() => {
  glimmerRef.value = loadingStateElementRef.value?.el ?? null
})

const resolvedXStyle = computed<StyleCapableValue>(() => {
  if (props.variant != null) {
    return [
      props.variant.xstyleConfig.container,
      props.variant.xstyleConfig.animation,
      props.variant.xstyleConfig.animationDelay,
      props.variant.xstyleConfig.animationIteration,
    ]
  }

  return [
    baseGlimmerCompatStyles.root,
    paused.value && baseGlimmerCompatStyles.paused,
    props.xstyle,
    baseGlimmerCompatStyles.animationDelay(props.index),
    props.iteration != null && baseGlimmerCompatStyles.animationIterationCount(props.iteration),
  ]
})

defineExpose({
  el: computed(() => loadingStateElementRef.value?.el ?? null),
})
</script>
