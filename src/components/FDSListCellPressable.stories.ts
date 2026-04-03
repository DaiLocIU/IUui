import type { Meta, StoryObj } from '@storybook/vue3'
import { computed, defineComponent, h, ref, watchEffect } from 'vue'

import FDSListCellPressable from './FDSListCellPressable.vue'
import {
  provideCometCompositeStructureContext,
  provideCometFocusGroupContext,
} from '../system/listCellPressableKeys'

/**
 * ## FDSListCellPressable
 *
 * `FDSListCellPressable` composes the FDS list-cell layout shell with the
 * stricter FDS pressable wrapper so a row can participate in interactive lists
 * without rebuilding the content anatomy by hand.
 *
 * These stories cover the meaningful row states and the provider-driven
 * composite and focus-group behavior that is otherwise easy to miss in review.
 */
const meta: Meta<typeof FDSListCellPressable> = {
  title: 'Layout/FDSListCellPressable',
  component: FDSListCellPressable,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const surfaceWrap =
  'padding: 24px; background: #f8fafc; font: 14px/1.5 ui-sans-serif, system-ui;'
const cardWrap = 'padding: 24px; background: #e2e8f0;'
const statusPanel =
  'margin-top: 12px; border-radius: 12px; background: #ffffff; border: 1px solid #cbd5e1; padding: 12px; font-size: 12px; color: #475569;'

const createPrimaryRowSlots = () => ({
  default: () =>
    h('div', { style: 'min-width:0;' }, [
      h(
        'div',
        { style: 'font-size:14px; font-weight:700; color:#0f172a;' },
        'Design systems migration',
      ),
      h(
        'div',
        { style: 'margin-top:4px; font-size:13px; color:#64748b;' },
        'Shared row shell with FDS spacing, overlay behavior, and stricter disabled handling.',
      ),
    ]),
  addOnStart: () =>
    h(
      'div',
      {
        style:
          'display:flex; align-items:center; justify-content:center; width:40px; height:40px; border-radius:12px; background:#dbeafe; color:#1d4ed8; font-size:12px; font-weight:700;',
      },
      'UI',
    ),
  addOnBottom: () =>
    h('div', { style: 'display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;' }, [
      h(
        'span',
        {
          style:
            'display:inline-flex; align-items:center; height:24px; padding:0 10px; border-radius:999px; background:#dcfce7; color:#166534; font-size:11px; font-weight:700;',
        },
        'Stable',
      ),
      h(
        'span',
        {
          style:
            'display:inline-flex; align-items:center; height:24px; padding:0 10px; border-radius:999px; background:#eff6ff; color:#1d4ed8; font-size:11px; font-weight:700;',
        },
        '4 updates',
      ),
    ]),
  addOnEnd: () =>
    h(
      'div',
      { style: 'font-size:12px; font-weight:700; color:#475569; white-space:nowrap;' },
      '10:30 AM',
    ),
})

const createNestedRowSlots = () => ({
  default: () =>
    h('div', { style: 'min-width:0;' }, [
      h(
        'div',
        { style: 'font-size:14px; font-weight:700; color:#0f172a;' },
        'Nested review thread',
      ),
      h(
        'div',
        { style: 'margin-top:4px; font-size:13px; color:#64748b;' },
        'Indented row content keeps the same pressable shell while shifting the outer wrapper.',
      ),
    ]),
  addOnStart: () =>
    h(
      'div',
      {
        style:
          'display:flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:8px; background:#e2e8f0; color:#475569; font-size:12px; font-weight:700;',
      },
      '↳',
    ),
})

/**
 * Behavior: Shows the default interactive row where the FDS list-cell anatomy is wrapped in the FDS pressable shell without any selected or provider-driven overrides.
 * Benefit: Establishes the baseline interactive list-row behavior before comparing it with selection, disabled, and context-driven variants.
 * Use when: You need a general-purpose FDS row that should be fully pressable while preserving the standard list-cell slot anatomy.
 */
export const DefaultInteractiveRow: Story = {
  render: () =>
    defineComponent({
      name: 'FDSListCellPressableDefaultStory',
      setup() {
        return () =>
          h('div', { style: cardWrap }, [
            h(
              FDSListCellPressable,
              {
                contentPaddingHorizontal: 16,
                paddingHorizontal: 0,
                style: 'border-radius: 16px; background: #ffffff; border: 1px solid #cbd5e1;',
              },
              createPrimaryRowSlots(),
            ),
          ])
      },
    }),
}

/**
 * Behavior: Shows the selected branch where the row sets `aria-pressed`, takes over its own selected background, and disables the hover/press overlay.
 * Benefit: Makes the selected-state contract visible as both semantic and visual behavior instead of treating selection as a cosmetic variation.
 * Use when: You need a toggle-like or actively selected list row whose state should remain visually stable while still using the row pressable shell.
 */
export const SelectedRow: Story = {
  render: () =>
    defineComponent({
      name: 'FDSListCellPressableSelectedStory',
      setup() {
        return () =>
          h('div', { style: cardWrap }, [
            h(
              FDSListCellPressable,
              {
                selected: true,
                contentPaddingHorizontal: 16,
                style: 'border-radius: 16px; border: 1px solid #bfdbfe;',
              },
              createPrimaryRowSlots(),
            ),
          ])
      },
    }),
}

/**
 * Behavior: Shows the alternate selected wash background while keeping the same selected-state semantics and overlay suppression.
 * Benefit: Makes the `selectedBackground` variation easy to compare against the default selected treatment without changing the row anatomy.
 * Use when: You want a softer selected treatment that still behaves as the selected branch in the underlying pressable logic.
 */
export const SelectedWashBackground: Story = {
  render: () =>
    defineComponent({
      name: 'FDSListCellPressableSelectedWashStory',
      setup() {
        return () =>
          h('div', { style: cardWrap }, [
            h(
              FDSListCellPressable,
              {
                selected: true,
                selectedBackground: 'wash',
                contentPaddingHorizontal: 16,
                style: 'border-radius: 16px; border: 1px solid #d1d5db;',
              },
              createPrimaryRowSlots(),
            ),
          ])
      },
    }),
}

/**
 * Behavior: Shows the disabled row path where the FDS wrapper preserves the stricter disabled pressable contract and the row itself becomes non-interactive.
 * Benefit: Surfaces both the row-level disabled treatment and the underlying `aria-disabled` behavior without requiring source inspection.
 * Use when: You need to reserve a list-row action visually while making it fully unavailable to pointer and keyboard interaction.
 */
export const DisabledRow: Story = {
  render: () =>
    defineComponent({
      name: 'FDSListCellPressableDisabledStory',
      setup() {
        const rootRef = ref<HTMLElement | null>(null)
        const observedAriaDisabled = ref('not-mounted')

        watchEffect(() => {
          const element =
            rootRef.value?.querySelector('[aria-disabled]') ??
            rootRef.value?.querySelector('[data-testid="disabled-row"]')

          observedAriaDisabled.value = element?.getAttribute('aria-disabled') ?? 'none'
        })

        return () =>
          h('div', { ref: rootRef, style: surfaceWrap }, [
            h(
              FDSListCellPressable,
              {
                disabled: true,
                contentPaddingHorizontal: 16,
                'data-testid': 'disabled-row',
                style: 'border-radius: 16px; background: #e2e8f0; color: #64748b;',
              },
              createPrimaryRowSlots(),
            ),
            h('div', { style: statusPanel }, `aria-disabled=${observedAriaDisabled.value}`),
          ])
      },
    }),
}

/**
 * Behavior: Shows the link-backed branch where the same FDS row shell routes through link semantics instead of button semantics.
 * Benefit: Clarifies that the row layout can stay unchanged while only the underlying navigation behavior switches.
 * Use when: You want a list row that should navigate like a link but still look and slot-compose like an FDS list cell.
 */
export const LinkBackedRow: Story = {
  render: () =>
    defineComponent({
      name: 'FDSListCellPressableLinkStory',
      setup() {
        return () =>
          h('div', { style: cardWrap }, [
            h(
              FDSListCellPressable,
              {
                linkProps: { url: '/settings' },
                contentPaddingHorizontal: 16,
                style:
                  'border-radius: 16px; background: #ffffff; border: 1px solid #cbd5e1; text-decoration: none;',
              },
              createPrimaryRowSlots(),
            ),
          ])
      },
    }),
}

/**
 * Behavior: Shows nested spacing being applied on the outer column wrapper so indented rows keep the same inner list-cell spacing and pressable shell.
 * Benefit: Makes it clear that indentation is treated as outer row framing rather than inner content padding.
 * Use when: You are rendering tree-like or threaded rows that need visual depth without rebuilding the interactive row layout.
 */
export const NestedSpacingRow: Story = {
  render: () =>
    defineComponent({
      name: 'FDSListCellPressableNestedStory',
      setup() {
        return () =>
          h('div', { style: surfaceWrap }, [
            h(
              'div',
              {
                style:
                  'width: 520px; border-radius: 18px; border: 1px solid #e2e8f0; background: white; padding: 16px;',
              },
              [
                h(
                  FDSListCellPressable,
                  {
                    contentPaddingHorizontal: 16,
                    nestedSpacing: 28,
                    style: 'border-radius: 16px; background: #f8fafc;',
                  },
                  createNestedRowSlots(),
                ),
              ],
            ),
          ])
      },
    }),
}

/**
 * Behavior: Shows the row deriving its outer item role from the parent composite-structure provider while resetting that context for its inner cell content.
 * Benefit: Makes the otherwise invisible composite-role mapping contract observable without needing DevTools or source reading.
 * Use when: You are placing pressable rows inside menu, listbox, grid, or other composite structures that need item-level semantics.
 */
export const CompositeRoleMapping: Story = {
  render: () =>
    defineComponent({
      name: 'FDSListCellPressableCompositeRoleStory',
      setup() {
        provideCometCompositeStructureContext({ role: 'menu' })

        const rootRef = ref<HTMLElement | null>(null)
        const observedRole = ref('not-mounted')

        watchEffect(() => {
          const element = rootRef.value?.querySelector('[role]')
          observedRole.value = element?.getAttribute('role') ?? 'none'
        })

        return () =>
          h('div', { ref: rootRef, style: surfaceWrap }, [
            h(
              FDSListCellPressable,
              {
                contentPaddingHorizontal: 16,
                style: 'border-radius: 16px; background: #ffffff; border: 1px solid #cbd5e1;',
              },
              createPrimaryRowSlots(),
            ),
            h('div', { style: statusPanel }, `resolved outer role=${observedRole.value}`),
          ])
      },
    }),
}

/**
 * Behavior: Shows the optional focus-group wrapper path by providing a lightweight `FocusItem` component around the row.
 * Benefit: Makes the provider-driven roving-focus integration visible without needing the rest of the focus-group system in Storybook.
 * Use when: You need the row to participate in a parent-managed focus group while keeping the same list-cell and pressable composition.
 */
export const FocusGroupWrapper: Story = {
  render: () =>
    defineComponent({
      name: 'FDSListCellPressableFocusGroupStory',
      setup() {
        const FocusItem = defineComponent({
          name: 'StoryFocusItem',
          setup(_, { slots }) {
            return () =>
              h(
                'div',
                {
                  'data-focus-item': 'true',
                  style:
                    'border-radius: 18px; outline: 1px dashed #6366f1; outline-offset: 4px;',
                },
                slots.default?.(),
              )
          },
        })

        provideCometFocusGroupContext({
          FocusItem,
        })

        const rootRef = ref<HTMLElement | null>(null)
        const hasFocusWrapper = computed(() =>
          rootRef.value?.querySelector('[data-focus-item="true"]') != null ? 'true' : 'false',
        )

        return () =>
          h('div', { ref: rootRef, style: surfaceWrap }, [
            h(
              FDSListCellPressable,
              {
                contentPaddingHorizontal: 16,
                style: 'border-radius: 16px; background: #ffffff; border: 1px solid #cbd5e1;',
              },
              createPrimaryRowSlots(),
            ),
            h('div', { style: statusPanel }, `focus wrapper mounted=${hasFocusWrapper.value}`),
          ])
      },
    }),
}
