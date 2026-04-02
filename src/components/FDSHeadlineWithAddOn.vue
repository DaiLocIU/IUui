<template>
  <FDSBaseTextImpl
    ref="wrapperRef"
    :is-semantic-heading="false"
    :type="type"
  >
    <div
      class="flex items-center"
      :class="isRTL ? 'flex-row-reverse' : 'flex-row'"
    >
      <div class="min-w-0 flex-1">
        <FDSBaseTextImpl
          ref="headlineTextRef"
          :color="color"
          :id="id"
          :is-primary-heading="isPrimaryHeading"
          :is-semantic-heading="isSemanticHeading"
          :number-of-lines="numberOfLines"
          :truncation-tooltip="truncationTooltip"
          :type="type"
        >
          <slot />
        </FDSBaseTextImpl>
      </div>

      <div class="ms-2 flex shrink-0 flex-col justify-end self-start">
        <div class="flex items-center">
          <span class="invisible inline-block w-1">&nbsp;</span>
          <div class="flex">
            <slot name="add-on">
              <component
                :is="addOn"
                v-if="addOn != null"
              />
            </slot>
          </div>
        </div>
      </div>
    </div>
  </FDSBaseTextImpl>
</template>

<script setup lang="ts">
import { computed, ref, type Component, type ComponentPublicInstance, type PropType } from 'vue'

import FDSBaseTextImpl from './FDSBaseTextImpl.vue'
import type { FDSTextColor, FDSTextType } from '../utils/getFDSTextHierarchyStyle'

const props = defineProps({
  addOn: {
    type: [Object, String, Function] as PropType<Component | object | string>,
    default: undefined,
  },
  color: {
    type: String as PropType<FDSTextColor | undefined>,
    default: undefined,
  },
  headlineRef: {
    type: null,
    default: undefined,
  },
  id: {
    type: String,
    default: undefined,
  },
  isPrimaryHeading: {
    type: Boolean,
    default: false,
  },
  isSemanticHeading: {
    type: Boolean,
    default: false,
  },
  numberOfLines: {
    type: Number,
    default: undefined,
  },
  truncationTooltip: {
    type: null,
    default: undefined,
  },
  type: {
    type: String as PropType<FDSTextType>,
    required: true,
  },
})

const wrapperRef = ref<ComponentPublicInstance | null>(null)
const headlineTextRef = ref<ComponentPublicInstance | null>(null)

const isRTL = computed(() => {
  if (typeof document === 'undefined') return false
  return document.documentElement.dir === 'rtl'
})

defineExpose({
  el: wrapperRef,
  headlineEl: headlineTextRef,
  headlineRef: headlineTextRef,
})
</script>
