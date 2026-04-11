<template>
  <!-- ─── Pressable mode ──────────────────────────────────────────────────── -->
  <FDSPressable
    v-if="isPressable"
    :aria-label="pressableAriaLabel"
    :disabled="disabled"
    :focusable="focusable"
    :hide-hover-overlay="hideHoverOverlay"
    :link-props="linkProps"
    :on-hover-in="onHoverIn"
    :on-hover-out="onHoverOut"
    :on-press="onPress"
    :on-press-in="onPressIn"
    :on-press-out="onPressOut"
    :overlay-disabled="disableOverlay_DEPRECATED"
    :overlay-offset="8"
    overlay-radius="50%"
    :test-only_pressed="testOnly_pressed"
    :xstyle="pressableXStyle"
  >
    <!-- Image icon -->
    <CometImage
      v-if="isImageMode"
      :alt="resolvedAlt"
      :draggable="draggable"
      :src="imageIcon"
      :xstyle="xstyle"
    />

    <CometSVGIcon
      v-else
      :alt="resolvedAlt"
      :color="effectiveColor"
      :component="svgIcon"
      :size="size"
      :xstyle="xstyle"
    />
  </FDSPressable>

  <template v-else>
    <!-- Image icon -->
    <CometImage
      v-if="isImageMode"
      :alt="resolvedAlt"
      :draggable="draggable"
      :src="imageIcon"
      :xstyle="xstyle"
    />

    <CometSVGIcon
      v-else
      :alt="resolvedAlt"
      :color="effectiveColor"
      :component="svgIcon"
      :size="size"
      :xstyle="xstyle"
    />
  </template>
</template>

<script setup lang="ts">
/**
 * FDSIcon — top-level consumer-facing icon component.
 *
 * Mirrors Facebook's `FDSIcon.react`.
 *
 * Features:
 *  - Renders `CometImage` for image URL sources (string icon prop).
 *  - Renders `CometSVGIcon` for Lucide components (Component icon prop).
 *  - Wraps in `FDSPressable` when `onPress` or `linkProps` is provided.
 *  - Exact `p.button` reset styles and `p.pressed` scale(0.96) from source.
 *  - `isDecorative` provides `BaseIsDecorativeContext` to child icon.
 *  - `disabled` forcibly overrides `color` to the `"disabled"` token.
 *  - Exact `alt`/`aria-label` resolution logic from original.
 */

import { computed, watchEffect } from "vue";
import type { Component, PropType } from "vue";
import CometImage from "./CometImage.vue";
import CometSVGIcon from "./CometSVGIcon.vue";
import FDSPressable from "./FDSPressable/FDSPressable.vue";
import { provideBaseIsDecorativeContext } from "../composables/useBaseIsDecorativeContext";
import { type StyleCapableValue } from "../utils/resolveStyling";
import type {
  HoverEvent,
  PressEvent,
  LinkProps,
  PressableState,
} from "./WebPressable/types";
import type { IconColorToken } from "../composables/useCometIconColors";

// ─── Props ────────────────────────────────────────────────────────────────────

