<template>
  <div
    v-bind="forwardedAttrs"
    ref="rootRef"
    :aria-hidden="ariaHidden || undefined"
    :aria-label="ariaLabel"
    :aria-labelledby="resolvedAriaLabelledby"
    :aria-selected="ariaSelected"
    :class="[rootClasses, variant?.xstyleConfig?.root, xstyle, attrs.class]"
    :role="role"
    :style="attrs.style"
    :tabindex="tabIndex"
  >
    <IUBaseRow :vertical-align="resolvedVerticalAlign">
      <IUBaseRowItem v-if="nestedSpacingStyle != null">
        <div :style="nestedSpacingStyle" />
      </IUBaseRowItem>

      <IUBaseRowItem
        v-if="hasAction"
        :vertical-align="resolvedActionVerticalAlign"
        :class="itemClass"
      >
        <slot name="action" />
      </IUBaseRowItem>

      <IUBaseRowItem
        v-if="hasAddOnStart"
        :vertical-align="resolvedAddOnStartVerticalAlign"
        :class="[itemClass, addOnStartXStyle, variant?.xstyleConfig?.addOnStart]"
      >
        <slot name="addOnStart" />
      </IUBaseRowItem>

      <IUBaseRow
        expanding
        vertical-align="center"
        wrap="forward"
        :class="contentContainerClasses"
      >
        <IUBaseRowItem :class="contentClasses">
          <div
            v-if="contentId != null"
            aria-hidden="true"
          >
            <div :id="contentId">
              <slot />
            </div>
          </div>

          <slot
            v-else
          />
        </IUBaseRowItem>

        <IUBaseRowItem
          v-if="hasAddOnBottom"
          :expanding="!isWebEnvironment"
          :class="bottomAddOnClasses"
        >
          <slot name="addOnBottom" />
        </IUBaseRowItem>
      </IUBaseRow>

      <IUBaseRowItem
        v-if="hasAddOnEnd"
        :vertical-align="resolvedAddOnEndVerticalAlign"
        :class="[itemClass, addOnEndXStyle, variant?.xstyleConfig?.addOnEnd]"
      >
        <slot name="addOnEnd" />
      </IUBaseRowItem>
    </IUBaseRow>

    <slot
      v-if="hasAddOnFooter"
      name="addOnFooter"
    />
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  useAttrs,
  useSlots,
  type CSSProperties,
} from 'vue'

import IUBaseRow from './IUBaseRow.vue'
import IUBaseRowItem from './IUBaseRowItem.vue'

defineOptions({
  inheritAttrs: false,
})

type VerticalAlignValue = 'top' | 'center' | 'bottom' | 'stretch'
type ClassLike = string | Record<string, boolean> | Array<string | Record<string, boolean>>

export interface ListCellVariant {
  nestedSpacing?: number | string
  verticalAlign?: VerticalAlignValue
  actionVerticalAlign?: VerticalAlignValue
  addOnStartVerticalAlign?: VerticalAlignValue
  addOnEndVerticalAlign?: VerticalAlignValue
  contentVerticalAlign?: Exclude<VerticalAlignValue, 'bottom' | 'stretch'> | 'top'
  addOnBottomResponsive?: boolean
  xstyleConfig?: {
    root?: ClassLike
    addOnStart?: ClassLike
    contentContainer?: ClassLike
    content?: ClassLike
    addOnBottom?: ClassLike
    addOnEnd?: ClassLike
  }
}

export interface Props {
  actionVerticalAlign?: VerticalAlignValue
  addOnBottomResponsive?: boolean
  addOnEndVerticalAlign?: VerticalAlignValue
  addOnEndXStyle?: ClassLike
  addOnStartVerticalAlign?: VerticalAlignValue
  addOnStartXStyle?: ClassLike
  ariaHidden?: boolean
  ariaLabel?: string
  ariaLabelledby?: string
  contentId?: string
  contentVerticalAlign?: 'top' | 'center'
  contentXStyle?: ClassLike
  nestedSpacing?: number | string
  role?: string
  tabIndex?: number
  testid?: string
  variant?: ListCellVariant
  verticalAlign?: VerticalAlignValue
  xstyle?: ClassLike
}

