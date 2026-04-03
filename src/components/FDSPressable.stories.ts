import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, watchEffect } from 'vue'

import FDSPressable from './FDSPressable.vue'

/**
 * ## FDSPressable
 *
 * `FDSPressable` is the FDS-flavored wrapper around `CometPressable` that
 * keeps the same interaction surface while applying a stricter disabled
 * contract for design-system consumers.
 *
 * These stories focus on the wrapper-specific behavior so you can compare the
 * normal pass-through path against the stricter disabled branch without
 * rereading the source.
 */
const meta: Meta<typeof FDSPressable> = {
  title: 'Primitives/FDSPressable',
  component: FDSPressable,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const surfaceWrap =
  'padding: 24px; background: #f8fafc; font: 14px/1.5 ui-sans-serif, system-ui;'
const cardWrap = 'padding: 24px; background: #e2e8f0;'
const statusPanel =
  'margin-top: 12px; border-radius: 12px; background: #ffffff; border: 1px solid #cbd5e1; padding: 12px; font-size: 12px; color: #475569;'

const createObservedDisabledStory = () => ({
  components: { FDSPressable },
  setup() {
    const rootRef = ref<HTMLElement | null>(null)
    const observedAriaDisabled = ref('not-mounted')

    watchEffect(() => {
      const element = rootRef.value?.firstElementChild

      observedAriaDisabled.value =
        element?.getAttribute('aria-disabled') ?? 'none'
    })

    return {
      observedAriaDisabled,
      rootRef,
    }
  },
})

/**
 * Behavior: Shows the normal enabled branch where `FDSPressable` behaves like a direct FDS wrapper over `CometPressable`.
 * Benefit: Establishes the baseline path before comparing it with the stricter disabled behavior that makes this wrapper distinct.
 * Use when: You want an FDS-named primitive that keeps the normal Comet pressable behavior while fitting the design-system surface.
 */
export const DefaultSurface: Story = {
  render: () => ({
    components: { FDSPressable },
    template: `
      <div style="${cardWrap}">
        <FDSPressable
          display="block"
          :overlayRadius="18"
          :xstyle="{ position: 'relative', borderRadius: '18px', background: '#ffffff', border: '1px solid #cbd5e1', padding: '18px' }"
        >
          <template #default="{ pressed, hovered, focusVisible }">
            <div :style="{ color: '#0f172a', opacity: pressed ? 0.72 : hovered || focusVisible ? 0.86 : 1, transition: 'opacity 120ms ease' }">
              Default FDS pressable surface
            </div>
          </template>
        </FDSPressable>
      </div>
    `,
  }),
}

/**
 * Behavior: Shows the stricter disabled branch where interaction callbacks are stripped, `aria-disabled` is forced, and the cursor becomes non-interactive.
 * Benefit: Makes the one FDS-specific policy difference from `CometPressable` directly observable instead of leaving it implicit in the wrapper.
 * Use when: You need a design-system pressable that enforces a stricter disabled contract than the generic Comet primitive.
 */
export const DisabledStrictBranch: Story = {
  render: () => {
    const story = createObservedDisabledStory()

    return {
      ...story,
      template: `
        <div ref="rootRef" style="${surfaceWrap}">
          <FDSPressable
            display="block"
            :disabled="true"
            :xstyle="{ position: 'relative', borderRadius: '18px', background: '#e2e8f0', padding: '18px', color: '#64748b' }"
          >
            <template #default="{ disabled }">
              Disabled strict branch: {{ disabled }}
            </template>
          </FDSPressable>
          <div style="${statusPanel}">
            aria-disabled={{ observedAriaDisabled }}
          </div>
        </div>
      `
    }
  },
}

/**
 * Behavior: Shows that the enabled wrapper still passes the slot-state contract through unchanged for hover, press, focus, and focus-visible styling.
 * Benefit: Confirms that adopting the FDS wrapper does not cost consumers the custom styling flexibility already available in `CometPressable`.
 * Use when: You want to build a branded FDS surface that reacts directly to the slot state from the underlying pressable system.
 */
export const SlotStateSurface: Story = {
  render: () => ({
    components: { FDSPressable },
    template: `
      <div style="${cardWrap}">
        <FDSPressable
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
              <div style="font-size:14px; font-weight:700; color:#0f172a;">FDS slot state demo</div>
              <div style="margin-top:8px; font-size:12px; color:#475569;">
                pressed={{ pressed }} hovered={{ hovered }} focused={{ focused }} focusVisible={{ focusVisible }}
              </div>
            </div>
          </template>
        </FDSPressable>
      </div>
    `,
  }),
}

/**
 * Behavior: Shows that `FDSPressable` still supports `linkProps` and uses the same link-backed semantic path while it remains enabled.
 * Benefit: Demonstrates that the wrapper changes disabled policy without removing the generic link capability of the underlying pressable shell.
 * Use when: You want a navigation surface in FDS code that should behave like a link until it becomes disabled.
 */
export const LinkSurface: Story = {
  render: () => ({
    components: { FDSPressable },
    template: `
      <div style="${cardWrap}">
        <FDSPressable
          display="block"
          :linkProps="{ url: '/settings' }"
          :overlayRadius="18"
          :xstyle="{ position: 'relative', borderRadius: '18px', background: '#ffffff', border: '1px solid #cbd5e1', padding: '18px', textDecoration: 'none' }"
        >
          <template #default="{ hovered, focusVisible }">
            <div :style="{ color: hovered || focusVisible ? '#1d4ed8' : '#0f172a', transition: 'color 120ms ease' }">
              Link-backed FDS surface
            </div>
          </template>
        </FDSPressable>
      </div>
    `,
  }),
}

/**
 * Behavior: Shows a disabled link-like surface becoming ARIA-disabled and visually non-interactive under the stricter FDS disabled branch.
 * Benefit: Clarifies that the disabled policy applies even when the enabled version of the same component would have taken the link-backed path.
 * Use when: You want to confirm that link-shaped FDS surfaces stop behaving like navigation targets as soon as they become disabled.
 */
export const DisabledLinkLikeSurface: Story = {
  render: () => ({
    components: { FDSPressable },
    template: `
      <div style="${surfaceWrap}">
        <FDSPressable
          display="block"
          :disabled="true"
          :linkProps="{ url: '/settings' }"
          :xstyle="{ position: 'relative', borderRadius: '18px', background: '#e2e8f0', padding: '18px', color: '#64748b', textDecoration: 'none' }"
        >
          <template #default="{ disabled }">
            Disabled link-like FDS surface: {{ disabled }}
          </template>
        </FDSPressable>
      </div>
    `,
  }),
}
