<template>
  <component
    :is="focusItemComponent"
    v-if="focusItemComponent != null"
  >
    <IUColumn
      :padding-horizontal="paddingHorizontal"
      :role="compositeItemRole ?? undefined"
      :style="nestedSpacingStyle"
    >
      <IUColumnItem>
        <FDSPressable
          ref="pressableRef"
          :aria-checked="ariaChecked"
          :aria-controls="ariaControls"
          :aria-current="ariaCurrent"
          :aria-expanded="ariaExpanded"
          :aria-label="ariaLabel"
          :aria-labelledby="ariaLabelledby"
          :aria-pressed="selected === true ? true : undefined"
          :disabled="disabled"
          :expanding="true"
          :focusable="focusable"
          :hide-hover-overlay="hideHoverOverlay"
          :id="id"
          :link-props="linkProps"
          :on-focus-change="onFocusChange"
          :on-hover-in="onHoverIn"
          :on-hover-out="onHoverOut"
          :on-press="onPress"
          :on-press-in="onPressIn"
          :on-press-out="onPressOut"
          :overlay-disabled="selected"
          overlay-focus-ring-position="inset"
          :overlay-radius="resolvedOverlayRadius"
          :role="role"
          :suppress-hydration-warning="suppressHydrationWarning"
          :test-only_pressed="testOnly_pressed"
          :xstyle="pressableXStyle"
        >
          <CompositeStructureReset>
            <FDSListCellImplNew
              v-bind="listCellProps"
              :content-padding-horizontal="contentPaddingHorizontal"
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
            </FDSListCellImplNew>
          </CompositeStructureReset>
        </FDSPressable>
      </IUColumnItem>
    </IUColumn>
  </component>

  <IUColumn
    v-else
    :padding-horizontal="paddingHorizontal"
    :role="compositeItemRole ?? undefined"
    :style="nestedSpacingStyle"
  >
    <IUColumnItem>
      <FDSPressable
        ref="pressableRef"
        :aria-checked="ariaChecked"
        :aria-controls="ariaControls"
        :aria-current="ariaCurrent"
        :aria-expanded="ariaExpanded"
        :aria-label="ariaLabel"
        :aria-labelledby="ariaLabelledby"
        :aria-pressed="selected === true ? true : undefined"
        :disabled="disabled"
        :expanding="true"
        :focusable="focusable"
        :hide-hover-overlay="hideHoverOverlay"
        :id="id"
        :link-props="linkProps"
        :on-focus-change="onFocusChange"
        :on-hover-in="onHoverIn"
        :on-hover-out="onHoverOut"
        :on-press="onPress"
        :on-press-in="onPressIn"
        :on-press-out="onPressOut"
        :overlay-disabled="selected"
        overlay-focus-ring-position="inset"
        :overlay-radius="resolvedOverlayRadius"
        :role="role"
        :suppress-hydration-warning="suppressHydrationWarning"
        :test-only_pressed="testOnly_pressed"
        :xstyle="pressableXStyle"
      >
        <CompositeStructureReset>
          <FDSListCellImplNew
            v-bind="listCellProps"
            :content-padding-horizontal="contentPaddingHorizontal"
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
          </FDSListCellImplNew>
        </CompositeStructureReset>
      </FDSPressable>
    </IUColumnItem>
  </IUColumn>
</template>

<script setup lang="ts">
import {
  computed,
  defineComponent,
  provide,
  ref,
  useAttrs,
  type CSSProperties,
  type PropType,
} from 'vue'

