import type { Meta, StoryObj } from '@storybook/vue3'
import { computed, reactive, ref } from 'vue'

import BaseLink from './BaseLink.vue'
import CometPressable from './CometPressable.vue'
import {
  provideBaseDisabledContext,
  provideCometContainerPressableContext,
  provideCometDangerouslySuppressInteractiveElementsContext,
  type CometContainerPressableContextValue,
  type CometContainerPressableRegistration,
} from '../system/cometPressableKeys'

/**
 * ## CometPressable
 *
 * `CometPressable` is the higher-level interaction shell that chooses between
 * link semantics, button semantics, or a suppressed visual-only wrapper while
 * layering hover, press, and focus feedback on top.
 *
 * These stories are arranged as a mixed behavior matrix so the semantic
 * branches, context-driven downgrades, and richer slot-based surfaces can be
 * compared without reading the implementation first.
 */
const meta: Meta<typeof CometPressable> = {
  title: 'Primitives/CometPressable',
  component: CometPressable,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const surfaceWrap =
  'padding: 24px; background: #f8fafc; font: 14px/1.5 ui-sans-serif, system-ui;'
const cardWrap = 'padding: 24px; background: #e2e8f0;'
const statusPanel =
  'margin-top: 12px; border-radius: 12px; background: #ffffff; border: 1px solid #cbd5e1; padding: 12px; font-size: 12px; color: #475569;'

const createContainerTargetStory = () => ({
  components: { CometPressable },
  setup() {
    const registrations = reactive<Array<{
      target: string
      url: string
    }>>([])
    const delegatedPressCount = ref(0)
    const delegatedContextMenuCount = ref(0)

    const contextValue: CometContainerPressableContextValue = {
      onMount(registration: CometContainerPressableRegistration) {
        registrations.splice(0, registrations.length, {
          target: registration.target ?? 'none',
          url: registration.url ?? 'none',
        })

        registration.onPress(new MouseEvent('click'))
        delegatedPressCount.value += 1

        const contextMenuEvent = new MouseEvent('contextmenu', {
          bubbles: true,
          cancelable: true,
        })

        registration.onContextMenu(contextMenuEvent)
        delegatedContextMenuCount.value += contextMenuEvent.defaultPrevented ? 1 : 0
      },
    }

    provideCometContainerPressableContext(contextValue)

    const latestRegistration = computed(() => registrations[0] ?? null)

    return {
      delegatedContextMenuCount,
      delegatedPressCount,
      latestRegistration,
    }
  },
})

/**
 * Behavior: Shows the button branch where `CometPressable` renders a button-backed surface with overlay feedback and inline pressed scaling.
 * Benefit: Makes the default semantic path easy to recognize before comparing it with link and context-driven branches.
 * Use when: You need a rich clickable surface that behaves like a button but exposes slot state for custom visuals.
 */
export const ButtonSurface: Story = {
  render: () => ({
    components: { CometPressable },
    template: `
      <div style="${cardWrap}">
        <CometPressable
          display="block"
          :pressedStyleValue="{ scale: 0.98 }"
          :overlayRadius="18"
          :xstyle="{ position: 'relative', borderRadius: '18px', background: '#ffffff', border: '1px solid #cbd5e1', padding: '18px' }"
        >
          <template #default="{ pressed, hovered, focusVisible }">
            <div :style="{ color: '#0f172a', opacity: pressed ? 0.72 : hovered || focusVisible ? 0.86 : 1, transition: 'opacity 120ms ease' }">
              Button-backed pressable surface
            </div>
          </template>
        </CometPressable>
      </div>
    `,
  }),
}

/**
 * Behavior: Shows the link branch where `linkProps` routes `CometPressable` through the link-backed path while keeping the same slot-state contract.
 * Benefit: Clarifies that the component can preserve the same visual shell while changing only the underlying semantic/navigation behavior.
 * Use when: You want card-like or row-like navigation surfaces that should behave as links instead of buttons.
 */
export const LinkSurface: Story = {
  render: () => ({
    components: { CometPressable },
    template: `
      <div style="${cardWrap}">
        <CometPressable
          display="block"
          :linkProps="{ url: '/settings' }"
          :overlayRadius="18"
          :xstyle="{ position: 'relative', borderRadius: '18px', background: '#ffffff', border: '1px solid #cbd5e1', padding: '18px', textDecoration: 'none' }"
        >
          <template #default="{ hovered, focusVisible }">
            <div :style="{ color: hovered || focusVisible ? '#1d4ed8' : '#0f172a', transition: 'color 120ms ease' }">
              Link-backed pressable surface
            </div>
          </template>
        </CometPressable>
      </div>
    `,
  }),
}

/**
 * Behavior: Shows the slot state contract for hover, press, focus, and focus-visible rendering inside a custom block surface.
 * Benefit: Helps consumers understand how much styling control `CometPressable` exposes without reimplementing the interaction plumbing.
 * Use when: You want to build a branded or application-specific surface that reacts directly to the pressable slot state.
 */
export const SlotStateSurface: Story = {
  render: () => ({
    components: { CometPressable },
    template: `
      <div style="${cardWrap}">
        <CometPressable
          display="block"
          :overlayRadius="18"
          :xstyle="{ position: 'relative', borderRadius: '18px', background: '#ffffff', border: '1px solid #cbd5e1', padding: '18px' }"
        >
          <template #default="{ pressed, hovered, focused, focusVisible }">
            <div
              :style="{
                borderRadius: '14px',
                padding: '16px',
                background: pressed ? '#dbeafe' : hovered ? '#eff6ff' : focused || focusVisible ? '#f8fafc' : '#ffffff',
                border: focusVisible ? '2px solid #2563eb' : '1px solid #cbd5e1',
                transition: 'all 120ms ease'
              }"
            >
              <div style="font-size:14px; font-weight:700; color:#0f172a;">Slot state demo</div>
              <div style="margin-top:8px; font-size:12px; color:#475569;">
                pressed={{ pressed }} hovered={{ hovered }} focused={{ focused }} focusVisible={{ focusVisible }}
              </div>
            </div>
          </template>
        </CometPressable>
      </div>
    `,
  }),
}

/**
 * Behavior: Shows `onPress` and deferred `onPressAction` sequencing through a compact log that records the order of each callback.
 * Benefit: Makes the least visible part of `CometPressable` observable without reading the source or stepping through the event flow.
 * Use when: You need to confirm that immediate press work and lower-priority async follow-up work happen in the expected order.
 */
export const AsyncPressAction: Story = {
  render: () => ({
    components: { CometPressable },
    setup() {
      const state = reactive({
        log: [] as string[],
      })

      const addLog = (entry: string): void => {
        state.log.unshift(entry)
      }

      const onPress = (): void => {
        addLog('onPress')
      }

      const onPressAction = async (): Promise<void> => {
        addLog('onPressAction:start')
        await Promise.resolve()
        addLog('onPressAction:end')
      }

      const latestLog = computed(() => state.log.slice(0, 4))

      return {
        latestLog,
        onPress,
        onPressAction,
      }
    },
    template: `
      <div style="${cardWrap}">
        <CometPressable
          display="block"
          :onPress="onPress"
          :onPressAction="onPressAction"
          :overlayRadius="18"
          :xstyle="{ position: 'relative', borderRadius: '18px', background: '#ffffff', border: '1px solid #cbd5e1', padding: '18px' }"
        >
          <template #default="{ pressed }">
            <div :style="{ color: '#0f172a', opacity: pressed ? 0.72 : 1, transition: 'opacity 120ms ease' }">
              Press to record the async action sequence
            </div>
          </template>
        </CometPressable>
        <div style="${statusPanel}">
          <div v-for="entry in latestLog" :key="entry" style="margin-top:4px;">{{ entry }}</div>
        </div>
      </div>
    `,
  }),
}

/**
 * Behavior: Shows the suppress-interactive branch where `CometPressable` downgrades itself to a plain visual wrapper inside a nested interactive tree.
 * Benefit: Makes the otherwise invisible semantic downgrade explicit and easier to compare against the normal button or link branches.
 * Use when: You are composing pressable content inside another interactive parent and need the inner surface to stay visual-only.
 */
export const SuppressedInteractiveElements: Story = {
  render: () => ({
    components: { BaseLink, CometPressable },
    setup() {
      provideCometDangerouslySuppressInteractiveElementsContext(true)

      return {}
    },
    template: `
      <div style="${surfaceWrap}">
        <BaseLink href="/outer" display="block" style="display:block; border-radius:20px; background:#ffffff; border:1px solid #cbd5e1; padding:20px; text-decoration:none;">
          <CometPressable
            display="block"
            :xstyle="{ position: 'relative', borderRadius: '14px', padding: '14px', background: '#eff6ff' }"
          >
            <div style="color:#0f172a;">Nested pressable becomes a plain div/span in suppress mode.</div>
          </CometPressable>
        </BaseLink>
      </div>
    `,
  }),
}

/**
 * Behavior: Shows disabled state being inherited from context rather than supplied directly on the component itself.
 * Benefit: Demonstrates that higher-level trees can disable whole interaction regions without repeating the same prop on every child.
 * Use when: You need to confirm that a disabled ancestor can shut down pressable behavior consistently across descendants.
 */
export const DisabledFromContext: Story = {
  render: () => ({
    components: { CometPressable },
    setup() {
      provideBaseDisabledContext(true)

      return {}
    },
    template: `
      <div style="${surfaceWrap}">
        <CometPressable
          display="block"
          :xstyle="{ position: 'relative', borderRadius: '18px', background: '#e2e8f0', padding: '18px', color: '#64748b' }"
        >
          <template #default="{ disabled }">
            Disabled inherited from context: {{ disabled }}
          </template>
        </CometPressable>
      </div>
    `,
  }),
}

/**
 * Behavior: Shows the container-target branch registering delegated press and context-menu behavior, plus the exposed target metadata, through a fake container provider.
 * Benefit: Makes one of the least visible integration paths inspectable without needing the full parent container implementation.
 * Use when: You are validating `CometPressable` inside a container-owned interaction model where the actionable child is registered separately.
 */
export const ContainerTargetRegistration: Story = {
  render: () => {
    const story = createContainerTargetStory()

    return {
      ...story,
      template: `
        <div style="${cardWrap}">
          <CometPressable
            display="block"
            :isContainerTarget="true"
            :preventContextMenu="true"
            :linkProps="{ url: '/profile', target: '_blank' }"
            :overlayRadius="18"
            :xstyle="{ position: 'relative', borderRadius: '18px', background: '#ffffff', border: '1px solid #cbd5e1', padding: '18px' }"
          >
            <template #default="{ hovered }">
              <div :style="{ color: hovered ? '#1d4ed8' : '#0f172a', transition: 'color 120ms ease' }">
                Container-target registration demo
              </div>
            </template>
          </CometPressable>
          <div style="${statusPanel}">
            url={{ latestRegistration?.url ?? 'none' }}<br />
            target={{ latestRegistration?.target ?? 'none' }}<br />
            delegatedPressCount={{ delegatedPressCount }}<br />
            preventedContextMenuCount={{ delegatedContextMenuCount }}
          </div>
        </div>
      `,
    }
  },
}

/**
 * Behavior: Shows a focus-visible case where overlay focus rendering is hidden so the root fallback focus ring becomes the visible focus treatment.
 * Benefit: Clarifies that `CometPressable` still surfaces accessible focus feedback even when the overlay path is intentionally turned off.
 * Use when: You need a custom focus treatment strategy that disables overlay focus visuals but still requires a visible focus ring.
 */
export const FocusRingFallback: Story = {
  render: () => ({
    components: { CometPressable },
    template: `
      <div style="${cardWrap}">
        <CometPressable
          display="block"
          :hideFocusOverlay="true"
          :testOnly_pressed="false"
          :xstyle="{ position: 'relative', borderRadius: '18px', background: '#ffffff', border: '1px solid #cbd5e1', padding: '18px' }"
        >
          <template #default="{ focusVisible, focused }">
            <div :style="{ color: '#0f172a' }">
              Focus the surface with Tab to see the root fallback focus ring.
              <div style="margin-top:8px; font-size:12px; color:#475569;">
                focused={{ focused }} focusVisible={{ focusVisible }}
              </div>
            </div>
          </template>
        </CometPressable>
      </div>
    `,
  }),
}
