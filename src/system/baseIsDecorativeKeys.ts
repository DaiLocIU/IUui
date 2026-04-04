import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'

export const BASE_IS_DECORATIVE_CONTEXT_KEY =
  Symbol('BaseIsDecorativeContext') as InjectionKey<boolean | undefined>

export const useBaseIsDecorativeContext = (): boolean | undefined =>
  inject(BASE_IS_DECORATIVE_CONTEXT_KEY, undefined)

export const provideBaseIsDecorativeContext = (value: boolean | undefined): void => {
  provide(BASE_IS_DECORATIVE_CONTEXT_KEY, value)
}
