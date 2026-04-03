<template>
  <div
    v-bind="forwardedAttrs"
    :class="[...resolvedStyling.className, attrs.class]"
    :style="[...resolvedStyling.style, attrs.style]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import { resolveStyling, type StyleCapableValue } from '../utils/resolveStyling'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  style?: StyleCapableValue
  xstyle?: StyleCapableValue
}

const props = withDefaults(defineProps<Props>(), {
  style: undefined,
  xstyle: undefined,
})

const attrs = useAttrs()

const resolvedStyling = computed(() =>
  resolveStyling(props.xstyle, props.style),
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
</script>
