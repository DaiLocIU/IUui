import { computed, type CSSProperties, type Ref } from 'vue'

import {
  resolveStyling,
  type ResolvedStyling,
  type StyleCapableValue,
} from '../../../utils/resolveStyling'
import type { PressableState } from '../../WebPressable/types'
import { useContainerPressableContext } from '../context/ContainerPressableContext'
import { PRESSABLE_STYLES } from '../utils/pressable.constants'

interface PressedStyleValue {
  opacity?: number
  scale?: number
}

export interface UsePressableStylesArgs {
  cursorDisabled: Ref<boolean>
  disabled: Ref<boolean>
  display: Ref<'block' | 'inline' | undefined>
  expanding: Ref<boolean>
  focused: Ref<boolean>
  focusVisible: Ref<boolean>
  hideFocusOverlay: Ref<boolean>
  hovered: Ref<boolean>
  isLink: Ref<boolean>
  overlayDisabled: Ref<boolean>
  overlayFocusRingPosition: Ref<'default' | 'inset' | undefined>
  pressed: Ref<boolean>
  pressedStyleValue: Ref<PressedStyleValue | undefined>
  suppressFocusRing: Ref<boolean>
  xstyle: Ref<StyleCapableValue | ((state: PressableState) => StyleCapableValue) | undefined>
}

export function usePressableStyles(args: UsePressableStylesArgs) {
  const containerCtx = useContainerPressableContext()

  const pressableState = computed<PressableState>(() => ({
    disabled: args.disabled.value,
    focused: args.focused.value,
    focusVisible: args.focusVisible.value,
    hovered: args.hovered.value,
    pressed: args.pressed.value,
  }))

  const resolvedXstyle = computed<StyleCapableValue | undefined>(() => {
    const xstyle = args.xstyle.value

    return typeof xstyle === 'function'
      ? xstyle(pressableState.value)
      : xstyle
  })

  const showFocusRing = computed(() =>
    args.focusVisible.value
    && (args.hideFocusOverlay.value || args.overlayDisabled.value)
    && !args.suppressFocusRing.value,
  )

  const resolvedStyling = computed<ResolvedStyling>(() =>
    resolveStyling(
      args.display.value === 'inline'
        ? PRESSABLE_STYLES.rootInline
        : PRESSABLE_STYLES.root,
      args.cursorDisabled.value && PRESSABLE_STYLES.defaultCursor,
      args.expanding.value && PRESSABLE_STYLES.expanding,
      args.isLink.value && PRESSABLE_STYLES.linkBase,
      !args.focusVisible.value && PRESSABLE_STYLES.hideOutline,
      resolvedXstyle.value,
      showFocusRing.value && (
        args.overlayFocusRingPosition.value === 'inset'
          ? PRESSABLE_STYLES.focusRingInset
          : PRESSABLE_STYLES.focusRing
      ),
      containerCtx != null && PRESSABLE_STYLES.zIndex,
    ),
  )

  const pressedStyle = computed<CSSProperties>(() => {
    const value = args.pressedStyleValue.value

    if (!args.pressed.value || value == null) {
      return {}
    }

    const style: CSSProperties = {}

    if (value.opacity != null) {
      style.opacity = value.opacity
    }

    if (value.scale != null) {
      style.transform = `scale(${value.scale})`
    }

    return style
  })

  return {
    resolvedStyling,
    pressedStyle,
  }
}
