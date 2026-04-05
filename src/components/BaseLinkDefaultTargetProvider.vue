<template>
  <slot />
</template>

<script setup lang="ts">
import { provide, toRef } from 'vue'

import { LINK_DEFAULT_TARGET_KEY } from '../system/baseLinkKeys'

const props = defineProps<{
  target?: string
}>()

provide(LINK_DEFAULT_TARGET_KEY, toRef(props, 'target'))
</script>
