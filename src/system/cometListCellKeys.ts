import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'

export interface CometListCellContextValue {
  disabled?: boolean
  level: number
}

export const COMET_LIST_CELL_CONTEXT_KEY =
  Symbol('CometListCellContext') as InjectionKey<CometListCellContextValue | null>

export const useCometListCellContext = (): CometListCellContextValue | null =>
  inject(COMET_LIST_CELL_CONTEXT_KEY, null)

export const provideCometListCellContext = (
  value: CometListCellContextValue,
): void => {
  provide(COMET_LIST_CELL_CONTEXT_KEY, value)
}
