<script setup lang="ts">
/**
 * IURowItem — Vue 3 port of CometRowItem.react
 *
 * Owned props (s[] in the source):
 *   fallback    — Error boundary fallback.
 *                   undefined = no error boundary
 *                   null      = wrap in error boundary but show nothing on error
 *                   VNode / (error) => VNode = custom error UI
 *   placeholder — Suspense placeholder (shown while async children load).
 *                   undefined = no Suspense wrapper
 *
 * Everything else ($attrs) is forwarded to IUBaseRowItem.
 *
 * Key behaviours:
 *  1. Reads spacingHorizontal + spacingVertical from parent RowContext
 *     → applies as paddingInline / paddingBlock Tailwind classes
 *  2. Resets RowContext to null for its children
 *     (so nested rows know they are inside an item, not a raw row)
 *  3. Three render paths:
 *     a. placeholder defined → wrap in <Suspense>
 *     b. fallback defined    → wrap in error boundary via onErrorCaptured
 *     c. normal              → just render IUBaseRowItem with spacing + reset context
 */
import { computed, ref, onErrorCaptured, useAttrs, type VNode } from "vue";
import { useRowContext, provideRowContext } from "../system/layoutKeys";
import IUBaseRowItem from "./IUBaseRowItem.vue";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Error boundary fallback.
   * - undefined  → no error boundary (default)
   * - null       → silent error boundary (catches errors, renders nothing on failure)
   * - Function   → (error: Error) => rendered content (use default slot via hasError)
   */
  fallback: {
    type: [Function, Object, null] as unknown as () => null | VNode | ((error: Error | null) => VNode),
    default: undefined,
  },
  /**
   * Suspense placeholder — shown while async child components are loading.
   * - undefined → no Suspense wrapper (default)
   */
  placeholder: {
    default: undefined,
  },
});

const attrs = useAttrs();

// ─── Spacing from parent RowContext ───────────────────────────────────────────
// CometRowItem reads spacingHorizontal + spacingVertical from CometRowContext
// and applies them as paddingInlineStart/End and paddingTop/Bottom.
// We use Tailwind px-* / py-* equivalents.
const rowCtx = useRowContext();

// Tailwind spacing token map: full class names so static scanner picks them up
const spacingClasses = computed(() => {
  const sh = rowCtx?.spacing ?? 0; // spacingHorizontal
  const sv = rowCtx?.spacing ?? 0; // spacingVertical
  
  const pxMap: Record<number, string> = {
    0: "px-0", 4: "px-1", 8: "px-2", 12: "px-3",
    16: "px-4", 24: "px-6", 32: "px-8",
  };
  const pyMap: Record<number, string> = {
    0: "py-0", 4: "py-1", 8: "py-2", 12: "py-3",
    16: "py-4", 24: "py-6", 32: "py-8",
  };
  
  return [
    pxMap[sh] || "",
    pyMap[sv] || "",
  ].filter(Boolean);
});

// ─── Reset RowContext for children ────────────────────────────────────────────
// Mirrors: <CometRowContext.Provider value={null}>…</CometRowContext.Provider>
provideRowContext(null);

// ─── Error boundary (fallback prop) ──────────────────────────────────────────
const hasError = ref(false);
const capturedError = ref<Error | null>(null);

if (props.fallback !== undefined) {
  onErrorCaptured((err: Error) => {
    hasError.value = true;
    capturedError.value = err;
    return false; // stop propagation
  });
}

// Resolve fallback to a renderable value (VNode or null)
// Extracted here so the template doesn't need to call the function inline,
// which caused TypeScript to infer 'never' for the callable branch.
const resolvedFallback = computed(() => {
  const f = props.fallback as null | VNode | ((error: Error | null) => VNode) | undefined;
  if (f === undefined || f === null) return f;
  if (typeof f === "function") return f(capturedError.value);
  return f;
});
</script>

<template>
  <!--
    Render path A: placeholder defined → Suspense wrapper
    The item itself renders with IUBaseRowItem; the placeholder
    is shown while async children (e.g. async components) are loading.
  -->
  <Suspense v-if="placeholder !== undefined">
    <template #default>
      <IUBaseRowItem v-bind="attrs" :class="spacingClasses">
        <slot></slot>
      </IUBaseRowItem>
    </template>
    <template #fallback>
      <!-- placeholder can be a static element or passed via named slot -->
      <IUBaseRowItem v-bind="attrs" :class="spacingClasses">
        <slot name="placeholder">{{ placeholder }}</slot>
      </IUBaseRowItem>
    </template>
  </Suspense>

  <!--
    Render path B: fallback defined (error boundary)
    - null    → catch errors silently, render nothing on failure
    - function/value → render fallback UI on error
  -->
  <template v-else-if="fallback !== undefined">
    <!-- Error state -->
    <IUBaseRowItem v-if="hasError && fallback !== null" v-bind="attrs" :class="spacingClasses">
      <slot name="fallback" :error="capturedError">
        <component :is="resolvedFallback" />
      </slot>
    </IUBaseRowItem>

    <!-- Normal state (or silent error → render nothing = empty item) -->
    <IUBaseRowItem v-else-if="!hasError" v-bind="attrs" :class="spacingClasses">
      <slot></slot>
    </IUBaseRowItem>
  </template>

  <!--
    Render path C: normal — no Suspense, no error boundary
    Apply spacing padding from context, reset RowContext, delegate to IUBaseRowItem.
  -->
  <IUBaseRowItem v-else v-bind="attrs" :class="spacingClasses">
    <slot></slot>
  </IUBaseRowItem>
</template>
