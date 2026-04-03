import { inject, provide, type InjectionKey } from 'vue'

export interface BaseButtonPopoverContextValue {
  expanded?: boolean
  haspopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
}

export interface CometContainerPressableRegistration {
  onContextMenu: (event: MouseEvent) => void
  onPress: (event: MouseEvent | KeyboardEvent) => void
  target?: string
  url?: string
}

export interface CometContainerPressableContextValue {
  onMount: (
    registration: CometContainerPressableRegistration,
    token: { value: unknown },
  ) => void
}

export const BASE_BUTTON_POPOVER_CONTEXT_KEY =
  Symbol('BaseButtonPopoverContext') as InjectionKey<
    BaseButtonPopoverContextValue | null
  >

export const BASE_DISABLED_CONTEXT_KEY =
  Symbol('BaseDisabledContext') as InjectionKey<boolean>

export const BASE_PLACEHOLDER_CONTEXT_KEY =
  Symbol('BasePlaceholderContext') as InjectionKey<boolean>

export const COMET_CONTAINER_PRESSABLE_CONTEXT_KEY =
  Symbol('CometContainerPressableContext') as InjectionKey<
    CometContainerPressableContextValue | null
  >

export const COMET_DANGEROUSLY_SUPPRESS_INTERACTIVE_ELEMENTS_CONTEXT_KEY =
  Symbol('CometDangerouslySuppressInteractiveElementsContext') as InjectionKey<boolean>

export const provideBaseButtonPopoverContext = (
  value: BaseButtonPopoverContextValue | null,
): void => provide(BASE_BUTTON_POPOVER_CONTEXT_KEY, value)

export const useBaseButtonPopoverContext = (): BaseButtonPopoverContextValue | null =>
  inject(BASE_BUTTON_POPOVER_CONTEXT_KEY, null)

export const provideBaseDisabledContext = (value: boolean): void =>
  provide(BASE_DISABLED_CONTEXT_KEY, value)

export const useBaseDisabledContext = (): boolean =>
  inject(BASE_DISABLED_CONTEXT_KEY, false)

export const provideBasePlaceholderContext = (value: boolean): void =>
  provide(BASE_PLACEHOLDER_CONTEXT_KEY, value)

export const useBasePlaceholderContext = (): boolean =>
  inject(BASE_PLACEHOLDER_CONTEXT_KEY, false)

export const provideCometContainerPressableContext = (
  value: CometContainerPressableContextValue | null,
): void => provide(COMET_CONTAINER_PRESSABLE_CONTEXT_KEY, value)

export const useCometContainerPressableContext = (): CometContainerPressableContextValue | null =>
  inject(COMET_CONTAINER_PRESSABLE_CONTEXT_KEY, null)

export const provideCometDangerouslySuppressInteractiveElementsContext = (
  value: boolean,
): void =>
  provide(COMET_DANGEROUSLY_SUPPRESS_INTERACTIVE_ELEMENTS_CONTEXT_KEY, value)

export const useCometDangerouslySuppressInteractiveElementsContext = (): boolean =>
  inject(COMET_DANGEROUSLY_SUPPRESS_INTERACTIVE_ELEMENTS_CONTEXT_KEY, false)
