<template>
  <div
    ref="rootRef"
    v-bind="forwardedAttrs"
    :aria-hidden="rootAriaHidden"
    :aria-label="rootAriaLabel"
    :aria-labelledby="rootAriaLabelledby"
    :aria-valuemax="rootAriaValuemax"
    :aria-valuemin="rootAriaValuemin"
    :aria-valuenow="rootAriaValuenow"
    :class="rootClassName"
    :data-focus-target="rootFocusTarget"
    :data-loading-state-element="rootLoadingStateMarker"
    :role="rootRole"
    :style="rootStyle"
    :tabindex="rootTabIndex"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  onMounted,
  onUpdated,
  provide,
  ref,
  useAttrs,
  type InjectionKey,
} from 'vue'

import {
  getLoadingStateAriaProps,
} from '../utils/getLoadingStateAriaProps'
import {
  resolveStyling,
  type StyleCapableValue,
} from '../utils/resolveStyling'

defineOptions({
  inheritAttrs: false,
})

const LOADING_STATE_ELEMENT_KEY: InjectionKey<boolean> = Symbol('BaseLoadingStateElement')

interface Props {
  ariaLabel?: string
  ariaLabelledby?: string
  disableLoadingStateTracker?: boolean
  isDecorative?: boolean
  isFocusTarget?: boolean
  progress?: number | null
  xstyle?: StyleCapableValue
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  disableLoadingStateTracker: false,
  isDecorative: false,
  isFocusTarget: false,
  progress: undefined,
  xstyle: undefined,
})

const attrs = useAttrs()
const rootRef = ref<HTMLDivElement | null>(null)
const injectedNestedLoadingStateElement = inject(LOADING_STATE_ELEMENT_KEY, false)
const hasLoadingStateAncestor = ref(false)

if (!injectedNestedLoadingStateElement) {
  provide(LOADING_STATE_ELEMENT_KEY, true)
}

const isNestedLoadingStateElement = computed(() => (
  injectedNestedLoadingStateElement || hasLoadingStateAncestor.value
))

const updateNestedLoadingStateElement = (): void => {
  const currentElement = rootRef.value

  if (currentElement == null) {
    hasLoadingStateAncestor.value = false
    return
  }

  hasLoadingStateAncestor.value = currentElement.parentElement?.closest('[data-loading-state-element="true"]') != null
}

onMounted(updateNestedLoadingStateElement)
onUpdated(updateNestedLoadingStateElement)

const loadingAriaProps = computed(() =>
  props.isDecorative
    ? null
    : getLoadingStateAriaProps(props.progress, {
        max: 100,
        min: 0,
      }),
)

const forwardedAttrs = computed(() => {
  const {
    class: _class,
    style: _style,
    role: _role,
    tabindex: _tabIndex,
    'aria-hidden': _ariaHidden,
    'aria-label': _ariaLabel,
    'aria-labelledby': _ariaLabelledby,
    'aria-valuemin': _ariaValuemin,
    'aria-valuemax': _ariaValuemax,
    'aria-valuenow': _ariaValuenow,
    'data-focus-target': _dataFocusTarget,
    ...rest
  } = attrs as Record<string, unknown>

  void _class
  void _style
  void _role
  void _tabIndex
  void _ariaHidden
  void _ariaLabel
  void _ariaLabelledby
  void _ariaValuemin
  void _ariaValuemax
  void _ariaValuenow
  void _dataFocusTarget

  return rest
})

const rootResolvedStyling = computed(() => resolveStyling('outline-none', props.xstyle))

const rootClassName = computed(() => [
  rootResolvedStyling.value.className,
  attrs.class,
])

const rootStyle = computed(() => [
  ...rootResolvedStyling.value.style,
  attrs.style,
])

const rootAriaHidden = computed<boolean | undefined>(() => {
  if (isNestedLoadingStateElement.value) {
    return undefined
  }

  return props.isDecorative ? true : undefined
})

const rootAriaLabel = computed<string | undefined>(() => {
  if (isNestedLoadingStateElement.value || props.isDecorative) {
    return undefined
  }

  return props.ariaLabel ?? loadingAriaProps.value?.['aria-label'] as string | undefined
})

const rootAriaLabelledby = computed<string | undefined>(() => {
  if (isNestedLoadingStateElement.value || props.isDecorative) {
    return undefined
  }

  return props.ariaLabelledby
})

const rootAriaValuemin = computed<number | undefined>(() => {
  if (isNestedLoadingStateElement.value || props.isDecorative) {
    return undefined
  }

  return loadingAriaProps.value?.['aria-valuemin'] as number | undefined
})

const rootAriaValuemax = computed<number | undefined>(() => {
  if (isNestedLoadingStateElement.value || props.isDecorative) {
    return undefined
  }

  return loadingAriaProps.value?.['aria-valuemax'] as number | undefined
})

const rootAriaValuenow = computed<number | undefined>(() => {
  if (isNestedLoadingStateElement.value || props.isDecorative) {
    return undefined
  }

  return loadingAriaProps.value?.['aria-valuenow'] as number | undefined
})

const rootRole = computed<string | undefined>(() => {
  if (isNestedLoadingStateElement.value || props.isDecorative) {
    return undefined
  }

  return loadingAriaProps.value?.role as string | undefined
})

const rootFocusTarget = computed<string | undefined>(() => {
  if (isNestedLoadingStateElement.value || props.isFocusTarget !== true) {
    return undefined
  }

  return ''
})

const rootLoadingStateMarker = computed<'true' | undefined>(() => (
  isNestedLoadingStateElement.value
    ? undefined
    : 'true'
))

const rootTabIndex = computed<number | undefined>(() => (
  isNestedLoadingStateElement.value
    ? undefined
    : -1
))

void props.disableLoadingStateTracker

defineExpose({
  el: rootRef,
})
</script>
