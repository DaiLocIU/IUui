import type { Meta, StoryObj } from '@storybook/vue3'

import FDSListCell from './FDSListCell.vue'

const meta: Meta<typeof FDSListCell> = {
  title: 'Layout/FDSListCell',
  component: FDSListCell,
  tags: ['autodocs'],
  argTypes: {
    addOnBottomResponsive: {
      control: 'boolean',
    },
    hasBottomDivider: {
      control: 'boolean',
    },
    level: {
      control: 'number',
    },
    verticalAlign: {
      control: 'radio',
      options: ['top', 'center', 'bottom', 'stretch'],
    },
  },
  args: {
    addOnBottomResponsive: true,
    hasBottomDivider: false,
    level: 3,
    verticalAlign: 'center',
  },
}

export default meta
type Story = StoryObj<typeof meta>

/** FDSListCell wraps the base row shell with FDS spacing defaults and slot-friendly composition. */
export const Default: Story = {
  render: (args) => ({
    components: {
      FDSListCell,
    },
    setup: () => ({ args }),
    template: `
      <div style="width: 460px; padding: 24px; border-radius: 18px; border: 1px solid #e2e8f0; background: white;">
        <FDSListCell
          v-bind="args"
          :content-padding-horizontal="16"
          :padding-vertical="8"
          :spacing-horizontal="8"
          :spacing-vertical="8"
          style="border-radius: 16px; background: #f8fafc;"
        >
          <template #addOnStart>
            <div style="display:flex; align-items:center; justify-content:center; width:40px; height:40px; border-radius:12px; background:#dbeafe; color:#1d4ed8; font-size:12px; font-weight:700;">
              UI
            </div>
          </template>

          <div style="min-width:0;">
            <div style="font-size:14px; font-weight:700; color:#0f172a;">
              Design Systems
            </div>
            <div style="margin-top:4px; font-size:13px; color:#64748b;">
              Shared primitives, migration progress, and pending visual reviews.
            </div>
          </div>

          <template #addOnBottom>
            <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
              <span style="display:inline-flex; align-items:center; height:24px; padding:0 10px; border-radius:999px; background:#dcfce7; color:#166534; font-size:11px; font-weight:700;">
                Stable
              </span>
              <span style="display:inline-flex; align-items:center; height:24px; padding:0 10px; border-radius:999px; background:#eff6ff; color:#1d4ed8; font-size:11px; font-weight:700;">
                4 updates
              </span>
            </div>
          </template>

          <template #addOnEnd>
            <button
              type="button"
              style="border:0; background:#0f172a; color:white; border-radius:999px; padding:8px 12px; font-size:12px; font-weight:700; cursor:pointer;"
            >
              Open
            </button>
          </template>
        </FDSListCell>
      </div>
    `,
  }),
}

/** This anatomy story maps each supported slot so the wrapper structure is obvious at a glance. */
export const Anatomy: Story = {
  render: () => ({
    components: {
      FDSListCell,
    },
    template: `
      <div style="width: 560px; padding: 24px; border-radius: 18px; border: 1px solid #e2e8f0; background: white;">
        <FDSListCell
          :content-padding-horizontal="16"
          :padding-vertical="10"
          :spacing-horizontal="8"
          :spacing-vertical="8"
          :has-bottom-divider="true"
          style="border-radius: 16px; background: #f8fafc; border: 1px dashed #cbd5e1;"
        >
          <template #addOnStart>
            <div style="min-width:96px; padding:10px 12px; border-radius:12px; background:#dbeafe; color:#1e3a8a; font-size:12px; font-weight:700; text-align:center;">
              addOnStart
            </div>
          </template>

          <div style="min-width:0; padding:10px 12px; border-radius:12px; background:#e2e8f0; color:#0f172a; font-size:12px; font-weight:700;">
            default slot content
          </div>

          <template #addOnBottom>
            <div style="margin-top:10px; padding:10px 12px; border-radius:12px; background:#d1fae5; color:#065f46; font-size:12px; font-weight:700;">
              addOnBottom
            </div>
          </template>

          <template #addOnEnd>
            <div style="min-width:96px; padding:10px 12px; border-radius:12px; background:#fef3c7; color:#92400e; font-size:12px; font-weight:700; text-align:center;">
              addOnEnd
            </div>
          </template>

          <template #addOnFooter>
            <div style="padding:12px 16px 0; border-top:1px solid #e2e8f0; background:white; color:#5b21b6; font-size:12px; font-weight:700;">
              addOnFooter
            </div>
          </template>
        </FDSListCell>
      </div>
    `,
  }),
}

