import type { InjectionKey } from 'vue'
import { inject, provide, reactive } from 'vue'

/**
 * React source: CometDensityModeContext = createContext([false, function () {}])
 */
export type CometDensityModeContextValue = [boolean, (next: boolean) => void]

export const COMET_DENSITY_MODE_CONTEXT_KEY =
  Symbol('CometDensityModeContext') as InjectionKey<CometDensityModeContextValue>

const DEFAULT_COMET_DENSITY_MODE_CONTEXT = reactive<CometDensityModeContextValue>([
  false,
  () => {},
])

export const useCometDensityModeContext = (): CometDensityModeContextValue =>
  inject(COMET_DENSITY_MODE_CONTEXT_KEY, DEFAULT_COMET_DENSITY_MODE_CONTEXT)

export const provideCometDensityModeContext = (
  value: CometDensityModeContextValue,
): void => {
  provide(COMET_DENSITY_MODE_CONTEXT_KEY, value)
}
