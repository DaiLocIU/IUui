import {
  computed,
  useId,
  type ComputedRef,
  type Ref,
  type StyleValue,
} from 'vue'

import useAnchorVisibilityObserver from './useAnchorVisibilityObserver'

export type BaseAnchorStyle = Record<string, string>

export type UseBaseAnchorElementReturn = [
  ComputedRef<string | null>,
  ComputedRef<StyleValue | null>,
  Ref<HTMLElement | null>,
]

export function useBaseAnchorElement(): UseBaseAnchorElementReturn {
  const rawAnchorName = `--${useId()}`
  const [anchorRef, isVisible] = useAnchorVisibilityObserver()

  const anchorName = computed(() => {
    return isVisible.value ? rawAnchorName : null
  })

  const anchorStyle = computed<StyleValue | null>(() => {
    if (anchorName.value == null) {
      return null
    }

    return {
      '--x-anchorName': anchorName.value,
      'anchor-name': anchorName.value,
    } satisfies BaseAnchorStyle
  })

  return [anchorName, anchorStyle, anchorRef]
}

export default useBaseAnchorElement
