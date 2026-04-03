<template>
  <div
    v-bind="forwardedAttrs"
    ref="rootRef"
    :aria-hidden="ariaHidden || undefined"
    :aria-label="ariaLabel"
    :aria-labelledby="resolvedAriaLabelledby"
    :aria-selected="ariaSelected"
    :class="[rootClasses, ...rootStyling.className, attrs.class]"
    :role="role"
    :style="[...rootStyling.style, attrs.style]"
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
        :class="[itemClass, ...addOnStartStyling.className]"
        :style="addOnStartStyling.style"
      >
        <slot name="addOnStart" />
      </IUBaseRowItem>

      <IUBaseRow
        expanding
        vertical-align="center"
        wrap="forward"
        :class="contentContainerStyling.className"
        :style="contentContainerStyling.style"
      >
        <IUBaseRowItem :class="contentStyling.className" :style="contentStyling.style">
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
        :class="bottomAddOnStyling.className"
        :style="bottomAddOnStyling.style"
      >
        <slot name="addOnBottom" />
      </IUBaseRowItem>
      </IUBaseRow>

      <IUBaseRowItem
        v-if="hasAddOnEnd"
        :vertical-align="resolvedAddOnEndVerticalAlign"
        :class="[itemClass, ...addOnEndStyling.className]"
        :style="addOnEndStyling.style"
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
import {
  resolveStyling,
  type StyleCapableValue,
} from '../utils/resolveStyling'

defineOptions({
  inheritAttrs: false,
})

type VerticalAlignValue = 'top' | 'center' | 'bottom' | 'stretch'

export interface ListCellVariant {
  nestedSpacing?: number | string
  verticalAlign?: VerticalAlignValue
  actionVerticalAlign?: VerticalAlignValue
  addOnStartVerticalAlign?: VerticalAlignValue
  addOnEndVerticalAlign?: VerticalAlignValue
  contentVerticalAlign?: Exclude<VerticalAlignValue, 'bottom' | 'stretch'> | 'top'
  addOnBottomResponsive?: boolean
  xstyleConfig?: {
    root?: StyleCapableValue
    addOnStart?: StyleCapableValue
    contentContainer?: StyleCapableValue
    content?: StyleCapableValue
    addOnBottom?: StyleCapableValue
    addOnEnd?: StyleCapableValue
  }
}

export interface Props {
  actionVerticalAlign?: VerticalAlignValue
  addOnBottomResponsive?: boolean
  addOnEndVerticalAlign?: VerticalAlignValue
  addOnEndXStyle?: StyleCapableValue
  addOnStartVerticalAlign?: VerticalAlignValue
  addOnStartXStyle?: StyleCapableValue
  ariaHidden?: boolean
  ariaLabel?: string
  ariaLabelledby?: string
  contentId?: string
  contentVerticalAlign?: 'top' | 'center'
  contentXStyle?: StyleCapableValue
  nestedSpacing?: number | string
  role?: string
  tabIndex?: number
  testid?: string
  variant?: ListCellVariant
  verticalAlign?: VerticalAlignValue
  xstyle?: StyleCapableValue
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

const rootStyling = computed(() => resolveStyling(props.variant?.xstyleConfig?.root, props.xstyle))
const addOnStartStyling = computed(() =>
  resolveStyling(props.addOnStartXStyle, props.variant?.xstyleConfig?.addOnStart),
)
const addOnEndStyling = computed(() =>
  resolveStyling(props.addOnEndXStyle, props.variant?.xstyleConfig?.addOnEnd),
)
const contentContainerStyling = computed(() =>
  resolveStyling(
    [
      'basis-0 flex-grow',
      contentVerticalAlignClass.value,
      variantContentVerticalAlignClass.value,
    ],
    props.contentXStyle,
    props.variant?.xstyleConfig?.contentContainer,
  ),
)
const contentStyling = computed(() =>
  resolveStyling(
    [
      'min-w-0 flex-grow',
      (props.addOnBottomResponsive || props.variant?.addOnBottomResponsive === true) && 'basis-0 min-w-0 max-w-full',
    ],
    props.variant?.xstyleConfig?.content,
  ),
)
const bottomAddOnStyling = computed(() =>
  resolveStyling(
    [
      'flex flex-col',
      (props.addOnBottomResponsive || props.variant?.addOnBottomResponsive === true) && 'flex-grow',
    ],
    props.variant?.xstyleConfig?.addOnBottom,
  ),
)

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
