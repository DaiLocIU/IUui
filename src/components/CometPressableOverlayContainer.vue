<template>
  <div
    v-bind="forwardedAttrs"
    :role="role"
    :class="resolvedStyling.className"
    :style="resolvedStyles"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, type CSSProperties, type StyleValue } from 'vue'

import { resolveStyling, type StyleCapableValue } from '../utils/resolveStyling'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  role?: string
  style?: CSSProperties
  xstyle?: StyleCapableValue
}

const props = withDefaults(defineProps<Props>(), {
  role: 'none',
  style: undefined,
  xstyle: undefined,
})

const attrs = useAttrs()

const resolvedStyling = computed(() =>
  resolveStyling(
    props.xstyle,
    attrs.class as StyleCapableValue,
  ),
)

const resolvedStyles = computed<StyleValue[]>(() => {
  const styles = [...resolvedStyling.value.style]

  if (props.style != null) {
    styles.push(props.style)
  }

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
