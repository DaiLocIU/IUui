import type { Meta, StoryObj } from '@storybook/vue3'

import BaseListCell from './BaseListCell.vue'
import BaseImage from './BaseImage.vue'
import CometDensityModeStateProvider from './CometDensityModeStateProvider.vue'
import FDSTextPairing from './FDSTextPairing.vue'

const meta: Meta<typeof BaseListCell> = {
  title: 'Layout/IUListCell',
  component: BaseListCell,
  tags: ['autodocs'],
  argTypes: {
    nestedSpacing: {
      control: 'number',
    },
    role: {
      control: 'text',
    },
    tabIndex: {
      control: 'number',
    },
    addOnBottomResponsive: {
      control: 'boolean',
    },
    verticalAlign: {
      control: 'radio',
      options: ['top', 'center', 'bottom', 'stretch'],
    },
    contentVerticalAlign: {
      control: 'radio',
      options: ['top', 'center'],
    },
  },
  args: {
    nestedSpacing: undefined,
    role: undefined,
    tabIndex: 0,
    addOnBottomResponsive: false,
    verticalAlign: 'center',
    contentVerticalAlign: 'center',
  },
}

export default meta
type Story = StoryObj<typeof meta>

const metaAiVariant = {
  addOnBottomResponsive: false,
  addOnStartVerticalAlign: 'center' as const,
  verticalAlign: 'center' as const,
  xstyleConfig: {
    addOnBottom: 'pt-[6px] pe-[6px] pb-[6px] ps-[6px]',
    addOnEnd: 'pt-[6px] pe-[6px] pb-[6px] ps-[6px]',
    addOnStart: 'pt-[6px] pe-[6px] pb-[6px] ps-[6px]',
    content: 'pt-[6px] pe-[6px] pb-[6px] ps-[6px]',
    root: [
      'mt-[-6px] mb-[-6px] [margin-inline-start:-6px] [margin-inline-end:-6px] min-h-[56px]',
      '[padding-inline:var(--x-paddingInline)]',
      '[padding-block:var(--x-paddingBlock)]',
      '[row-gap:var(--x-rowGap)]',
      {
        '--x-paddingInline': '8px',
        '--x-paddingBlock': '8px',
        '--x-rowGap': '8px',
      },
    ],
  },
}

/** IUListCell is a layout primitive for composing structured list rows from named slots. */
export const Default: Story = {
  render: (args) => ({
    components: {
      IUListCell: BaseListCell,
    },
    setup: () => ({ args }),
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <IUListCell v-bind="args" class="rounded-[16px] px-4 py-3 transition-colors hover:bg-slate-50">
          <template #addOnStart>
            <div style="width: 44px; height: 44px; border-radius: 999px; background: linear-gradient(135deg, #dbeafe, #bfdbfe); display:flex; align-items:center; justify-content:center; color:#1d4ed8; font-size:14px; font-weight:700;">
              DS
            </div>
          </template>

          <div style="min-width:0;">
            <div style="font-size:14px; font-weight:700; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              Design System Team
            </div>
            <div style="margin-top:4px; font-size:13px; color:#64748b;">
              Shared primitives, token rollout, and component migration updates.
            </div>
          </div>

          <template #addOnEnd>
            <button
              type="button"
              style="border:0; background:#eff6ff; color:#1d4ed8; padding:8px 12px; border-radius:999px; font-size:12px; font-weight:700; cursor:pointer;"
            >
              Open
            </button>
          </template>
        </IUListCell>
      </div>
    `,
  }),
}

/** This example mirrors a Meta-style list cell variant using the raw Stylex-shaped payload resolved by BaseListCell. */
export const MetaAIVariant: Story = {
  render: () => ({
    components: {
      IUListCell: BaseListCell,
      IUImage: BaseImage,
      CometDensityModeStateProvider,
      FDSTextPairing,
    },
    setup: () => ({
      imageSrc: 'https://static.xx.fbcdn.net/rsrc.php/yp/r/WrVGNAPBHOg.webp',
      variant: metaAiVariant,
    }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <IUListCell
          :variant="variant"
          class="rounded-[16px] bg-white"
        >
          <template #addOnStart>
            <IUImage
              :src="imageSrc"
              alt=""
              :draggable="false"
              :width="36"
              :height="36"
            />
          </template>

          <CometDensityModeStateProvider :initial-dense="true">
            <FDSTextPairing
              :level="4"
              headline="Meta AI"
              :headline-line-limit="2"
              :meta-line-limit="1"
              :reduce-emphasis="true"
            />
          </CometDensityModeStateProvider>
        </IUListCell>
      </div>
    `,
  }),
}

