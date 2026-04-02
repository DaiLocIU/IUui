<template>
  <FDSTextContextNew
    :color="resolvedColor"
    :type="type"
  >
    <BaseTextV2
      ref="baseTextRef"
      :color-variant="colorVariant"
      :dir="dir"
      :font-metrics="fontMetrics"
      :hyphens="hyphens"
      :id="id"
      :is-primary-heading="isPrimaryHeading"
      :is-semantic-heading="isSemanticHeading"
      :max-lines="resolvedMaxLines"
      :preserve-new-lines="preserveNewLines"
      :suppress-hydration-warning="suppressHydrationWarning"
      :text-align="align"
      :truncation-tooltip="resolvedTruncationTooltip"
      :type-variant="typeVariant"
    >
      <slot />
    </BaseTextV2>
  </FDSTextContextNew>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import BaseTextV2, {
  type ColorVariant,
  type TypeVariant,
} from './BaseTextV2.vue'
import FDSTextContextNew from './FDSTextContextNew.vue'
import { defaultAsyncTooltip, type TruncationTooltipConfig } from './TruncationTooltip.vue'
import {
  APPLE_SYSTEM_FONT_METRICS,
  WINDOWS_SYSTEM_FONT_METRICS,
} from '../utils/baseTextV2FontMetrics'
import { useCometDensityModeContext } from '../system/cometDensityModeKeys'

type FDSFontWeight = 'bold' | 'medium' | 'normal' | 'semibold'
type FDSColor =
  | 'blueLink'
  | 'disabled'
  | 'disabledButton'
  | 'highlight'
  | 'linkOnMedia'
  | 'negative'
  | 'placeholder'
  | 'positive'
  | 'primary'
  | 'primaryButton'
  | 'primaryButtonTextOnMedia'
  | 'primaryDeemphasizedButton'
  | 'primaryOnColor'
  | 'primaryOnMedia'
  | 'secondary'
  | 'secondaryButton'
  | 'secondaryOnColor'
  | 'secondaryOnMedia'
  | 'selectedOption'
  | 'tertiary'
  | 'tooltip'
  | 'white'

type FDSType =
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'bodyLink1'
  | 'bodyLink2'
  | 'bodyLink3'
  | 'bodyLink4'
  | 'bodyMeta'
  | 'button1'
  | 'button2'
  | 'entityHeaderHeadline1'
  | 'entityHeaderHeadline2'
  | 'entityHeaderMeta1'
  | 'entityHeaderMeta2'
  | 'headline1'
  | 'headline2'
  | 'headline3'
  | 'headline4'
  | 'headlineDeemphasized3'
  | 'headlineDeemphasized4'
  | 'headlineEmphasized1'
  | 'headlineEmphasized2'
  | 'headlineEmphasized3'
  | 'headlineEmphasized4'
  | 'meta1'
  | 'meta2'
  | 'meta3'
  | 'meta4'

interface FDSVariantDefinition {
  defaultColor?: FDSColor
  fontSize: number
  fontWeight: FDSFontWeight
  lineGap?: number
}

const FONT_WEIGHT_CLASS_MAP: Record<FDSFontWeight, string> = {
  bold: 'font-bold',
  medium: 'font-medium',
  normal: 'font-normal',
  semibold: 'font-semibold',
}

const COLOR_CLASS_MAP: Record<FDSColor, string> = {
  blueLink: 'text-sky-600',
  disabled: 'text-slate-400',
  disabledButton: 'text-slate-300',
  highlight: 'text-sky-700',
  linkOnMedia: 'text-sky-200',
  negative: 'text-rose-600',
  placeholder: 'text-slate-400',
  positive: 'text-emerald-600',
  primary: 'text-slate-900',
  primaryButton: 'text-white',
  primaryButtonTextOnMedia: 'text-white',
  primaryDeemphasizedButton: 'text-sky-700',
  primaryOnColor: 'text-white',
  primaryOnMedia: 'text-white',
  secondary: 'text-slate-600',
  secondaryButton: 'text-slate-700',
  secondaryOnColor: 'text-slate-100',
  secondaryOnMedia: 'text-slate-200',
  selectedOption: 'text-sky-700',
  tertiary: 'text-slate-400',
  tooltip: 'text-slate-900',
  white: 'text-white',
}

const BUTTON_COLOR_REMAP: Partial<Record<FDSColor, FDSColor>> = {
  disabled: 'disabledButton',
  highlight: 'primaryDeemphasizedButton',
  secondary: 'secondaryButton',
  white: 'primaryButton',
}

