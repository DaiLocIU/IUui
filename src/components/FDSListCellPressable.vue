<template>
  <template v-if="focusItemComponent === Fragment">
    <IUColumn
      :padding-horizontal="paddingHorizontal"
      :role="resolvedCompositeItemRole"
      :style="nestedSpacingStyle"
    >
      <IUColumnItem>
        <FDSPressable
          ref="pressableRef"
          v-bind="pressableProps"
        >
          <ResetCompositeStructure>
            <FDSListCell v-bind="cellProps">
              <template #default>
                <slot />
              </template>

              <template
                v-if="slots.action != null"
                #action
              >
                <slot name="action" />
              </template>

              <template
                v-if="slots.addOnStart != null"
                #addOnStart
              >
                <slot name="addOnStart" />
              </template>

              <template
                v-if="slots.addOnBottom != null"
                #addOnBottom
              >
                <slot name="addOnBottom" />
              </template>

              <template
                v-if="slots.addOnEnd != null"
                #addOnEnd
              >
                <slot name="addOnEnd" />
              </template>

              <template
                v-if="slots.addOnFooter != null"
                #addOnFooter
              >
                <slot name="addOnFooter" />
              </template>
            </FDSListCell>
          </ResetCompositeStructure>
        </FDSPressable>
      </IUColumnItem>
    </IUColumn>
  </template>

  <component
    :is="focusItemComponent"
    v-else
  >
    <IUColumn
      :padding-horizontal="paddingHorizontal"
      :role="resolvedCompositeItemRole"
      :style="nestedSpacingStyle"
    >
      <IUColumnItem>
        <FDSPressable
          ref="pressableRef"
          v-bind="pressableProps"
        >
          <ResetCompositeStructure>
            <FDSListCell v-bind="cellProps">
              <template #default>
                <slot />
              </template>

              <template
                v-if="slots.action != null"
                #action
              >
                <slot name="action" />
              </template>

              <template
                v-if="slots.addOnStart != null"
                #addOnStart
              >
                <slot name="addOnStart" />
              </template>

              <template
                v-if="slots.addOnBottom != null"
                #addOnBottom
              >
                <slot name="addOnBottom" />
              </template>

              <template
                v-if="slots.addOnEnd != null"
                #addOnEnd
              >
                <slot name="addOnEnd" />
              </template>

              <template
                v-if="slots.addOnFooter != null"
                #addOnFooter
              >
                <slot name="addOnFooter" />
              </template>
            </FDSListCell>
          </ResetCompositeStructure>
        </FDSPressable>
      </IUColumnItem>
    </IUColumn>
  </component>
</template>

<script setup lang="ts">
import {
  Fragment,
  computed,
  defineComponent,
  provide,
  ref,
  useAttrs,
  useSlots,
  type CSSProperties,
} from 'vue'

import FDSListCell from './FDSListCell.vue'
import FDSPressable from './FDSPressable.vue'
import IUColumn from './IUColumn.vue'
import IUColumnItem from './IUColumnItem.vue'
import {
  COMET_COMPOSITE_STRUCTURE_CONTEXT_KEY,
  getItemRoleFromCompositeRole,
  useCometCompositeStructureContext,
  useCometFocusGroupContext,
} from '../system/listCellPressableKeys'
import type { StyleCapableValue } from '../utils/resolveStyling'

defineOptions({
  inheritAttrs: false,
})

type LinkProps = {
  attributionsrc?: string
  brid?: string
  download?: boolean | string
  fbclid?: string
  rel?: string
  target?: string
  url?: string
  [key: string]: unknown
}

type SelectedBackgroundMode = 'default' | 'wash'

const PRESSABLE_KEYS = new Set([
  'aria-checked',
  'aria-controls',
  'aria-current',
  'aria-expanded',
  'focusable',
  'hideHoverOverlay',
  'id',
  'linkProps',
  'onFocusChange',
  'onHoverIn',
  'onHoverOut',
  'onPress',
  'onPressIn',
  'onPressOut',
  'overlayRadius',
  'paddingHorizontal',
  'role',
  'selected',
  'selectedBackground',
  'suppressHydrationWarning',
  'testOnly_pressed',
])

const CELL_KEYS = new Set([
  'aria-label',
  'aria-labelledby',
  'contentPaddingHorizontal',
  'nestedSpacing',
  'testid',
])

const ResetCompositeStructure = defineComponent({
  name: 'ResetCompositeStructure',
  setup(_, { slots: innerSlots }) {
    provide(COMET_COMPOSITE_STRUCTURE_CONTEXT_KEY, {})

    return () => innerSlots.default?.()
  },
})

