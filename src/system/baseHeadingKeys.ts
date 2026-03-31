/**
 * React source: BaseHeadingContext
 *
 * Provides a numeric heading level (1–6) to descendant BaseHeading components.
 * BaseHeading reads this value, clamps it to [2, 6] (unless isPrimaryHeading),
 * and renders the appropriate h1–h6 element.
 *
 * React: h = c(r("BaseHeadingContext")) — useContext(BaseHeadingContext)
 * React: C = Math.max(Math.min(h, 6), 2)
 */

import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'

/** React: BaseHeadingContext — numeric heading level provided by ancestor */
export const BASE_HEADING_CONTEXT_KEY = Symbol('BaseHeadingContext') as InjectionKey<number>

/**
 * React: useContext(BaseHeadingContext)
 * Returns the current heading level from the nearest BaseHeadingContextProvider.
 * Defaults to 1 when no provider is present — matching React's createContext(1).
 * BaseHeading clamps this to [2, 6] unless isPrimaryHeading, so bare h1 is safe.
 */
export const useBaseHeadingContext = (): number =>
  inject(BASE_HEADING_CONTEXT_KEY, 1)

/**
 * Provide a heading level to descendant BaseHeading components.
 * Call inside a component's setup() to set the outline level for children.
 */
export const provideBaseHeadingContext = (level: number): void =>
  provide(BASE_HEADING_CONTEXT_KEY, level)
