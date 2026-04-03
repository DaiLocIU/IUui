<template>
  <component
    :is="display === 'block' ? WebPressable : PressableText"
    ref="pressableRef"
    v-bind="pressableProps"
  >
    <template #default="slotState">
      <slot v-bind="slotState" />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'

import PressableText from './PressableText.vue'
import WebPressable from './WebPressable.vue'
import { useBaseLinkRouterHandlers } from '../composables/useBaseLinkRouterHandlers'
import { useBaseLinkShimHandlers } from '../composables/useBaseLinkShimHandlers'
import {
  provideBaseLinkNestedPressable,
  useBaseLinkDefaultTarget,
  useBaseLinkNestedPressable,
  useBaseLinkRouter,
  useCometCustomLinkshimHash,
  useCometProductAttribution,
  useCometTrackingCode,
  useCometTrackingNodes,
} from '../system/baseLinkKeys'
import {
  appendPersistQueryParamsToUrl,
  decorateHrefWithTrackingInfo,
  deriveRelAndTarget,
  getLinkShimInfo,
  isCometRouterUrl,
  isTrustedDestination,
  transformRelativeUri,
} from '../utils/baseLink'
import type { StyleCapableValue } from '../utils/resolveStyling'

defineOptions({
  inheritAttrs: false,
})

type DisplayMode = 'block' | 'inline'

type LinkRole =
  | 'article'
  | 'button'
  | 'checkbox'
  | 'link'
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio'
  | 'none'
  | 'radio'
  | 'switch'
  | 'tab'
  | string

export interface Props {
  'aria-activedescendant'?: string
  'aria-checked'?: boolean | 'mixed'
  'aria-controls'?: string
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time'
  'aria-describedby'?: string
  'aria-expanded'?: boolean
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
  'aria-hidden'?: boolean
  'aria-invalid'?: boolean | 'grammar' | 'spelling'
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-owns'?: string
  'aria-selected'?: boolean
  attributionsrc?: string
  brid?: string
  className_DEPRECATED?: StyleCapableValue | ((state: any) => StyleCapableValue)
  disableLinkShimAndTracking_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV?: boolean
  disableLinkShimForFollowLinkButton_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV?: boolean
  disabled?: boolean
  display?: DisplayMode
  download?: boolean | string
  draggable?: boolean
  fbclid?: string
  focusable?: boolean
  href?: string
  id?: string
  label?: string
  lynxMode?: string
  onBlur?: (event: FocusEvent) => void
  onClick?: (event: MouseEvent) => void
  onContextMenu?: (event: MouseEvent) => void
  onFocus?: (event: FocusEvent) => void
  onFocusChange?: (value: boolean) => void
  onFocusVisibleChange?: (value: boolean) => void
  onHoverChange?: (value: boolean) => void
  onHoverEnd?: (event: unknown) => void
  onHoverMove?: (event: unknown) => void
  onHoverStart?: (event: unknown) => void
  onNavigate_DEPRECATED_FIXME?: (event: unknown) => void
  onNavigationTransitioning?: (value: boolean) => void
  onPress?: (event: MouseEvent | KeyboardEvent) => void
  onPressChange?: (value: boolean) => void
  onPressEnd?: (event: unknown) => void
  onPressStart?: (event: unknown) => void
  onTransitionOptimistic?: () => void
  passthroughProps?: Record<string, unknown>
  prefetchQueriesOnHover?: boolean
  prefetchQueriesOnMount_I_KNOW_WHAT_IM_DOING?: boolean
  preloadCodeOnMount?: boolean
  preserveQueryInShim?: boolean
  preventContextMenu?: boolean
  preventLocalNavigation?: boolean
  productAttribution?: string | string[]
  rel?: string
  replace?: boolean
  role?: LinkRole
  routeTarget?: string
  style?: StyleCapableValue | ((state: any) => StyleCapableValue)
  suppressFocusRing?: boolean
  suppressHydrationWarning?: boolean
  target?: string
  testid?: string
  testOnly_pressed?: boolean
  traceParams?: Record<string, unknown>
  xstyle?: StyleCapableValue | ((state: any) => StyleCapableValue)
}