function getFDSVariant(type: FDSType, isDense: boolean): FDSVariantDefinition {
  const variants: Record<FDSType, FDSVariantDefinition> = {
    body1: { fontSize: 20, fontWeight: 'normal' },
    body2: { fontSize: isDense ? 16 : 17, fontWeight: 'normal' },
    body3: { fontSize: isDense ? 14 : 15, fontWeight: 'normal' },
    body4: { fontSize: isDense ? 12 : 13, fontWeight: 'normal' },
    bodyLink1: { fontSize: 20, fontWeight: 'semibold' },
    bodyLink2: { fontSize: isDense ? 16 : 17, fontWeight: 'semibold' },
    bodyLink3: { fontSize: isDense ? 14 : 15, fontWeight: 'semibold' },
    bodyLink4: { fontSize: isDense ? 12 : 13, fontWeight: 'semibold' },
    bodyMeta: { defaultColor: 'secondary', fontSize: isDense ? 12 : 13, fontWeight: 'normal' },
    button1: { fontSize: isDense ? 16 : 17, fontWeight: 'semibold' },
    button2: { fontSize: isDense ? 14 : 15, fontWeight: 'semibold' },
    entityHeaderHeadline1: { fontSize: 32, fontWeight: 'bold' },
    entityHeaderHeadline2: { fontSize: 28, fontWeight: 'bold' },
    entityHeaderMeta1: { defaultColor: 'secondary', fontSize: isDense ? 14 : 15, fontWeight: 'bold' },
    entityHeaderMeta2: { defaultColor: 'secondary', fontSize: isDense ? 14 : 15, fontWeight: 'bold' },
    headline1: { fontSize: 24, fontWeight: 'bold', lineGap: 10 },
    headline2: { fontSize: 20, fontWeight: 'bold' },
    headline3: { fontSize: isDense ? 16 : 17, fontWeight: 'medium' },
    headline4: { fontSize: isDense ? 14 : 15, fontWeight: 'medium' },
    headlineDeemphasized3: { fontSize: isDense ? 16 : 17, fontWeight: 'normal' },
    headlineDeemphasized4: { fontSize: isDense ? 14 : 15, fontWeight: 'normal' },
    headlineEmphasized1: { fontSize: 24, fontWeight: 'bold', lineGap: 10 },
    headlineEmphasized2: { fontSize: 20, fontWeight: 'bold' },
    headlineEmphasized3: { fontSize: isDense ? 16 : 17, fontWeight: 'semibold' },
    headlineEmphasized4: { fontSize: isDense ? 14 : 15, fontWeight: 'semibold' },
    meta1: { defaultColor: 'secondary', fontSize: isDense ? 12 : 13, fontWeight: 'semibold' },
    meta2: { defaultColor: 'secondary', fontSize: isDense ? 12 : 13, fontWeight: 'semibold' },
    meta3: { defaultColor: 'secondary', fontSize: isDense ? 12 : 13, fontWeight: 'normal' },
    meta4: { defaultColor: 'secondary', fontSize: 12, fontWeight: 'normal' },
  }

  return variants[type]
}

function resolveTextColor(color: FDSColor, isButtonType: boolean): FDSColor {
  const remappedColor = isButtonType && BUTTON_COLOR_REMAP[color] != null
    ? BUTTON_COLOR_REMAP[color]
    : color

  return remappedColor === 'highlight' ? 'blueLink' : remappedColor
}

interface Props {
  align?: 'auto' | 'center' | 'start' | 'end'
  color?: FDSColor
  dir?: 'ltr' | 'rtl' | 'auto'
  hyphens?: 'none' | 'auto' | 'manual'
  id?: string
  isPrimaryHeading?: boolean
  isSemanticHeading?: boolean
  numberOfLines?: number
  preserveNewLines?: boolean
  suppressHydrationWarning?: boolean
  testid?: string
  truncationTooltip?: unknown
  type: FDSType
}

const props = withDefaults(defineProps<Props>(), {
  align: 'auto',
  dir: 'auto',
  hyphens: 'none',
  id: undefined,
  isPrimaryHeading: false,
  isSemanticHeading: false,
  numberOfLines: undefined,
  preserveNewLines: false,
  suppressHydrationWarning: undefined,
  testid: undefined,
  truncationTooltip: undefined,
})

const baseTextRef = ref<InstanceType<typeof BaseTextV2> | null>(null)

defineExpose({
  el: baseTextRef,
})

const densityModeContext = useCometDensityModeContext()

const variantDefinition = computed(() => getFDSVariant(props.type, densityModeContext[0]))
const fallbackColor = computed<FDSColor>(() => variantDefinition.value.defaultColor ?? 'primary')
const resolvedColor = computed<FDSColor>(() =>
  resolveTextColor(props.color ?? fallbackColor.value, props.type === 'button1' || props.type === 'button2'),
)

const fontMetrics = computed(() => {
  if (typeof navigator !== 'undefined' && /Mac OS X/i.test(navigator.userAgent)) {
    return APPLE_SYSTEM_FONT_METRICS
  }

  return WINDOWS_SYSTEM_FONT_METRICS
})

const colorVariant = computed<ColorVariant>(() => ({
  xstyleConfig: {
    textColor: COLOR_CLASS_MAP[resolvedColor.value],
  },
}))

const typeVariant = computed<TypeVariant>(() => ({
  fontSize: variantDefinition.value.fontSize,
  lineGap: variantDefinition.value.lineGap ?? 9,
  xstyleConfig: {
    textType: FONT_WEIGHT_CLASS_MAP[variantDefinition.value.fontWeight],
  },
}))

const resolvedMaxLines = computed(() => props.numberOfLines ?? 0)

const resolvedTruncationTooltip = computed<TruncationTooltipConfig | undefined>(() => {
  if (props.truncationTooltip == null || resolvedMaxLines.value <= 0) {
    return undefined
  }

  return {
    component: defaultAsyncTooltip,
    tooltipProps: {
      label: props.truncationTooltip,
    },
  }
})
</script>
