<script setup lang="ts">
/**
 * IUBaseRow — Vue 3 port of BaseRow.react
 *
 * Handles all the low-level flex-row CSS and BaseRowContext (columns + wrap).
 * IURow is the Comet-layer on top that adds spacing/padding and nesting detection.
 *
 * Props mirror BaseRow exactly:
 *   align         — justify-content  (center | end | justify | start)  default: justify
 *   verticalAlign — align-items      (top | center | bottom | stretch)  default: stretch
 *   direction     — forward = row, backward = row-reverse               default: forward
 *   wrap          — none | forward (flex-wrap) | backward (rtl trick)   default: none
 *   columns       — 0-10 equal-width column slots                       default: 0
 *   expanding     — flex-1                                              default: false
 *   role          — ARIA role
 */
import { computed, useSlots, ref } from "vue";
import { provideRowContext } from "../system/layoutKeys";
import type { WrapValue } from "../system/layoutKeys";
import { useBaseRowA11yWrap } from "../composables/useBaseRowA11yWrap";

type AlignValue      = "center" | "end" | "justify" | "start";
type VerticalAlign   = "top" | "center" | "bottom" | "stretch";
type DirectionValue  = "forward" | "backward";
// BaseRow's wrap: "none" | "forward" (=wrap) | "backward" (=wrap-reverse / RTL trick)
type BaseWrapValue   = "none" | "forward" | "backward";

const props = defineProps({
  align: {
    type: String as () => AlignValue,
    default: "justify",
    validator: (v: string) => ["center", "end", "justify", "start"].includes(v),
  },
  verticalAlign: {
    type: String as () => VerticalAlign,
    default: "stretch",
    validator: (v: string) => ["top", "center", "bottom", "stretch"].includes(v),
  },
  direction: {
    type: String as () => DirectionValue,
    default: "forward",
    validator: (v: string) => ["forward", "backward"].includes(v),
  },
  wrap: {
    type: String as () => BaseWrapValue,
    default: "none",
    validator: (v: string) => ["none", "forward", "backward"].includes(v),
  },
  columns: {
    type: Number,
    default: 0,
    validator: (v: number) => v >= 0 && v <= 10,
  },
  expanding: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: undefined,
  },
});

// ─── A11y wrap ───────────────────────────────────────────────────────────────
// When direction=forward & wrap=backward, detect if 2 children wrap onto
// different lines and visually reverse them so DOM order ≠ visual order.
const needsA11yCheck = computed(
  () => props.direction === "forward" && props.wrap === "backward"
);
const [shouldReverse, containerRef] = useBaseRowA11yWrap(needsA11yCheck.value);

// ─── Row context (BaseRowContext equivalent) ──────────────────────────────
// Map IUBaseRow's wrap vocabulary → our layout system's WrapValue
const contextWrap = computed<WrapValue>(() => {
  if (props.wrap === "forward")  return "wrap";
  if (props.wrap === "backward") return "wrap-reverse";
  return "none";
});

provideRowContext({
  inRow: true,
  spacing: 0,         // spacing is added by IURow on top
  columns: props.columns,
  wrap: contextWrap.value,
});

// ─── Tailwind class maps ──────────────────────────────────────────────────────
// justify-content — direction=backward flips start/end
const alignFlip: Record<string, string> = { end: "start", start: "end" };
const alignClass = computed(() => {
  const effectiveAlign =
    props.direction === "backward" &&
    (props.align === "start" || props.align === "end")
      ? alignFlip[props.align]
      : props.align;

  return {
    center:  "justify-center",
    end:     "justify-end",
    justify: "justify-between",
    start:   "justify-start",
  }[effectiveAlign] ?? "justify-between";
});

// align-items
const verticalAlignClass = computed(() => ({
  top:     "items-start",
  center:  "items-center",
  bottom:  "items-end",
  stretch: "items-stretch",
}[props.verticalAlign] ?? "items-stretch"));

// flex-direction
const directionClass = computed(() =>
  props.direction === "backward" ? "flex-row-reverse" : "flex-row"
);

// flex-wrap — "backward" starts as nowrap; if a11y detects wrapping it adds forward-wrap
const wrapClass = computed(() => {
  if (props.wrap === "forward")   return "flex-wrap";
  if (props.wrap === "backward") {
    // When reversed + wrapped, switch to forward flex-wrap for proper visual order
    return shouldReverse.value ? "flex-wrap" : "flex-nowrap";
  }
  return "flex-nowrap";
});

// expanding
const expandingClass = computed(() =>
  props.expanding ? "flex-1 min-w-0" : ""
);

const classes = computed(() =>
  [
    "flex flex-shrink relative",
    directionClass.value,
    wrapClass.value,
    alignClass.value,
    verticalAlignClass.value,
    expandingClass.value,
  ].filter(Boolean)
);
</script>

<template>
  <div
    :ref="(el) => (containerRef = el as HTMLElement | null)"
    :class="classes"
    :role="role"
  >
    <!--
      A11y reverse: when direction=forward, wrap=backward, and children
      have visually wrapped AND there are exactly 2 slot items, we reverse
      their visual order by rendering in the opposite order via CSS
      (the flex-row-reverse + flex-wrap combo handles it).
      In Vue we can't conditionally reorder slots, so we rely on the
      CSS flex-row + flex-wrap vs flex-row-reverse + flex-nowrap toggle above.
    -->
    <slot></slot>
  </div>
</template>
