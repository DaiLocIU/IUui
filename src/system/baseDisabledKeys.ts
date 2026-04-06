import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'

export const BASE_DISABLED_CONTEXT_KEY =
  Symbol('BaseDisabledContext') as InjectionKey<boolean | undefined>

export const useBaseDisabledContext = (): boolean | undefined =>
  inject(BASE_DISABLED_CONTEXT_KEY, undefined)

export const provideBaseDisabledContext = (
  value: boolean | undefined,
): void => {
  provide(BASE_DISABLED_CONTEXT_KEY, value)
}
