<template>
  <BaseTextWithIcon v-bind="props">
    <template
      v-if="$slots.iconBefore != null"
      #iconBefore
    >
      <slot name="iconBefore" />
    </template>

    <slot />

    <template
      v-if="$slots.iconAfter != null"
      #iconAfter
    >
      <slot name="iconAfter" />
    </template>
  </BaseTextWithIcon>
</template>

<script setup lang="ts">
import BaseTextWithIcon from './BaseTextWithIcon.vue'

interface Props {
  iconOverrideVerticalStyle?: string | Record<string, string> | null
  spacing?: number
  spacingPx?: number
}

const props = withDefaults(defineProps<Props>(), {
  iconOverrideVerticalStyle: null,
  spacing: 0.5,
  spacingPx: undefined,
})
</script>
