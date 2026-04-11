<template>
  <div
    v-bind="forwardedAttrs"
    :class="resolvedStyling.className"
    :style="resolvedStyles"
  >
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, type StyleValue } from 'vue'

import { resolveStyling, type StyleCapableValue } from '../utils/resolveStyling'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: undefined,
})

const attrs = useAttrs()

const resolvedStyling = computed(() =>
  resolveStyling(
    'absolute h-px w-px overflow-x-hidden overflow-y-hidden [clip:rect(0,0,0,0)] [clip-path:inset(50%)] text-[0.0625rem]',
    attrs.class as StyleCapableValue,
  ),
)

const resolvedStyles = computed<StyleValue[]>(() => {
  const styles = [...resolvedStyling.value.style]

  if (attrs.style != null) {
    styles.push(attrs.style as StyleValue)
  }

  return styles
})

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
