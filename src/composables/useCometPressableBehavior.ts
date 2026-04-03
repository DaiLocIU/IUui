import { computed } from 'vue'

import {
  useBasePlaceholderContext,
  useCometDangerouslySuppressInteractiveElementsContext,
} from '../system/cometPressableKeys'

export const useCometPressableBehavior = () => {
  const isPlaceholder = useBasePlaceholderContext()
  const suppressInteractiveElements =
    useCometDangerouslySuppressInteractiveElementsContext()

  return computed(() => ({
    isPlaceholder,
    suppressInteractiveElements,
  }))
}
