<template>
  <li
    v-if="hasAddOnStart"
    v-bind="attrs"
  >
    <FDSListCellPressable
      :id="id"
      :link-props="linkProps"
      :on-hover-in="onHoverIn"
      :on-hover-out="onHoverOut"
      :on-press="onPress"
      :padding-horizontal="8"
      :padding-vertical="8"
      :selected="selected"
      :addOnStartMarginTop="0"
    >
      <template #addOnStart>
        <slot name="addOnStart" />
      </template>

      <FDSTextPairing
        :level="4"
        :headline-line-limit="2"
        :meta-color="metaColor"
        :meta-line-limit="metaLineLimit"
        :reduce-emphasis="true"
      >
        <template #headline>
          {{ name }}
        </template>

        <template
          v-if="$slots.meta != null || meta != null"
          #meta
        >
          <slot name="meta">
            {{ meta }}
          </slot>
        </template>
      </FDSTextPairing>

      <template
        v-if="$slots.addOnEnd != null"
        #addOnEnd
      >
        <slot name="addOnEnd" />
      </template>
    </FDSListCellPressable>
  </li>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'

import FDSListCellPressable from './FDSListCellPressable.vue'
import FDSTextPairing from './FDSTextPairing.vue'
import type { HoverEvent, LinkProps } from './WebPressable/types'
import type { FDSTextColor } from '../utils/getFDSTextHierarchyStyle'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  id?: string
  linkProps?: LinkProps | null
  meta?: string | number | null
  metaColor?: FDSTextColor
  metaLineLimit?: number
  name: string | number
  onHoverIn?: (event: HoverEvent) => void
  onHoverOut?: (event: HoverEvent) => void
  onPress?: (event: MouseEvent | KeyboardEvent) => void
  selected?: boolean
  totalShortcutCount?: number
}

withDefaults(defineProps<Props>(), {
  id: undefined,
  linkProps: null,
  meta: null,
  metaColor: undefined,
  metaLineLimit: undefined,
  onHoverIn: undefined,
  onHoverOut: undefined,
  onPress: undefined,
  selected: false,
  totalShortcutCount: undefined,
})

const attrs = useAttrs()
const slots = useSlots()

const hasAddOnStart = computed(() => slots.addOnStart != null)
</script>
