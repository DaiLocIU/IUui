// React source: ReactEventHookPropagation
// Direct port — zero deps, zero behavior changes.

const PROP_KEY = '_stopEventHookPropagation'

interface StampedEvent extends Event {
  [PROP_KEY]?: Record<string, boolean>
}

/**
 * React: hasEventHookPropagationStopped(event, hookName)
 * Check whether a nested element has already handled this event for the same hook.
 */
export function hasHookPropagationStopped(event: Event, hookName: string): boolean {
  const map = (event as StampedEvent)[PROP_KEY]
  return map !== undefined && map[hookName] === true
}

/**
 * React: stopEventHookPropagation(event, hookName)
 * Stamp this event so ancestor elements using the same hook skip it.
 * This does not stop normal DOM event propagation.
 */
export function stopHookPropagation(event: Event, hookName: string): void {
  const stamped = event as StampedEvent

  if (stamped[PROP_KEY] == null) {
    stamped[PROP_KEY] = {}
  }

  stamped[PROP_KEY]![hookName] = true
}
