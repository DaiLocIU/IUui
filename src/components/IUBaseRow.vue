<script setup lang="ts">
import {
  Comment,
  Text,
  computed,
  defineComponent,
  reactive,
  useAttrs,
  useSlots,
  type PropType,
  type StyleValue,
  type VNode,
} from 'vue'

import { useBaseRowA11yWrap } from '../composables/useBaseRowA11yWrap'
import { provideRowContext, type RowContextValue, type WrapValue } from '../system/layoutKeys'
import { resolveStyling, type StyleCapableValue } from '../utils/resolveStyling'

defineOptions({
  inheritAttrs: false,
})

type AlignValue = 'center' | 'end' | 'justify' | 'start'
type VerticalAlignValue = 'top' | 'center' | 'bottom' | 'stretch'
type DirectionValue = 'forward' | 'backward'
type BaseWrapValue = 'none' | 'forward' | 'backward'

interface Props {
  align?: AlignValue
  columns?: number
  direction?: DirectionValue
  expanding?: boolean
  role?: string
  verticalAlign?: VerticalAlignValue
  wrap?: BaseWrapValue
  xstyle?: StyleCapableValue
}

const RenderVNode = defineComponent({
  name: 'RenderVNode',
  props: {
    vnode: {
      type: Object as PropType<VNode>,
      required: true,
    },
  },
  setup(props) {
    return () => props.vnode
  },
})

const props = withDefaults(defineProps<Props>(), {
  align: 'justify',
  columns: 0,
  direction: 'forward',
  expanding: false,
  role: undefined,
  verticalAlign: 'stretch',
  wrap: 'none',
  xstyle: undefined,
})

const attrs = useAttrs()
const slots = useSlots()

const needsA11yCheck = computed(
  () => props.direction === 'forward' && props.wrap === 'backward',
)
const [shouldReverse, a11yContainerRef] = useBaseRowA11yWrap(needsA11yCheck)

const contextWrap = computed<WrapValue>(() => {
  if (props.wrap === 'forward') {
    return 'wrap'
  }

  if (props.wrap === 'backward') {
    return 'wrap-reverse'
  }

  return 'none'
})

const rowContext = reactive<RowContextValue>({
  inRow: true,
  spacing: 0,
  get columns() {
    return props.columns
  },
  get wrap() {
    return contextWrap.value
  },
})

provideRowContext(rowContext)

const alignFlip: Record<'end' | 'start', 'start' | 'end'> = {
  end: 'start',
  start: 'end',
}

const alignClass = computed(() => {
  const effectiveAlign =
    props.direction === 'backward' && (props.align === 'start' || props.align === 'end')
      ? alignFlip[props.align]
      : props.align

  return {
    center: 'justify-center',
    end: 'justify-end',
    justify: 'justify-between',
    start: 'justify-start',
  }[effectiveAlign]
})

const verticalAlignClass = computed(() => ({
  top: 'items-start',
  center: 'items-center',
  bottom: 'items-end',
  stretch: 'items-stretch',
}[props.verticalAlign]))

const directionClass = computed(() => (
  props.direction === 'backward' ? 'flex-row-reverse' : 'flex-row'
))

const slotChildren = computed(() => (
  (slots.default?.() ?? []).filter((child) => {
    if (child.type === Comment) {
      return false
    }

    if (child.type === Text) {
      return String(child.children ?? '').trim().length > 0
    }

    return true
  })
))

const shouldUseWrapForwardOverride = computed(() => (
  props.direction === 'forward'
  && props.wrap === 'backward'
  && shouldReverse.value
  && slotChildren.value.length === 2
))

const wrapClasses = computed(() => {
  if (props.wrap === 'forward') {
    return ['flex-wrap']
  }

  if (props.wrap === 'backward') {
    return ['flex-wrap-reverse', shouldUseWrapForwardOverride.value && 'flex-wrap']
  }

  return ['flex-nowrap']
})

const rootResolvedStyling = computed(() =>
  resolveStyling(
    'flex flex-shrink-0 relative',
    props.expanding && 'basis-0 flex-grow flex-shrink min-w-0',
    alignClass.value,
    verticalAlignClass.value,
    wrapClasses.value,
    directionClass.value,
    props.xstyle,
    attrs.class as StyleCapableValue,
  ),
)

const rootStyles = computed<StyleValue[]>(() => {
  const resolvedStyles = [...rootResolvedStyling.value.style]

  if (attrs.style != null) {
    resolvedStyles.push(attrs.style as StyleValue)
  }

  return resolvedStyles
})

const forwardedAttrs = computed(() => {
  const {
    class: _class,
    style: _style,
    role: _role,
    ...rest
  } = attrs as Record<string, unknown>

  void _class
  void _style
  void _role

  return rest
})

const orderedChildren = computed(() => {
  const children = slotChildren.value

  if (!shouldUseWrapForwardOverride.value) {
    return children
  }

  return [children[1], children[0]]
})
</script>

<template>
  <div
    v-bind="forwardedAttrs"
    ref="a11yContainerRef"
    :class="rootResolvedStyling.className"
    :role="role"
    :style="rootStyles"
  >
    <RenderVNode
      v-for="(child, index) in orderedChildren"
      :key="child.key ?? index"
      :vnode="child"
    />
  </div>
</template>
