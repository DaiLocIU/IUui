import { shallowRef } from 'vue'

export type StableFactory<T> = () => T

export function useStable<T>(factory: StableFactory<T>): T {
  // This mirrors the React hook API for ported code. In Vue, a composable
  // invocation inside setup is already stable for the component instance.
  const stableRef = shallowRef<{ value: T } | null>(null)
  const current = stableRef.value

  if (current !== null) {
    return current.value
  }

  const value = factory()
  stableRef.value = { value }

  return value
}

export default useStable
