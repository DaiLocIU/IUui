<!-- BaseTextV2.vue -->
<!--
  React: BaseTextV2.react
  Primary typography primitive in Meta's Comet UI kit.

  Responsibilities:
  1. Call precomputeValues({ fontMetrics, fontSize, lineGap }) → computedValues → BaseTextV2SpanWrapper
  2. Inline line-clamp spans when maxLines > 0 (react-strict-dom html.span — no sub-component)
  3. Wrap in TruncationTooltip when truncationTooltip is set and maxLines > 0
  4. Wrap in BaseHeading when isSemanticHeading or isPrimaryHeading
  5. Provide BaseTextContext nested=true to all children
-->
<template>
  <!--
    React: K = BaseTextContextProvider nested={true} → implemented via provide() in setup()
    React: Q = (isSemanticHeading || isPrimaryHeading) ? BaseHeading(children=j) : j
    React: j = BaseTextV2SpanWrapper(computedValues, dir, id, nested, xstyle, children=O)
    React: O = (truncationTooltip != null && maxLines > 0) ? TooltipWrapper(children=A) : A
    React: A/w = maxLines === 0 ? children : lineClampRoot(lineClampInner(children))
  -->

  <!-- heading branch: React Q = BaseHeading(isPrimaryHeading, xstyle=c.heading, children=j) -->
  <BaseHeading
    v-if="isHeading"
    :is-primary-heading="isPrimaryHeading"
    :xstyle="headingXstyle"
  >
    <!-- React: j = BaseTextV2SpanWrapper -->
    <BaseTextV2SpanWrapper
      :computedValues="resolvedComputedValues"
      :dir="dirAttr"
      :id="id"
      :nested="isNested"
      :xstyle="xstyleClass"
    >
      <!-- React: O = tooltip ? TooltipWrapper(A) : A -->
      <TruncationTooltip v-if="showTooltip" :truncation-tooltip="truncationTooltip">
        <!-- React: A/w = lineClampRoot structure -->
        <BaseTextV2LineClamp :max-lines="maxLines"><slot /></BaseTextV2LineClamp>
      </TruncationTooltip>
      <BaseTextV2LineClamp v-else :max-lines="maxLines"><slot /></BaseTextV2LineClamp>
    </BaseTextV2SpanWrapper>
  </BaseHeading>

  <!-- non-heading branch: React j directly -->
  <BaseTextV2SpanWrapper
    v-else
    :computedValues="resolvedComputedValues"
    :dir="dirAttr"
    :id="id"
    :nested="isNested"
    :xstyle="xstyleClass"
  >
    <!-- React: O = tooltip ? TooltipWrapper(A) : A -->
    <TruncationTooltip v-if="showTooltip" :truncation-tooltip="truncationTooltip">
      <BaseTextV2LineClamp :max-lines="maxLines"><slot /></BaseTextV2LineClamp>
    </TruncationTooltip>
    <BaseTextV2LineClamp v-else :max-lines="maxLines"><slot /></BaseTextV2LineClamp>
  </BaseTextV2SpanWrapper>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import BaseTextV2SpanWrapper from './BaseTextV2SpanWrapper.vue'
import BaseHeading from './BaseHeading.vue'
import BaseTextV2LineClamp from './BaseTextV2LineClamp.vue'
import TruncationTooltip, { type TruncationTooltipConfig } from './TruncationTooltip.vue'
import {
  BASE_TEXT_CONTEXT_KEY,
  useBaseTextContext,
  type BaseTextContextValue,
} from '../system/baseTextKeys'
import type { ComputedValues } from './BaseTextV2SpanWrapper.vue'
import { precomputeValues, type FontMetrics } from '../utils/baseTextV2Utils'

// ─── Type definitions ───────────────────────────────────────────────────────

/**
 * React: S — typeVariant token object.
 * S.fontSize and S.lineGap are fed into precomputeValues().
 * S.xstyleConfig.textType is the Stylex/CSS class for the type scale.
 */
export interface TypeVariant {
  /** React: S.fontSize — rendered font-size in px */
  fontSize: number
  /** React: S.lineGap — design-system line gap in px (NOT the font fileʼs lineGap metric) */
  lineGap: number
  /** React: D = S.xstyleConfig.textType — CSS class token for the type scale */
  xstyleConfig: {
    textType?: string
  }
}

/**
 * React: a — colorVariant token object.
 * a.xstyleConfig.textColor is the Stylex/CSS class for the text color.
 */
export interface ColorVariant {
  /** React: x = a.xstyleConfig.textColor — CSS class token for the text color */
  xstyleConfig: {
    textColor?: string
  }
}

// ─── Props ───────────────────────────────────────────────────────────────────

