import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'

/**
 * React source: FDSTextContext value shape
 */
export interface FDSTextContextValue {
  color: string
  type: string
}

export const FDS_TEXT_CONTEXT_KEY =
  Symbol('FDSTextContext') as InjectionKey<FDSTextContextValue | null>

/**
 * React source: useContext(FDSTextContext)
 */
export const useFDSTextContext = (): FDSTextContextValue | null =>
  inject(FDS_TEXT_CONTEXT_KEY, null)

/**
 * React source: <FDSTextContext.Provider value={...}>
 */
export const provideFDSTextContext = (value: FDSTextContextValue) =>
  provide(FDS_TEXT_CONTEXT_KEY, value)
