<template>
  <div
    class="fds-text-pairing flex flex-col"
    :class="rootSpacingClass"
  >
    <template v-if="metaLocation === 'above'">
      <div
        v-if="meta != null"
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
          {{ meta }}
        </FDSBaseTextImpl>
      </div>
    </template>

    <div
      v-if="headline != null"
      class="fds-text-pairing__item"
      :class="itemSpacingClass"
    >
      <FDSHeadlineWithAddOn
        v-if="headlineAddOn != null"
        ref="headlineTextRef"
        :add-on="headlineAddOn"
        :color="headlineColor"
        :id="headlineId"
        :is-primary-heading="isPrimaryHeading"
        :is-semantic-heading="isSemanticHeading"
        :number-of-lines="headlineLineLimit"
        :truncation-tooltip="headlineTruncationTooltip"
        :type="hierarchyStyle.headlineType"
      >
        {{ headline }}
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
        {{ headline }}
      </FDSBaseTextImpl>
    </div>

    <template v-if="metaLocation === 'in-between'">
      <div
        v-if="meta != null"
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
          {{ meta }}
        </FDSBaseTextImpl>
      </div>
    </template>

    <div
      v-if="body != null"
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
        {{ body }}
      </FDSBaseTextImpl>
    </div>

    <template v-if="metaLocation === 'below'">
      <div
        v-if="meta != null"
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
          {{ meta }}
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
  body?: string | number | null
  bodyColor?: FDSTextColor
  bodyId?: string
  bodyLineLimit?: number
  bodyRef?: unknown
  bodyTruncationTooltip?: unknown
  dir?: 'ltr' | 'rtl' | 'auto'
  headline?: string | number | null
  headlineAddOn?: unknown
  headlineColor?: FDSTextColor
  headlineId?: string
  headlineLineLimit?: number
  headlineRef?: unknown
  headlineTruncationTooltip?: unknown
  isPrimaryHeading?: boolean
  isSemanticHeading?: boolean
  level: FDSTextPairingLevel
  meta?: string | number | null
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
  body: null,
  bodyColor: 'primary',
  bodyId: undefined,
  bodyLineLimit: undefined,
  bodyRef: undefined,
  bodyTruncationTooltip: undefined,
  dir: 'auto',
  headline: null,
  headlineAddOn: undefined,
  headlineColor: 'primary',
  headlineId: undefined,
  headlineLineLimit: undefined,
  headlineRef: undefined,
  headlineTruncationTooltip: undefined,
  isPrimaryHeading: false,
  isSemanticHeading: false,
  meta: null,
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
  const map: Record<string, string> = {
    '1': 'my-2',
    '2': 'my-1.5',
    '3': 'my-1',
    '4': 'my-1',
    entityHeader1: 'my-2',
    entityHeader2: 'my-2',
  }

  return map[String(props.level)] ?? 'my-1'
})

const itemSpacingClass = computed(() => {
  const map: Record<string, string> = {
    '1': 'my-1.5',
    '2': 'my-1',
    '3': 'my-0.5',
    '4': 'my-0.5',
    entityHeader1: 'my-1',
    entityHeader2: 'my-1',
  }

  return map[String(props.level)] ?? 'my-0.5'
})

defineExpose({
  bodyEl: bodyTextRef,
  headlineEl: headlineTextRef,
  metaEl: metaTextRef,
})
</script>
