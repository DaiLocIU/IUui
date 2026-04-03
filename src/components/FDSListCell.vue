<template>
  <BaseListCell
    v-bind="forwardedAttrs"
    ref="baseListCellRef"
    :content-id="contentId"
    :testid="testid"
    :variant="variant"
  >
    <template v-if="slots.action != null" #action>
      <slot name="action" />
    </template>

    <template v-if="slots.addOnStart != null" #addOnStart>
      <slot name="addOnStart" />
    </template>

    <slot />

    <template v-if="slots.addOnBottom != null" #addOnBottom>
      <slot name="addOnBottom" />
    </template>

    <template v-if="slots.addOnEnd != null" #addOnEnd>
      <slot name="addOnEnd" />
    </template>

    <template v-if="slots.addOnFooter != null" #addOnFooter>
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
  useSlots,
  watchEffect,
  type ComponentPublicInstance,
  type CSSProperties,
} from 'vue'

import BaseDivider from './BaseDivider.vue'
import BaseListCell, { type ListCellVariant } from './BaseListCell.vue'
import {
  provideBaseIsDecorativeContext,
  provideCometListCellContext,
} from '../system/listCellKeys'

defineOptions({
  inheritAttrs: false,
})

type VerticalAlignValue = 'top' | 'center' | 'bottom' | 'stretch'

export interface Props {
  addOnBottomResponsive?: boolean
  addOnEndVerticalAlign?: VerticalAlignValue
  addOnStartMarginTop?: number | string
  addOnStartVerticalAlign?: VerticalAlignValue
  contentId?: string
  contentPaddingHorizontal?: number | string
  disabled?: boolean
  hasBottomDivider?: boolean
  level?: number
  nestedSpacing?: number | string
  paddingVertical?: number | string
  spacingHorizontal?: number | string
  spacingVertical?: number | string
  testid?: string
  verticalAlign?: VerticalAlignValue
}

interface BaseListCellExposed extends ComponentPublicInstance {
  el?: HTMLElement | null
}

const props = withDefaults(defineProps<Props>(), {
  addOnBottomResponsive: undefined,
  addOnEndVerticalAlign: undefined,
  addOnStartMarginTop: undefined,
  addOnStartVerticalAlign: undefined,
  contentId: undefined,
  contentPaddingHorizontal: undefined,
  disabled: false,
  hasBottomDivider: false,
  level: 3,
  nestedSpacing: undefined,
  paddingVertical: undefined,
  spacingHorizontal: undefined,
  spacingVertical: undefined,
  testid: undefined,
  verticalAlign: undefined,
})

const attrs = useAttrs()
const slots = useSlots()
const baseListCellRef = ref<BaseListCellExposed | null>(null)
const rootElement = ref<HTMLElement | null>(null)

const DEFAULT_PADDING_INLINE = '12px'
const DEFAULT_PADDING_BLOCK = '8px'
const DEFAULT_MIN_HEIGHT = '44px'

const toCssLength = (value: number | string | undefined): string | undefined => {
  if (value == null) {
    return undefined
  }

  return typeof value === 'number' ? `${value}px` : value
}

const toHalfCssLength = (value: number | string | undefined): string | undefined => {
  if (value == null) {
    return undefined
  }

  if (typeof value === 'number') {
    return `${value / 2}px`
  }

  return `calc(${value} / 2)`
}

const toNegativeCssLength = (value: string | undefined): string | undefined =>
  value != null ? `calc(${value} * -1)` : undefined

const defaultItemPaddingStyle: CSSProperties = {
  paddingInlineStart: DEFAULT_PADDING_INLINE,
  paddingInlineEnd: DEFAULT_PADDING_INLINE,
  paddingTop: DEFAULT_PADDING_BLOCK,
  paddingBottom: DEFAULT_PADDING_BLOCK,
}

const defaultRootStyle: CSSProperties = {
  minHeight: DEFAULT_MIN_HEIGHT,
}

const rootPaddingInlineStyle = computed<CSSProperties | undefined>(() => {
  const value = toCssLength(props.contentPaddingHorizontal)

  return value != null
    ? {
        paddingInlineStart: value,
        paddingInlineEnd: value,
      }
    : undefined
})

