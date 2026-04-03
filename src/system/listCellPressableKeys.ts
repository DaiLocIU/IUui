import { inject, provide } from 'vue'
import type { Component, InjectionKey } from 'vue'

export interface CometCompositeStructureContextValue {
  role?: string
}

export interface CometFocusGroupContextValue {
  FocusContainer?: Component | null
  FocusItem?: Component | null
}

export const COMET_COMPOSITE_STRUCTURE_CONTEXT_KEY =
  Symbol('CometCompositeStructureContext') as InjectionKey<CometCompositeStructureContextValue>

export const COMET_FOCUS_GROUP_CONTEXT_KEY =
  Symbol('CometFocusGroupContext') as InjectionKey<CometFocusGroupContextValue>

const DEFAULT_COMPOSITE_STRUCTURE_CONTEXT: CometCompositeStructureContextValue = Object.freeze({})
const DEFAULT_FOCUS_GROUP_CONTEXT: CometFocusGroupContextValue = Object.freeze({
  FocusContainer: null,
  FocusItem: null,
})

export const useCometCompositeStructureContext = (): CometCompositeStructureContextValue =>
  inject(COMET_COMPOSITE_STRUCTURE_CONTEXT_KEY, DEFAULT_COMPOSITE_STRUCTURE_CONTEXT)

export const provideCometCompositeStructureContext = (
  value: CometCompositeStructureContextValue,
): void => provide(COMET_COMPOSITE_STRUCTURE_CONTEXT_KEY, value)

export const useCometFocusGroupContext = (): CometFocusGroupContextValue =>
  inject(COMET_FOCUS_GROUP_CONTEXT_KEY, DEFAULT_FOCUS_GROUP_CONTEXT)

export const provideCometFocusGroupContext = (
  value: CometFocusGroupContextValue,
): void => provide(COMET_FOCUS_GROUP_CONTEXT_KEY, value)

export const getItemRoleFromCompositeRole = (
  role: string | undefined,
): string | undefined => {
  switch (role) {
    case 'grid':
      return 'row'
    case 'list':
      return 'listitem'
    case 'listbox':
      return 'option'
    case 'menu':
      return 'menuitem'
    case 'radiogroup':
      return 'radio'
    case 'row':
      return 'gridcell'
    case 'tablist':
      return 'tab'
    default:
      return undefined
  }
}
