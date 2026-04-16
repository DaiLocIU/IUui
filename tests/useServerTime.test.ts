import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  getServerTimeDate,
  resetServerTimeStateForTests,
  resetServerTimeProvider,
  setServerTimeProvider,
  subscribeToServerTimeUpdates,
} from '../src/composables/useServerTime'

describe('useServerTime shared timer helpers', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    resetServerTimeStateForTests()
    resetServerTimeProvider()
  })

  it('reads dates from the configured server time provider', () => {
    const timestamp = Date.parse('2026-04-14T12:00:00.000Z')

    setServerTimeProvider(() => timestamp)

    expect(getServerTimeDate().toISOString()).toBe('2026-04-14T12:00:00.000Z')
  })

  it('shares one interval across subscribers and updates all listeners', async () => {
    vi.useFakeTimers()
    vi.stubGlobal(
      'requestIdleCallback',
      vi.fn((callback: IdleRequestCallback) => {
        callback({
          didTimeout: false,
          timeRemaining: () => 50,
        } as IdleDeadline)

        return 0
      }),
    )

    let currentTimestamp = Date.parse('2026-04-14T12:00:00.000Z')
    const setIntervalSpy = vi.spyOn(globalThis, 'setInterval')
    const firstListener = vi.fn()
    const secondListener = vi.fn()

    setServerTimeProvider(() => currentTimestamp)

    const unsubscribeFirst = subscribeToServerTimeUpdates(firstListener, 1000)
    const unsubscribeSecond = subscribeToServerTimeUpdates(secondListener, 500)

    expect(setIntervalSpy).toHaveBeenCalledTimes(1)

    currentTimestamp += 500
    await vi.advanceTimersByTimeAsync(500)

    expect(firstListener).not.toHaveBeenCalled()
    expect(secondListener).not.toHaveBeenCalled()

    currentTimestamp += 500
    await vi.advanceTimersByTimeAsync(500)

    expect(firstListener).toHaveBeenCalledTimes(1)
    expect(secondListener).toHaveBeenCalledTimes(1)

    unsubscribeFirst()

    currentTimestamp += 1000
    await vi.advanceTimersByTimeAsync(1000)

    expect(firstListener).toHaveBeenCalledTimes(1)
    expect(secondListener).toHaveBeenCalledTimes(2)

    unsubscribeSecond()

    currentTimestamp += 1000
    await vi.advanceTimersByTimeAsync(1000)

    expect(secondListener).toHaveBeenCalledTimes(2)
  })

  it('clears the shared interval when the last subscriber unsubscribes', () => {
    vi.useFakeTimers()

    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval')
    const unsubscribe = subscribeToServerTimeUpdates(() => {}, 1000)

    unsubscribe()

    expect(clearIntervalSpy).toHaveBeenCalledTimes(1)
  })
})
