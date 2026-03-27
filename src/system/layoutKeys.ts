import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'

export type WrapValue = 'none' | 'wrap' | 'wrap-reverse'

export interface RowContextValue {
  inRow: boolean
  spacing: number
  columns: number   // 0 = no column constraint, 1-10 = equal-width columns
  wrap: WrapValue
}

export type ColumnAlignValue = 'stretch' | 'center' | 'end' | 'start'
export type ColumnVerticalAlignValue = 'top' | 'center' | 'bottom' | 'space-between'

export interface ColumnContextValue {
  inColumn: boolean
  spacing?: number           // gap between items (applies margin per item)
  paddingHorizontal?: number // default paddingHorizontal for all column items
  align?: ColumnAlignValue   // default alignItems for all column items
  hasDividers?: boolean      // render a separator before each item
}

export const ROW_CONTEXT = Symbol('CometRowContext') as InjectionKey<RowContextValue | null>
export const COLUMN_CONTEXT = Symbol('CometColumnContext') as InjectionKey<ColumnContextValue | null>

export const useRowContext = () => inject(ROW_CONTEXT, null)
export const useColumnContext = () => inject(COLUMN_CONTEXT, null)

export const provideRowContext = (value: RowContextValue | null) => provide(ROW_CONTEXT, value)
export const provideColumnContext = (value: ColumnContextValue | null) => provide(COLUMN_CONTEXT, value)
