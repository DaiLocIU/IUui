<template>
  <BaseListCell
    v-bind="attrs"
    ref="listCellRef"
    :content-id="contentId"
    :testid="testid"
    :variant="variant"
  >
    <template
      v-if="$slots.action != null"
      #action
    >
      <slot name="action" />
    </template>

    <template
      v-if="$slots.addOnStart != null"
      #addOnStart
    >
      <slot name="addOnStart" />
    </template>

    <slot />

    <template
      v-if="$slots.addOnBottom != null"
      #addOnBottom
    >
      <slot name="addOnBottom" />
    </template>

    <template
      v-if="$slots.addOnEnd != null"
      #addOnEnd
    >
      <slot name="addOnEnd" />
    </template>

    <template
      v-if="$slots.addOnFooter != null"
      #addOnFooter
    >
      <slot name="addOnFooter" />
    </template>
  </BaseListCell>

  <BaseDivider v-if="hasBottomDivider" />
</template>

<script setup lang="ts">
import {
  computed,
  reactive,
  ref,
  useAttrs,
  watchEffect,
  type ComponentPublicInstance,
} from 'vue'

import BaseDivider from './BaseDivider.vue'
import BaseListCell from './BaseListCell.vue'
import { provideBaseIsDecorativeContext } from '../system/baseIsDecorativeKeys'
import {
  provideCometListCellContext,
  type CometListCellContextValue,
} from '../system/cometListCellKeys'
import type { StyleCapableValue } from '../utils/resolveStyling'

defineOptions({
  inheritAttrs: false,
})

type VerticalAlignValue = 'top' | 'center' | 'bottom' | 'stretch'
type LayoutSizeValue = number | string

interface Props {
  addOnBottomResponsive?: boolean
  addOnEndVerticalAlign?: VerticalAlignValue
  addOnStartMarginTop?: number
  addOnStartVerticalAlign?: VerticalAlignValue
  contentId?: string
  contentPaddingHorizontal?: LayoutSizeValue
  disabled?: boolean
  hasBottomDivider?: boolean
  level?: number
  nestedSpacing?: LayoutSizeValue
  paddingVertical?: LayoutSizeValue
  spacingHorizontal?: LayoutSizeValue
  spacingVertical?: LayoutSizeValue
  testid?: string
  verticalAlign?: VerticalAlignValue
}

const props = withDefaults(defineProps<Props>(), {
  addOnBottomResponsive: false,
  addOnEndVerticalAlign: undefined,
  addOnStartMarginTop: undefined,
  addOnStartVerticalAlign: undefined,
  contentId: undefined,
  contentPaddingHorizontal: undefined,
  disabled: undefined,
  hasBottomDivider: false,
  level: 3,
  nestedSpacing: undefined,
  paddingVertical: undefined,
  spacingHorizontal: undefined,
  spacingVertical: undefined,
  testid: undefined,
  verticalAlign: 'center',
})

const attrs = useAttrs()
const listCellRef = ref<(ComponentPublicInstance & { el?: HTMLElement | null }) | null>(null)

const basePaddingClass = 'pt-[6px] pe-[6px] pb-[6px] ps-[6px]'
const baseRootClass = 'mt-[-6px] mb-[-6px] [margin-inline-start:-6px] [margin-inline-end:-6px] min-h-[56px] pt-[8px] pb-[8px] gap-y-[12px]'

const toCssLength = (value: LayoutSizeValue): string =>
  typeof value === 'number' ? `${value}px` : value

const toHalfCssLength = (value: LayoutSizeValue): string =>
  typeof value === 'number' ? `${value / 2}px` : `calc(${value} / 2)`

const toNegativeHalfCssLength = (value: LayoutSizeValue): string =>
  typeof value === 'number' ? `${-value / 2}px` : `calc(${value} / -2)`

const toMinHeightCssLength = (value: LayoutSizeValue): string =>
  typeof value === 'number' ? `${44 + value}px` : `calc(44px + ${value})`

const spacingHorizontalXStyle = computed<StyleCapableValue | undefined>(() => {
  if (props.spacingHorizontal == null) {
    return undefined
  }

  return [
    '[padding-inline-start:var(--x-paddingInline)] [padding-inline-end:var(--x-paddingInline)]',
    {
      '--x-paddingInline': toHalfCssLength(props.spacingHorizontal),
    },
  ]
})

