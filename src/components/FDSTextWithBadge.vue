<template>
  <FDSTextWithIcon
    :icon-override-vertical-style="badgeOverrideVerticalStyle"
    :spacing="spacing"
    :spacing-px="spacingPx"
  >
    <template
      v-if="$slots.badgeBefore != null"
      #iconBefore
    >
      <slot name="badgeBefore" />
    </template>

    <slot />

    <template
      v-if="$slots.badgeAfter != null"
      #iconAfter
    >
      <slot name="badgeAfter" />
    </template>
  </FDSTextWithIcon>
</template>

<script setup lang="ts">
import FDSTextWithIcon from './FDSTextWithIcon.vue'

interface Props {
  badgeOverrideVerticalStyle?: string | Record<string, string> | null
  spacing?: number
  spacingPx?: number
}

withDefaults(defineProps<Props>(), {
  badgeOverrideVerticalStyle: null,
  spacing: 0.5,
  spacingPx: undefined,
})
</script>
