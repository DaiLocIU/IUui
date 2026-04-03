import { ref, toValue, type MaybeRefOrGetter } from 'vue'

import { useCometGHLRendering } from '../system/baseLinkKeys'

export interface UseBaseLinkShimHandlersOptions {
  onContextMenu?: ((event: MouseEvent) => void) | undefined
  onHoverStart?: ((event: unknown) => void) | undefined
  onPress?: ((event: MouseEvent | KeyboardEvent) => void) | undefined
  shimmed?: MaybeRefOrGetter<boolean>
}

export const useBaseLinkShimHandlers = ({
  onContextMenu,
  onHoverStart,
  onPress,
  shimmed,
}: UseBaseLinkShimHandlersOptions) => {
  const useOrigHref = ref(useCometGHLRendering())

  const resetOriginalHref = (): void => {
    if (useOrigHref.value) {
      useOrigHref.value = false
    }
  }

  const handleContextMenu = (event: MouseEvent): void => {
    onContextMenu?.(event)
    resetOriginalHref()
  }

  const handleHoverStart = (event: unknown): void => {
    onHoverStart?.(event)

    if (toValue(shimmed) === true) {
      useOrigHref.value = true
    }
  }

  const handlePress = (event: MouseEvent | KeyboardEvent): void => {
    onPress?.(event)
    resetOriginalHref()
  }

  return {
    onContextMenu: handleContextMenu,
    onHoverStart: handleHoverStart,
    onPress: handlePress,
    useOrigHref,
  }
}
