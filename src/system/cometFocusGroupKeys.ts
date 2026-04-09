import { Fragment, inject, provide, type Component, type InjectionKey } from 'vue'

export interface CometFocusGroupContextValue {
  FocusContainer: Component | null
  FocusItem: Component | null
}

const DEFAULT_FOCUS_GROUP_CONTEXT: CometFocusGroupContextValue = {
  FocusContainer: null,
  FocusItem: null,
}

export const COMET_FOCUS_GROUP_KEY: InjectionKey<CometFocusGroupContextValue> =
  Symbol('CometFocusGroupContext')

export function useCometFocusGroupContext(): CometFocusGroupContextValue {
  return inject(COMET_FOCUS_GROUP_KEY, DEFAULT_FOCUS_GROUP_CONTEXT)
}

export function provideCometFocusGroupContext(value: CometFocusGroupContextValue): void {
  provide(COMET_FOCUS_GROUP_KEY, value)
}

export const COMET_FOCUS_GROUP_FALLBACK_ITEM = Fragment