const spacingVerticalXStyle = computed<StyleCapableValue | undefined>(() => {
  if (props.spacingVertical == null) {
    return undefined
  }

  return [
    '[padding-top:var(--x-paddingBlock)] [padding-bottom:var(--x-paddingBlock)]',
    {
      '--x-paddingBlock': toHalfCssLength(props.spacingVertical),
    },
  ]
})

const sharedInnerSpacingXStyle = computed<StyleCapableValue[]>(() => {
  const styles: StyleCapableValue[] = []

  if (spacingHorizontalXStyle.value != null) {
    styles.push(spacingHorizontalXStyle.value)
  }

  if (spacingVerticalXStyle.value != null) {
    styles.push(spacingVerticalXStyle.value)
  }

  return styles
})

const rootPaddingInlineXStyle = computed<StyleCapableValue | undefined>(() => {
  if (props.contentPaddingHorizontal == null) {
    return undefined
  }

  return [
    '[padding-inline-start:var(--x-paddingInline)] [padding-inline-end:var(--x-paddingInline)]',
    {
      '--x-paddingInline': toCssLength(props.contentPaddingHorizontal),
    },
  ]
})

const rootPaddingBlockXStyle = computed<StyleCapableValue | undefined>(() => {
  if (props.paddingVertical == null) {
    return undefined
  }

  return [
    '[padding-top:var(--x-paddingBlock)] [padding-bottom:var(--x-paddingBlock)]',
    {
      '--x-paddingBlock': toCssLength(props.paddingVertical),
    },
  ]
})

const rootRowGapXStyle = computed<StyleCapableValue | undefined>(() => {
  if (props.paddingVertical == null) {
    return undefined
  }

  return [
    '[row-gap:var(--x-rowGap)]',
    {
      '--x-rowGap': toCssLength(props.paddingVertical),
    },
  ]
})

const rootSpacingHorizontalXStyle = computed<StyleCapableValue | undefined>(() => {
  if (props.spacingHorizontal == null) {
    return undefined
  }

  return [
    '[margin-inline-start:var(--x-marginInline)] [margin-inline-end:var(--x-marginInline)]',
    {
      '--x-marginInline': toNegativeHalfCssLength(props.spacingHorizontal),
    },
  ]
})

const rootSpacingVerticalXStyle = computed<StyleCapableValue | undefined>(() => {
  if (props.spacingVertical == null) {
    return undefined
  }

  return [
    '[margin-top:var(--x-marginBlock)] [margin-bottom:var(--x-marginBlock)] min-h-[var(--x-minHeight)]',
    {
      '--x-marginBlock': toNegativeHalfCssLength(props.spacingVertical),
      '--x-minHeight': toMinHeightCssLength(props.spacingVertical),
    },
  ]
})

const addOnStartMarginXStyle = computed<StyleCapableValue | undefined>(() =>
  props.addOnStartMarginTop !== 0 ? 'mt-[-4px]' : undefined,
)

const variant = computed(() => ({
  addOnBottomResponsive: props.addOnBottomResponsive,
  addOnEndVerticalAlign: props.addOnEndVerticalAlign,
  addOnStartVerticalAlign: props.addOnStartVerticalAlign,
  nestedSpacing: props.nestedSpacing,
  verticalAlign: props.verticalAlign,
  xstyleConfig: {
    addOnBottom: [basePaddingClass, ...sharedInnerSpacingXStyle.value],
    addOnEnd: [basePaddingClass, ...sharedInnerSpacingXStyle.value],
    addOnStart: [basePaddingClass, ...sharedInnerSpacingXStyle.value, addOnStartMarginXStyle.value],
    content: [basePaddingClass, ...sharedInnerSpacingXStyle.value],
    root: [
      baseRootClass,
      rootPaddingInlineXStyle.value,
      rootPaddingBlockXStyle.value,
      rootRowGapXStyle.value,
      rootSpacingHorizontalXStyle.value,
      rootSpacingVerticalXStyle.value,
    ],
  },
}))

const cometListCellContext = reactive<CometListCellContextValue>({
  disabled: props.disabled,
  level: props.level,
})

watchEffect(() => {
  cometListCellContext.disabled = props.disabled
  cometListCellContext.level = props.level
})

provideBaseIsDecorativeContext(true)
provideCometListCellContext(cometListCellContext)

defineExpose({
  el: computed(() => listCellRef.value?.el ?? null),
  listCell: listCellRef,
})
</script>
