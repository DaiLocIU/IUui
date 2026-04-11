<template>
  <span v-if="hasIconBefore" style="display: inline; white-space: nowrap">
    <span :style="iconInnerStyle">
      <slot name="iconBefore" />
    </span>
    <BaseNonBreakingSpace :size="resolvedSpacing" :size-px="spacingPx" />
  </span>

  <slot />

  <span v-if="hasIconAfter" style="display: inline; white-space: nowrap">
    <BaseNonBreakingSpace :size="resolvedSpacing" :size-px="spacingPx" />
    <span :style="iconInnerStyle">
      <slot name="iconAfter" />
    </span>
  </span>
</template>

<script setup lang="ts">
/**
 * BaseTextWithIcon — Vue port of Meta's BaseTextWithIcon.react (web path)
 *
 * Decoded from:
 *   __d("BaseTextWithIcon.react", [...], function(...) { ... }, 98)
 *
 * Renders an icon before and/or after inline text without allowing a line
 * break between the icon and the adjacent word. Uses BaseNonBreakingSpace
 * for the gap.
 *
 * React prop  → Vue equivalent
 * ──────────────────────────────
 * children              → default slot
 * iconBefore            → #iconBefore slot  (React: any non-null value triggers render)
 * iconAfter             → #iconAfter slot   (React: any non-null value triggers render)
 * iconOverrideVerticalStyle → iconOverrideVerticalStyle prop
 * spacing               → spacing prop (default 0.5)
 * spacingPx             → spacingPx prop
 *
 * Stylex classes decoded (web path only — native path omitted):
 *   u.iconContainerWeb:
 *     xt0psk2  → display: inline          (flows with surrounding text)
 *     xuxw1ft  → white-space: nowrap      (no break between icon + spacer)
 *
 *   u.iconWeb:
 *     x6s0dn4  → align-items: center
 *     x3nfvp2  → display: inline-flex     (inline flow + flex children)
 *     xxymvpz  → vertical-align: middle   (aligns icon box to text midline)
 */

import { computed, useSlots } from "vue";
import BaseNonBreakingSpace from "./BaseNonBreakingSpace.vue";

// ─── Props ────────────────────────────────────────────────────────────────────

const props = defineProps<{
  /**
   * React: e.iconOverrideVerticalStyle → p = l === void 0 ? null : l
   * Extra vertical-align style merged onto the icon inner view.
   */
  iconOverrideVerticalStyle?: string | Record<string, string> | null;

  /**
   * React: e.spacing → f = d === void 0 ? 0.5 : d
   * Gap between icon and text in ch units. Default 0.5.
   */
  spacing?: number;

  /**
   * React: e.spacingPx → m
   * Gap in absolute pixels. When set, overrides spacing.
   */
  spacingPx?: number;
}>();

// ─── Slot detection ───────────────────────────────────────────────────────────

const slots = useSlots();

/**
 * React: `i != null` — the iconBefore block only renders when prop is non-null.
 * In Vue: slot filled = prop provided.
 */
const hasIconBefore = computed(() => !!slots.iconBefore);

/**
 * React: `a != null` — the iconAfter block only renders when prop is non-null.
 */
const hasIconAfter = computed(() => !!slots.iconAfter);

// ─── Resolved spacing ─────────────────────────────────────────────────────────

/**
 * React: size={m != null ? void 0 : f}
 * When spacingPx is provided, pass undefined for size so BaseNonBreakingSpace
 * uses the px branch. Otherwise pass the ch-unit spacing value.
 */
const resolvedSpacing = computed(() =>
  props.spacingPx != null ? undefined : (props.spacing ?? 0.5),
);

// ─── Icon inner style ─────────────────────────────────────────────────────────

/**
 * React: xstyle={[g, p]} where g = u.iconWeb (web path)
 *   u.iconWeb decoded:
 *     display: inline-flex     (x3nfvp2)
 *     align-items: center      (x6s0dn4)
 *     vertical-align: middle   (xxymvpz)
 *   p = iconOverrideVerticalStyle (nullable, merged on top)
 *
 * We merge the base style with any override directly in the computed.
 */
const iconInnerStyle = computed(() => {
  const base: Record<string, string> = {
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "middle",
  };

  if (!props.iconOverrideVerticalStyle) return base;

  if (typeof props.iconOverrideVerticalStyle === "string") {
    // treat as a single verticalAlign value override
    return { ...base, verticalAlign: props.iconOverrideVerticalStyle };
  }

  return { ...base, ...props.iconOverrideVerticalStyle };
});
</script>
