<template>
  <!--
    We render the Lucide icon component directly.
    All Lucide icons forward unknown attributes (class, style, aria-*, id, etc.)
    straight to the underlying <svg> element.
  -->
  <component
    :is="icon"
    :id="id"
    :class="resolved.className"
    :style="resolved.style"
    :size="size"
    :stroke-width="strokeWidth"
    :aria-hidden="ariaHidden"
    :aria-label="ariaLabel"
  />
</template>

<script setup lang="ts">
/**
 * BaseSVGIcon — lowest-level icon primitive.
 *
 * Mirrors Facebook's `BaseSVGIcon.react` but backed by `lucide-vue-next` icons.
 *
 * Features preserved from the original:
 *  - `BaseIsDecorativeContext` → `useBaseIsDecorativeContext()` inject
 *  - `aria-hidden` derived from (no alt) AND (decorative context is true)
 *  - `aria-label` for meaningful icons (Lucide pattern; replaces SVG <title>)
 *  - CSS custom property `--x-color` trick: color is applied via currentColor
 *  - `size` prop (width + height together, default 24 — Lucide standard)
 *  - `strokeWidth` prop for Lucide-specific stroke control
 *  - `xstyle` — accepts Tailwind strings, inline style objects, Stylex tokens
 */

import { computed } from "vue";
import type { Component, CSSProperties } from "vue";
import { useBaseIsDecorativeContext } from "../composables/useBaseIsDecorativeContext";
import {
  resolveStyling,
  type StyleCapableValue,
} from "../utils/resolveStyling";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface BaseSVGIconProps {
  /**
   * The Lucide icon component to render.
   * e.g. `import { Heart } from 'lucide-vue-next'` then `:icon="Heart"`
   */
  icon: Component;

  /**
   * Width and height of the icon in pixels.
   * Mirrors the original `size` prop. Default: 24 (Lucide standard).
   * Facebook's original default was 8 (FB used an 8-unit grid scale).
   */
  size?: number;

  /**
   * Raw CSS color value (e.g. "#1877F2", "var(--some-token)", "currentColor").
   * Applied via CSS custom property `--x-color` so the icon's `currentColor`
   * picks it up — exactly how the original Stylex trick works.
   * If omitted, the icon inherits `color` from CSS cascade.
   */
  color?: string;

  /**
   * Accessible label for the icon.
   * - If provided → icon is announced by screen readers via `aria-label`.
   * - If omitted AND `BaseIsDecorativeContext` is true → `aria-hidden="true"`.
   * - If omitted AND no decorative context → icon is still hidden (no label =
   *   meaningless to announce).
   */
  alt?: string;

  /**
   * Lucide stroke width. Default: 2 (Lucide standard).
   */
  strokeWidth?: number;

  /**
   * HTML id attribute forwarded to the SVG element.
   */
  id?: string;

  /**
   * Extra styling merged onto the icon element.
   * Accepts any StyleCapableValue:
   *   - Tailwind class string: `"text-red-500"`
   *   - Inline style object:   `{ opacity: 0.5 }`
   *   - Stylex token object:   `{ $$css: true, color: "x14rh7hd" }`
   *   - Array of the above
   * Mirrors the `xstyle` prop convention used across this library.
   */
  xstyle?: StyleCapableValue;
}

const props = withDefaults(defineProps<BaseSVGIconProps>(), {
  size: 24,
  strokeWidth: 2,
});

// ─── Decorative Context (mirrors BaseIsDecorativeContext) ──────────────────────

const isDecorativeContext = useBaseIsDecorativeContext();

// ─── Accessibility Logic ───────────────────────────────────────────────────────

/** True when the icon carries no text label. */
const hasNoAlt = computed(() => props.alt == null || props.alt === "");

/**
 * `aria-hidden="true"` only when:
 *   - icon has no alt text  AND
 *   - a parent has declared the context is decorative
 *
 * This exactly mirrors the original:
 *   var y = h && g === true ? true : void 0
 */
const ariaHidden = computed<true | undefined>(() =>
  hasNoAlt.value && isDecorativeContext === true ? true : undefined,
);

/**
 * `aria-label` = alt text when the icon is meaningful.
 * Replaces the SVG `<title>` approach used by the React original — Lucide's
 * icon components expose `aria-label` as the idiomatic accessibility handle.
 */
const ariaLabel = computed<string | undefined>(() =>
  hasNoAlt.value ? undefined : props.alt,
);

// ─── Styling — resolveStyling (color trick + xstyle) ─────────────────────────

/**
 * Mirrors the original Stylex dynamic `color` function:
 *
 *   color: function(t) {
 *     return [
 *       { color: "x14rh7hd" },          // atomic class: color: var(--x-color)
 *       { "--x-color": t }              // sets the custom property
 *     ]
 *   }
 *
 * We pass the CSS custom-property object as the first argument to resolveStyling.
 * resolveStyling detects keys starting with "--" via looksLikeStyleObject and
 * routes the object into the style array — exactly the same split as Stylex.
 *
 * xstyle is passed second so consumers can layer Tailwind classes, extra inline
 * styles, or Stylex token objects on top.
 */
const colorObject = computed<CSSProperties | null>(() =>
  props.color != null
    ? ({ "--x-color": props.color, color: "var(--x-color)" } as CSSProperties)
    : null,
);

const resolved = computed(() =>
  resolveStyling(colorObject.value, props.xstyle),
);
</script>