const props = withDefaults(
  defineProps<{
    /** React: a — color variant token */
    colorVariant?: ColorVariant
    /** React: i — HTML dir attribute; suppressed automatically when nested */
    dir?: 'ltr' | 'rtl' | 'auto'
    /**
     * React: l — font metrics table from the typeface.
     * Passed to BaseTextV2Utils.precomputeValues() to compute cap-height/baseline trim.
     */
    fontMetrics?: FontMetrics
    /** React: d — CSS hyphens; 'none' disables the property */
    hyphens?: 'none' | 'auto' | 'manual'
    /** React: m — HTML id */
    id?: string
    /** React: p — renders as h1 unconditionally */
    isPrimaryHeading?: boolean
    /**
     * React: _ — renders as the appropriate heading level from BaseHeadingContext.
     * BaseHeading clamps the level to [2, 6] unless isPrimaryHeading.
     */
    isSemanticHeading?: boolean
    /**
     * React: f — line-clamp count.
     * 0 = no clamp, 1 = single-line ellipsis, n > 1 = -webkit-line-clamp.
     */
    maxLines?: number
    /** React: g — white-space: pre-wrap */
    preserveNewLines?: boolean
    /** React: y */
    suppressHydrationWarning?: boolean
    /** React: C — intentionally suppressed, never forwarded to DOM */
    testid?: string
    /** React: b — 'auto' applies no align class */
    textAlign?: 'auto' | 'center' | 'start' | 'end'
    /**
     * React: v — forwarded to BaseTextV2TooltipWrapper (here: TruncationTooltip).
     * Only activates when maxLines > 0.
     */
    truncationTooltip?: TruncationTooltipConfig
    /**
     * React: S — type variant token. Provides fontSize, lineGap for precomputeValues,
     * and xstyleConfig.textType CSS class.
     */
    typeVariant?: TypeVariant
  }>(),
  {
    colorVariant: undefined,
    dir: undefined,
    fontMetrics: undefined,
    hyphens: 'none',
    id: undefined,
    isPrimaryHeading: false,
    isSemanticHeading: false,
    maxLines: 0,
    preserveNewLines: false,
    suppressHydrationWarning: undefined,
    testid: undefined,
    textAlign: 'auto',
    truncationTooltip: undefined,
    typeVariant: undefined,
  },
)

// ─── Context ─────────────────────────────────────────────────────────────────

/**
 * React: $ = useBaseTextContext(), P = $.nested === true
 */
const ctx = useBaseTextContext()

/** React: P */
const isNested = computed(() => ctx?.nested === true)

/**
 * React: BaseTextContextProvider nested={true}
 * provide() in setup() = wrapping all children with the provider.
 */
provide<BaseTextContextValue>(BASE_TEXT_CONTEXT_KEY, { nested: true })

// ─── precomputeValues ────────────────────────────────────────────────────────

/**
 * React: N = o("BaseTextV2Utils").precomputeValues({ fontMetrics: l, fontSize: S.fontSize, lineGap: S.lineGap })
 * Memoized in the compiler cache on [l, S.fontSize, S.lineGap].
 * Returns { baselineTrim, capHeightTrim, fontSize, lineHeight } as CSS strings.
 *
 * In Vue: computed() re-runs when fontMetrics or typeVariant changes — same semantics.
 */
const resolvedComputedValues = computed<ComputedValues | undefined>(() => {
  const fm = props.fontMetrics
  const tv = props.typeVariant
  if (!fm || !tv) return undefined
  return precomputeValues({
    fontMetrics: fm,
    fontSize: tv.fontSize,
    lineGap: tv.lineGap,
  })
})

// ─── Style class computation ─────────────────────────────────────────────────

/** React: B = P ? undefined : i */
const dirAttr = computed(() => isNested.value ? undefined : props.dir)

/** React: W = T !== "auto" && c[T] */
const textAlignClass = computed(() => {
  const map = { center: 'text-center', start: 'text-start', end: 'text-end' } as const
  return props.textAlign !== 'auto' ? map[props.textAlign as keyof typeof map] : undefined
})

/**
 * React: q = !P && c.block (display:block)
 * React: U = P && c.inline (display:inline)
 */
/** React: q = !P && c.block / React: U = P && c.inline */
const displayClass = computed(() => isNested.value ? 'inline' : 'block')

/** React: V = R !== "none" && u[R] */
const hyphensClass = computed(() => {
  const map = { auto: 'hyphens-auto', manual: 'hyphens-manual' } as const
  return props.hyphens !== 'none' ? map[props.hyphens as keyof typeof map] : undefined
})

/** React: H = I && c.preserveNewLines */
const preserveNewLinesClass = computed(() =>
  props.preserveNewLines ? 'whitespace-pre-wrap' : undefined,
)

/** React: x = a.xstyleConfig.textColor */
const textColorClass = computed(() => props.colorVariant?.xstyleConfig?.textColor)

/** React: D = S.xstyleConfig.textType */
const textTypeClass = computed(() => props.typeVariant?.xstyleConfig?.textType)

/**
 * React: G = [c.base, W, q, U, V, H, x, D]
 * Merged Stylex array forwarded to BaseTextV2SpanWrapper as xstyle.
 */
const xstyleClass = computed(() =>
  // React: G = [c.base, W, q, U, V, H, x, D]
  // c.base → max-w-full min-w-0 break-words
  ['max-w-full min-w-0 break-words', textAlignClass.value, displayClass.value,
   hyphensClass.value, preserveNewLinesClass.value,
   textColorClass.value, textTypeClass.value]
    .filter(Boolean)
    .join(' '),
)

// ─── Heading ─────────────────────────────────────────────────────────────────

/** React: E || L → BaseHeading wrap */
const isHeading = computed(() => props.isSemanticHeading || props.isPrimaryHeading)

/**
 * React: BaseHeading receives xstyle=c.heading
 * c.heading = { maxWidth: x193iq5w, minWidth: xeuugli }
 */
const headingXstyle = 'max-w-full min-w-0'

// ─── Tooltip ─────────────────────────────────────────────────────────────────

/** React: F = v != null && k > 0 ? TooltipWrapper(...) : A */
const showTooltip = computed(() =>
  props.truncationTooltip != null && props.maxLines > 0,
)
</script>

<!-- All styles replaced with Tailwind utility classes — no scoped CSS block needed -->
