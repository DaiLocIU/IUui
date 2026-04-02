<!-- CometDensityModeStateProvider.vue -->
<!--
  React source: CometDensityModeStateProvider.react
  Library-safe port: provides dense mode state locally and omits Relay persistence.
-->
<template>
  <slot />
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'

import { provideCometDensityModeContext } from '../system/cometDensityModeKeys'

export interface Props {
  initialDense?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialDense: false,
})

// React source seeded from CometDenseModeSetting.initialSetting === "COMPACT".
// In the library port, consumers can seed the provider explicitly.
const isDense = ref(props.initialDense)

const setDense = (next: boolean): void => {
  isDense.value = next
}

const providedValue = reactive<[boolean, (next: boolean) => void]>([
  isDense.value,
  setDense,
])

watchEffect(() => {
  providedValue[0] = isDense.value
})

provideCometDensityModeContext(providedValue)
</script>
