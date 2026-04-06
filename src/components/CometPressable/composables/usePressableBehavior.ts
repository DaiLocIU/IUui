import { usePlaceholderContext } from '../context/PlaceholderContext'
import { useSuppressInteractiveContext } from '../context/SuppressInteractiveContext'

export function usePressableBehavior() {
  const isPlaceholder = usePlaceholderContext()
  const suppressInteractiveElements = useSuppressInteractiveContext()

  return {
    isPlaceholder,
    suppressInteractiveElements,
  }
}
