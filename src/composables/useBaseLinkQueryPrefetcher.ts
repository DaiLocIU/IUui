import {
  onBeforeUnmount,
  shallowRef,
  toValue,
  type MaybeRefOrGetter,
} from 'vue'

import {
  useBaseLinkRouter,
  type BaseLinkPrefetchHandle,
} from '../system/baseLinkKeys'

export interface UseBaseLinkQueryPrefetcherOptions {
  delayCleanup?: boolean
  dispatcherExtras?: MaybeRefOrGetter<Record<string, unknown> | undefined>
  href?: MaybeRefOrGetter<string | null | undefined>
  isRouterLink?: MaybeRefOrGetter<boolean>
  onQueryPreload?: () => void
  onQueryUsed?: () => void
}

const DELAY_MS = 3500

export const useBaseLinkQueryPrefetcher = (
  options: UseBaseLinkQueryPrefetcherOptions,
) => {
  const router = useBaseLinkRouter()
  const prefetchedHandle = shallowRef<BaseLinkPrefetchHandle | null>(null)
  const cleanupTimer = shallowRef<number | null>(null)

  const cancelNow = (): void => {
    prefetchedHandle.value?.cancel?.()
    prefetchedHandle.value = null
  }

  const cancelPrefetchRouteQueries = (): void => {
    if (cleanupTimer.value != null) {
      window.clearTimeout(cleanupTimer.value)
      cleanupTimer.value = null
    }

    if (options.delayCleanup) {
      cleanupTimer.value = window.setTimeout(() => {
        cleanupTimer.value = null
        cancelNow()
      }, DELAY_MS)
      return
    }

    cancelNow()
  }

  const getPrefetchedQueryContainerAndMarkAsUsed = (): BaseLinkPrefetchHandle | null => {
    const handle = prefetchedHandle.value
    prefetchedHandle.value = null

    if (handle != null) {
      options.onQueryUsed?.()
    }

    return handle
  }

  const prefetchRouteQueries = (): void => {
    const href = toValue(options.href)
    const isRouterLink = toValue(options.isRouterLink)
    const dispatcherExtras = toValue(options.dispatcherExtras)

    if (
      router?.prefetchRouteQueries == null ||
      href == null ||
      isRouterLink !== true ||
      prefetchedHandle.value != null
    ) {
      return
    }

    cleanupTimer.value != null && window.clearTimeout(cleanupTimer.value)
    cleanupTimer.value = null
    prefetchedHandle.value =
      router.prefetchRouteQueries(href, dispatcherExtras ?? {}, Symbol()) ?? null
    options.onQueryPreload?.()
  }

  onBeforeUnmount(() => {
    if (cleanupTimer.value != null) {
      window.clearTimeout(cleanupTimer.value)
      cleanupTimer.value = null
    }

    cancelNow()
  })

  return {
    cancelPrefetchRouteQueries,
    getPrefetchedQueryContainerAndMarkAsUsed,
    prefetchRouteQueries,
  }
}
