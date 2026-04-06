import { computed, inject, provide, type InjectionKey, type Ref } from 'vue'

import type {
  AccessibilityRelationship,
  AccessibilityState,
} from '../components/WebPressable/types'

export interface BaseButtonPopoverContextValue {
  haspopup?: AccessibilityRelationship['haspopup']
  expanded?: AccessibilityState['expanded']
}

export const BASE_BUTTON_POPOVER_CONTEXT_KEY =
  Symbol('BaseButtonPopoverContext') as InjectionKey<BaseButtonPopoverContextValue | null>

export const provideBaseButtonPopoverContext = (
  value: BaseButtonPopoverContextValue,
): void => {
  provide(BASE_BUTTON_POPOVER_CONTEXT_KEY, value)
}

export const useBaseButtonPopoverContext = (explicitProps: {
  haspopup: Ref<AccessibilityRelationship['haspopup'] | undefined>
  expanded: Ref<AccessibilityState['expanded'] | undefined>
}) => {
  const context = inject(BASE_BUTTON_POPOVER_CONTEXT_KEY, null)

  return {
    haspopup: computed(() =>
      explicitProps.haspopup.value ?? context?.haspopup,
    ),
    expanded: computed(() =>
      explicitProps.expanded.value ?? context?.expanded,
    ),
  }
}
