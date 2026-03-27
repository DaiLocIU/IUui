<script setup lang="ts">
/**
 * IUBaseRowItem — Vue 3 port of BaseRowItem.react
 *
 * Owned props (s[] in the source):
 *   expanding           — flex-grow / basis / shrink
 *   useDeprecatedStyles — legacy mode (no flex-col wrapper)
 *   verticalAlign       — alignSelf (top | center | bottom | stretch)
 *
 * Everything else ($attrs) is forwarded to the root <div> (BaseView).
 *
 * Reads from BaseRowContext (our RowContext):
 *   columns — 0-10 equal-width grid slots
 *   wrap    — "none" | "wrap" | "wrap-reverse"
 *
 * CSS logic mirrors the original exactly:
 *   L = item (or item_DEPRECATED)
 *   E = expanding styles      → when expanding=true
 *   k = expandingWithWrap     → when expanding=true AND wrap≠"none"
 *   I = column flex-basis     → when columns > 0
 *   T = verticalAlign         → when verticalAlign is set
 *   applied in order: [L, E, k, I, T]
 */
import { computed, useAttrs } from "vue";
import { useRowContext } from "../system/layoutKeys";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /** flex-grow: 1, flex-shrink: 0, flex-basis: auto, min-width: 0 */
  expanding: {
    type: Boolean,
    default: false,
  },
  /**
   * Legacy mode — skips display:flex + flex-direction:column wrapper.
   * Only adds max-width:100% + min-width:0 (item_DEPRECATED in the original).
   */
  useDeprecatedStyles: {
    type: Boolean,
    default: false,
  },
  /** alignSelf override */
  verticalAlign: {
    type: String as () => "top" | "center" | "bottom" | "stretch",
    default: undefined,
  },
});

const attrs = useAttrs();

// ─── Read BaseRowContext (columns + wrap) ─────────────────────────────────────
const rowCtx = useRowContext();

// ─── Tailwind class maps (mirrors the p[], _[] objects in BaseRowItem) ────────

// p[] — column count → flex-basis percentage
// condition: S > 0 && p[S]  (only applied when columns > 0)
const columnBasisMap: Record<number, string> = {
  1:  "basis-full",         // 100%/1
  2:  "basis-1/2",          // 100%/2
  3:  "basis-1/3",          // 100%/3
  4:  "basis-1/4",          // 100%/4
  5:  "basis-1/5",          // 100%/5
  6:  "basis-1/6",          // 100%/6
  7:  "basis-[14.2857%]",   // 100%/7
  8:  "basis-[12.5%]",      // 100%/8
  9:  "basis-[11.1111%]",   // 100%/9
  10: "basis-[10%]",        // 100%/10
};

// _[] — verticalAlign → alignSelf
const verticalAlignMap: Record<string, string> = {
  top:     "self-start",
  center:  "self-center",
  bottom:  "self-end",
  stretch: "self-stretch",
};

const classes = computed(() => {
  const columns = rowCtx?.columns ?? 0;
  const wrap    = rowCtx?.wrap    ?? "none";

  // L — base item style
  // item:            display:flex flex-direction:column flex-shrink:0 max-w-full min-w-0
  // item_DEPRECATED: max-w-full min-w-0  (no flex wrapper)
  const L = props.useDeprecatedStyles
    ? "max-w-full min-w-0"
    : "flex flex-col flex-shrink-0 max-w-full min-w-0";

  // E — expanding: flex-grow:1 flex-shrink:0 flex-basis:auto
  // (flex-1 = grow:1 shrink:1 basis:auto — we override shrink to 0 manually)
  const E = props.expanding
    ? "flex-grow flex-shrink-0 basis-auto"
    : "";

  // k — expandingWithWrap: flex-basis:auto (ensures basis stays auto when row wraps)
  // condition: expanding AND wrap !== "none"
  const k = (props.expanding && wrap !== "none")
    ? "basis-auto"
    : "";

  // I — column flex-basis from context
  // condition: S > 0 && p[S]
  const I = (columns > 0 && columnBasisMap[columns])
    ? columnBasisMap[columns]
    : "";

  // T — verticalAlign → alignSelf
  // condition: g != null && _[g]
  const T = (props.verticalAlign && verticalAlignMap[props.verticalAlign])
    ? verticalAlignMap[props.verticalAlign]
    : "";

  // Merge in source order: [L, E, k, I, T]
  return [L, E, k, I, T].filter(Boolean);
});
</script>

<template>
  <!-- BaseView.react is just a <div> — we forward all $attrs as rest props -->
  <div v-bind="attrs" :class="classes">
    <slot></slot>
  </div>
</template>
