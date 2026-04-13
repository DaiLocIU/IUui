import { inject, provide, type InjectionKey } from 'vue'

/**
 * FDSUnitHeaderHierarchyLevelContext
 *
 * React source: FDSUnitHeaderHierarchyLevelContext.js
 *   createContext(2)
 *
 * Tracks the nesting depth of FDSUnitHeader sections.
 * Consumers (e.g. FDSUnitHeaderTextAction) use this to auto-size their
 * text type without requiring a manual prop:
 *
 *   level === 2  →  "body2"  (top-level section header)
 *   level !== 2  →  "body3"  (nested sub-header)
 *
 * Usage:
 *   // Provider — FDSUnitHeader sets this after rendering its headline
 *   provideFDSUnitHeaderLevel(3)
 *
 *   // Consumer — FDSUnitHeaderTextAction reads this automatically
 *   const level = useFDSUnitHeaderLevel()  // → 2 (default) | number
 */

/** Default level matches React source `createContext(2)`. */
export const FDS_UNIT_HEADER_LEVEL_DEFAULT = 2 as const

export const FDS_UNIT_HEADER_LEVEL_KEY: InjectionKey<number> = Symbol(
  'FDSUnitHeaderHierarchyLevelContext',
)

/**
 * React source: useContext(FDSUnitHeaderHierarchyLevelContext)
 *
 * Returns the current header nesting level.
 * Falls back to the React source default of 2 when no provider is present.
 */
export function useFDSUnitHeaderLevel(): number {
  return inject(FDS_UNIT_HEADER_LEVEL_KEY, FDS_UNIT_HEADER_LEVEL_DEFAULT)
}

/**
 * React source: <FDSUnitHeaderHierarchyLevelContextProvider level={level}>
 *
 * Call inside FDSUnitHeader's setup() to propagate nesting depth to children.
 */
export function provideFDSUnitHeaderLevel(level: number): void {
  provide(FDS_UNIT_HEADER_LEVEL_KEY, level)
}
