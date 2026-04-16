import {
  onBeforeUnmount,
  ref,
  shallowRef,
  watch,
  type Ref,
} from 'vue'

export const MODERATE_INTERSECTION_RATIO = 0.5

export type UseAnchorVisibilityObserverReturn = [
  Ref<HTMLElement | null>,
  Ref<boolean>,
]

export function useAnchorVisibilityObserver(): UseAnchorVisibilityObserverReturn {
  const anchorRef = ref<HTMLElement | null>(null)
  const isVisible = ref(true)
  const observerRef = shallowRef<IntersectionObserver | null>(null)

  const disconnectObserver = (): void => {
    observerRef.value?.disconnect()
    observerRef.value = null
  }

  watch(
    anchorRef,
    (element) => {
      disconnectObserver()

      if (
        element == null
        || typeof globalThis.IntersectionObserver !== 'function'
      ) {
        return
      }

      observerRef.value = new globalThis.IntersectionObserver(
        (entries) => {
          const entry = entries[0]

          if (entry == null) {
            return
          }

          isVisible.value = entry.intersectionRatio >= MODERATE_INTERSECTION_RATIO
        },
        {
          threshold: MODERATE_INTERSECTION_RATIO,
        },
      )

      observerRef.value.observe(element)
    },
    {
      flush: 'post',
    },
  )

  onBeforeUnmount(() => {
    disconnectObserver()
  })

  return [anchorRef, isVisible]
}

export default useAnchorVisibilityObserver
