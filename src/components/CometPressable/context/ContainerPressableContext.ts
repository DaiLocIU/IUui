import type { InjectionKey, Ref } from 'vue'
import { inject, provide } from 'vue'

import type { LinkProps } from '../../WebPressable/types'

export interface CometContainerPressableRegistration {
  onContextMenu: (event: MouseEvent) => void
  onPress: (event: Event | MouseEvent | KeyboardEvent) => void
  target?: LinkProps['target']
  url?: LinkProps['url']
}

export interface CometContainerPressableContextValue {
  onMount(
    registration: CometContainerPressableRegistration,
    targetRef: Ref<HTMLElement | null>,
  ): void
}

export const CONTAINER_PRESSABLE_KEY: InjectionKey<CometContainerPressableContextValue | null> =
  Symbol('CometContainerPressableContext')

export const useContainerPressableContext = (): CometContainerPressableContextValue | null =>
  inject(CONTAINER_PRESSABLE_KEY, null)

export const provideContainerPressableContext = (
  value: CometContainerPressableContextValue,
): void => {
  provide(CONTAINER_PRESSABLE_KEY, value)
}