const props = defineProps({
  /**
   * Accessible label for the icon. Used as `aria-label` on the pressable
   * wrapper or on the icon itself depending on the mode.
   */
  alt: {
    type: String,
    default: "",
  },

  /**
   * Color token or raw CSS color.
   * Forcibly overridden to `"disabled"` when `disabled={true}`.
   */
  color: {
    type: String as PropType<IconColorToken | string>,
    default: "primary",
  },

  /**
   * Disables the icon. Forces `color` to `"disabled"` and suppresses events.
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Disables the hover overlay (the semi-transparent circle on hover).
   */
  disableOverlay_DEPRECATED: {
    type: Boolean,
    default: false,
  },

  /**
   * Whether the image is draggable (image mode only).
   */
  draggable: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },

  /**
   * Controls focusability of the pressable wrapper.
   */
  focusable: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },

  /**
   * Hides the hover overlay ring.
   */
  hideHoverOverlay: {
    type: Boolean,
    default: false,
  },

  /**
   * The icon to render.
   * - `string`: treated as an image URL → renders `CometImage`.
   * - `Component`: treated as a Lucide icon component → renders `CometSVGIcon`.
   */
  icon: {
    type: [String, Object, Function] as PropType<string | Component>,
    required: true,
  },

  /**
   * When `true`, wraps the icon in `BaseIsDecorativeContext` so that the
   * underlying icon gets `aria-hidden="true"` automatically.
   */
  isDecorative: {
    type: Boolean,
    default: false,
  },

  /**
   * When provided, renders as a link (`<a>`) instead of a `<button>`.
   */
  linkProps: {
    type: Object as PropType<LinkProps | null>,
    default: null,
  },

  /** Hover in event handler. */
  onHoverIn: {
    type: Function as PropType<(event: HoverEvent) => void>,
    default: undefined,
  },

  /** Hover out event handler. */
  onHoverOut: {
    type: Function as PropType<(event: HoverEvent) => void>,
    default: undefined,
  },

  /** Press event handler. Makes the icon pressable. */
  onPress: {
    type: Function as PropType<(event: MouseEvent | KeyboardEvent) => void>,
    default: undefined,
  },

  /** Press in event handler. */
  onPressIn: {
    type: Function as PropType<(event: PressEvent) => void>,
    default: undefined,
  },

  /** Press out event handler. */
  onPressOut: {
    type: Function as PropType<(event: PressEvent) => void>,
    default: undefined,
  },

  /**
   * Width and height of the icon in px.
   */
  size: {
    type: Number,
    default: 24,
  },

  /** Test only - force pressed state for snapshot tests. */
  testOnly_pressed: {
    type: Boolean,
    default: false,
  },

  /** Extra Tailwind/style passthrough. */
  xstyle: {
    type: null as unknown as PropType<StyleCapableValue>,
    default: undefined,
  },
});

// ─── Provide decorative context ───────────────────────────────────────────────

// When isDecorative changes, update the provided context value.
// Using watchEffect so that if the prop changes at runtime it stays in sync.
watchEffect(() => {
  provideBaseIsDecorativeContext(props.isDecorative);
});

// ─── Logic ────────────────────────────────────────────────────────────────────

/** Whether this icon has an interactive (pressable/linkable) mode. */
const isPressable = computed(
  () => props.onPress != null || props.linkProps != null,
);

/**
 * Effective color — forced to "disabled" when the icon is disabled,
 * preserves the passed color otherwise.
 */
const effectiveColor = computed(() =>
  props.disabled === true ? "disabled" : props.color,
);

/**
 * Aria-label resolution — mirrors the original exactly:
 *  - Pressable: aria-label is handled by FDSPressable, not the icon → undefined here.
 *  - isDecorative: suppress the label completely → "" (empty string).
 *  - Otherwise: use alt prop.
 */
const resolvedAlt = computed(() => {
  if (isPressable.value) return undefined;
  if (props.isDecorative) return "";
  return props.alt;
});

/**
 * Aria-label for the pressable wrapper.
 * Only used when the icon is pressable — the icon itself won't carry it.
 */
const pressableAriaLabel = computed(() =>
  isPressable.value ? props.alt || undefined : undefined,
);

/** Whether the icon prop is an image URL. */
const isImageMode = computed(() => typeof props.icon === "string");

/** Narrowed icon as a string (image URL). Only use when isImageMode is true. */
const imageIcon = computed(() => props.icon as string);

/** Narrowed icon as a Lucide Component. Only use when isImageMode is false. */
const svgIcon = computed(() => props.icon as Component);

// ─── Pressable xstyle ────────────────────────────────────────────────────────

/**
 * Button reset styles — exact translation of `p.button` from FDSIcon.react.
 *
 * Original Stylex tokens decoded from stylemap.css:
 *   appearance: none
 *   background-color: transparent
 *   border: 0 solid (all sides)
 *   display: inline-flex
 *   margin: 0 (all sides)
 *   padding: 0 (all sides)
 *   position: relative
 *   vertical-align: bottom
 *   ::after: content:"" / position:absolute / inset:-8px / border-radius:50% / z-index:1
 */
const buttonBaseStyle =
  "appearance-none bg-transparent border-0 border-solid inline-flex m-0 p-0 relative align-bottom after:content-[''] after:absolute after:[-top:8px] after:[-bottom:8px] after:[-inset-inline-end:8px] after:[-inset-inline-start:8px] after:rounded-[50%] after:z-[1]";

/**
 * xstyle function passed to FDSPressable.
 * Applies `scale(0.96)` (p.pressed from FDSIcon.react) when pressed.
 */
const pressableXStyle = (state: PressableState): StyleCapableValue => [
  buttonBaseStyle,
  state.pressed ? "scale-[0.96]" : false,
  props.xstyle,
];
</script>