const props = withDefaults(defineProps<Props>(), {
  'aria-activedescendant': undefined,
  'aria-checked': undefined,
  'aria-controls': undefined,
  'aria-current': undefined,
  'aria-describedby': undefined,
  'aria-expanded': undefined,
  'aria-haspopup': undefined,
  'aria-hidden': undefined,
  'aria-invalid': undefined,
  'aria-label': undefined,
  'aria-labelledby': undefined,
  'aria-owns': undefined,
  'aria-selected': undefined,
  attributionsrc: undefined,
  brid: undefined,
  className_DEPRECATED: undefined,
  disableLinkShimAndTracking_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV: false,
  disableLinkShimForFollowLinkButton_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV: false,
  disabled: false,
  display: 'inline',
  download: undefined,
  draggable: undefined,
  fbclid: undefined,
  focusable: undefined,
  href: undefined,
  id: undefined,
  label: undefined,
  lynxMode: undefined,
  onBlur: undefined,
  onClick: undefined,
  onContextMenu: undefined,
  onFocus: undefined,
  onFocusChange: undefined,
  onFocusVisibleChange: undefined,
  onHoverChange: undefined,
  onHoverEnd: undefined,
  onHoverMove: undefined,
  onHoverStart: undefined,
  onNavigate_DEPRECATED_FIXME: undefined,
  onNavigationTransitioning: undefined,
  onPress: undefined,
  onPressChange: undefined,
  onPressEnd: undefined,
  onPressStart: undefined,
  onTransitionOptimistic: undefined,
  passthroughProps: undefined,
  prefetchQueriesOnHover: false,
  prefetchQueriesOnMount_I_KNOW_WHAT_IM_DOING: false,
  preloadCodeOnMount: false,
  preserveQueryInShim: false,
  preventContextMenu: undefined,
  preventLocalNavigation: false,
  productAttribution: undefined,
  rel: undefined,
  replace: false,
  role: undefined,
  routeTarget: undefined,
  style: undefined,
  suppressFocusRing: false,
  suppressHydrationWarning: false,
  target: undefined,
  testid: undefined,
  testOnly_pressed: false,
  traceParams: undefined,
  xstyle: undefined,
})

const attrs = useAttrs()
const pressableRef = ref<unknown>(null)
const router = useBaseLinkRouter()
const defaultTarget = useBaseLinkDefaultTarget()
const isNestedPressable = useBaseLinkNestedPressable()
const trackingNodes = useCometTrackingNodes()
const trackingCode = useCometTrackingCode()
const productAttributionContext = useCometProductAttribution()
const customLinkshimHash = useCometCustomLinkshimHash()

provideBaseLinkNestedPressable(true)

const normalizedHref = computed(() => appendPersistQueryParamsToUrl(props.href) ?? null)

const hrefMetadata = computed(() => {
  const href = normalizedHref.value
  const isDownload = props.download === true || typeof props.download === 'string'
  const isTrusted = href == null ? true : isTrustedDestination(href)
  const isExternalLink = href != null ? !isTrusted : false

  if (isDownload || props.disableLinkShimAndTracking_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV === true) {
    return {
      clickIDAppended: false,
      ghlEncrypted: false,
      href,
      isExternalLink,
      isRouterLink: false,
      shimmed: false,
      unshimmedHref: null,
    }
  }

  if (href != null && isCometRouterUrl(href)) {
    return {
      clickIDAppended: false,
      ghlEncrypted: false,
      href: decorateHrefWithTrackingInfo(
        href,
        trackingNodes,
        trackingCode.encrypted_click_tracking,
      ),
      isExternalLink,
      isRouterLink: true,
      shimmed: false,
      unshimmedHref: null,
    }
  }

  const shimInfo = getLinkShimInfo({
    brid: props.brid,
    customHash: customLinkshimHash,
    disableLinkShim:
      props.disableLinkShimAndTracking_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV,
    download: props.download,
    fbclid: props.fbclid,
    href,
    preserveQueryInShim: props.preserveQueryInShim,
  })

  return {
    ...shimInfo,
    href: shimInfo.shimmed
      ? shimInfo.href
      : decorateHrefWithTrackingInfo(
          shimInfo.href,
          trackingNodes,
          trackingCode.encrypted_click_tracking,
        ),
    isExternalLink,
    isRouterLink: false,
  }
})

const derivedRelTarget = computed(() =>
  deriveRelAndTarget({
    defaultTarget,
    disableLinkShimForFollowLinkButton:
      props.disableLinkShimForFollowLinkButton_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV,
    explicitRel: props.rel,
    explicitTarget: props.target,
    ghlEncrypted: hrefMetadata.value.ghlEncrypted,
    isExternalLink: hrefMetadata.value.isExternalLink,
    shimmed: hrefMetadata.value.shimmed,
  }),
)

const shimHandlers = useBaseLinkShimHandlers({
  onContextMenu: props.onContextMenu,
  onHoverStart: props.onHoverStart,
  onPress: (event) => {
    props.onClick?.(event as MouseEvent)
    props.onPress?.(event)
  },
  shimmed: computed(() => hrefMetadata.value.shimmed),
})

const currentHref = computed(() => {
  if (shimHandlers.useOrigHref.value && hrefMetadata.value.shimmed) {
    return hrefMetadata.value.unshimmedHref
  }

  return hrefMetadata.value.href
})

const transformedHref = computed(() => transformRelativeUri(currentHref.value) ?? '#')

