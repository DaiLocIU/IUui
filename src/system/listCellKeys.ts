import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'

export interface CometListCellContextValue {
  disabled: boolean
  level?: number
  shouldToggleOnListcell: boolean
}

export const DEFAULT_COMET_LIST_CELL_CONTEXT: CometListCellContextValue = {
  disabled: false,
  level: undefined,
  shouldToggleOnListcell: false,
}

export const BASE_IS_DECORATIVE_CONTEXT_KEY =
  Symbol('BaseIsDecorativeContext') as InjectionKey<boolean | undefined>

export const COMET_LIST_CELL_CONTEXT_KEY =
  Symbol('CometListCellContext') as InjectionKey<CometListCellContextValue>

export const useBaseIsDecorativeContext = (): boolean | undefined =>
  inject(BASE_IS_DECORATIVE_CONTEXT_KEY, undefined)

export const provideBaseIsDecorativeContext = (value: boolean | undefined): void =>
  provide(BASE_IS_DECORATIVE_CONTEXT_KEY, value)

export const useCometListCellContext = (): CometListCellContextValue =>
  inject(COMET_LIST_CELL_CONTEXT_KEY, DEFAULT_COMET_LIST_CELL_CONTEXT)

export const provideCometListCellContext = (value: CometListCellContextValue): void =>
  provide(COMET_LIST_CELL_CONTEXT_KEY, value)
