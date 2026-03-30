import { onMounted, onUnmounted, ref, watch, type Ref } from 'vue'

export interface DimensionSnapshot {
  offsetWidth: number
  offsetHeight: number
  scrollWidth: number
  scrollHeight: number
}

export interface UseOverflowDetectionOptions {
  testid?: string
  /**
   * React source: i (useRef) — ref on the inner measured text node.
   */
  elementRef: Ref<HTMLElement | null>

  /**
   * New library affordance: keep the snapshot fresh on resize.
   */
  watchResize: Ref<boolean>
}

export interface UseOverflowDetectionReturn {
  /**
   * React source: u — useState(false)
   */
  isOverflowing: Ref<boolean>
  /**
   * React source: C — mouseenter overflow check against the cached snapshot.
   */
  checkOverflow: () => void
  /**
   * React source: ref callback snapshot write during commit.
   */
  refreshSnapshot: () => void
}

/**
 * React source: inline state + ref callback + checkOverflow in BaseTextV2TooltipWrapper.
 *
 * The key design is two-phase measurement:
 * 1. read the DOM when layout changes
 * 2. check cached dimensions on hover without forcing a reflow
 */
export function useOverflowDetection(
  options: UseOverflowDetectionOptions,
): UseOverflowDetectionReturn {
  const { elementRef, watchResize } = options

  const isOverflowing = ref(false)
  const snapshot = ref<DimensionSnapshot | null>(null)
  let resizeObserver: ResizeObserver | null = null

  function refreshSnapshot(): void {
    const raw = elementRef.value?.children[0] ?? elementRef.value
    const el = raw as HTMLElement | null
    if (el == null) return

    snapshot.value = {
      offsetWidth: el.offsetWidth,
      offsetHeight: el.offsetHeight,
      scrollWidth: el.scrollWidth,
      scrollHeight: el.scrollHeight,
    }
  }

  function checkOverflow(): void {
   
    const currentSnapshot = snapshot.value
    if (currentSnapshot == null) return

    const overflowing =
      currentSnapshot.offsetWidth < currentSnapshot.scrollWidth ||
      currentSnapshot.offsetHeight < currentSnapshot.scrollHeight

    if (overflowing !== isOverflowing.value) {
      isOverflowing.value = overflowing
    }
  }

  function disconnectResizeObserver(): void {
    resizeObserver?.disconnect()
    resizeObserver = null
  }

  function connectResizeObserver(): void {
    disconnectResizeObserver()

    if (!watchResize.value || elementRef.value == null || typeof ResizeObserver === 'undefined') {
      return
    }

    resizeObserver = new ResizeObserver(() => {
      refreshSnapshot()
      checkOverflow()
    })

    resizeObserver.observe(elementRef.value)
  }

  onMounted(() => {
    refreshSnapshot()
    connectResizeObserver()
  })

  watch([elementRef, watchResize], () => {
    refreshSnapshot()
    connectResizeObserver()
  })

  onUnmounted(() => {
    disconnectResizeObserver()
  })

  return {
    isOverflowing,
    checkOverflow,
    refreshSnapshot,
  }
}