interface Props {
  'aria-checked'?: boolean | 'mixed'
  'aria-controls'?: string
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time'
  'aria-expanded'?: boolean
  'aria-label'?: string
  'aria-labelledby'?: string
  contentPaddingHorizontal?: number | string
  disabled?: boolean
  focusable?: boolean
  hideHoverOverlay?: boolean
  id?: string
  linkProps?: LinkProps
  nestedSpacing?: number | string
  onFocusChange?: (value: boolean) => void
  onHoverIn?: (event: unknown) => void
  onHoverOut?: (event: unknown) => void
  onPress?: (event: MouseEvent | KeyboardEvent) => void
  onPressIn?: (event: unknown) => void
  onPressOut?: (event: unknown) => void
  overlayRadius?: number
  paddingHorizontal?: number
  role?: string
  selected?: boolean
  selectedBackground?: SelectedBackgroundMode
  suppressHydrationWarning?: boolean
  testOnly_pressed?: boolean
  testid?: string
}

const props = withDefaults(defineProps<Props>(), {
  'aria-checked': undefined,
  'aria-controls': undefined,
  'aria-current': undefined,
  'aria-expanded': undefined,
  'aria-label': undefined,
  'aria-labelledby': undefined,
  contentPaddingHorizontal: undefined,
  disabled: false,
  focusable: undefined,
  hideHoverOverlay: undefined,
  id: undefined,
  linkProps: undefined,
  nestedSpacing: undefined,
  onFocusChange: undefined,
  onHoverIn: undefined,
  onHoverOut: undefined,
  onPress: undefined,
  onPressIn: undefined,
  onPressOut: undefined,
  overlayRadius: 8,
  paddingHorizontal: 0,
  role: undefined,
  selected: false,
  selectedBackground: 'default',
  suppressHydrationWarning: undefined,
  testOnly_pressed: false,
  testid: undefined,
})

const attrs = useAttrs()
const slots = useSlots()
const pressableRef = ref<unknown>(null)
const compositeStructure = useCometCompositeStructureContext()
const focusGroup = useCometFocusGroupContext()

const focusItemComponent = computed(() => focusGroup.FocusItem ?? Fragment)

const resolvedCompositeItemRole = computed(() =>
  getItemRoleFromCompositeRole(compositeStructure.role),
)

const nestedSpacingStyle = computed<CSSProperties | undefined>(() => {
  if (props.nestedSpacing == null) {
    return undefined
  }

  const value =
    typeof props.nestedSpacing === 'number'
      ? `${props.nestedSpacing}px`
      : props.nestedSpacing

  const isRTL =
    typeof document !== 'undefined' && document.documentElement.dir === 'rtl'

  return isRTL ? { marginRight: value } : { marginLeft: value }
})

const rootXStyle = computed<StyleCapableValue[]>(() => {
  const styles: StyleCapableValue[] = [{ display: 'flex' }]

  if (props.selected === true) {
    styles.push({ backgroundColor: '#e7f3ff' })

    if (props.overlayRadius === 8) {
      styles.push({
        borderStartStartRadius: '8px',
        borderStartEndRadius: '8px',
        borderEndEndRadius: '8px',
        borderEndStartRadius: '8px',
      })
    }

    if (props.selectedBackground === 'wash') {
      styles.push({ backgroundColor: '#f3f4f6' })
    }
  }

  if (props.disabled === true) {
    styles.push({
      cursor: 'not-allowed',
      pointerEvents: 'none',
    })
  }

  return styles
})

const remainingAttrs = computed(() => {
  const rest: Record<string, unknown> = {}

  Object.entries(attrs).forEach(([key, value]) => {
    if (!PRESSABLE_KEYS.has(key) && !CELL_KEYS.has(key)) {
      rest[key] = value
    }
  })

  return rest
})

const cellProps = computed(() => ({
  ...remainingAttrs.value,
  disabled: props.disabled,
  contentPaddingHorizontal: props.contentPaddingHorizontal ?? 8,
}))

const pressableProps = computed(() => ({
  'aria-checked': props['aria-checked'],
  'aria-controls': props['aria-controls'],
  'aria-current': props['aria-current'],
  'aria-expanded': props['aria-expanded'],
  'aria-label': props['aria-label'],
  'aria-labelledby': props['aria-labelledby'],
  'aria-pressed': props.selected === true ? true : undefined,
  disabled: props.disabled,
  display: 'block' as const,
  expanding: true,
  focusable: props.focusable,
  hideHoverOverlay: props.hideHoverOverlay,
  id: props.id,
  linkProps: props.linkProps,
  onFocusChange: props.onFocusChange,
  onHoverIn: props.onHoverIn,
  onHoverOut: props.onHoverOut,
  onPress: props.onPress,
  onPressIn: props.onPressIn,
  onPressOut: props.onPressOut,
  overlayDisabled: props.selected,
  overlayFocusRingPosition: 'inset' as const,
  overlayRadius: props.overlayRadius,
  role: props.role,
  suppressHydrationWarning: props.suppressHydrationWarning,
  testOnly_pressed: props.testOnly_pressed,
  testid: undefined,
  xstyle: rootXStyle.value,
}))

defineExpose({
  el: pressableRef,
})
</script>