const rootPaddingBlockStyle = computed<CSSProperties | undefined>(() => {
  const value = toCssLength(props.paddingVertical)

  return value != null
    ? {
        paddingTop: value,
        paddingBottom: value,
      }
    : undefined
})

const rootRowGapStyle = computed<CSSProperties | undefined>(() => {
  const value = toCssLength(props.paddingVertical)

  return value != null
    ? {
        rowGap: value,
      }
    : undefined
})

const spacingHorizontalStyle = computed<CSSProperties | undefined>(() => {
  const halfValue = toHalfCssLength(props.spacingHorizontal)

  return halfValue != null
    ? {
        paddingInlineStart: halfValue,
        paddingInlineEnd: halfValue,
      }
    : undefined
})

const spacingVerticalStyle = computed<CSSProperties | undefined>(() => {
  const halfValue = toHalfCssLength(props.spacingVertical)

  return halfValue != null
    ? {
        paddingTop: halfValue,
        paddingBottom: halfValue,
      }
    : undefined
})

const rootSpacingHorizontalStyle = computed<CSSProperties | undefined>(() => {
  const halfValue = toHalfCssLength(props.spacingHorizontal)
  const negativeHalfValue = toNegativeCssLength(halfValue)

  return negativeHalfValue != null
    ? {
        marginInlineStart: negativeHalfValue,
        marginInlineEnd: negativeHalfValue,
      }
    : undefined
})

const rootSpacingVerticalStyle = computed<CSSProperties | undefined>(() => {
  const halfValue = toHalfCssLength(props.spacingVertical)
  const negativeHalfValue = toNegativeCssLength(halfValue)
  const spacingValue = toCssLength(props.spacingVertical)

  if (negativeHalfValue == null && spacingValue == null) {
    return undefined
  }

  return {
    marginTop: negativeHalfValue,
    marginBottom: negativeHalfValue,
    minHeight: spacingValue != null ? `calc(${DEFAULT_MIN_HEIGHT} + ${spacingValue})` : DEFAULT_MIN_HEIGHT,
  }
})

const addOnStartMarginStyle = computed<CSSProperties | undefined>(() => {
  if (props.addOnStartMarginTop == null || props.addOnStartMarginTop === 0 || props.addOnStartMarginTop === '0') {
    return undefined
  }

  return {
    marginTop: toCssLength(props.addOnStartMarginTop) ?? '4px',
  }
})

const variant = computed<ListCellVariant>(() => ({
  addOnBottomResponsive: props.addOnBottomResponsive ?? false,
  addOnEndVerticalAlign: props.addOnEndVerticalAlign,
  addOnStartVerticalAlign: props.addOnStartVerticalAlign,
  nestedSpacing: props.nestedSpacing,
  verticalAlign: props.verticalAlign ?? 'center',
  xstyleConfig: {
    addOnBottom: [defaultItemPaddingStyle, spacingHorizontalStyle.value, spacingVerticalStyle.value],
    addOnEnd: [defaultItemPaddingStyle, spacingHorizontalStyle.value, spacingVerticalStyle.value],
    addOnStart: [defaultItemPaddingStyle, spacingHorizontalStyle.value, spacingVerticalStyle.value, addOnStartMarginStyle.value],
    content: [defaultItemPaddingStyle, spacingHorizontalStyle.value, spacingVerticalStyle.value],
    root: [
      defaultRootStyle,
      rootPaddingInlineStyle.value,
      rootPaddingBlockStyle.value,
      rootRowGapStyle.value,
      rootSpacingHorizontalStyle.value,
      rootSpacingVerticalStyle.value,
    ],
  },
}))

const providedListCellContext = reactive({
  disabled: props.disabled,
  level: props.level,
  shouldToggleOnListcell: false,
})

provideBaseIsDecorativeContext(true)
provideCometListCellContext(providedListCellContext)

const forwardedAttrs = computed(() => {
  const {
    testid: _testid,
    'data-testid': _dataTestid,
    ...rest
  } = attrs as Record<string, unknown>

  void _testid
  void _dataTestid

  return rest
})

watchEffect(() => {
  providedListCellContext.disabled = props.disabled
  providedListCellContext.level = props.level
})

watchEffect(() => {
  rootElement.value = baseListCellRef.value?.el ?? null
})

defineExpose({
  el: rootElement,
})
</script>
