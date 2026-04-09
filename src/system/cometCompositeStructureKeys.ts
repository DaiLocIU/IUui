import { inject, provide, type InjectionKey } from 'vue'

export interface CometCompositeStructureContextValue {
  horizontal?: boolean
  role?: string
  vertical?: boolean
}

const DEFAULT_COMPOSITE_STRUCTURE_CONTEXT: CometCompositeStructureContextValue = {
  horizontal: false,
  vertical: false,
}

export const COMET_COMPOSITE_STRUCTURE_KEY: InjectionKey<CometCompositeStructureContextValue> =
  Symbol('CometCompositeStructureContext')

export function useCometCompositeStructureContext(): CometCompositeStructureContextValue {
  return inject(COMET_COMPOSITE_STRUCTURE_KEY, DEFAULT_COMPOSITE_STRUCTURE_CONTEXT)
}

export function provideCometCompositeStructureContext(
  value: CometCompositeStructureContextValue,
): void {
  provide(COMET_COMPOSITE_STRUCTURE_KEY, value)
}
