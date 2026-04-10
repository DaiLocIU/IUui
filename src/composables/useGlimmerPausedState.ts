import { ref, type Ref } from 'vue'

import usePartialViewImpression from './usePartialViewImpression'
import type { PartialViewImpressionEndPayload } from './usePartialViewImpression'

export interface UseGlimmerPausedStateReturn {
  paused: Ref<boolean>
  ref: Ref<HTMLElement | null>
}

export function useGlimmerPausedState(startPaused = true): UseGlimmerPausedStateReturn {
  const paused = ref(startPaused)

  const refValue = usePartialViewImpression({
    onImpressionEnd(payload: PartialViewImpressionEndPayload) {
      if (payload.hiddenReason !== 'COMPONENT_UNMOUNTED') {
        paused.value = true
      }
    },
    onImpressionStart() {
      paused.value = false
    },
  })

  return {
    paused,
    ref: refValue,
  }
}

export default useGlimmerPausedState
