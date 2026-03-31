/**
 * React source: BaseTextContext
 *
 * Provides a context that tracks whether the current BaseTextV2 is nested inside
 * another BaseTextV2. When nested:
 *   - dir attribute is suppressed on the inner span
 *   - display:inline replaces display:block
 *   - ::before/::after pseudo-element trim is disabled (handled in BaseTextV2SpanWrapper)
 *
 * React: o("BaseTextContext").useBaseTextContext()  →  inject(BASE_TEXT_CONTEXT_KEY, null)
 * React: o("BaseTextContext").BaseTextContextProvider  →  provide(BASE_TEXT_CONTEXT_KEY, { nested: true })
 */

import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'

export interface BaseTextContextValue {
  /** React: $.nested — true when this span is inside an outer BaseTextV2 */
  nested: boolean
}

/** React: BaseTextContext injection key */
export const BASE_TEXT_CONTEXT_KEY = Symbol('BaseTextContext') as InjectionKey<BaseTextContextValue | null>

/**
 * React: useBaseTextContext()
 * Returns the nearest BaseTextContext value, or null if at the root.
 */
export const useBaseTextContext = (): BaseTextContextValue | null =>
  inject(BASE_TEXT_CONTEXT_KEY, null)

/**
 * React: BaseTextContextProvider nested={true}
 * Call this inside a component's setup() to provide the nested=true context to all children.
 */
export const provideBaseTextContext = (value: BaseTextContextValue) =>
  provide(BASE_TEXT_CONTEXT_KEY, value)
