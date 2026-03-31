<!-- BaseTextV2SpanWrapper.vue -->
<!-- React: BaseTextV2SpanWrapper.react — innermost span for the BaseTextV2 typography system -->
<!-- Renders a <span> with CSS-variable-driven font-size/line-height and optional cap-height/baseline trim via ::before/::after pseudo-elements -->
<template>
  <!-- React: u.jsx("span", babelHelpers.extends({ dir, id, ref, suppressHydrationWarning }, g, { children })) -->
  <!-- data-testid intentionally suppressed (React source sets it to void 0) -->
  <span
    ref="spanRef"
    :dir="dir"
    :id="id"
    :class="spanClass"
    :style="spanStyle"
    v-bind="restAttrs"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue'

// ─── Props ──────────────────────────────────────────────────────────────────

export interface ComputedValues {
  /** React: l.fontSize — fed into --x-fontSize CSS var and Stylex class xdmh292 */
  fontSize?: number | string | null
  /** React: l.lineHeight — fed into --x-lineHeight CSS var and Stylex class x15dsfln */
  lineHeight?: number | string | null
  /** React: l.baselineTrim — fed into --x-8dd7yt CSS var for ::after margin-top */
  baselineTrim?: number | string | null
  /** React: l.capHeightTrim — fed into --x-hxtmnb CSS var for ::before margin-bottom */
  capHeightTrim?: number | string | null
}

const props = withDefaults(
  defineProps<{
    /** React: l — token values for the typography system */
    computedValues?: ComputedValues
    /** React: s — HTML dir attribute for RTL/LTR direction */
    dir?: 'ltr' | 'rtl' | 'auto'
    /** React: c — HTML id attribute */
    id?: string
    /**
     * React: m — when true, suppresses ::before/::after cap-height & baseline trim.
     * Used when this span is nested inside another BaseTextV2SpanWrapper to avoid double-trimming.
     */
    nested?: boolean
    /**
     * React: _ (testid) — intentionally suppressed in the original source.
     * Accepted here for API compatibility but never forwarded to the DOM.
     */
    testid?: string
    /**
     * React: f (xstyle) — additional CSS class overrides.
     * In Vue: pass a plain CSS class string or object (no Stylex runtime).
     */
    xstyle?: string | Record<string, boolean>
  }>(),
  {
    computedValues: undefined,
    dir: undefined,
    id: undefined,
    nested: false,
    testid: undefined,
    xstyle: undefined,
  },
)

// ─── Attrs (strip testid + class before spreading) ──────────────────────────

const allAttrs = useAttrs()

/** React: Phase 3.3 — strip testid before attr spreading */
const restAttrs = computed(() => {
  const { testid, 'data-testid': dataTestid, class: _class, style: _style, ...rest } = allAttrs as Record<string, unknown>
  void testid
  void dataTestid
  void _class
  void _style
  return rest
})

// ─── Ref ────────────────────────────────────────────────────────────────────

/** React: a (ref) — forwarded ref to the underlying <span> */
const spanRef = ref<HTMLSpanElement | null>(null)

defineExpose({ el: spanRef })

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * React source: (function(e) { return typeof e === "number" ? e + "px" : e != null ? e : void 0 })(value)
 * Converts a numeric token to a px string; passes strings through; returns undefined for null/undefined.
 */
function toCSSValue(value: number | string | null | undefined): string | undefined {
  if (typeof value === 'number') return `${value}px`
  if (value != null) return value
  return undefined
}

// ─── Computed styles ────────────────────────────────────────────────────────

/**
 * React: styles.computedStyles(l)
 * Produces font-size and line-height CSS variables.
 * Stylex classes xdmh292 / x15dsfln activate the vars via `font-size: var(--x-fontSize)` etc.
 * In Vue we apply them directly as inline CSS vars since we have no Stylex runtime.
 */
const computedStyleVars = computed<Record<string, string | undefined>>(() => {
  const cv = props.computedValues
  if (!cv) return {}
  return {
    '--btv2-font-size': toCSSValue(cv.fontSize),
    '--btv2-line-height': toCSSValue(cv.lineHeight),
  }
})

/**
 * React: styles.computedPseudoStyles(l) — applied only when !nested
 * Produces ::before margin-bottom (capHeightTrim) and ::after margin-top (baselineTrim) CSS vars.
 * Stylex classes x140p0ai / x1gufx9m activate these vars on the pseudo-elements.
 */
const pseudoStyleVars = computed<Record<string, string | undefined>>(() => {
  if (props.nested) return {}
  const cv = props.computedValues
  if (!cv) return {}
  return {
    '--btv2-baseline-trim': toCSSValue(cv.baselineTrim),
    '--btv2-cap-height-trim': toCSSValue(cv.capHeightTrim),
  }
})

/**
 * React: g = stylex.props(computedStyles, pseudoStyles, block, xstyle) → { className, style }
 * In Vue: we merge the CSS vars as inline style and classes as :class.
 */
const spanStyle = computed<Record<string, string | undefined>>(() => ({
  ...computedStyleVars.value,
  ...pseudoStyleVars.value,
}))

/**
 * React: styles.block applied when !nested — sets ::before/::after display + height for the trim spacers.
 * In Vue: use the .btv2-block scoped class.
 */
const spanClass = computed(() => [
  'btv2-span',
  !props.nested && 'btv2-block',
  props.xstyle,
])
</script>

<style scoped>
/*
 * React: baseStyles (c) — resets ::before and ::after content/display so pseudo-elements can be
 * used purely as margin-based trim spacers.
 * Maps to Stylex classes: x100rkj9 (::after content), x1azrkns (::after display),
 *   x10tli2e (::before content), xpo3ry2 (::before display)
 */
.btv2-span::before,
.btv2-span::after {
  content: '';
  display: block;
}

/*
 * React: styles.block — applied when !nested. Provides ::before/::after height=0 so they collapse
 * to the margin trim amount and do not take any visual space of their own.
 * Maps to Stylex classes: x1s928wv (::after content), xhkezso (::after display),
 *   x1gmr53x (::after height), x1cpjm7i (::before content), x1fgarty (::before display), x1943h6x (::before height)
 */
.btv2-block::before {
  height: 0;
  /* React: --x-hxtmnb → ::before margin-bottom for cap-height trim */
  margin-bottom: var(--btv2-cap-height-trim);
}

.btv2-block::after {
  height: 0;
  /* React: --x-8dd7yt → ::after margin-top for baseline trim */
  margin-top: var(--btv2-baseline-trim);
}

/*
 * React: styles.computedStyles — font-size and line-height from CSS vars.
 * Stylex classes xdmh292 and x15dsfln activate: font-size: var(--x-fontSize) etc.
 * We use our own var names to avoid collision.
 */
.btv2-span {
  font-size: var(--btv2-font-size);
  line-height: var(--btv2-line-height);
}
</style>
