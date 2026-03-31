<!-- BaseHeading.vue -->
<!--
  React: BaseHeading.react
  Renders the correct semantic heading element (h1–h6) based on:
  1. isPrimaryHeading=true → always h1, regardless of context
  2. Otherwise → reads numeric level from BaseHeadingContext (injected by ancestor),
     clamps to [2, 6] to prevent h1 from appearing except at primary position
  
  Also reads BaseTextContext to suppress dir="auto" on nested spans (same as BaseTextV2SpanWrapper).
  
  Stylex classes:
    p.root: color inherit, fontSize inherit, fontWeight inherit, outline:0
    p.rootGated: box-shadow (gkx "8029" feature gate — omitted in Vue, no runtime feature flags)
    p.oldBrowsers: box-shadow fallback for Chrome<83 / Safari<14.1 / Firefox<69 (omitted in Vue)
-->
<template>
  <!--
    React: s.jsx(b, { "data-testid": void 0, dir: E, id: a, ref: l, style: k, ... })
    b = resolved heading element (h1–h6)
    E = isNested ? undefined : "auto"
    k = [p.root, ...gatedStyles, xstyle]

    data-testid is intentionally suppressed (React source: "data-testid": void 0)
  -->
  <component
    :is="headingTag"
    ref="headingRef"
    class="btv-heading-root"
    :class="xstyle"
    :dir="dirAttr"
    :id="id"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBaseHeadingContext } from '../system/baseHeadingKeys'
import { useBaseTextContext } from '../system/baseTextKeys'

// ─── Props ───────────────────────────────────────────────────────────────────

const props = withDefaults(
  defineProps<{
    /** React: n */
    id?: string
    /**
     * React: i (isPrimaryHeading), g = i === void 0 ? false : i
     * When true, always renders as h1 regardless of BaseHeadingContext level.
     */
    isPrimaryHeading?: boolean
    /** React: u — forwarded for SSR compatibility */
    suppressHydrationWarning?: boolean
    /**
     * React: d (testid) — intentionally suppressed (set to void 0 at JSX site).
     * Accepted for API compatibility but never forwarded to DOM.
     */
    testid?: string
    /**
     * React: f (xstyle) — additional CSS class for the heading element.
     * In BaseTextV2, this receives c.heading (max-width:100%, min-width:0).
     */
    xstyle?: string | Record<string, boolean>
  }>(),
  {
    id: undefined,
    isPrimaryHeading: false,
    suppressHydrationWarning: undefined,
    testid: undefined,
    xstyle: undefined,
  },
)

// ─── Ref ────────────────────────────────────────────────────────────────────

/** React: l (ref) — forwarded to the heading element */
const headingRef = ref<HTMLElement | null>(null)

defineExpose({ el: headingRef })

// ─── Context ─────────────────────────────────────────────────────────────────

/**
 * React: h = c(r("BaseHeadingContext"))
 * Numeric heading level injected by the nearest BaseHeadingContextProvider.
 * Defaults to 2 when no provider is present.
 */
const headingLevel = useBaseHeadingContext()

/**
 * React: v = useBaseTextContext(), S = v?.nested === true
 * Suppress dir="auto" on nested spans to avoid conflicting dir attributes.
 */
const baseTextCtx = useBaseTextContext()
const isNested = computed(() => baseTextCtx?.nested === true)

// ─── Computed tag ─────────────────────────────────────────────────────────────

/**
 * React source:
 *   if (isPrimaryHeading) { y = html.h1; break }
 *   var C = Math.max(Math.min(h, 6), 2)
 *   y = _["" + C]
 *
 * isPrimaryHeading → h1 unconditionally.
 * Otherwise: clamp the context-provided level to [2, 6] — never lower than h2
 * unless explicitly flagged as the page's primary heading.
 */
const headingTag = computed<string>(() => {
  if (props.isPrimaryHeading) return 'h1'
  const clampedLevel = Math.max(Math.min(headingLevel, 6), 2)  // React: C
  return `h${clampedLevel}`
})

/**
 * React: E = S ? undefined : "auto"
 * dir="auto" is applied to root (non-nested) headings for bidirectional text support.
 * Suppressed when nested to avoid conflicting dir attributes on child spans.
 */
const dirAttr = computed(() => isNested.value ? undefined : 'auto')
</script>

<style scoped>
/*
 * React: p.root
 * Stylex: x1heor9g (color inherit), x1qlqyl8 (font-size inherit),
 *   x1pd3egz (font-weight inherit), x1a2a7pz (outline: 0)
 *
 * Reset browser default heading styles so BaseHeading acts as a
 * semantic wrapper without imposing visual defaults.
 * Visual styling comes from the typeVariant/colorVariant system.
 */
.btv-heading-root {
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  outline: 0;
  margin: 0;
  padding: 0;
}

/*
 * React: p.rootGated + p.oldBrowsers
 * These are feature-gated (gkx "8029") box-shadow styles for focus rings.
 * In Vue we omit these — implement a focus ring via :focus-visible if needed.
 */
</style>
