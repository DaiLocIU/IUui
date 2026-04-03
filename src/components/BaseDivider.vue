<template>
  <hr
    v-bind="forwardedAttrs"
    :aria-hidden="ariaHidden"
    :class="[dividerStyling.className, attrs.class]"
    :style="[...dividerStyling.style, attrs.style]"
  />
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import {
  resolveStyling,
  type StyleCapableValue,
} from '../utils/resolveStyling'

defineOptions({
  inheritAttrs: false,
})

export interface BaseDividerVariant {
  xstyleConfig?: {
    divider?: StyleCapableValue
  }
}

export interface Props {
  ariaHidden?: boolean
  variant?: BaseDividerVariant
  xstyle?: StyleCapableValue
}

const props = withDefaults(defineProps<Props>(), {
  ariaHidden: undefined,
  variant: undefined,
  xstyle: undefined,
})

const attrs = useAttrs()

const dividerStyling = computed(() =>
  resolveStyling(
    {
      border: '0',
      height: '1px',
      margin: '0',
      backgroundColor: 'rgb(216, 223, 230)',
      boxSizing: 'border-box',
    },
    props.xstyle,
    props.variant?.xstyleConfig?.divider,
  ),
)

const forwardedAttrs = computed(() => {
  const {
    class: _class,
    style: _style,
    ...rest
  } = attrs as Record<string, unknown>

  void _class
  void _style

  return rest
})
</script>
