<script setup lang="ts">
import { computed } from "vue";

/**
 * Vue port of Meta's BaseNonBreakingSpace.react
 *
 * Renders an invisible inline spacer that prevents line breaks at the
 * insertion point. Width is controlled via props; platform fallback
 * uses a plain non-breaking space (&nbsp;) with its natural font width.
 *
 * React source render modes (priority order):
 *   1. Web + sizePx → <span style="margin-inline-end: {sizePx}px"> &#xFEFF; </span>
 *   2. Web + size   → <span style="margin-inline-end: {size}ch">   &#xFEFF; </span>
 *   3. Fallback     → <span> &nbsp; </span>
 */

interface Props {
  /**
   * React source: e.size
   * Spacer width in 'ch' units (relative to the font's "0" glyph width).
   * Scales with font size. Used when exact pixel control is not required.
   */
  size?: number;

  /**
   * React source: e.sizePx
   * Spacer width in absolute pixels (number) or any valid CSS length string.
   * Takes priority over `size` when both are provided.
   */
  sizePx?: number | string;
}

const props = defineProps<Props>();

/**
 * React source: XPlatReactEnvironment.isWeb()
 * In Vue we are always in a browser context. SSR environments can override
 * this by checking import.meta.env.SSR if needed.
 */
const isWeb = typeof window !== "undefined";

/**
 * React source: buildPxStyle(sizePx) — the c.marginInlineEndPx() builder.
 *
 * Original used a Stylex two-array pattern:
 *   [ { marginInlineEnd: "x1c9tiao", $$css: true }, { "--x-marginInlineEnd": value } ]
 * where x1c9tiao compiled to `margin-inline-end: var(--x-marginInlineEnd)`.
 *
 * In Vue we skip the atomic class indirection and set margin-inline-end directly
 * via a CSS custom property — identical runtime behaviour.
 */
function buildPxStyle(sizePx: number | string): Record<string, string> {
  const value =
    typeof sizePx === "number"
      ? `${sizePx}px`
      : sizePx != null
        ? sizePx
        : undefined;

  return value != null ? { "margin-inline-end": value } : {};
}

/**
 * React source: buildChStyle(size) — the c.marginInlineEnd() builder.
 * Appends 'ch' to the size number, same as the original `size + "ch"`.
 */
function buildChStyle(size: number): Record<string, string> {
  return { "margin-inline-end": `${size}ch` };
}

/**
 * React source: the render function's branch logic (after stripping compiler cache).
 * Returns the resolved style object and which character to render.
 *
 * renderMode drives the v-if / v-else-if / v-else in the template.
 */
const renderMode = computed<"px" | "ch" | "fallback">(() => {
  if (isWeb && props.sizePx != null) return "px";
  if (isWeb && props.size != null) return "ch";
  return "fallback";
});

/** Resolved inline style for the web px-mode branch. */
const pxStyle = computed(() =>
  props.sizePx != null ? buildPxStyle(props.sizePx) : {},
);

/** Resolved inline style for the web ch-mode branch. */
const chStyle = computed(() =>
  props.size != null ? buildChStyle(props.size) : {},
);
</script>

<template>
  <!--
    React source render mode 1: sizePx provided on web.
    &#xFEFF; = U+FEFF Zero-Width No-Break Space — truly zero-width by itself;
    all visual spacing comes from margin-inline-end (RTL-aware).
  -->
  <span v-if="renderMode === 'px'" :style="pxStyle" aria-hidden="true"
    >&#xFEFF;</span
  >

  <!--
    React source render mode 2: size (ch units) provided on web.
    Same invisible character; margin is font-relative via ch units.
  -->
  <span v-else-if="renderMode === 'ch'" :style="chStyle" aria-hidden="true"
    >&#xFEFF;</span
  >

  <!--
    React source render mode 3: non-web fallback (React Native / SSR).
    Uses &nbsp; (U+00A0) which carries its own intrinsic font width
    and prevents line-breaking without any CSS dependency.
  -->
  <span v-else aria-hidden="true">&nbsp;</span>
</template>
