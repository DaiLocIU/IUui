import { computed, onMounted, toValue, type MaybeRefOrGetter } from 'vue'

import { useBaseLinkPreloader } from './useBaseLinkPreloader'
import { useBaseLinkQueryPrefetcher } from './useBaseLinkQueryPrefetcher'
import { useBaseLinkRouter } from '../system/baseLinkKeys'
import { hasModifierKey } from '../utils/baseLink'

export interface UseBaseLinkRouterHandlersOptions {
  dispatcherExtras?: MaybeRefOrGetter<Record<string, unknown> | undefined>
  href?: MaybeRefOrGetter<string | null | undefined>
  isRouterLink?: MaybeRefOrGetter<boolean>
  onBlur?: ((event: FocusEvent) => void) | undefined
  onFocus?: ((event: FocusEvent) => void) | undefined
  onHoverEnd?: ((event: unknown) => void) | undefined
  onHoverMove?: ((event: unknown) => void) | undefined
  onHoverStart?: ((event: unknown) => void) | undefined
  onPress?: ((event: MouseEvent | KeyboardEvent) => void) | undefined
  onPressStart?: ((event: unknown) => void) | undefined
  onTransitionOptimistic?: (() => void) | undefined
  prefetchQueriesOnHover?: boolean
  prefetchQueriesOnMount_I_KNOW_WHAT_IM_DOING?: boolean
  preloadCodeOnMount?: boolean
  preventLocalNavigation?: boolean
  rel?: MaybeRefOrGetter<string | undefined>
  shouldTriggerNavOnPress?: ((event: MouseEvent | KeyboardEvent) => boolean) | undefined
  target?: MaybeRefOrGetter<string | undefined>
}

const BLOCKED_REL_PATTERN = /async(?:-post)?|dialog(?:-post)?|theater|toggle/

const defaultShouldTriggerNavOnPress = (event: MouseEvent | KeyboardEvent): boolean =>
  !hasModifierKey(event)

export const useBaseLinkRouterHandlers = (
  options: UseBaseLinkRouterHandlersOptions,
) => {
  const router = useBaseLinkRouter()

  const eligibleRouterLink = computed(() => {
    const rel = toValue(options.rel)
    const isRouterLink = toValue(options.isRouterLink)

    return isRouterLink === true && (rel == null || !BLOCKED_REL_PATTERN.test(rel))
  })

  const localNavigationEnabled = computed(() => {
    const target = toValue(options.target)

    return (
      eligibleRouterLink.value &&
      options.preventLocalNavigation !== true &&
      (target == null || target === '_self')
    )
  })

  const prefetcher = useBaseLinkQueryPrefetcher({
    delayCleanup: true,
    dispatcherExtras: options.dispatcherExtras,
    href: options.href,
    isRouterLink: localNavigationEnabled,
  })

  const preloadRouteCode = (): void => {
    const href = toValue(options.href)
    const target = toValue(options.target)

    if (href != null && localNavigationEnabled.value) {
      router?.preloadRouteCode?.(href, target)
    }
  }

  const preloader = useBaseLinkPreloader({
    kind: options.prefetchQueriesOnHover === true ? 'button_aggressive' : 'button',
    onFocusIn: () => {
      if (localNavigationEnabled.value) {
        prefetcher.prefetchRouteQueries()
      }
    },
    onFocusOut: () => {
      prefetcher.cancelPrefetchRouteQueries()
    },
    onHighIntent: () => {
      if (localNavigationEnabled.value) {
        prefetcher.prefetchRouteQueries()
      }
    },
    onHoverIn: () => {
      if (localNavigationEnabled.value) {
        prefetcher.prefetchRouteQueries()
      }
    },
    onHoverOut: () => {
      prefetcher.cancelPrefetchRouteQueries()
    },
    onPressIn: () => {
      if (localNavigationEnabled.value) {
        prefetcher.prefetchRouteQueries()
      }
    },
  })

  const runNavigation = (event: MouseEvent | KeyboardEvent): void => {
    const href = toValue(options.href)
    const shouldTrigger =
      options.shouldTriggerNavOnPress?.(event) ?? defaultShouldTriggerNavOnPress(event)

    if (!shouldTrigger || href == null || localNavigationEnabled.value !== true) {
      return
    }

    options.onTransitionOptimistic?.()
    router?.go?.(href, {
      ...toValue(options.dispatcherExtras),
      eventTimestamp: event.timeStamp,
      onTransitionOptimistic: options.onTransitionOptimistic,
      prefetcher: prefetcher.getPrefetchedQueryContainerAndMarkAsUsed(),
    })
  }

  const onBlur = (event: FocusEvent): void => {
    options.onBlur?.(event)
    preloader.onFocusOutPreloader()
  }

  const onFocus = (event: FocusEvent): void => {
    options.onFocus?.(event)

    if (localNavigationEnabled.value) {
      preloader.onFocusInPreloader()
    }
  }

  const onHoverEnd = (event: unknown): void => {
    options.onHoverEnd?.(event)
    preloader.onHoverOutPreloader()
  }

  const onHoverMove = (event: unknown): void => {
    options.onHoverMove?.(event)
    preloader.onHoverMovePreloader()
  }

  const onHoverStart = (event: unknown): void => {
    options.onHoverStart?.(event)

    if (localNavigationEnabled.value) {
      preloader.onHoverInPreloader()
    }
  }

  const onPress = (event: MouseEvent | KeyboardEvent): void => {
    options.onPress?.(event)
    runNavigation(event)
  }

  const onPressStart = (event: unknown): void => {
    options.onPressStart?.(event)

    if (localNavigationEnabled.value) {
      preloader.onPressInPreloader(event as { pointerType?: string } | undefined)
    }
  }

  onMounted(() => {
    const href = toValue(options.href)

    if (href == null || localNavigationEnabled.value !== true) {
      return
    }

    if (options.prefetchQueriesOnMount_I_KNOW_WHAT_IM_DOING === true) {
      prefetcher.prefetchRouteQueries()
      return
    }

    if (options.preloadCodeOnMount === true) {
      preloadRouteCode()
      return
    }

    router?.prefetchRouteDefinition?.(href)
  })

  return {
    localNavigationEnabled,
    onBlur,
    onFocus,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    onPress,
    onPressStart,
  }
}