/** Bottom metadata shows the common FDS pattern where structured status lives under the main text block. */
export const WithBottomMeta: Story = {
  render: (args) => ({
    components: {
      FDSListCell,
    },
    setup: () => ({ args }),
    template: `
      <div style="width: 460px; padding: 24px; border-radius: 18px; border: 1px solid #e2e8f0; background: white;">
        <FDSListCell
          v-bind="args"
          :content-padding-horizontal="16"
          :padding-vertical="8"
          :spacing-horizontal="8"
          :spacing-vertical="8"
          :add-on-bottom-responsive="true"
          style="border-radius: 16px; background: white;"
        >
          <template #addOnStart>
            <div style="display:flex; align-items:center; justify-content:center; width:40px; height:40px; border-radius:12px; background:#0f172a; color:white; font-size:13px; font-weight:700;">
              8
            </div>
          </template>

          <div style="min-width:0;">
            <div style="font-size:14px; font-weight:700; color:#0f172a;">
              Sprint planning
            </div>
            <div style="margin-top:4px; font-size:13px; color:#64748b;">
              Finalize migration blockers and assign review owners.
            </div>
          </div>

          <template #addOnBottom>
            <div style="margin-top:8px; display:flex; gap:8px; flex-wrap:wrap;">
              <span style="display:inline-flex; align-items:center; height:24px; padding:0 10px; border-radius:999px; background:#dcfce7; color:#166534; font-size:11px; font-weight:700;">
                In Progress
              </span>
              <span style="display:inline-flex; align-items:center; height:24px; padding:0 10px; border-radius:999px; background:#eff6ff; color:#1d4ed8; font-size:11px; font-weight:700;">
                3 blockers
              </span>
            </div>
          </template>

          <template #addOnEnd>
            <div style="font-size:12px; font-weight:700; color:#64748b; white-space:nowrap;">
              10:30 AM
            </div>
          </template>
        </FDSListCell>
      </div>
    `,
  }),
}

/** Nested spacing and top alignment make the wrapper fit indented tree-like rows without rebuilding the shell. */
export const NestedSpacingAndAlignment: Story = {
  render: () => ({
    components: {
      FDSListCell,
    },
    template: `
      <div style="width: 480px; padding: 24px; border-radius: 18px; border: 1px solid #e2e8f0; background: white;">
        <FDSListCell
          :content-padding-horizontal="16"
          :padding-vertical="8"
          :spacing-horizontal="8"
          :nested-spacing="28"
          vertical-align="top"
          add-on-start-vertical-align="top"
          add-on-end-vertical-align="top"
          style="border-radius: 16px; background: #f8fafc;"
        >
          <template #addOnStart>
            <div style="display:flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:8px; background:#e2e8f0; color:#475569; font-size:12px; font-weight:700;">
              ↳
            </div>
          </template>

          <div style="min-width:0;">
            <div style="font-size:14px; font-weight:700; color:#0f172a;">
              Nested child row
            </div>
            <div style="margin-top:4px; font-size:13px; line-height:1.45; color:#64748b;">
              The left spacer creates indentation while top alignment keeps multi-line content visually anchored with the leading add-on.
            </div>
          </div>

          <template #addOnEnd>
            <div style="font-size:12px; color:#64748b; white-space:nowrap;">
              Child
            </div>
          </template>
        </FDSListCell>
      </div>
    `,
  }),
}