const dispatcherExtras = computed<Record<string, unknown>>(() => ({
  linkRef: null,
  onNavigate_DEPRECATED_FIXME: props.onNavigate_DEPRECATED_FIXME,
  onNavigationTransitioning: props.onNavigationTransitioning,
  passthroughProps: props.passthroughProps,
  productAttributionUpdateProps: {
    fromLink: props.productAttribution,
    linkContext: productAttributionContext,
    trackingNodes,
  },
  replace: props.replace,
  target: props.routeTarget,
  traceParams: props.traceParams,
}))

const routerHandlers = useBaseLinkRouterHandlers({
  dispatcherExtras,
  href: currentHref,
  isRouterLink: computed(() => hrefMetadata.value.isRouterLink),
  onBlur: props.onBlur,
  onFocus: props.onFocus,
  onHoverEnd: props.onHoverEnd,
  onHoverMove: props.onHoverMove,
  onHoverStart: shimHandlers.onHoverStart,
  onPress: shimHandlers.onPress,
  onPressStart: props.onPressStart,
  onTransitionOptimistic: props.onTransitionOptimistic,
  prefetchQueriesOnHover: props.prefetchQueriesOnHover,
  prefetchQueriesOnMount_I_KNOW_WHAT_IM_DOING:
    props.prefetchQueriesOnMount_I_KNOW_WHAT_IM_DOING,
  preloadCodeOnMount: props.preloadCodeOnMount,
  preventLocalNavigation: props.preventLocalNavigation,
  rel: computed(() => derivedRelTarget.value.rel),
  target: computed(() => derivedRelTarget.value.target),
})

const preventDefault = computed(() => {
  const href = currentHref.value

  return (
    (hrefMetadata.value.isRouterLink &&
      derivedRelTarget.value.target !== '_blank' &&
      router?.go != null) ||
    href == null ||
    href === '#' ||
    props.preventLocalNavigation === true
  )
})

const accessibilityRole = computed(() => {
  if (props.display === 'block') {
    return ['button', 'menuitem', 'none', 'switch', 'checkbox', 'article', 'radio', 'tab'].includes(props.role ?? '')
      ? props.role
      : 'link'
  }

  return ['button', 'menuitem', 'menuitemradio', 'menuitemcheckbox', 'none', 'tab'].includes(props.role ?? '')
    ? props.role
    : 'link'
})

const accessibilityLabel = computed(() =>
  props.label != null && props.role !== 'none' ? props.label : props['aria-label'],
)

const forwardedAttrs = computed(() => ({
  ...attrs,
  ...(props.passthroughProps ?? {}),
}))

const pressableProps = computed(() => ({
  ...forwardedAttrs.value,
  accessibilityLabel: accessibilityLabel.value,
  accessibilityRelationship: {
    activedescendant: props['aria-activedescendant'],
    controls: props['aria-controls'],
    current: props['aria-current'],
    describedby: props['aria-describedby'],
    haspopup: props['aria-haspopup'],
    labelledby: props['aria-labelledby'],
    owns: props['aria-owns'],
  },
  accessibilityRole: accessibilityRole.value,
  accessibilityState: {
    checked: props['aria-checked'],
    disabled: props.disabled,
    expanded: props['aria-expanded'],
    hidden: props['aria-hidden'],
    invalid: props['aria-invalid'],
    selected: props['aria-selected'],
  },
  className_DEPRECATED: props.className_DEPRECATED,
  direction: props.display === 'block' ? undefined : 'none',
  disabled: props.disabled,
  draggable: props.draggable,
  focusable: props.display === 'block' ? undefined : props.focusable,
  link: {
    attributionsrc:
      props.attributionsrc ?? trackingCode.encrypted_tracking?.[0] ?? undefined,
    download: props.download,
    rel: derivedRelTarget.value.rel,
    target: derivedRelTarget.value.target,
    url: transformedHref.value,
  },
  nativeID: props.id,
  onBlur: routerHandlers.onBlur,
  onContextMenu: shimHandlers.onContextMenu,
  onFocus: routerHandlers.onFocus,
  onFocusChange: props.onFocusChange,
  onFocusVisibleChange: props.onFocusVisibleChange,
  onHoverChange: props.onHoverChange,
  onHoverEnd: routerHandlers.onHoverEnd,
  onHoverMove: routerHandlers.onHoverMove,
  onHoverStart: routerHandlers.onHoverStart,
  onPress: routerHandlers.onPress,
  onPressChange: props.onPressChange,
  onPressEnd: props.onPressEnd,
  onPressStart: routerHandlers.onPressStart,
  preventContextMenu: props.preventContextMenu,
  preventDefault: preventDefault.value,
  style: props.style,
  suppressFocusRing: props.suppressFocusRing,
  tabbable: props.display === 'block' ? props.focusable : undefined,
  testID: props.testid,
  testOnly_state: {
    disabled: false,
    focused: false,
    focusVisible: false,
    hovered: false,
    pressed: props.testOnly_pressed,
  },
  xstyle: props.xstyle,
  'data-nested-pressable': isNestedPressable ? 'true' : undefined,
}))

defineExpose({
  el: pressableRef,
})
</script>
