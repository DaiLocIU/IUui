<script setup lang="ts">
/**
 * CometSVGIcon — mid-level icon primitive.
 *
 * Mirrors Facebook's `CometSVGIcon.react`.
 *
 * Features:
 *  - Resolves color tokens (e.g. "primary", "highlight") using `useCometIconColors`.
 *  - Supports `inline` and `shadow` styling using Tailwind and `resolveStyling`.
 *  - Two modes:
 *    1. Wrapper mode: Renders `BaseSVGIcon` with an icon component.
 *    2. Custom mode: Renders an `<svg>` element with custom `viewBox` and children.
 */

import { computed, useId } from 'vue';
import type { Component, CSSProperties } from 'vue';
import BaseSVGIcon from './BaseSVGIcon.vue';
import { useCometIconColors, type IconColorToken } from '../composables/useCometIconColors';
import { useBaseIsDecorativeContext } from '../composables/useBaseIsDecorativeContext';
import { resolveStyling, type StyleCapableValue } from '../utils/resolveStyling';

// ─── Props ────────────────────────────────────────────────────────────────────

export interface CometSVGIconProps {
  /**
   * Accessible label for the icon.
   */
  alt?: string;

  /**
   * Color token or raw CSS color.
   * If a token like "primary" is passed, it resolves via `useCometIconColors`.
   */
  color?: IconColorToken | string;

  /**
   * The icon component to render (used in Wrapper mode).
   */
  component?: Component;

  /**
   * If true, applies inline-flex styling.
   */
  inline?: boolean;

  /**
   * If true, applies a drop shadow filter.
   */
  shadow?: boolean;

  /**
   * Width and height of the icon.
   */
  size?: number;

  /**
   * SVG viewBox attribute (triggers Custom mode).
   */
  viewBox?: string;

  /**
   * Extra styling via resolveStyling.
   */
  xstyle?: StyleCapableValue;
}

const props = withDefaults(defineProps<CometSVGIconProps>(), {
  inline: false,
  shadow: false,
  size: 24,
});

// ─── Internal State ──────────────────────────────────────────────────────────

const iconColors = useCometIconColors();
const isDecorative = useBaseIsDecorativeContext();
const generatedId = useId();

// ─── Logic ────────────────────────────────────────────────────────────────────

/**
 * Resolves the color token into a CSS value.
 * If the input is a valid token, returns its mapped value (e.g. var(--primary-icon)).
 * Otherwise returns the input as is (e.g. a raw hex code).
 */
const resolvedColor = computed(() => {
  if (props.color && props.color in iconColors) {
    return iconColors[props.color as IconColorToken];
  }
  return props.color;
});

/**
 * Common styles for both modes.
 * Uses Tailwind classes for icon basics, inline, and shadow.
 */
const cometStyles = computed(() => [
  'block align-middle transition-[color,fill,stroke] duration-[var(--fds-fast)] ease-[var(--fds-soft)]',
  props.inline && 'inline-block',
  props.shadow && '[filter:drop-shadow(0_2px_8px_var(--shadow-1))]',
  props.xstyle,
]);

const resolvedStyling = computed(() => resolveStyling(cometStyles.value));

/** Determines if we are in Custom mode (viewBox provided). */
const isCustomMode = computed(() => props.viewBox !== undefined);

/** Aria hidden state based on decorative context. */
const ariaHidden = computed(() => (isDecorative === true && !props.alt ? true : undefined));
</script>

<template>
  <!-- Custom mode: Direct SVG rendering -->
  <svg
    v-if="isCustomMode"
    v-bind="$attrs"
    :viewBox="viewBox"
    :class="resolvedStyling.className"
    :style="[...resolvedStyling.style, { color: resolvedColor, fill: 'currentColor' }]"
    :width="size"
    :height="size"
    :aria-hidden="ariaHidden"
    :aria-label="alt"
  >
    <slot />
  </svg>

  <!-- Wrapper mode: Uses BaseSVGIcon -->
  <BaseSVGIcon
    v-else
    :icon="component!"
    :size="size"
    :color="resolvedColor"
    :alt="alt"
    :xstyle="cometStyles"
  />
</template>
