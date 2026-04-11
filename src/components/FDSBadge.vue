<template>
  <BaseStyledBadge
    :accessibility-text="accessibilityText"
    :border="hasBorder"
    :color-x-style="resolvedColorStyle"
    :size="size"
    :testid="testid"
    :xstyle="resolvedXStyle"
    v-bind="forwardedAttrs"
  >
    <slot />
  </BaseStyledBadge>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import BaseStyledBadge from './BaseStyledBadge.vue'
import getFDSBadgeColorStyle, { type FDSBadgeColor } from '../utils/getFDSBadgeColorStyle'
import type { StyleCapableValue } from '../utils/resolveStyling'

defineOptions({
  inheritAttrs: false,
})

type FDSBadgeBorder = 'none' | 'white' | 'dark'
type FDSBadgeSize = 6 | 7 | 8 | 9 | 10 | 12 | 14 | 15 | 18 | 20 | 22 | 24 | 32 | 41
type FDSBadgeWide = 'normal' | 'wide' | 'extraWide'

interface Props {
  accessibilityText?: string
  border?: FDSBadgeBorder
  color?: FDSBadgeColor
  colorOverride?: StyleCapableValue
  isProfileBadge?: boolean
  size?: FDSBadgeSize
  testid?: string
  wide?: FDSBadgeWide
  xstyle?: StyleCapableValue
}

const props = withDefaults(defineProps<Props>(), {
  accessibilityText: undefined,
  border: 'none',
  color: 'blue',
  colorOverride: undefined,
  isProfileBadge: false,
  size: 8,
  testid: undefined,
  wide: 'normal',
  xstyle: undefined,
})

const attrs = useAttrs()

const nonProfileBadgeSpacingStyle: StyleCapableValue = {
  marginInlineEnd: '8px',
}

const borderWhiteStyle: StyleCapableValue = {
  borderBottomColor: 'var(--card-background)',
  borderInlineEndColor: 'var(--card-background)',
  borderInlineStartColor: 'var(--card-background)',
  borderTopColor: 'var(--card-background)',
}

const borderDarkStyle: StyleCapableValue = {
  borderBottomColor: 'var(--comment-background)',
  borderInlineEndColor: 'var(--comment-background)',
  borderInlineStartColor: 'var(--comment-background)',
  borderTopColor: 'var(--comment-background)',
}

const wideStyles: Record<FDSBadgeSize, StyleCapableValue> = {
  6: { marginInlineStart: '3px', width: '9px' },
  7: { marginInlineStart: '3.5px', width: '10.5px' },
  8: { marginInlineStart: '4px', width: '12px' },
  9: { marginInlineStart: '4.5px', width: '13.5px' },
  10: { marginInlineStart: '5px', width: '15px' },
  12: { marginInlineStart: '6px', width: '18px' },
  14: { marginInlineStart: '7px', width: '21px' },
  15: { marginInlineStart: '7.5px', width: '22.5px' },
  18: { marginInlineStart: '9px', width: '27px' },
  20: { marginInlineStart: '10px', width: '30px' },
  22: { marginInlineStart: '11px', width: '33px' },
  24: { marginInlineStart: '12px', width: '36px' },
  32: { marginInlineStart: '16px', width: '48px' },
  41: { marginInlineStart: '20.5px', width: '61.5px' },
}

const extraWideStyles: Record<FDSBadgeSize, StyleCapableValue> = {
  6: { marginInlineStart: '6px', width: '12px' },
  7: { marginInlineStart: '7px', width: '14px' },
  8: { marginInlineStart: '8px', width: '16px' },
  9: { marginInlineStart: '9px', width: '18px' },
  10: { marginInlineStart: '10px', width: '20px' },
  12: { marginInlineStart: '12px', width: '24px' },
  14: { marginInlineStart: '14px', width: '28px' },
  15: { marginInlineStart: '15px', width: '30px' },
  18: { marginInlineStart: '18px', width: '36px' },
  20: { marginInlineStart: '20px', width: '40px' },
  22: { marginInlineStart: '22px', width: '44px' },
  24: { marginInlineStart: '24px', width: '48px' },
  32: { marginInlineStart: '32px', width: '64px' },
  41: { marginInlineStart: '41px', width: '82px' },
}

const forwardedAttrs = computed(() => {
  const {
    accessibilityText: _accessibilityText,
    border: _border,
    color: _color,
    colorOverride: _colorOverride,
    isProfileBadge: _isProfileBadge,
    size: _size,
    testid: _testid,
    wide: _wide,
    xstyle: _xstyle,
    ...rest
  } = attrs as Record<string, unknown>

  void _accessibilityText
  void _border
  void _color
  void _colorOverride
  void _isProfileBadge
  void _size
  void _testid
  void _wide
  void _xstyle

  return rest
})

const hasBorder = computed(() => props.border !== 'none')

const resolvedColorStyle = computed<StyleCapableValue>(() => (
  props.colorOverride ?? getFDSBadgeColorStyle(props.color, { version: '1dot1' })
))

const resolvedXStyle = computed<StyleCapableValue>(() => [
  props.isProfileBadge ? false : nonProfileBadgeSpacingStyle,
  props.border === 'white' ? borderWhiteStyle : false,
  props.border === 'dark' ? borderDarkStyle : false,
  props.wide === 'wide' ? wideStyles[props.size] : false,
  props.wide === 'extraWide' ? extraWideStyles[props.size] : false,
  props.xstyle,
])
</script>
