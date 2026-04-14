<template>
  <div
    v-bind="forwardedAttrs"
    :class="rootClassName"
    :style="rootStyle"
  >
    <slot />

    <component
      :is="props.overlay.component"
      v-if="props.overlay != null"
      v-bind="props.overlay.props"
    />

    <slot
      v-else
      name="overlay"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, type Component, type StyleValue } from 'vue'

import { resolveStyling, type StyleCapableValue } from '../utils/resolveStyling'

defineOptions({
  inheritAttrs: false,
})

type OverlayRenderable = {
  component: Component | string
  props?: Record<string, unknown>
}

const ROOT_XSTYLE = [
  '[align-content:inherit]',
  '[align-items:inherit]',
  '[border-start-start-radius:inherit]',
  '[border-start-end-radius:inherit]',
  '[border-end-end-radius:inherit]',
  '[border-end-start-radius:inherit]',
  '[display:inherit]',
  '[flex-direction:inherit]',
  '[height:inherit]',
  '[justify-content:inherit]',
  'relative',
  '[width:inherit]',
].join(' ')

const props = defineProps({
  overlay: {
    type: Object as () => OverlayRenderable | undefined,
    default: undefined,
  },
})

const attrs = useAttrs()

const resolvedStyling = computed(() =>
  resolveStyling(
    ROOT_XSTYLE,
    attrs.class as StyleCapableValue,
  ),
)

const forwardedAttrs = computed(() => {
  const {
    class: _class,
    style: _style,
    ...rest
  } = attrs as Record<string, unknown>

  void _class
  void _style

  return rest
})

const rootClassName = computed(() => resolvedStyling.value.className)

const rootStyle = computed<StyleValue[]>(() => {
  const styles: StyleValue[] = [...resolvedStyling.value.style]

  if (attrs.style != null) {
    styles.push(attrs.style as StyleValue)
  }

  return styles
})
</script>
