<template>
  <span
    v-bind="forwardedAttrs"
    :class="resolvedStyling.className"
    :data-testid="resolvedTestId"
    :style="resolvedStyles"
  >
    <ScreenReaderText
      v-if="shouldRenderAccessibilityText"
      :text="accessibilityText"
    />
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed, useAttrs, type StyleValue } from 'vue'

import ScreenReaderText from './ScreenReaderText.vue'
import { resolveStyling, type StyleCapableValue } from '../utils/resolveStyling'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  accessibilityText?: string
  testid?: string
  xstyle?: StyleCapableValue
}

const props = withDefaults(defineProps<Props>(), {
  accessibilityText: undefined,
  testid: undefined,
  xstyle: undefined,
})

const attrs = useAttrs()

const resolvedStyling = computed(() =>
  resolveStyling(
    'inline-flex items-center justify-center box-border rounded-full',
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
    testid: _testid,
    'data-testid': _dataTestid,
    ...rest
  } = attrs as Record<string, unknown>

  void _class
  void _style
  void _testid
  void _dataTestid

  return rest
})

const resolvedTestId = computed<string | undefined>(() => (
  props.testid
  ?? attrs['data-testid'] as string | undefined
  ?? attrs.testid as string | undefined
))

const shouldRenderAccessibilityText = computed(() => (
  typeof props.accessibilityText === 'string' && props.accessibilityText !== ''
))
</script>
