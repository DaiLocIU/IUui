import { inject, provide, type InjectionKey } from 'vue'

export interface BaseLinkNavigationOptions {
  eventTimestamp?: number
  onNavigate_DEPRECATED_FIXME?: ((event: unknown) => void) | undefined
  onTransitionOptimistic?: (() => void) | undefined
  prefetcher?: BaseLinkPrefetchHandle | null | undefined
  replace?: boolean
  target?: string
  traceParams?: Record<string, unknown> | undefined
  passthroughProps?: Record<string, unknown> | undefined
  productAttributionUpdateProps?: Record<string, unknown> | undefined
  [key: string]: unknown
}

export interface BaseLinkPrefetchHandle {
  cancel?: () => void
}

export interface BaseLinkRouterAdapter {
  go?: (href: string, options?: BaseLinkNavigationOptions) => void
  preloadRouteCode?: (href: string, target?: string) => void
  prefetchRouteDefinition?: (href: string) => void
  prefetchRouteQueries?: (
    href: string,
    extras?: Record<string, unknown>,
    token?: unknown,
  ) => BaseLinkPrefetchHandle | void
}

export interface TrackingCodeContextValue {
  click_tracking_linkshim_cb?: string | null
  encrypted_click_tracking?: string | null
  encrypted_tracking?: Array<string | null>
}

export type ProductAttributionContextValue = Record<string, unknown> | null

export const BASE_LINK_DEFAULT_TARGET_KEY =
  Symbol('BaseLinkDefaultTarget') as InjectionKey<string | undefined>

export const BASE_LINK_NESTED_PRESSABLE_KEY =
  Symbol('BaseLinkNestedPressable') as InjectionKey<boolean>

export const COMET_CUSTOM_LINKSHIM_HASH_KEY =
  Symbol('CometCustomLinkshimHash') as InjectionKey<string | null>

export const COMET_GHL_RENDERING_KEY =
  Symbol('CometGHLRendering') as InjectionKey<boolean>

export const COMET_TRACKING_NODES_KEY =
  Symbol('CometTrackingNodes') as InjectionKey<string[]>

export const COMET_TRACKING_CODE_KEY =
  Symbol('CometTrackingCode') as InjectionKey<TrackingCodeContextValue>

export const COMET_PRODUCT_ATTRIBUTION_KEY =
  Symbol('CometProductAttribution') as InjectionKey<ProductAttributionContextValue>

export const BASE_LINK_ROUTER_KEY =
  Symbol('BaseLinkRouter') as InjectionKey<BaseLinkRouterAdapter | undefined>

const DEFAULT_TRACKING_CODE_CONTEXT: TrackingCodeContextValue = {
  click_tracking_linkshim_cb: null,
  encrypted_click_tracking: null,
  encrypted_tracking: [],
}

export const provideBaseLinkDefaultTarget = (value: string | undefined): void =>
  provide(BASE_LINK_DEFAULT_TARGET_KEY, value)

export const useBaseLinkDefaultTarget = (): string | undefined =>
  inject(BASE_LINK_DEFAULT_TARGET_KEY, undefined)

export const provideBaseLinkNestedPressable = (value: boolean): void =>
  provide(BASE_LINK_NESTED_PRESSABLE_KEY, value)

export const useBaseLinkNestedPressable = (): boolean =>
  inject(BASE_LINK_NESTED_PRESSABLE_KEY, false)

export const provideCometCustomLinkshimHash = (value: string | null): void =>
  provide(COMET_CUSTOM_LINKSHIM_HASH_KEY, value)

export const useCometCustomLinkshimHash = (): string | null =>
  inject(COMET_CUSTOM_LINKSHIM_HASH_KEY, null)

export const provideCometGHLRendering = (value: boolean): void =>
  provide(COMET_GHL_RENDERING_KEY, value)

export const useCometGHLRendering = (): boolean =>
  inject(COMET_GHL_RENDERING_KEY, false)

export const provideCometTrackingNodes = (value: string[]): void =>
  provide(COMET_TRACKING_NODES_KEY, value)

export const useCometTrackingNodes = (): string[] =>
  inject(COMET_TRACKING_NODES_KEY, [])

export const provideCometTrackingCode = (value: TrackingCodeContextValue): void =>
  provide(COMET_TRACKING_CODE_KEY, value)

export const useCometTrackingCode = (): TrackingCodeContextValue =>
  inject(COMET_TRACKING_CODE_KEY, DEFAULT_TRACKING_CODE_CONTEXT)

export const provideCometProductAttribution = (
  value: ProductAttributionContextValue,
): void => provide(COMET_PRODUCT_ATTRIBUTION_KEY, value)

export const useCometProductAttribution = (): ProductAttributionContextValue =>
  inject(COMET_PRODUCT_ATTRIBUTION_KEY, null)

export const provideBaseLinkRouter = (value: BaseLinkRouterAdapter | undefined): void =>
  provide(BASE_LINK_ROUTER_KEY, value)

export const useBaseLinkRouter = (): BaseLinkRouterAdapter | undefined =>
  inject(BASE_LINK_ROUTER_KEY, undefined)
