<template>
  <BaseBadge
    :accessibility-text="accessibilityText"
    :testid="testid"
    :xstyle="resolvedXStyle"
    v-bind="forwardedAttrs"
  >
    <slot />
  </BaseBadge>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import BaseBadge from './BaseBadge.vue'
import type { StyleCapableValue } from '../utils/resolveStyling'

defineOptions({
  inheritAttrs: false,
})

type BaseStyledBadgeSize = 6 | 7 | 8 | 9 | 10 | 12 | 14 | 15 | 18 | 20 | 22 | 24 | 32 | 41

interface Props {
  accessibilityText?: string
  border?: boolean
  colorXStyle?: StyleCapableValue
  size?: BaseStyledBadgeSize
  testid?: string
  xstyle?: StyleCapableValue
}

const props = withDefaults(defineProps<Props>(), {
  accessibilityText: undefined,
  border: false,
  colorXStyle: undefined,
  size: 8,
  testid: undefined,
  xstyle: undefined,
})

const attrs = useAttrs()

const sizeStyles: Record<BaseStyledBadgeSize, StyleCapableValue> = {
  6: 'h-[6px] w-[6px]',
  7: 'h-[7px] w-[7px]',
  8: 'h-2 w-2',
  9: 'h-[9px] w-[9px]',
  10: 'h-2.5 w-2.5',
  12: 'h-3 w-3',
  14: 'h-3.5 w-3.5',
  15: 'h-[15px] w-[15px]',
  18: 'h-[18px] w-[18px]',
  20: 'h-5 w-5',
  22: 'h-[22px] w-[22px]',
  24: 'h-6 w-6',
  32: 'h-8 w-8',
  41: 'h-[41px] w-[41px]',
}

