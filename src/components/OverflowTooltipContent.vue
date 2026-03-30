<template>
  <VTooltip
    :triggers="['hover', 'focus']"
    :distance="8"
    theme="tooltip"
    class="iu-overflow-tooltip"
  >
    <span class="iu-overflow-tooltip__trigger">
      <slot />
    </span>
    <template #popper>
      <span class="iu-overflow-tooltip__bubble">
        {{ label }}
      </span>
    </template>
  </VTooltip>
</template>

<script setup lang="ts">
import { Tooltip as VTooltip } from 'floating-vue'
import 'floating-vue/dist/style.css'

const props = defineProps<{
  label: string
}>()

const { label } = props
</script>
