<template>
  <BaseDivider
    v-bind="attrs"
    role="separator"
    :xstyle="resolvedXStyle"
  />
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import BaseDivider from './BaseDivider.vue'
import type { StyleCapableValue } from '../utils/resolveStyling'

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

const resolvedXStyle = computed<StyleCapableValue>(() => [
  // Meta source classes:
  // x1xmf6yo -> margin-top: 8px
  // x1ys307a / xyqm7xq -> logical horizontal margins: 16px
  // xat24cr -> margin-bottom: 0
  //
  // The remaining source classes draw the 1px divider line itself.
  // BaseDivider already provides the divider visual, so this wrapper only
  // layers in the source-faithful spacing.
  'mt-2 me-4 mb-0 ms-4',
  props.xstyle,
])
</script>
