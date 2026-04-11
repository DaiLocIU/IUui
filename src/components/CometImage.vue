<template>
  <BaseImage
    ref="baseImageRef"
    v-bind="attrs"
    :alt="alt"
    :object-fit="objectFit"
    :on-error="onError"
    :on-load="onLoad"
    :sizes="sizes"
    :src="src"
    :src-set="srcSet"
    :testid="testid"
    :xstyle="resolvedXStyle"
  />
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'

import BaseImage, { type ObjectFitValue } from './BaseImage.vue'
import type { StyleCapableValue } from '../utils/resolveStyling'

defineOptions({
  inheritAttrs: false,
})

type CometImageCornerRadius = 'none' | 'small' | 'medium' | 'large'

interface Props {
  alt?: string
  cornerRadius?: CometImageCornerRadius
  objectFit?: ObjectFitValue
  onError?: (event?: Event) => void
  onLoad?: (event?: Event) => void
  sizes?: string
  src?: string
  srcSet?: string
  testid?: string
  xstyle?: StyleCapableValue
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  cornerRadius: 'none',
  objectFit: 'fill',
  onError: undefined,
  onLoad: undefined,
  sizes: undefined,
  src: undefined,
  srcSet: undefined,
  testid: undefined,
  xstyle: undefined,
})

const attrs = useAttrs()
const baseImageRef = ref<{ el?: HTMLImageElement | null; img?: HTMLImageElement | null } | null>(null)

const cornerRadiusStyles: Record<CometImageCornerRadius, StyleCapableValue> = {
  large: {
    borderStartStartRadius: 'var(--media-large-corner-radius, 16px)',
    borderStartEndRadius: 'var(--media-large-corner-radius, 16px)',
    borderEndEndRadius: 'var(--media-large-corner-radius, 16px)',
    borderEndStartRadius: 'var(--media-large-corner-radius, 16px)',
  },
  medium: {
    borderStartStartRadius: 'var(--media-corner-radius, 12px)',
    borderStartEndRadius: 'var(--media-corner-radius, 12px)',
    borderEndEndRadius: 'var(--media-corner-radius, 12px)',
    borderEndStartRadius: 'var(--media-corner-radius, 12px)',
  },
  none: {
    borderStartStartRadius: 0,
    borderStartEndRadius: 0,
    borderEndEndRadius: 0,
    borderEndStartRadius: 0,
  },
  small: {
    borderStartStartRadius: 'var(--media-small-corner-radius, 8px)',
    borderStartEndRadius: 'var(--media-small-corner-radius, 8px)',
    borderEndEndRadius: 'var(--media-small-corner-radius, 8px)',
    borderEndStartRadius: 'var(--media-small-corner-radius, 8px)',
  },
}

const resolvedXStyle = computed<StyleCapableValue>(() => [
  cornerRadiusStyles[props.cornerRadius],
  props.xstyle,
])

defineExpose({
  el: computed(() => baseImageRef.value?.el ?? null),
  img: computed(() => baseImageRef.value?.img ?? null),
})
</script>
