<script setup lang="ts">
/**
 * IUColumn — Vue 3 port of CometColumn.react
 *
 * Owned props (e[] in the source):
 *   align            — passed to context as default alignItems for all IUColumnItems
 *   expanding        — outer root: flex-grow, flex-shrink-0, basis-auto, min-h-0
 *   hasDividers      — passed to context; IUColumnItem renders <hr> when set
 *   paddingHorizontal — passed to context; IUColumnItem uses as default px
 *   paddingTop       — paddingTop override on outer root (0|4|8|12|16|20|24|40)
 *   paddingVertical  — paddingTop + paddingBottom outer root (4|8|12|16|20|24|40)
 *   spacing          — passed to context; IUColumnItem applies as margin gap
 *   verticalAlign    — justifyContent on inner div (top|center|bottom|space-between)
 *
 * Everything else ($attrs) → forwarded to the OUTER root <div>.
 *
 * Structure (two divs):
 *   <outer div (attrs + outer classes)>   ← root + expanding + padding
 *     <inner div (inner classes)>         ← flex-col flex-grow + justifyContent
 *       <ColumnContext.Provider>
 *         <slot>
 *       </ColumnContext.Provider>
 *     </inner>
 *   </outer>
 *
 * Auto-wrap: when inside a parent ColumnContext (x != null) →
 *   wrap whole output in IUColumnItem { expanding }
 */
import { computed, useAttrs } from "vue";
import {
  useColumnContext,
  provideColumnContext,
} from "../system/layoutKeys";
import type { ColumnAlignValue, ColumnVerticalAlignValue } from "../system/layoutKeys";
import IUColumnItem from "./IUColumnItem.vue";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /** Default alignItems for child IUColumnItems (null = stretch by default in items). */
  align: {
    type: String as () => ColumnAlignValue,
    default: undefined,
    validator: (v: string) => ["stretch", "center", "end", "start"].includes(v),
  },
  /** Outer root: flex-basis:auto, flex-grow:1, flex-shrink:0, min-height:0 */
  expanding: {
    type: Boolean,
    default: false,
  },
  /** If true, IUColumnItem renders a separator line before itself. */
  hasDividers: {
    type: Boolean,
    default: false,
  },
  /** Passed to context; IUColumnItem uses as default paddingHorizontal. Token: 4|8|12|16|20. */
  paddingHorizontal: {
    type: Number,
    default: undefined,
    validator: (v: number) => [4, 8, 12, 16, 20].includes(v),
  },
  /** paddingTop override on outer root. Token: 0|4|8|12|16|20|24|40. */
  paddingTop: {
    type: Number,
    default: undefined,
    validator: (v: number) => [0, 4, 8, 12, 16, 20, 24, 40].includes(v),
  },
  /** paddingTop + paddingBottom on outer root. Token: 0|4|8|12|16|20|24|40. Default 0. */
  paddingVertical: {
    type: Number,
    default: 0,
    validator: (v: number) => [0, 4, 8, 12, 16, 20, 24, 40].includes(v),
  },
  /** Passed to context; IUColumnItem uses as margin gap between items. Token: 4|8|12|16|20|24|32|40. */
  spacing: {
    type: Number,
    default: undefined,
    validator: (v: number) => [4, 8, 12, 16, 20, 24, 32, 40].includes(v),
  },
  /** Inner div justifyContent. default "top" (= flex-start, no class). */
  verticalAlign: {
    type: String as () => ColumnVerticalAlignValue,
    default: "top",
    validator: (v: string) => ["top", "center", "bottom", "space-between"].includes(v),
  },
});

const attrs = useAttrs();

// ─── Detect parent column context (auto-wrap) ─────────────────────────────────
const parentColumn = useColumnContext();

// ─── Provide column context to children ──────────────────────────────────────
// Mirrors: P = { align: R, hasDividers: E, paddingHorizontal: k, spacing: T }
provideColumnContext({
  inColumn: true,
  align: props.align ?? undefined,
  hasDividers: props.hasDividers,
  paddingHorizontal: props.paddingHorizontal,
  spacing: props.spacing,
});

// ─── Tailwind Class Maps ──────────────────────────────────────────────────────
// f[] — paddingVertical
const pyMap: Record<number, string> = { 
  0:"py-0", 4:"py-1", 8:"py-2", 12:"py-3", 16:"py-4", 20:"py-5", 24:"py-6", 40:"py-10" 
};
// _[] — paddingTop override
const ptMap: Record<number, string> = { 
  0:"pt-0", 4:"pt-1", 8:"pt-2", 12:"pt-3", 16:"pt-4", 20:"pt-5", 24:"pt-6", 40:"pt-10" 
};
// spacing → gap
const gapMap: Record<number, string> = { 
  0:"gap-0", 4:"gap-1", 8:"gap-2", 12:"gap-3", 16:"gap-4", 20:"gap-5", 24:"gap-6", 32:"gap-8", 40:"gap-10" 
};
// g[] — verticalAlign → justifyContent on inner
const justifyMap: Record<string, string> = {
  bottom:          "justify-end",
  center:          "justify-center",
  "space-between": "justify-between",
};

// ─── Outer root classes ───────────────────────────────────────────────────────
// p.root: box-border flex flex-col flex-shrink-0 max-w-full
// N (expanding): flex-grow flex-shrink-0 basis-auto min-h-0
// M (paddingVertical): py-*
// w (paddingTop override): pt-* (applied after py to override just the top)
const outerClasses = computed(() => [
  "box-border flex flex-col flex-shrink-0 max-w-full",
  props.expanding ? "flex-grow flex-shrink-0 basis-auto min-h-0" : "",
  pyMap[props.paddingVertical as number] || "",
  ptMap[props.paddingTop as number] || "",
].filter(Boolean));

// ─── Inner div classes ────────────────────────────────────────────────────────
// p.inner: flex flex-col flex-grow min-h-0
// F (verticalAlign ≠ "top"): justifyContent class
const innerClasses = computed(() => [
  "flex flex-col flex-grow min-h-0",
  props.verticalAlign !== "top" && justifyMap[props.verticalAlign]
    ? justifyMap[props.verticalAlign]
    : "",
  gapMap[props.spacing as number] || "",
].filter(Boolean));
</script>

<template>
  <!--
    Auto-wrap: when inside a parent CometColumnContext (parentColumn != null)
    wrap the entire output in IUColumnItem{ expanding }.
    Mirrors: if (x != null) → CometColumnItem { expanding: L, children: U }
  -->
  <IUColumnItem v-if="parentColumn" :expanding="expanding">
    <!-- Outer root div: rest attrs + outer classes -->
    <div v-bind="attrs" :class="outerClasses">
      <!-- Inner div: flex-grow + verticalAlign + gap -->
      <div :class="innerClasses">
        <slot></slot>
      </div>
    </div>
  </IUColumnItem>

  <!-- Top-level: no auto-wrap -->
  <div v-else v-bind="attrs" :class="outerClasses">
    <div :class="innerClasses">
      <slot></slot>
    </div>
  </div>
</template>
