<script setup lang="ts">
/**
 * IUColumnItem — Vue 3 port of CometColumnItem.react
 *
 * Owned props (s[] in the source):
 *   align            — alignItems override (center | end | start | stretch)
 *   expanding        — flex-basis:auto, flex-grow:1, flex-shrink:0, min-height:0
 *   fallback         — error boundary fallback
 *   paddingHorizontal — paddingInlineStart/End override (4|8|12|16|20)
 *   paddingTop       — paddingTop override (0|4|8|12|16|20|24|40)
 *   paddingVertical  — paddingTop + paddingBottom (4|8|12|16|20|24|40)
 *   placeholder      — Suspense placeholder
 *   verticalAlign    — justifyContent (top | center | bottom | space-between)
 *
 * Everything else ($attrs) → forwarded to root <div> (BaseView).
 *
 * Reads from CometColumnContext (our ColumnContext):
 *   align            — default alignItems
 *   paddingHorizontal — default horizontal padding
 *   hasDividers      — show <hr> divider before this item
 *   spacing          — gap is now handled by IUColumn via CSS gap (not applied here)
 *
 * CSS logic (xstyle array in source order):
 *   1. f.root        → always: display:flex flex-col flex-shrink-0 max-w-full
 *   2. f.expanding   → if expanding: flex-grow flex-shrink-0 basis-auto min-h-0
 *   3. h[D]          → if align ≠ "stretch": alignItems class
 *   4. S[q]          → if verticalAlign ≠ "top": justifyContent class
 *   5. y[w]          → paddingHorizontal → px-*
 *   6. b[O]          → paddingVertical   → py-*
 *   7. C[A]          → paddingTop override → pt-* (replaces py top)
 *   8. spacing — handled by CSS gap on IUColumn's inner div (not applied here)
 *   9. custom xstyle (via class attr)
 *
 * Render paths (applied in order, wrapping the base element):
 *   H = base item JSX
 *   if fallback ≠ undefined → wrap H in error boundary
 *   if placeholder ≠ undefined → wrap in <Suspense>
 */
import { computed, ref, onErrorCaptured, useAttrs } from "vue";
import { useColumnContext, provideColumnContext } from "../system/layoutKeys";
import type { ColumnAlignValue } from "../system/layoutKeys";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /** alignItems override. Default comes from context, then "stretch". */
  align: {
    type: String as () => ColumnAlignValue,
    default: undefined,
    validator: (v: string) => ["stretch", "center", "end", "start"].includes(v),
  },
  /** flex-grow:1, flex-shrink:0, flex-basis:auto, min-height:0 */
  expanding: {
    type: Boolean,
    default: false,
  },
  /**
   * Error boundary fallback.
   * undefined → no boundary  |  null → silent boundary  |  VNode/fn → custom UI
   */
  fallback: {
    default: undefined,
  },
  /** paddingInlineStart + paddingInlineEnd. Tokens: 4|8|12|16|20px */
  paddingHorizontal: {
    type: Number,
    default: undefined,
    validator: (v: number) => [4, 8, 12, 16, 20].includes(v),
  },
  /** paddingTop only override. Tokens: 0|4|8|12|16|20|24|40px */
  paddingTop: {
    type: Number,
    default: undefined,
    validator: (v: number) => [0, 4, 8, 12, 16, 20, 24, 40].includes(v),
  },
  /** paddingTop + paddingBottom. Tokens: 4|8|12|16|20|24|40px. Default 0. */
  paddingVertical: {
    type: Number,
    default: 0,
    validator: (v: number) => [0, 4, 8, 12, 16, 20, 24, 40].includes(v),
  },
  /**
   * Suspense placeholder shown while async children load.
   * undefined → no Suspense wrapper.
   */
  placeholder: {
    default: undefined,
  },
  /** justifyContent (main-axis). Default: "top" (=flex-start). */
  verticalAlign: {
    type: String as () => "top" | "center" | "bottom" | "space-between",
    default: "top",
    validator: (v: string) => ["top", "center", "bottom", "space-between"].includes(v),
  },
});

const attrs = useAttrs();

// ─── Read CometColumnContext ──────────────────────────────────────────────────
const colCtx = useColumnContext();

// ─── Reset ColumnContext for children ─────────────────────────────────────────
// mirrors: <CometColumnContext.Provider value={null}>…</CometColumnContext.Provider>
provideColumnContext(null);