const borderedSizeStyles: Record<BaseStyledBadgeSize, StyleCapableValue> = {
  6: {
    borderTopStyle: 'solid',
    borderInlineEndStyle: 'solid',
    borderBottomStyle: 'solid',
    borderInlineStartStyle: 'solid',
    borderTopWidth: '1.5px',
    borderInlineEndWidth: '1.5px',
    borderBottomWidth: '1.5px',
    borderInlineStartWidth: '1.5px',
    height: '9px',
    width: '9px',
  },
  7: {
    borderTopStyle: 'solid',
    borderInlineEndStyle: 'solid',
    borderBottomStyle: 'solid',
    borderInlineStartStyle: 'solid',
    borderTopWidth: '2px',
    borderInlineEndWidth: '2px',
    borderBottomWidth: '2px',
    borderInlineStartWidth: '2px',
    height: '11px',
    width: '11px',
  },
  8: {
    borderTopStyle: 'solid',
    borderInlineEndStyle: 'solid',
    borderBottomStyle: 'solid',
    borderInlineStartStyle: 'solid',
    borderTopWidth: '2px',
    borderInlineEndWidth: '2px',
    borderBottomWidth: '2px',
    borderInlineStartWidth: '2px',
    height: '12px',
    width: '12px',
  },
  9: {
    borderTopStyle: 'solid',
    borderInlineEndStyle: 'solid',
    borderBottomStyle: 'solid',
    borderInlineStartStyle: 'solid',
    borderTopWidth: '2px',
    borderInlineEndWidth: '2px',
    borderBottomWidth: '2px',
    borderInlineStartWidth: '2px',
    height: '13px',
    width: '13px',
  },
  10: {
    borderTopStyle: 'solid',
    borderInlineEndStyle: 'solid',
    borderBottomStyle: 'solid',
    borderInlineStartStyle: 'solid',
    borderTopWidth: '2px',
    borderInlineEndWidth: '2px',
    borderBottomWidth: '2px',
    borderInlineStartWidth: '2px',
    height: '14px',
    width: '14px',
  },
  12: {
    borderTopStyle: 'solid',
    borderInlineEndStyle: 'solid',
    borderBottomStyle: 'solid',
    borderInlineStartStyle: 'solid',
    borderTopWidth: '2px',
    borderInlineEndWidth: '2px',
    borderBottomWidth: '2px',
    borderInlineStartWidth: '2px',
    height: '16px',
    width: '16px',
  },
  14: {
    borderTopStyle: 'solid',
    borderInlineEndStyle: 'solid',
    borderBottomStyle: 'solid',
    borderInlineStartStyle: 'solid',
    borderTopWidth: '2px',
    borderInlineEndWidth: '2px',
    borderBottomWidth: '2px',
    borderInlineStartWidth: '2px',
    height: '18px',
    width: '18px',
  },
  15: {
    borderTopStyle: 'solid',
    borderInlineEndStyle: 'solid',
    borderBottomStyle: 'solid',
    borderInlineStartStyle: 'solid',
    borderTopWidth: '2px',
    borderInlineEndWidth: '2px',
    borderBottomWidth: '2px',
    borderInlineStartWidth: '2px',
    height: '19px',
    width: '19px',
  },
  18: {
    borderTopStyle: 'solid',
    borderInlineEndStyle: 'solid',
    borderBottomStyle: 'solid',
    borderInlineStartStyle: 'solid',
    borderTopWidth: '2px',
    borderInlineEndWidth: '2px',
    borderBottomWidth: '2px',
    borderInlineStartWidth: '2px',
    height: '22px',
    width: '22px',
  },
  20: {
    borderTopStyle: 'solid',
    borderInlineEndStyle: 'solid',
    borderBottomStyle: 'solid',
    borderInlineStartStyle: 'solid',
    borderTopWidth: '4px',
    borderInlineEndWidth: '4px',
    borderBottomWidth: '4px',
    borderInlineStartWidth: '4px',
    height: '28px',
    width: '28px',
  },
  22: {
    borderTopStyle: 'solid',
    borderInlineEndStyle: 'solid',
    borderBottomStyle: 'solid',
    borderInlineStartStyle: 'solid',
    borderTopWidth: '4px',
    borderInlineEndWidth: '4px',
    borderBottomWidth: '4px',
    borderInlineStartWidth: '4px',
    height: '30px',
    width: '30px',
  },
  24: {
    borderTopStyle: 'solid',
    borderInlineEndStyle: 'solid',
    borderBottomStyle: 'solid',
    borderInlineStartStyle: 'solid',
    borderTopWidth: '4px',
    borderInlineEndWidth: '4px',
    borderBottomWidth: '4px',
    borderInlineStartWidth: '4px',
    height: '32px',
    width: '32px',
  },
  32: {
    borderTopStyle: 'solid',
    borderInlineEndStyle: 'solid',
    borderBottomStyle: 'solid',
    borderInlineStartStyle: 'solid',
    borderTopWidth: '4px',
    borderInlineEndWidth: '4px',
    borderBottomWidth: '4px',
    borderInlineStartWidth: '4px',
    height: '40px',
    width: '40px',
  },
  41: {
    borderTopStyle: 'solid',
    borderInlineEndStyle: 'solid',
    borderBottomStyle: 'solid',
    borderInlineStartStyle: 'solid',
    borderTopWidth: '4px',
    borderInlineEndWidth: '4px',
    borderBottomWidth: '4px',
    borderInlineStartWidth: '4px',
    height: '49px',
    width: '49px',
  },
}

const forwardedAttrs = computed(() => {
  const {
    accessibilityText: _accessibilityText,
    border: _border,
    colorXStyle: _colorXStyle,
    size: _size,
    testid: _testid,
    xstyle: _xstyle,
    ...rest
  } = attrs as Record<string, unknown>

  void _accessibilityText
  void _border
  void _colorXStyle
  void _size
  void _testid
  void _xstyle

  return rest
})

const resolvedXStyle = computed<StyleCapableValue>(() => [
  props.colorXStyle,
  props.border ? borderedSizeStyles[props.size] : sizeStyles[props.size],
  props.xstyle,
])
</script>
