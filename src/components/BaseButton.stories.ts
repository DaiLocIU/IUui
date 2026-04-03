import type { Meta, StoryObj } from '@storybook/vue3'
import { computed, reactive, ref, watchEffect } from 'vue'

import BaseButton from './BaseButton.vue'
import { provideBaseButtonPopoverContext } from '../system/cometPressableKeys'

/**
 * ## BaseButton
 *
 * `BaseButton` is the semantic button policy layer that selects the inline
 * text branch or block pressable branch while normalizing accessibility props,
 * slot state, and popover-context defaults.
 *
 * These stories are organized as a broader matrix so the semantic defaults,
 * alternate-role handling, inherited popover metadata, and slot-state contract
 * can all be inspected in isolation.
 */
const meta: Meta<typeof BaseButton> = {
  title: 'Primitives/BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const surfaceWrap =
  'padding: 24px; background: #f8fafc; font: 14px/1.5 ui-sans-serif, system-ui;'
const cardWrap = 'padding: 24px; background: #e2e8f0;'
const statusPanel =
  'margin-top: 12px; border-radius: 12px; background: #ffffff; border: 1px solid #cbd5e1; padding: 12px; font-size: 12px; color: #475569;'

const createObservedRoleStory = (
  acceptedRole: string,
  fallbackRole: string,
) => ({
  components: { BaseButton },
  setup() {
    const acceptedRoot = ref<HTMLElement | null>(null)
    const fallbackRoot = ref<HTMLElement | null>(null)
    const acceptedObservedRole = ref('not-mounted')
    const fallbackObservedRole = ref('not-mounted')

    watchEffect(() => {
      const acceptedElement = acceptedRoot.value?.querySelector('[role]')
      const fallbackElement = fallbackRoot.value?.querySelector('[role]')

      acceptedObservedRole.value = acceptedElement?.getAttribute('role') ?? 'none'
      fallbackObservedRole.value = fallbackElement?.getAttribute('role') ?? 'none'
    })

    return {
      acceptedObservedRole,
      acceptedRole,
      acceptedRoot,
      fallbackObservedRole,
      fallbackRole,
      fallbackRoot,
    }
  },
})

/**
 * Behavior: Shows the inline branch where `BaseButton` renders through the text-oriented pressable path with default button semantics.
 * Benefit: Makes the lightest-weight button path easy to recognize before comparing it with the block branch and context-driven cases.
 * Use when: You need button semantics on text-like content without promoting the surface into a larger block layout.
 */
export const InlineDefaultButton: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div style="${surfaceWrap}">
        <p style="color:#334155; margin:0;">
          <BaseButton label="Inline action">
            <template #default="{ hovered, focusVisible }">
              <span :style="{ color: hovered || focusVisible ? '#1d4ed8' : '#0f172a', textDecoration: 'underline' }">
                Inline button branch
              </span>
            </template>
          </BaseButton>
        </p>
      </div>
    `,
  }),
}

/**
 * Behavior: Shows the block branch where `BaseButton` routes into the larger surface-style pressable path.
 * Benefit: Clarifies how the same component can back card-like surfaces while still preserving button semantics and slot-state styling.
 * Use when: You want a larger tappable or clickable surface that should still behave as a button.
 */
export const BlockSurfaceButton: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div style="${cardWrap}">
        <BaseButton
          display="block"
          style="display:block; width:320px; border-radius:18px; padding:18px; background:white; border:1px solid #cbd5e1;"
        >
          <template #default="{ pressed, hovered }">
            <div :style="{ color: '#0f172a', opacity: pressed ? 0.72 : hovered ? 0.86 : 1 }">
              Block surface button
            </div>
          </template>
        </BaseButton>
      </div>
    `,
  }),
}

/**
 * Behavior: Shows the slot state contract for hover, press, focus, and focus-visible rendering inside a block button surface.
 * Benefit: Helps consumers style `BaseButton` interactively without reimplementing lower-level pressability behavior themselves.
 * Use when: You want to build a custom button surface that responds directly to the slot state emitted by `BaseButton`.
 */