import IUColumn from './IUColumn.vue'
import IUColumnItem from './IUColumnItem.vue'
import FDSListCellImplNew from './FDSListCellImplNew.vue'
import FDSPressable from './FDSPressable'
import type { HoverEvent, LinkProps, PressEvent } from './WebPressable/types'
import type { StyleCapableValue } from '../utils/resolveStyling'
import {
  COMET_COMPOSITE_STRUCTURE_KEY,
  useCometCompositeStructureContext,
} from '../system/cometCompositeStructureKeys'
import {
  useCometFocusGroupContext,
} from '../system/cometFocusGroupKeys'
import getItemRoleFromCompositeRole from '../utils/getItemRoleFromCompositeRole'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  ariaChecked: {
    type: null as unknown as PropType<boolean | 'mixed' | undefined>,
    default: undefined,
  },
  ariaControls: {
    type: String,
    default: undefined,
  },
  ariaCurrent: {
    type: null as unknown as PropType<string | boolean | undefined>,
    default: undefined,
  },
  ariaExpanded: {
    type: null as unknown as PropType<boolean | undefined>,
    default: undefined,
  },
  ariaLabel: {
    type: String,
    default: undefined,
  },
  ariaLabelledby: {
    type: String,
    default: undefined,
  },
  contentPaddingHorizontal: {
    type: Number,
    default: 8,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  focusable: {
    type: null as unknown as PropType<boolean | undefined>,
    default: undefined,
  },
  hideHoverOverlay: {
    type: null as unknown as PropType<boolean | undefined>,
    default: undefined,
  },
  id: {
    type: String,
    default: undefined,
  },
  linkProps: {
    type: null as unknown as PropType<LinkProps | null>,
    default: null,
  },
  nestedSpacing: {
    type: null as unknown as PropType<number | string | undefined>,
    default: undefined,
  },
  onFocusChange: {
    type: Function as PropType<(focused: boolean) => void>,
    default: undefined,
  },
  onHoverIn: {
    type: Function as PropType<(event: HoverEvent) => void>,
    default: undefined,
  },
  onHoverOut: {
    type: Function as PropType<(event: HoverEvent) => void>,
    default: undefined,
  },
  onPress: {
    type: Function as PropType<(event: MouseEvent | KeyboardEvent) => void>,
    default: undefined,
  },
  onPressIn: {
    type: Function as PropType<(event: PressEvent) => void>,
    default: undefined,
  },
  onPressOut: {
    type: Function as PropType<(event: PressEvent) => void>,
    default: undefined,
  },
  overlayRadius: {
    type: Number,
    default: 8,
  },
  paddingHorizontal: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    default: undefined,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  selectedBackground: {
    type: String as PropType<'wash' | string | undefined>,
    default: undefined,
  },
  suppressHydrationWarning: {
    type: null as unknown as PropType<boolean | undefined>,
    default: undefined,
  },
  testOnly_pressed: {
    type: null as unknown as PropType<boolean | undefined>,
    default: undefined,
  },
  testid: {
    type: String,
    default: undefined,
  },
})

const attrs = useAttrs()

const CompositeStructureReset = defineComponent({
  name: 'CompositeStructureReset',
  setup(_, { slots }) {
    provide(COMET_COMPOSITE_STRUCTURE_KEY, Object.freeze({}))
    return () => slots.default?.()
  },
})

const pressableRef = ref<{ el?: HTMLElement | null } | null>(null)

const isRTL = computed(() => {
  if (typeof document === 'undefined') {
    return false
  }

  return document.documentElement.dir === 'rtl'
})

const nestedSpacingStyle = computed<CSSProperties | undefined>(() => {
  if (props.nestedSpacing == null) {
    return undefined
  }

  const cssValue = typeof props.nestedSpacing === 'number'
    ? `${props.nestedSpacing}px`
    : props.nestedSpacing

  return isRTL.value
    ? { marginRight: cssValue }
    : { marginLeft: cssValue }
})

const compositeStructure = useCometCompositeStructureContext()
const compositeItemRole = computed(() => getItemRoleFromCompositeRole(compositeStructure.role))

const focusGroup = useCometFocusGroupContext()
const focusItemComponent = computed(() =>
  focusGroup.FocusItem ?? null,
)

const resolvedOverlayRadius = computed(() => props.overlayRadius ?? 8)

const pressableXStyle = computed<StyleCapableValue>(() => [
  'block',
  props.selected === true && '[background-color:var(--hosted-view-selected-state)]',
  props.selected === true && resolvedOverlayRadius.value === 8 && 'rounded-[8px]',
  props.selected === true && props.selectedBackground === 'wash' && '[background-color:var(--web-wash)]',
  props.disabled === true && 'cursor-not-allowed pointer-events-none',
])

const listCellProps = computed(() => ({
  ...attrs,
  disabled: props.disabled,
  testid: undefined,
}))

defineExpose({
  el: computed(() => pressableRef.value?.el ?? null),
})
</script>
