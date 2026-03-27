import { InjectionKey } from 'vue';

export type WrapValue = 'none' | 'wrap' | 'wrap-reverse';
export interface RowContextValue {
    inRow: boolean;
    spacing: number;
    columns: number;
    wrap: WrapValue;
}
export type ColumnAlignValue = 'stretch' | 'center' | 'end' | 'start';
export type ColumnVerticalAlignValue = 'top' | 'center' | 'bottom' | 'space-between';
export interface ColumnContextValue {
    inColumn: boolean;
    spacing?: number;
    paddingHorizontal?: number;
    align?: ColumnAlignValue;
    hasDividers?: boolean;
}
export declare const ROW_CONTEXT: InjectionKey<RowContextValue | null>;
export declare const COLUMN_CONTEXT: InjectionKey<ColumnContextValue | null>;
export declare const useRowContext: () => RowContextValue | null;
export declare const useColumnContext: () => ColumnContextValue | null;
export declare const provideRowContext: (value: RowContextValue | null) => void;
export declare const provideColumnContext: (value: ColumnContextValue | null) => void;