// ─── Tailwind Class Maps for Dynamic Padding ─────────────────────────────────
// Tailwind purges dynamic classes. By explicitly writing the full class names,
// Tailwind's static scanner will see them and generate the CSS.
const paddingClasses = computed(() => {
  const w = props.paddingHorizontal ?? colCtx?.paddingHorizontal ?? 0;
  const O = props.paddingVertical;
  const A = props.paddingTop;
  
  const pxMap: Record<number, string> = {
    0: "px-0", 4: "px-1", 8: "px-2", 12: "px-3",
    16: "px-4", 20: "px-5"
  };
  const pyMap: Record<number, string> = {
    0: "py-0", 4: "py-1", 8: "py-2", 12: "py-3",
    16: "py-4", 20: "py-5", 24: "py-6", 40: "py-10"
  };
  const ptMap: Record<number, string> = {
    0: "pt-0", 4: "pt-1", 8: "pt-2", 12: "pt-3",
    16: "pt-4", 20: "pt-5", 24: "pt-6", 40: "pt-10"
  };

  return [
    pxMap[w] || "",
    pyMap[O] || "",
    A != null ? ptMap[A] || "" : "",
  ].filter(Boolean);
});

// h[] — align → alignItems (only when ≠ "stretch")
const alignItemsMap: Record<string, string> = {
  center: "items-center",
  end:    "items-end",
  start:  "items-start",
};

// S[] — verticalAlign → justifyContent (only when ≠ "top")
const justifyMap: Record<string, string> = {
  center:          "justify-center",
  bottom:          "justify-end",
  "space-between": "justify-between",
};

const classes = computed(() => {
  // Resolve props vs context defaults (mirrors source logic)
  const D = props.align          ?? colCtx?.align          ?? "stretch";  // effectiveAlign
  const q = props.verticalAlign;                                           // q = verticalAlign

  const list: string[] = [
    // 1. f.root — always: display:flex flex-direction:column flex-shrink:0 max-w-full
    "flex flex-col flex-shrink-0 max-w-full",

    // 2. f.expanding — when expanding
    props.expanding ? "flex-grow flex-shrink-0 basis-auto min-h-0" : "",

    // 3. h[D] — alignItems when D ≠ "stretch"
    D !== "stretch" && alignItemsMap[D] ? alignItemsMap[D] : "",

    // 4. S[q] — justifyContent when q ≠ "top"
    q !== "top" && justifyMap[q] ? justifyMap[q] : "",

    // Dynamic paddings
    ...paddingClasses.value,
  ];

  return list.filter(Boolean);
});

const dividerClasses = computed(() => {
  const p = colCtx?.paddingHorizontal ?? 0;
  const pxMap: Record<number, string> = {
    0: "px-0", 4: "px-1", 8: "px-2", 12: "px-3",
    16: "px-4", 20: "px-5"
  };
  
  return [
    "border-t border-t-[color:var(--divider-color,#e0e0e0)]",
    pxMap[p] || "",
  ].filter(Boolean);
});

// ─── Error boundary ───────────────────────────────────────────────────────────
const hasError = ref(false);
const capturedError = ref<Error | null>(null);

if (props.fallback !== undefined) {
  onErrorCaptured((err: Error) => {
    hasError.value = true;
    capturedError.value = err;
    return false;
  });
}
</script>

<template>
  <!--
    Render path (mirrors source):
      H = base item (always built first)
      if fallback defined   → H is wrapped in error boundary
      if placeholder defined → then wrapped in Suspense
  -->

  <Suspense v-if="placeholder !== undefined">
    <template #default>

      <!-- Error boundary layer (inside Suspense) -->
      <template v-if="fallback !== undefined">

        <!-- Show error UI when failed -->
        <div v-if="hasError && fallback !== null" class="contents">
          <slot name="fallback" :error="capturedError"></slot>
        </div>

        <!-- Normal content (or silent on error: render nothing) -->
        <template v-else-if="!hasError">
          <!-- Divider (hasDividers from context) -->
          <div v-if="colCtx?.hasDividers" role="separator" :class="dividerClasses"></div>

          <div v-bind="attrs" :class="classes">
            <slot></slot>
          </div>
        </template>

      </template>

      <!-- No error boundary -->
      <template v-else>
        <div v-if="colCtx?.hasDividers" role="separator" :class="dividerClasses"></div>
        <div v-bind="attrs" :class="classes">
          <slot></slot>
        </div>
      </template>

    </template>

    <!-- Suspense fallback = placeholder -->
    <template #fallback>
      <div v-bind="attrs" :class="classes">
        <slot name="placeholder">{{ placeholder }}</slot>
      </div>
    </template>
  </Suspense>

  <!-- No Suspense, with error boundary -->
  <template v-else-if="fallback !== undefined">
    <div v-if="hasError && fallback !== null" class="contents">
      <slot name="fallback" :error="capturedError"></slot>
    </div>

    <template v-else-if="!hasError">
      <div v-if="colCtx?.hasDividers" role="separator" :class="dividerClasses"></div>
      <div v-bind="attrs" :class="classes">
        <slot></slot>
      </div>
    </template>
  </template>

  <!-- Normal render path (no Suspense, no error boundary) -->
  <template v-else>
    <div v-if="colCtx?.hasDividers" role="separator" :class="dividerClasses"></div>
    <div v-bind="attrs" :class="classes">
      <slot></slot>
    </div>
  </template>
</template>
