<template>
  <div
    :aria-hidden="props.isDecorative ? 'true' : undefined"
    class="flex relative rounded-full overflow-x-hidden overflow-y-hidden"
  >
    <CometPressableChildrenWithOverlay_DEPRECATED :overlay="overlay">
      <FDSBadge
        accessibility-text="Online status indicator"
        color="green"
        :is-profile-badge="true"
        :size="props.size"
      />
    </CometPressableChildrenWithOverlay_DEPRECATED>

    <ScreenReaderText text="Active" />
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'

import CometPressableChildrenWithOverlay_DEPRECATED from './CometPressableChildrenWithOverlay_DEPRECATED.vue'
import CometPressableOverlay from './CometPressableOverlay.vue'
import FDSBadge from './FDSBadge.vue'
import ScreenReaderText from './ScreenReaderText.vue'

type FDSProfilePhotoAvailabilityBadgeSize = 6 | 7 | 8 | 9 | 10 | 12 | 14 | 15 | 18 | 20 | 22 | 24 | 32 | 41

type OverlayRenderable = {
  component: Component | string
  props?: Record<string, unknown>
}

const props = defineProps({
  isDecorative: {
    type: Boolean,
    default: false,
  },
  pressed: {
    type: Boolean,
    default: false,
  },
  size: {
    type: Number as () => FDSProfilePhotoAvailabilityBadgeSize,
    required: true,
  },
})

const overlay = computed<OverlayRenderable>(() => ({
  component: CometPressableOverlay,
  props: {
    pressed: props.pressed,
    radius: '50%',
  },
}))
</script>
