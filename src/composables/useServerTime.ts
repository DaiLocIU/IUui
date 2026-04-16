import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

export type ServerTimeProvider = () => number

export const DEFAULT_SERVER_TIME_REFRESH_MS = 60_000

const defaultServerTimeProvider: ServerTimeProvider = () => Date.now()

const subscribers = new Set<() => void>()

let intervalId: ReturnType<typeof setInterval> | null = null
let isUpdateScheduled = false
let serverTimeProvider: ServerTimeProvider = defaultServerTimeProvider

function flushSubscribers(): void {
  subscribers.forEach((subscriber) => {
    subscriber()
  })

  isUpdateScheduled = false
}

function scheduleSpeculativeCallback(callback: () => void): void {
  if (typeof globalThis.requestIdleCallback === 'function') {
    globalThis.requestIdleCallback(() => {
      callback()
    })
    return
  }

  setTimeout(() => {
    callback()
  }, 0)
}

function startInterval(refreshMs: number = DEFAULT_SERVER_TIME_REFRESH_MS): void {
  intervalId = setInterval(() => {
    if (isUpdateScheduled) {
      return
    }

    isUpdateScheduled = true
    scheduleSpeculativeCallback(flushSubscribers)
  }, refreshMs)
}

function stopIntervalIfIdle(): void {
  if (subscribers.size !== 0 || intervalId == null) {
    return
  }

  clearInterval(intervalId)
  intervalId = null
}

export function setServerTimeProvider(provider: ServerTimeProvider): void {
  serverTimeProvider = provider
}

export function resetServerTimeProvider(): void {
  serverTimeProvider = defaultServerTimeProvider
}

export function getServerTimeDate(): Date {
  return new Date(serverTimeProvider())
}

export function resetServerTimeStateForTests(): void {
  subscribers.clear()

  if (intervalId != null) {
    clearInterval(intervalId)
    intervalId = null
  }

  isUpdateScheduled = false
  resetServerTimeProvider()
}

export function subscribeToServerTimeUpdates(
  subscriber: () => void,
  refreshMs: number = DEFAULT_SERVER_TIME_REFRESH_MS,
): () => void {
  subscribers.add(subscriber)

  if (intervalId == null) {
    startInterval(refreshMs)
  }

  return () => {
    subscribers.delete(subscriber)
    stopIntervalIfIdle()
  }
}

export function useServerTime(
  refreshMs: number = DEFAULT_SERVER_TIME_REFRESH_MS,
): Ref<Date> {
  const serverTime = ref(getServerTimeDate())
  let unsubscribe: (() => void) | null = null

  onMounted(() => {
    unsubscribe = subscribeToServerTimeUpdates(() => {
      serverTime.value = getServerTimeDate()
    }, refreshMs)
  })

  onBeforeUnmount(() => {
    unsubscribe?.()
    unsubscribe = null
  })

  return serverTime
}

export default useServerTime
