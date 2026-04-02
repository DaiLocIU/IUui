<template>
  <img
    v-if="shouldRenderImage"
    ref="imageRef"
    v-bind="forwardedAttrs"
    :alt="alt"
    :aria-hidden="isDecorative || undefined"
    :aria-labelledby="ariaLabelledby"
    :class="[objectFitClass, variant?.xstyleConfig?.image, xstyle, attrs.class]"
    :elementtiming="elementtiming"
    :referrerpolicy="referrerPolicy"
    :sizes="sizes"
    :src="src"
    :srcset="srcSet"
    :style="attrs.style"
    @load="handleLoad"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

type ObjectFitValue = 'contain' | 'cover' | 'fill'

export interface ImageVariant {
  xstyleConfig?: {
    image?: string
  }
}

export interface Props {
  alt?: string
  ariaLabelledby?: string
  elementtiming?: string
  isDecorative?: boolean
  objectFit?: ObjectFitValue
  onLoad?: (event?: Event) => void
  referrerPolicy?: ReferrerPolicy
  sizes?: string
  src?: string
  srcSet?: string
  testid?: string
  variant?: ImageVariant
  xstyle?: string | Record<string, boolean>
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  ariaLabelledby: undefined,
  elementtiming: undefined,
  isDecorative: false,
  objectFit: 'fill',
  onLoad: undefined,
  referrerPolicy: 'origin-when-cross-origin',
  sizes: undefined,
  src: undefined,
  srcSet: undefined,
  testid: undefined,
  variant: undefined,
  xstyle: undefined,
})

const attrs = useAttrs()
const imageRef = ref<HTMLImageElement | null>(null)

const shouldRenderImage = computed(() => props.src !== '')

const objectFitClass = computed(() => {
  const map: Record<ObjectFitValue, string> = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
  }

  return map[props.objectFit]
})

const forwardedAttrs = computed(() => {
  const {
    testid: _testid,
    'data-testid': _dataTestid,
    class: _class,
    style: _style,
    ...rest
  } = attrs as Record<string, unknown>

  void _testid
  void _dataTestid
  void _class
  void _style

  return {
    ...rest,
    ...(props.testid != null ? { 'data-testid': props.testid } : {}),
  }
})

const handleLoad = (event?: Event): void => {
  props.onLoad?.(event)
}

if (import.meta.env.DEV && props.src === '') {
  console.warn('[BaseImage] Invalid src provided to image.')
}

onMounted(() => {
  const image = imageRef.value

  if (props.onLoad != null && image != null && image.complete) {
    props.onLoad()
  }
})

defineExpose({
  el: imageRef,
  img: imageRef,
})
</script>
