<template>
  <hr
    v-bind="forwardedAttrs"
    :aria-hidden="ariaHidden"
    :class="resolvedStyling.className"
    :style="resolvedStyles"
  >
</template>

<script setup lang="ts">
import { computed, useAttrs, type StyleValue } from 'vue'

import { resolveStyling, type StyleCapableValue } from '../utils/resolveStyling'

defineOptions({
  inheritAttrs: false,
})

interface DividerVariant {
  xstyleConfig?: {
    divider?: StyleCapableValue
  }
}

interface Props {
  ariaHidden?: boolean
  variant?: DividerVariant
  xstyle?: StyleCapableValue
}

const props = withDefaults(defineProps<Props>(), {
  ariaHidden: undefined,
  variant: undefined,
  xstyle: undefined,
})

const attrs = useAttrs()

const resolvedStyling = computed(() =>
  resolveStyling(
    'box-border h-px bg-[var(--divider,#65686C)] border-t-0 border-b-0 [border-inline-start-width:0] [border-inline-end-width:0] mt-0 mb-0 [margin-inline-start:0] [margin-inline-end:0]',
    props.xstyle,
    props.variant?.xstyleConfig?.divider,
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
