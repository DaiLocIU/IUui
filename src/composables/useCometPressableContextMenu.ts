import { watchEffect, ref, type Ref } from 'vue'

import { useCometContainerPressableContext } from '../system/cometPressableKeys'

const resolveElement = (target: unknown): HTMLElement | null => {
  if (target instanceof HTMLElement) {
    return target
  }

  if (target != null && typeof target === 'object') {
    const candidate = target as {
      $el?: unknown
      el?: HTMLElement | Ref<HTMLElement | null> | null
    }

    if (candidate.el instanceof HTMLElement) {
      return candidate.el
    }

    if (
      candidate.el != null &&
      typeof candidate.el === 'object' &&
      'value' in candidate.el &&
      candidate.el.value instanceof HTMLElement
    ) {
      return candidate.el.value
    }

    if (candidate.$el instanceof HTMLElement) {
      return candidate.$el
    }
  }

  return null
}

export interface UseCometPressableContextMenuOptions {
  isContainerTarget?: boolean
  linkProps?: {
    target?: string
    url?: string
  } | null
  localRef: Ref<unknown>
  onContextMenu?: (event: MouseEvent) => void
  preventContextMenu?: boolean
}

export const useCometPressableContextMenu = (
  options: UseCometPressableContextMenuOptions,
): void => {
  const containerContext = useCometContainerPressableContext()
  const mountToken = ref<unknown>(null)

  watchEffect(() => {
    if (options.isContainerTarget !== true || containerContext == null) {
      return
    }

    containerContext.onMount(
      {
        onContextMenu: (event) => {
          if (options.preventContextMenu === true) {
            event.preventDefault()
          }

          options.onContextMenu?.(event)
        },
        onPress: (event) => {
          void event
          resolveElement(options.localRef.value)?.click()
        },
        target: options.linkProps?.target,
        url: options.linkProps?.url,
      },
      mountToken,
    )
  })
}
