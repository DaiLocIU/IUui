import {
  onScopeDispose,
  ref,
  shallowRef,
  type Ref,
} from 'vue'

export type DelayedStateCallback<T> = (value: T) => void

export type SetDelayedState<T> = (
  value: T,
  delayMs?: number,
  callback?: DelayedStateCallback<T>,
) => void

export type UseDelayedStateReturn<T> = [Ref<T>, SetDelayedState<T>]

function noop(): void {}

export function useDelayedState<T>(initialValue: T): UseDelayedStateReturn<T> {
  const state = ref(initialValue) as Ref<T>
  const timeoutId = shallowRef<ReturnType<typeof setTimeout> | null>(null)

  const clearPendingTimeout = (): void => {
    if (timeoutId.value != null) {
      clearTimeout(timeoutId.value)
      timeoutId.value = null
    }
  }

  onScopeDispose(() => {
    clearPendingTimeout()
  })

  const setDelayedState: SetDelayedState<T> = (
    value,
    delayMs = 0,
    callback = noop as DelayedStateCallback<T>,
  ) => {
    clearPendingTimeout()

    if (delayMs === 0) {
      state.value = value
      callback(value)
      return
    }

    timeoutId.value = setTimeout(() => {
      state.value = value
      callback(value)
      timeoutId.value = null
    }, delayMs)
  }

  return [state, setDelayedState]
}

export default useDelayedState
