import { ref, watchEffect, type Ref } from 'vue'

import type { LinkProps } from '../../WebPressable/types'
import { useContainerPressableContext } from '../context/ContainerPressableContext'

export interface UseCometPressableContextMenuArgs {
  isContainerTarget?: boolean
  linkProps?: LinkProps
  localRef: Ref<HTMLElement | null>
  onContextMenu?: (e: MouseEvent) => void
  preventContextMenu?: boolean
}

export function useCometPressableContextMenu(
  args: UseCometPressableContextMenuArgs,
): void {
  const containerContext = useContainerPressableContext()
  const targetRef = ref<HTMLElement | null>(null)

  watchEffect(
    () => {
      if (args.isContainerTarget !== true || containerContext == null) {
        return
      }

      containerContext.onMount(
        {
          onContextMenu: (event: MouseEvent) => {
            if (args.preventContextMenu === true) {
              event.preventDefault()
            }

            args.onContextMenu?.(event)
          },
          onPress: () => {
            args.localRef.value?.click()
          },
          target: args.linkProps?.target,
          url: args.linkProps?.url,
        },
        targetRef,
      )
    },
    {
      flush: 'post',
    },
  )
}
