import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'

export const PLACEHOLDER_KEY: InjectionKey<boolean> =
  Symbol('BasePlaceholderContext')

export const usePlaceholderContext = (): boolean =>
  inject(PLACEHOLDER_KEY, false)

export const providePlaceholderContext = (value: boolean): void => {
  provide(PLACEHOLDER_KEY, value)
}
