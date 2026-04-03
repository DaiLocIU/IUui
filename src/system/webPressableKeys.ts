import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'

export interface WebPressableGroupContextValue {
  onTouchStart: () => void
  register: (element: HTMLElement, callback: (event: MouseEvent | PointerEvent) => void) => void
  unRegister: (element: HTMLElement) => void
}

export const WEB_PRESSABLE_GROUP_CONTEXT_KEY =
  Symbol('WebPressableGroupContext') as InjectionKey<
    WebPressableGroupContextValue | undefined
  >

export const useWebPressableGroupContext = (): WebPressableGroupContextValue | undefined =>
  inject(WEB_PRESSABLE_GROUP_CONTEXT_KEY, undefined)

export const provideWebPressableGroupContext = (
  value: WebPressableGroupContextValue,
): void => provide(WEB_PRESSABLE_GROUP_CONTEXT_KEY, value)
