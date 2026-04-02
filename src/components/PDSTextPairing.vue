<template>
  <FDSTextPairing v-bind="props" />
</template>

<script setup lang="ts">
import FDSTextPairing from './FDSTextPairing.vue'
import type { FDSTextColor, FDSTextPairingLevel } from '../utils/getFDSTextHierarchyStyle'

defineOptions({
  name: 'PDSTextPairing',
})

type MetaLocation = 'above' | 'below' | 'in-between'

interface Props {
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
</script>
