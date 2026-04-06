import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'

export const SUPPRESS_INTERACTIVE_KEY: InjectionKey<boolean> =
  Symbol('CometDangerouslySuppressInteractiveElementsContext')

export const useSuppressInteractiveContext = (): boolean =>
  inject(SUPPRESS_INTERACTIVE_KEY, false)

export const provideSuppressInteractiveContext = (value: boolean): void => {
  provide(SUPPRESS_INTERACTIVE_KEY, value)
}