export const RenderStateSlot: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div style="${cardWrap}">
        <BaseButton
          display="block"
          style="display:block; width:320px; border-radius:18px; padding:18px; background:white; border:1px solid #cbd5e1;"
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
        </BaseButton>
      </div>
    `,
  }),
}

/**
 * Behavior: Shows a disabled `BaseButton` surface that still renders slot content while no longer participating as an active press target.
 * Benefit: Makes it easy to verify the disabled-state contract visually without needing to inspect emitted events.
 * Use when: You need a reserved button affordance that should remain visible but temporarily unavailable.
 */
export const DisabledButton: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div style="${surfaceWrap}">
        <BaseButton
          display="block"
          :disabled="true"
          style="display:block; width:320px; border-radius:18px; padding:18px; background:#e2e8f0; color:#64748b;"
        >
          <template #default="{ disabled }">
            Disabled button surface: {{ disabled }}
          </template>
        </BaseButton>
      </div>
    `,
  }),
}

/**
 * Behavior: Shows `aria-haspopup` and `aria-expanded` being inherited from the popover context when the component does not receive those props directly.
 * Benefit: Demonstrates how shared menu or popover state can be coordinated from higher in the tree with less prop repetition.
 * Use when: You are placing `BaseButton` inside a popover-trigger system and want that metadata to be supplied by context.
 */
export const PopoverContextInheritance: Story = {
  render: () => ({
    components: { BaseButton },
    setup() {
      provideBaseButtonPopoverContext({
        expanded: true,
        haspopup: 'menu',
      })

      const rootRef = ref<HTMLElement | null>(null)
      const observedExpanded = ref('not-mounted')
      const observedHasPopup = ref('not-mounted')

      watchEffect(() => {
        const element = rootRef.value?.querySelector('[aria-haspopup]')

        observedExpanded.value = element?.getAttribute('aria-expanded') ?? 'none'
        observedHasPopup.value = element?.getAttribute('aria-haspopup') ?? 'none'
      })

      return {
        observedExpanded,
        observedHasPopup,
        rootRef,
      }
    },
    template: `
      <div ref="rootRef" style="${cardWrap}">
        <BaseButton
          display="block"
          style="display:block; width:320px; border-radius:18px; padding:18px; background:white; border:1px solid #cbd5e1;"
        >
          <template #default="{ hovered }">
            <div :style="{ color: hovered ? '#1d4ed8' : '#0f172a' }">
              Popover-trigger button
            </div>
          </template>
        </BaseButton>
        <div style="${statusPanel}">
          aria-haspopup={{ observedHasPopup }}<br />
          aria-expanded={{ observedExpanded }}
        </div>
      </div>
    `,
  }),
}

/**
 * Behavior: Shows one accepted alternate role and one unsupported role falling back to the default button role through a compact inspection panel.
 * Benefit: Makes the role-normalization policy explicit without requiring DevTools or source-code reading.
 * Use when: You want to confirm whether a specialized button role is preserved or normalized back to standard button semantics.
 */
export const RoleFallbackMatrix: Story = {
  render: () => {
    const story = createObservedRoleStory('menuitem', 'article')

    return {
      ...story,
      template: `
        <div style="${cardWrap}">
          <div style="display:grid; gap:16px;">
            <div ref="acceptedRoot">
              <BaseButton
                :role="acceptedRole"
                display="block"
                style="display:block; width:320px; border-radius:18px; padding:18px; background:white; border:1px solid #cbd5e1;"
              >
                Accepted alternate role
              </BaseButton>
            </div>
            <div ref="fallbackRoot">
              <BaseButton
                :role="fallbackRole"
                display="block"
                style="display:block; width:320px; border-radius:18px; padding:18px; background:white; border:1px solid #cbd5e1;"
              >
                Unsupported role falls back
              </BaseButton>
            </div>
          </div>
          <div style="${statusPanel}">
            acceptedRoleInput={{ acceptedRole }} → renderedRole={{ acceptedObservedRole }}<br />
            fallbackRoleInput={{ fallbackRole }} → renderedRole={{ fallbackObservedRole }}
          </div>
        </div>
      `,
    }
  },
}
