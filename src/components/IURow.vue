<script setup lang="ts">
/**
 * IURow — Vue 3 port of CometRow.react
 *
 * CometRow only owns these props (s[] in the source):
 *   paddingHorizontal, paddingVertical, paddingTop,
 *   spacing, spacingHorizontal, spacingVertical
 *
 * Everything else (expanding, columns, align, direction, wrap,
 * verticalAlign, role …) flows through $attrs to IUBaseRow.
 */
import { computed, useAttrs } from "vue";
import { useRowContext, useColumnContext } from "../system/layoutKeys";
import IUBaseRow from "./IUBaseRow.vue";
import IURowItem from "./IURowItem.vue";
import IUColumnItem from "./IUColumnItem.vue";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  spacing:           { type: Number, default: 12 },
  spacingHorizontal: { type: Number, default: undefined },
  spacingVertical:   { type: Number, default: undefined },
  paddingHorizontal: { type: Number, default: undefined },
  paddingVertical:   { type: Number, default: undefined },
  paddingTop:        { type: Number, default: undefined },
});

const attrs = useAttrs();

// ─── Nesting detection ────────────────────────────────────────────────────────
const parentRow    = useRowContext();
const parentColumn = useColumnContext();

// ─── Smart padding defaults (mirrors CometRow logic) ─────────────────────────
// paddingHorizontal default: 0 if inside a Column (column.paddingHorizontal != null), else 12
const effectivePaddingH = computed(() => {
  if (props.paddingHorizontal !== undefined) return props.paddingHorizontal;
  return parentColumn?.spacing != null ? 0 : 12;
});

// paddingTop default: 0 if inside a Column (column.spacing != null), else 16
const effectivePaddingTop = computed(() => {
  if (props.paddingTop !== undefined) return props.paddingTop;
  return parentColumn?.spacing != null ? 0 : 16;
});

const effectivePaddingV = computed(() =>
  props.paddingVertical !== undefined ? props.paddingVertical : 0
);

// ─── Independent H / V spacing ───────────────────────────────────────────────
const spacingH = computed(() => props.spacingHorizontal ?? props.spacing);
const spacingV = computed(() => props.spacingVertical   ?? props.spacing);

// ─── Tailwind Class Maps ──────────────────────────────────────────────────────
// By explicitly writing the full class names (e.g., "gap-x-3"), Tailwind's
// static scanner will see them during the build process and generate the CSS.
const spacingClasses = computed(() => {
  const gapHMap: Record<number, string> = {
    0: "gap-x-0", 4: "gap-x-1", 8: "gap-x-2", 12: "gap-x-3", 
    16: "gap-x-4", 24: "gap-x-6", 32: "gap-x-8"
  };
  const gapVMap: Record<number, string> = {
    0: "gap-y-0", 4: "gap-y-1", 8: "gap-y-2", 12: "gap-y-3",
    16: "gap-y-4", 24: "gap-y-6", 32: "gap-y-8"
  };
  return [
    gapHMap[spacingH.value as number] || "",
    gapVMap[spacingV.value as number] || "",
  ].filter(Boolean);
});

const paddingClasses = computed(() => {
  const pxMap: Record<number, string> = {
    0: "px-0", 4: "px-1", 8: "px-2", 12: "px-3",
    16: "px-4", 24: "px-6", 32: "px-8"
  };
  const ptMap: Record<number, string> = {
    0: "pt-0", 4: "pt-1", 8: "pt-2", 12: "pt-3",
    16: "pt-4", 24: "pt-6", 40: "pt-10"
  };
  const pbMap: Record<number, string> = {
    0: "pb-0", 4: "pb-1", 8: "pb-2", 12: "pb-3",
    16: "pb-4", 24: "pb-6", 40: "pb-10"
  };
  return [
    pxMap[effectivePaddingH.value as number] || "",
    ptMap[effectivePaddingTop.value as number] || "",
    pbMap[effectivePaddingV.value as number] || "",
  ].filter(Boolean);
});

const extraClasses = computed(() => [
  ...spacingClasses.value,
  ...paddingClasses.value,
]);

// expanding lives in attrs (rest props) — read for IURowItem
const isExpanding = computed(() => !!(attrs.expanding));
</script>

<template>
  <!--
    CometRow auto-wrapping (mirrors source exactly):
    - u != null (inside a Row)    → wrap in IURowItem    { expanding }
    - l != null (inside a Column) → wrap in IUColumnItem { expanding }
    - top-level                   → render IUBaseRow directly
    v-bind="attrs" passes all BaseRow props (expanding, columns, align …) through
  -->

  <!-- Inside a Row → IURowItem -->
  <IURowItem v-if="parentRow" :expanding="isExpanding">
    <IUBaseRow v-bind="attrs" :class="extraClasses">
      <slot></slot>
    </IUBaseRow>
  </IURowItem>

  <!-- Inside a Column → IUColumnItem -->
  <IUColumnItem v-else-if="parentColumn" :expanding="isExpanding">
    <IUBaseRow v-bind="attrs" :class="extraClasses">
      <slot></slot>
    </IUBaseRow>
  </IUColumnItem>

  <!-- Top-level → render directly -->
  <IUBaseRow v-else v-bind="attrs" :class="extraClasses">
    <slot></slot>
  </IUBaseRow>
</template>
