<template>
  <div
    v-bind="forwardedAttrs"
    role="separator"
    :class="resolvedStyling.className"
    :style="resolvedStyles"
  />
</template>

<script setup lang="ts">
import { computed, useAttrs, type StyleValue } from 'vue'

import { resolveStyling, type StyleCapableValue } from '../utils/resolveStyling'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  xstyle?: StyleCapableValue
}

const props = withDefaults(defineProps<Props>(), {
  xstyle: undefined,
})

const attrs = useAttrs()

const resolvedStyling = computed(() =>
  resolveStyling(
    // React source:
    // x80vd3b  -> border-bottom-color: var(--divider)
    // x1q0q8m5 -> border-bottom-style: solid
    // xso031l  -> border-bottom-width: 1px
    // x1xmf6yo -> margin-top: 8px
    // x1ys307a -> margin-inline-end: 16px
    // xat24cr  -> margin-bottom: 0
    // xyqm7xq  -> margin-inline-start: 16px
    'border-b border-b-[var(--divider)] mt-2 me-4 mb-0 ms-4',
    props.xstyle,
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
    role: _role,
    ...rest
  } = attrs as Record<string, unknown>

  void _class
  void _style
  void _role

  return rest
})
</script>