/** MinimalRow shows the default shell with only core content and FDS padding, without any optional slot regions. */
export const MinimalRow: Story = {
  render: () => ({
    components: {
      FDSListCell,
    },
    template: `
      <div style="width: 420px; padding: 24px; border-radius: 18px; border: 1px solid #e2e8f0; background: white;">
        <FDSListCell
          :content-padding-horizontal="16"
          :padding-vertical="8"
          style="border-radius: 16px; background: #f8fafc;"
        >
          <div style="min-width:0;">
            <div style="font-size:14px; font-weight:700; color:#0f172a;">
              Minimal FDS row
            </div>
            <div style="margin-top:4px; font-size:13px; color:#64748b;">
              Default slot content only, using the wrapper’s baseline spacing and height behavior.
            </div>
          </div>
        </FDSListCell>
      </div>
    `,
  }),
}

/** SpacingShowcase isolates the FDS spacing props so changes to padding and rhythm are visually obvious. */
export const SpacingShowcase: Story = {
  render: () => ({
    components: {
      FDSListCell,
    },
    template: `
      <div style="width: 520px; padding: 24px; border-radius: 18px; border: 1px solid #e2e8f0; background: white; display:grid; gap:16px;">
        <FDSListCell
          :content-padding-horizontal="12"
          :padding-vertical="6"
          :spacing-horizontal="4"
          :spacing-vertical="4"
          style="border-radius: 16px; background: #f8fafc;"
        >
          <template #addOnStart>
            <div style="width:36px; height:36px; border-radius:10px; background:#dbeafe; display:flex; align-items:center; justify-content:center; color:#1d4ed8; font-size:11px; font-weight:700;">
              S
            </div>
          </template>

          <div style="min-width:0;">
            <div style="font-size:14px; font-weight:700; color:#0f172a;">Compact spacing</div>
            <div style="margin-top:4px; font-size:13px; color:#64748b;">Tighter padding and smaller inter-region spacing.</div>
          </div>
        </FDSListCell>

        <FDSListCell
          :content-padding-horizontal="24"
          :padding-vertical="14"
          :spacing-horizontal="12"
          :spacing-vertical="12"
          style="border-radius: 16px; background: #eff6ff;"
        >
          <template #addOnStart>
            <div style="width:36px; height:36px; border-radius:10px; background:#1d4ed8; display:flex; align-items:center; justify-content:center; color:white; font-size:11px; font-weight:700;">
              L
            </div>
          </template>

          <div style="min-width:0;">
            <div style="font-size:14px; font-weight:700; color:#0f172a;">Expanded spacing</div>
            <div style="margin-top:4px; font-size:13px; color:#475569;">Larger padding and more generous rhythm between the wrapper regions.</div>
          </div>

          <template #addOnEnd>
            <div style="font-size:12px; font-weight:700; color:#1d4ed8;">12px gap</div>
          </template>
        </FDSListCell>
      </div>
    `,
  }),
}

/** Divider and footer remain wrapper-level additions outside the core row structure. */
export const WithFooterDivider: Story = {
  render: () => ({
    components: {
      FDSListCell,
    },
    template: `
      <div style="width: 460px; padding: 24px; border-radius: 18px; border: 1px solid #e2e8f0; background: white;">
        <FDSListCell
          :content-padding-horizontal="16"
          :padding-vertical="8"
          :has-bottom-divider="true"
          style="border-radius: 16px; background: white;"
        >
          <template #addOnStart>
            <div style="display:flex; align-items:center; justify-content:center; width:40px; height:40px; border-radius:999px; background:#fee2e2; color:#b91c1c; font-size:12px; font-weight:700;">
              !
            </div>
          </template>

          <div style="min-width:0;">
            <div style="font-size:14px; font-weight:700; color:#0f172a;">
              Security review required
            </div>
            <div style="margin-top:4px; font-size:13px; color:#64748b;">
              The package introduces a new external dependency and needs sign-off before release.
            </div>
          </div>

          <template #addOnFooter>
            <div style="padding: 12px 16px 0; font-size: 12px; color:#475569;">
              Owner: Platform Security
            </div>
          </template>
        </FDSListCell>
      </div>
    `,
  }),
}
