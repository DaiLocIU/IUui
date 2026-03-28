<template>
  <BaseScrollableArea
    v-bind="rootAttrs"
    :tab-index="focusableTabIndex"
    :expanding="true"
    :has-scroll-chaining="hasScrollChaining"
    :hide-scrollbar="hideScrollbar"
    :horizontal="showsHorizontalScrollIndicator"
    :on-scroll-top="onScrollTop"
    :on-scroll-bottom="onScrollBottom"
    :vertical="showsVerticalScrollIndicator"
    :xstyle="rootXStyle"
    @scroll="emit('scroll', $event)"
  >
    <slot />
  </BaseScrollableArea>
</template>

<script setup lang="ts">
import { computed, useAttrs, type CSSProperties } from "vue";

import BaseScrollableArea from "./BaseScrollableArea.vue";

/**
 * CometScrollView.react
 *
 * Decoded mapping:
 * s  -> aria-label
 * p  -> focusable
 * _  -> hasScrollChaining
 * f  -> hideScrollbar
 * g  -> onScroll
 * h  -> onScrollBottom
 * y  -> onScrollTop
 * C  -> showsHorizontalScrollIndicator
 * b  -> showsVerticalScrollIndicator
 * v  -> withBottomShadow
 * S  -> withTopShadow
 * R  -> xstyle
 */
interface Props {
  ariaLabel?: string;
  focusable?: boolean;
  hasScrollChaining?: boolean | null;
  hideScrollbar?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  withBottomShadow?: boolean;
  withTopShadow?: boolean;
  xstyle?: CSSProperties;
  onScrollTop?: () => void;
  onScrollBottom?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: undefined,
  focusable: false,
  hasScrollChaining: null,
  hideScrollbar: false,
  showsHorizontalScrollIndicator: true,
  showsVerticalScrollIndicator: true,
  xstyle: undefined,
});

const emit = defineEmits<{
  (e: "scroll", payload: Event): void;
}>();

const attrs = useAttrs();

const forwardedAttrs = computed(() => {
  const {
    "aria-label": _ariaLabel,
    "data-testid": _dataTestId,
    ...rest
  } = attrs as Record<string, unknown>;

  return rest;
});

const resolvedAriaLabel = computed(
  () => props.ariaLabel ?? (attrs["aria-label"] as string | undefined),
);

const focusableAttrs = computed(() =>
  props.focusable && resolvedAriaLabel.value != null
    ? {
        "aria-label": resolvedAriaLabel.value,
      }
    : {},
);

const rootAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...focusableAttrs.value,
}));

const focusableTabIndex = computed(() =>
  props.focusable && resolvedAriaLabel.value != null ? 0 : undefined,
);

const rootXStyle = computed<CSSProperties>(() => ({
  position: "relative",
  willChange: "transform",
  ...props.xstyle,
}));

const {
  hasScrollChaining,
  hideScrollbar,
  onScrollTop,
  onScrollBottom,
  showsHorizontalScrollIndicator,
  showsVerticalScrollIndicator,
} = props;
</script>