const props = withDefaults(defineProps<Props>(), {
  actionVerticalAlign: undefined,
  addOnBottomResponsive: false,
  addOnEndVerticalAlign: undefined,
  addOnEndXStyle: undefined,
  addOnStartVerticalAlign: undefined,
  addOnStartXStyle: undefined,
  ariaHidden: false,
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  content: null,
  contentId: undefined,
  contentVerticalAlign: 'center',
  contentXStyle: undefined,
  nestedSpacing: undefined,
  role: undefined,
  tabIndex: undefined,
  testid: undefined,
  variant: undefined,
  verticalAlign: 'center',
  xstyle: undefined,
})

const attrs = useAttrs()
const slots = useSlots()
const rootRef = ref<HTMLElement | null>(null)
const isWebEnvironment = typeof window !== 'undefined' && typeof document !== 'undefined'

const itemClass = 'flex'
const rootClasses = 'box-border flex min-w-0 flex-grow flex-col items-center justify-between'

const isRTL = computed(() => {
  if (typeof document === 'undefined') {
    return false
  }

  return document.documentElement.dir === 'rtl'
})

const nestedSpacingValue = computed(() => props.variant?.nestedSpacing ?? props.nestedSpacing)

const nestedSpacingStyle = computed<CSSProperties | undefined>(() => {
  const value = nestedSpacingValue.value

  if (value == null) {
    return undefined
  }

  const cssValue = typeof value === 'number' ? `${value}px` : value

  return isRTL.value
    ? { marginInlineEnd: cssValue }
    : { marginInlineStart: cssValue }
})

const resolvedVerticalAlign = computed(() => props.variant?.verticalAlign ?? props.verticalAlign)
const resolvedActionVerticalAlign = computed(() => props.variant?.actionVerticalAlign ?? props.actionVerticalAlign)
const resolvedAddOnStartVerticalAlign = computed(() => props.variant?.addOnStartVerticalAlign ?? props.addOnStartVerticalAlign)
const resolvedAddOnEndVerticalAlign = computed(() => props.variant?.addOnEndVerticalAlign ?? props.addOnEndVerticalAlign)
const hasAction = computed(() => slots.action != null)
const hasAddOnStart = computed(() => slots.addOnStart != null)
const hasAddOnBottom = computed(() => slots.addOnBottom != null)
const hasAddOnEnd = computed(() => slots.addOnEnd != null)
const hasAddOnFooter = computed(() => slots.addOnFooter != null)

const contentVerticalAlignClass = computed(() => ({
  center: '',
  top: 'self-start',
}[props.contentVerticalAlign]))

const variantContentVerticalAlignClass = computed(() => ({
  center: '',
  top: 'self-start',
}[props.variant?.contentVerticalAlign ?? 'center']))

const contentContainerClasses = computed(() => [
  'basis-0 flex-grow',
  contentVerticalAlignClass.value,
  variantContentVerticalAlignClass.value,
  props.contentXStyle,
  props.variant?.xstyleConfig?.contentContainer,
])

const contentClasses = computed(() => [
  'min-w-0 flex-grow',
  (props.addOnBottomResponsive || props.variant?.addOnBottomResponsive === true) && 'basis-0 min-w-0 max-w-full',
  props.variant?.xstyleConfig?.content,
])

const bottomAddOnClasses = computed(() => [
  'flex flex-col',
  (props.addOnBottomResponsive || props.variant?.addOnBottomResponsive === true) && 'flex-grow',
  props.variant?.xstyleConfig?.addOnBottom,
])

const ariaSelected = computed(() => (props.role === 'option' ? false : undefined))
const resolvedAriaLabelledby = computed(() => (props.ariaLabel != null ? undefined : props.ariaLabelledby))

const forwardedAttrs = computed(() => {
  const {
    testid: _testid,
    'data-testid': _dataTestid,
    class: _class,
    style: _style,
    ...rest
  } = attrs as Record<string, unknown>

  void _testid
  void _dataTestid
  void _class
  void _style

  return {
    ...rest,
    ...(props.testid != null ? { 'data-testid': props.testid } : {}),
  }
})

defineExpose({
  el: rootRef,
})
</script>
