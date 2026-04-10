import {
  useElementVisibility,
  useMutationObserver,
  useResizeObserver,
} from '@vueuse/core'
import {
  computed,
  onBeforeUnmount,
  ref,
  watch,
  type Ref,
} from 'vue'

export type PartialViewHiddenReason =
  | 'COMPONENT_UNMOUNTED'
  | 'NOT_VISIBLE'
  | 'TARGET_HIDDEN'
  | 'TARGET_SIZE_0'
  | 'TARGET_TRANSPARENT'

export interface PartialViewImpressionEndPayload {
  hiddenReason: PartialViewHiddenReason
  hiddenTime: number
  visibleDuration: number
  visibleTime: number
}

export interface UsePartialViewImpressionOptions {
  hiddenWhenCSSStyleHidden?: boolean
  hiddenWhenZeroArea?: boolean
  onImpressionEnd?: (payload: PartialViewImpressionEndPayload) => void
  onImpressionStart?: () => void
}

function getCssHiddenReason(element: HTMLElement): Exclude<PartialViewHiddenReason, 'COMPONENT_UNMOUNTED' | 'NOT_VISIBLE' | 'TARGET_SIZE_0'> | null {
  if (typeof window === 'undefined') {
    return null
  }

  const style = window.getComputedStyle(element)

  if (style.opacity === '0') {
    return 'TARGET_TRANSPARENT'
  }

  if (
    style.display === 'none'
    || style.visibility === 'hidden'
    || style.contentVisibility === 'hidden'
  ) {
    return 'TARGET_HIDDEN'
  }

  return null
}

function hasZeroArea(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  return rect.width === 0 || rect.height === 0
}

function getHiddenReason(
  element: HTMLElement | null,
  isInViewport: boolean,
  options: Required<Pick<UsePartialViewImpressionOptions, 'hiddenWhenCSSStyleHidden' | 'hiddenWhenZeroArea'>>,
): Exclude<PartialViewHiddenReason, 'COMPONENT_UNMOUNTED'> {
  if (!isInViewport || element == null) {
    return 'NOT_VISIBLE'
  }

  if (options.hiddenWhenZeroArea && hasZeroArea(element)) {
    return 'TARGET_SIZE_0'
  }

  if (options.hiddenWhenCSSStyleHidden) {
    const cssHiddenReason = getCssHiddenReason(element)

    if (cssHiddenReason != null) {
      return cssHiddenReason
    }
  }

  return 'NOT_VISIBLE'
}

export function usePartialViewImpression(
  options: UsePartialViewImpressionOptions = {},
): Ref<HTMLElement | null> {
  const {
    hiddenWhenCSSStyleHidden = true,
    hiddenWhenZeroArea = true,
    onImpressionEnd,
    onImpressionStart,
  } = options

  const elementRef = ref<HTMLElement | null>(null)
  const visibilityVersion = ref(0)
  const visibleTimeRef = ref<number | null>(null)
  const isInViewport = useElementVisibility(elementRef)

  const bumpVisibilityVersion = (): void => {
    visibilityVersion.value += 1
  }

  useMutationObserver(
    elementRef,
    bumpVisibilityVersion,
    {
      attributeFilter: ['class', 'hidden', 'style'],
      attributes: true,
    },
  )

  useResizeObserver(elementRef, bumpVisibilityVersion)

  const isMeaningfullyVisible = computed(() => {
    visibilityVersion.value

    const element = elementRef.value

    if (element == null || !isInViewport.value) {
      return false
    }

    if (hiddenWhenZeroArea && hasZeroArea(element)) {
      return false
    }

    if (hiddenWhenCSSStyleHidden && getCssHiddenReason(element) != null) {
      return false
    }

    return true
  })

  watch(isMeaningfullyVisible, (visible, wasVisible) => {
    if (visible === wasVisible) {
      return
    }

    if (visible) {
      visibleTimeRef.value = Date.now()
      onImpressionStart?.()
      return
    }

    const visibleTime = visibleTimeRef.value

    if (visibleTime == null) {
      return
    }

    const hiddenTime = Date.now()

    onImpressionEnd?.({
      hiddenReason: getHiddenReason(elementRef.value, isInViewport.value, {
        hiddenWhenCSSStyleHidden,
        hiddenWhenZeroArea,
      }),
      hiddenTime,
      visibleDuration: hiddenTime - visibleTime,
      visibleTime,
    })

    visibleTimeRef.value = null
  })

  onBeforeUnmount(() => {
    const visibleTime = visibleTimeRef.value

    if (visibleTime == null) {
      return
    }

    const hiddenTime = Date.now()

    onImpressionEnd?.({
      hiddenReason: 'COMPONENT_UNMOUNTED',
      hiddenTime,
      visibleDuration: hiddenTime - visibleTime,
      visibleTime,
    })

    visibleTimeRef.value = null
  })

  return elementRef
}

export default usePartialViewImpression
