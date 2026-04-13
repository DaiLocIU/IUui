<template>
  <FDSListCellPressable
    ref="pressableRef"
    :aria-label="resolvedAriaLabel"
    :on-press="handlePress"
    :addOnStartMarginTop="0"
    :padding-horizontal="8"
  >
    <template #addOnStart>
      <slot name="addOnStart">
        <div class="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
          <LoaderCircle
            v-if="props.type === 'more' && props.isLoadingNext"
            class="size-4 animate-spin"
            aria-hidden="true"
          />
          <ChevronDown
            v-else-if="props.type === 'more'"
            class="size-4"
            aria-hidden="true"
          />
          <ChevronUp
            v-else
            class="size-5"
            aria-hidden="true"
          />
        </div>
      </slot>
    </template>

    <slot v-if="$slots.default != null" />

    <template v-else-if="$slots.label != null">
      <slot name="label" />
    </template>

    <FDSTextPairing
      v-else
      :level="4"
      :headline="resolvedHeadline"
      :headline-line-limit="1"
      :reduce-emphasis="true"
    />
  </FDSListCellPressable>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChevronDown, ChevronUp, LoaderCircle } from 'lucide-vue-next'

import FDSTextPairing from './FDSTextPairing.vue'
import FDSListCellPressable from './FDSListCellPressable.vue'

type RefetchType = 'more' | 'less'

interface Props {
  ariaLabel?: string
  headline?: string
  isLoadingNext?: boolean
  onPress?: () => void
  section?: 'shortcuts' | 'communities' | 'explore' | string
  type: RefetchType
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: undefined,
  headline: undefined,
  isLoadingNext: false,
  onPress: undefined,
  section: undefined,
})

const pressableRef = ref<{ el?: HTMLElement | null } | null>(null)

const resolvedHeadline = computed(() =>
  props.headline
  ?? (props.type === 'more' ? 'See more' : 'See less'),
)

const resolvedAriaLabel = computed(() => {
  if (props.ariaLabel != null) {
    return props.ariaLabel
  }

  if (props.section === 'shortcuts') {
    return props.type === 'more' ? 'See more shortcuts' : 'See less shortcuts'
  }

  if (props.section === 'communities') {
    return props.type === 'more' ? 'See more communities' : 'See less communities'
  }

  if (props.section === 'explore') {
    return props.type === 'more' ? 'See more explore items' : 'See less explore items'
  }

  return resolvedHeadline.value
})

function handlePress(): void {
  props.onPress?.()
}

defineExpose({
  el: computed(() => pressableRef.value?.el ?? null),
})
</script>
