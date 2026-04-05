// React source: ReactUseEvent.react + ReactDOM.unstable_createEventHandle
//
// Difference from React:
// - React delegates to the React root via unstable_createEventHandle
// - We attach directly to the element/document with addEventListener
// - The Map<element, cleanup> pattern and setListener API are identical

export interface EventHandle {
  /**
   * React: handle.setListener(element, handler)
   * Register handler on element. Automatically removes previous handler first.
   * Pass null to remove without adding a new one.
   */
  setListener(
    element: HTMLElement | Document | null,
    handler: ((e: Event) => void) | null,
    options?: AddEventListenerOptions,
  ): void
  /** Remove all listeners across all registered elements */
  clear(): void
}

/**
 * React: N(eventType, options) — createEventHandle factory
 * Creates a handle for one event type. One handle instance manages
 * one listener per element via a cleanup Map.
 */
export function createEventHandle(
  eventType: string,
  defaultOptions?: AddEventListenerOptions,
): EventHandle {
  const cleanups = new Map<HTMLElement | Document, () => void>()

  return {
    setListener(element, handler, options) {
      if (element === null) {
        return
      }

      const existingCleanup = cleanups.get(element)

      if (existingCleanup !== undefined) {
        existingCleanup()
        cleanups.delete(element)
      }

      if (handler === null) {
        return
      }

      const listenerOptions = options ?? defaultOptions
      const boundHandler = handler as EventListener

      element.addEventListener(eventType, boundHandler, listenerOptions)

      cleanups.set(element, () => {
        element.removeEventListener(eventType, boundHandler, listenerOptions)
      })
    },

    clear() {
      cleanups.forEach((cleanup) => cleanup())
      cleanups.clear()
    },
  }
}
