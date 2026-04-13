<template>
  <div
    class="fds-text-pairing flex flex-col"
    :class="rootSpacingClass"
  >
    <template v-if="metaLocation === 'above'">
      <div
        v-if="$slots.meta"
        class="fds-text-pairing__item"
        :class="itemSpacingClass"
      >
        <FDSBaseTextImpl
          ref="metaTextRef"
          :align="textAlign"
          :color="metaColor"
          :dir="dir"
          :id="metaId"
          :is-semantic-heading="false"
          :number-of-lines="metaLineLimit"
          :truncation-tooltip="metaTruncationTooltip"
          :type="hierarchyStyle.metaType"
        >
          <slot name="meta" />
        </FDSBaseTextImpl>
      </div>
    </template>

    <div
      v-if="$slots.headline"
      class="fds-text-pairing__item"
      :class="itemSpacingClass"
    >
      <FDSHeadlineWithAddOn
        v-if="$slots['headline-add-on']"
        ref="headlineTextRef"
        :color="headlineColor"
        :id="headlineId"
        :is-primary-heading="isPrimaryHeading"
        :is-semantic-heading="isSemanticHeading"
        :number-of-lines="headlineLineLimit"
        :truncation-tooltip="headlineTruncationTooltip"
        :type="hierarchyStyle.headlineType"
      >
        <template #add-on>
          <slot name="headline-add-on" />
        </template>
        <slot name="headline" />
      </FDSHeadlineWithAddOn>

      <FDSBaseTextImpl
        v-else
        ref="headlineTextRef"
        :align="textAlign"
        :color="headlineColor"
        :dir="dir"
        :id="headlineId"
        :is-primary-heading="isPrimaryHeading"
        :is-semantic-heading="isSemanticHeading"
        :number-of-lines="headlineLineLimit"
        :truncation-tooltip="headlineTruncationTooltip"
        :type="hierarchyStyle.headlineType"
      >
        <slot name="headline" />
      </FDSBaseTextImpl>
    </div>

    <template v-if="metaLocation === 'in-between'">
      <div
        v-if="$slots.meta"
        class="fds-text-pairing__item"
        :class="itemSpacingClass"
      >
        <FDSBaseTextImpl
          ref="metaTextRef"
          :align="textAlign"
          :color="metaColor"
          :dir="dir"
          :id="metaId"
          :is-semantic-heading="false"
          :number-of-lines="metaLineLimit"
          :truncation-tooltip="metaTruncationTooltip"
          :type="hierarchyStyle.metaType"
        >
          <slot name="meta" />
        </FDSBaseTextImpl>
      </div>
    </template>

    <div
      v-if="$slots.body"
      class="fds-text-pairing__item"
      :class="itemSpacingClass"
    >
      <FDSBaseTextImpl
        ref="bodyTextRef"
        :align="textAlign"
        :color="bodyColor"
        :dir="dir"
        :id="bodyId"
        :is-semantic-heading="false"
        :number-of-lines="bodyLineLimit"
        :truncation-tooltip="bodyTruncationTooltip"
        :type="hierarchyStyle.bodyType"
      >
        <slot name="body" />
      </FDSBaseTextImpl>
    </div>

    <template v-if="metaLocation === 'below'">
      <div
        v-if="$slots.meta"
        class="fds-text-pairing__item"
        :class="itemSpacingClass"
      >
        <FDSBaseTextImpl
          ref="metaTextRef"
          :align="textAlign"
          :color="metaColor"
          :dir="dir"
          :id="metaId"
          :is-semantic-heading="false"
          :number-of-lines="metaLineLimit"
          :truncation-tooltip="metaTruncationTooltip"
          :type="hierarchyStyle.metaType"
        >
          <slot name="meta" />
        </FDSBaseTextImpl>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type ComponentPublicInstance } from 'vue'

import FDSBaseTextImpl from './FDSBaseTextImpl.vue'
import FDSHeadlineWithAddOn from './FDSHeadlineWithAddOn.vue'
import { provideBaseTextContext } from '../system/baseTextKeys'
import {
  type FDSTextColor,
  getFDSTextHierarchyStyle,
  type FDSTextPairingLevel,
} from '../utils/getFDSTextHierarchyStyle'

type MetaLocation = 'above' | 'below' | 'in-between'

export interface Props {
  bodyColor?: FDSTextColor
  bodyId?: string
  bodyLineLimit?: number
  bodyRef?: unknown
  bodyTruncationTooltip?: unknown
  dir?: 'ltr' | 'rtl' | 'auto'
  headlineColor?: FDSTextColor
  headlineId?: string
  headlineLineLimit?: number
  headlineRef?: unknown
  headlineTruncationTooltip?: unknown
  isPrimaryHeading?: boolean
  isSemanticHeading?: boolean
  level: FDSTextPairingLevel
  metaColor?: FDSTextColor
  metaId?: string
  metaLineLimit?: number
  metaLocation?: MetaLocation
  metaRef?: unknown
  metaTestID?: string
  metaTruncationTooltip?: unknown
  reduceEmphasis?: boolean
  testid?: string
  textAlign?: 'auto' | 'center' | 'start' | 'end'
}

const props = withDefaults(defineProps<Props>(), {
  bodyColor: 'primary',
  bodyId: undefined,
  bodyLineLimit: undefined,
  bodyRef: undefined,
  bodyTruncationTooltip: undefined,
  dir: 'auto',
  headlineColor: 'primary',
  headlineId: undefined,
  headlineLineLimit: undefined,
  headlineRef: undefined,
  headlineTruncationTooltip: undefined,
  isPrimaryHeading: false,
  isSemanticHeading: false,
  metaColor: 'secondary',
  metaId: undefined,
  metaLineLimit: undefined,
  metaLocation: 'below',
  metaRef: undefined,
  metaTestID: undefined,
  metaTruncationTooltip: undefined,
  reduceEmphasis: false,
  testid: undefined,
  textAlign: 'start',
})

provideBaseTextContext({ nested: false })

const bodyTextRef = ref<ComponentPublicInstance | null>(null)
const headlineTextRef = ref<ComponentPublicInstance | null>(null)
const metaTextRef = ref<ComponentPublicInstance | null>(null)

const hierarchyStyle = computed(() =>
  getFDSTextHierarchyStyle(props.level, props.reduceEmphasis),
)

const rootSpacingClass = computed(() => {
  const map: Record<FDSTextPairingLevel, string> = {
    1: 'mt-[-7px] mb-[-7px]',
    2: 'mt-[-6px] mb-[-6px]',
    3: 'mt-[-5px] mb-[-5px]',
    4: 'mt-[-5px] mb-[-5px]',
    entityHeader1: 'mt-[-8px] mb-[-8px]',
    entityHeader2: 'mt-[-8px] mb-[-8px]',
  }

  return map[props.level]
})

const itemSpacingClass = computed(() => {
  const map: Record<FDSTextPairingLevel, string> = {
    1: 'mt-[7px] mb-[7px]',
    2: 'mt-[6px] mb-[6px]',
    3: 'mt-[5px] mb-[5px]',
    4: 'mt-[5px] mb-[5px]',
    entityHeader1: 'mt-[8px] mb-[8px]',
    entityHeader2: 'mt-[8px] mb-[8px]',
  }

  return map[props.level]
})

defineExpose({
  bodyEl: bodyTextRef,
  headlineEl: headlineTextRef,
  metaEl: metaTextRef,
})
</script>