/** The anatomy story maps each named slot to a visible region so consumers can understand the shell quickly. */
export const Anatomy: Story = {
  render: () => ({
    components: {
      IUListCell: BaseListCell,
    },
    template: `
      <div style="width: 540px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <IUListCell
          :add-on-bottom-responsive="true"
          style="border: 1px dashed #cbd5e1; border-radius: 16px; padding: 16px; background: #f8fafc;"
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
            <div style="margin-top:12px; padding:10px 12px; border-radius:12px; background:#ede9fe; color:#5b21b6; font-size:12px; font-weight:700;">
              addOnFooter
            </div>
          </template>
        </IUListCell>
      </div>
    `,
  }),
}

/** Bottom metadata lets a row carry secondary status without replacing the main content structure. */
export const WithBottomMeta: Story = {
  render: (args) => ({
    components: {
      IUListCell: BaseListCell,
    },
    setup: () => ({ args }),
    template: `
      <div style="width: 440px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <IUListCell
          v-bind="args"
          :add-on-bottom-responsive="true"
          class="rounded-[16px] px-4 py-3"
        >
          <template #addOnStart>
            <div style="width: 40px; height: 40px; border-radius: 12px; background:#0f172a; display:flex; align-items:center; justify-content:center; color:white; font-size:13px; font-weight:700;">
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
        </IUListCell>
      </div>
    `,
  }),
}

/** Footer content can extend the row with secondary actions or policy text without rebuilding the shell. */
export const WithFooter: Story = {
  render: () => ({
    components: {
      IUListCell: BaseListCell,
    },
    template: `
      <div style="width: 440px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <IUListCell class="rounded-[16px] border border-slate-200 px-4 py-3">
          <template #addOnStart>
            <div style="width: 42px; height: 42px; border-radius: 999px; background:#fee2e2; display:flex; align-items:center; justify-content:center; color:#b91c1c; font-size:13px; font-weight:700;">
              !
            </div>
          </template>

          <div style="min-width:0;">
            <div style="font-size:14px; font-weight:700; color:#0f172a;">
              Security review required
            </div>
            <div style="margin-top:4px; font-size:13px; color:#64748b;">
              This component introduces a new external dependency and needs sign-off before release.
            </div>
          </div>

          <template #addOnEnd>
            <div style="font-size:12px; font-weight:700; color:#b91c1c;">
              High
            </div>
          </template>

          <template #addOnFooter>
            <div style="margin-top:12px; display:flex; align-items:center; justify-content:space-between; gap:12px; border-top:1px solid #e2e8f0; padding-top:12px;">
              <div style="font-size:12px; color:#64748b;">
                Reviewed by Platform Security
              </div>
              <div style="display:flex; gap:8px;">
                <button
                  type="button"
                  style="border:1px solid #cbd5e1; background:white; color:#0f172a; padding:8px 12px; border-radius:10px; font-size:12px; font-weight:700; cursor:pointer;"
                >
                  Dismiss
                </button>
                <button
                  type="button"
                  style="border:0; background:#0f172a; color:white; padding:8px 12px; border-radius:10px; font-size:12px; font-weight:700; cursor:pointer;"
                >
                  Review
                </button>
              </div>
            </div>
          </template>
        </IUListCell>
      </div>
    `,
  }),
}

/** Nested spacing and alignment settings help the same shell fit tree views, structured menus, and offset rows. */
export const NestedSpacingAndAlignment: Story = {
  render: (args) => ({
    components: {
      IUListCell: BaseListCell,
    },
    setup: () => ({ args }),
    template: `
      <div style="width: 460px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <IUListCell
          v-bind="args"
          :nested-spacing="24"
          vertical-align="top"
          content-vertical-align="top"
          add-on-start-vertical-align="top"
          add-on-end-vertical-align="top"
          class="rounded-[16px] px-4 py-3"
        >
          <template #addOnStart>
            <div style="width: 28px; height: 28px; border-radius: 8px; background:#e2e8f0; display:flex; align-items:center; justify-content:center; color:#475569; font-size:12px; font-weight:700;">
              ↳
            </div>
          </template>

          <div style="min-width:0;">
            <div style="font-size:14px; font-weight:700; color:#0f172a;">
              Nested child row
            </div>
            <div style="margin-top:4px; font-size:13px; color:#64748b; line-height:1.45;">
              The left spacer creates indentation while top alignment keeps multi-line content visually anchored with the leading add-on.
            </div>
          </div>

          <template #addOnEnd>
            <div style="font-size:12px; color:#64748b; white-space:nowrap;">
              Child
            </div>
          </template>
        </IUListCell>
      </div>
    `,
  }),
}
