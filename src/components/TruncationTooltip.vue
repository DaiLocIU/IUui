<template>
  <!--
    React source: html.span with onMouseEnter + ref callback
    The span wraps children and is the element we measure for overflow.
  -->
  <span ref="spanRef" @mouseenter="checkOverflowAndLoad">
    <!--
      React source: u && g != null ? <Tooltip ...> : children
      Only render the tooltip wrapper when BOTH conditions are true:
        1. isOverflowing is confirmed
        2. tooltipComponent is ready (preloaded at mount)
      Before both are true, children render naked — no wrapper, no flash.
    -->
    <component
      :is="resolvedTooltipComponent"
      v-if="isOverflowing && resolvedTooltipComponent != null"
      v-bind="resolvedTooltipProps"
    >
      <slot />
    </component>

    <slot v-else />
  </span>
</template>
<script lang="ts">
import { defineAsyncComponent } from 'vue'

export const defaultAsyncTooltip = defineAsyncComponent(
  () => import('./OverflowTooltipContent.vue')
)
</script>
<script setup lang="ts">
import {
  computed,
  ref,
  toRef,
  onMounted,
  shallowRef,
  type Component,
  type ShallowRef,
} from 'vue'
import { useOverflowDetection } from '../composables/useOverflowDetection'

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface TruncationTooltipConfig {
 
  /**
   * The tooltip component to render when overflow is detected.
   * React source: tooltipImpl — Meta's lazy JSResource module.
   * Here: a plain Vue component or defineAsyncComponent().
   */
  component: Component | (() => Promise<Component>)

  /**
   * Props forwarded to the tooltip component.
   * React source: babelHelpers.extends({ tooltipImpl: g }, a.tooltipProps, { children: n })
   */
  tooltipProps?: Record<string, unknown>
}

const props = withDefaults(
  defineProps<{
    testid?: string;
    /**
     * Tooltip config. When absent, this component is a plain span — no
     * overflow detection, no ResizeObserver, zero overhead.
     * React source: a (truncationTooltip prop)
     */
    truncationTooltip?: TruncationTooltipConfig

    /**
     * Controls when the tooltip component is loaded:
     *
     * 'mount'      — load at mount, tooltip is ready before first hover.
     *                First hover shows tooltip instantly.
     *                Cost: tooltip JS is fetched even if text never overflows.
     *
     * 'interaction' — load on first mouseenter where overflow is detected.
     *                 React source: original Meta behavior — m.preload() then
     *                 promiseDone(tooltipImpl.load(), cb) on hover.
     *                 First hover detects overflow but tooltip won't show yet.
     *                 Second hover shows it (component is loaded by then).
     *                 Cost: zero JS fetched until user actually hovers overflowing text.
     *
     * Default: 'interaction'
     */
    preloadStrategy?: 'mount' | 'interaction'

    /**
     * When false, disables the ResizeObserver that keeps the overflow
     * snapshot fresh on container resize.
     * React source: not in original — new affordance.
     * Default: true (on by default, opt-out)
     */
    watchResize?: boolean
  }>(),
  {
    truncationTooltip: () => ({
      component: defaultAsyncTooltip, // ✅ module scope, always available
    }),
    preloadStrategy: 'interaction',
    watchResize: true,
  }
)

// ---------------------------------------------------------------------------
// Refs
// ---------------------------------------------------------------------------

/**
 * React source: i (useRef) — the ref on the inner span.
 * We ref the span directly; useOverflowDetection reads its dimensions.
 */
const spanRef = ref<HTMLElement | null>(null)

/**
 * React source: g — useState(undefined) for the loaded tooltip component.
 * shallowRef because we store a component definition, not reactive data.
 * Only populated after preload resolves at mount.
 */
const resolvedTooltipComponent: ShallowRef<Component | null> = shallowRef(null)

// ---------------------------------------------------------------------------
// Overflow detection
// React source: C (checkOverflow) + v (refCallback) + u (isOverflowing)
// ---------------------------------------------------------------------------

const { isOverflowing, checkOverflow } = useOverflowDetection({
  testid: props.testid,
  elementRef: spanRef,
  watchResize: toRef(props, 'watchResize'),
})

const resolvedTooltipProps = computed<Record<string, unknown>>(() => {
  const tooltipProps = props.truncationTooltip?.tooltipProps ?? {}
  const customLabel = tooltipProps.label

  if (customLabel != null) {
    return tooltipProps
  }

  const detectedLabel = spanRef.value?.textContent?.replace(/\s+/g, ' ').trim()

  return {
    ...tooltipProps,
    label: detectedLabel ?? '',
  }
})

// ---------------------------------------------------------------------------
// Tooltip loading — two modes controlled by preloadStrategy prop
// ---------------------------------------------------------------------------

/**
 * Resolves a component definition (sync or async factory) and stores it
 * in resolvedTooltipComponent. Safe to call multiple times — bails out
 * immediately if already resolved.
 *
 * React source: promiseDone(a.tooltipImpl.load(), fn) — same intent,
 * used in both the mount path and the interaction path.
 */
async function loadTooltipComponent(): Promise<void> {
  if (resolvedTooltipComponent.value != null) return
  if (props.truncationTooltip == null) return

  const componentDef = props.truncationTooltip.component

  try {
    if (typeof componentDef === 'function') {
      const mod = await (componentDef as () => Promise<{ default: Component } | Component>)()
      if (typeof mod === 'object' && mod != null && 'default' in mod && mod.default != null) {
        resolvedTooltipComponent.value = mod.default
      } else {
        resolvedTooltipComponent.value = mod as Component
      }
    } else {
      resolvedTooltipComponent.value = componentDef
    }
  } catch (e) {
    // Degrade silently — text still renders without tooltip
    console.warn('[TruncationTooltip] Failed to load tooltip component', e)
  }
}

// 'mount' — load immediately so first hover shows tooltip instantly.
// Cost: tooltip JS fetched even if text never overflows.
onMounted(() => {
  if (props.preloadStrategy === 'mount') {
    loadTooltipComponent()
  }
})

/**
 * Wraps the composable's checkOverflow to add the 'interaction' load trigger.
 *
 * React source: C (checkOverflow) — on mouseenter:
 *   1. Detect overflow (t !== u && _(t))
 *   2. If overflowing: m.preload() then promiseDone(tooltipImpl.load(), cb)
 *
 * 'interaction' mode: tooltip JS is fetched only after overflow is confirmed
 * on first hover. Second hover shows the tooltip (loaded by then).
 * 'mount' mode: loadTooltipComponent() already ran — this is a no-op load.
 */
function checkOverflowAndLoad(): void {
  checkOverflow()

  if (props.preloadStrategy === 'interaction' && isOverflowing.value) {
    loadTooltipComponent()
  }
}
</script>
