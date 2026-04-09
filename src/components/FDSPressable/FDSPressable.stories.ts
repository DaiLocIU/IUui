import type { Meta, StoryObj } from '@storybook/vue3'

import FDSPressable from './FDSPressable.vue'

const noop = () => {}

const meta: Meta<typeof FDSPressable> = {
  title: 'Components/FDSPressable',
  component: FDSPressable,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const EnabledPassThrough: Story = {
  render: () => ({
    components: { FDSPressable },
    setup: () => ({
      noop,
    }),
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <FDSPressable
          :on-press="noop"
          :on-hover-in="noop"
          :on-hover-out="noop"
          class="rounded-[18px] border border-slate-200 bg-white px-4 py-4 text-left text-slate-900 shadow-sm"
        >
          <div class="space-y-1">
            <div class="text-sm font-semibold">Enabled pass-through</div>
            <div class="text-sm text-slate-500">
              FDSPressable forwards to CometPressable unchanged until the disabled policy branch activates.
            </div>
          </div>
        </FDSPressable>
      </div>
    `,
  }),
}

export const DisabledPolicyBranch: Story = {
  render: () => ({
    components: { FDSPressable },
    setup: () => ({
      noop,
    }),
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <div style="margin-bottom: 12px; font-size: 13px; color: #64748b;">
          This branch preserves <code>disabled</code>, forces <code>aria-disabled</code> and <code>cursorDisabled</code>, and clears the source callback list.
        </div>
        <FDSPressable
          :disabled="true"
          :on-context-menu="noop"
          :on-focus-change="noop"
          :on-focus-in="noop"
          :on-focus-out="noop"
          :on-focus-visible-change="noop"
          :on-hover-change="noop"
          :on-hover-in="noop"
          :on-hover-move="noop"
          :on-hover-out="noop"
          :on-press="noop"
          :on-press-action="noop"
          :on-press-change="noop"
          :on-press-in="noop"
          :on-press-out="noop"
          class="rounded-[18px] border border-slate-200 bg-slate-100 px-4 py-4 text-left text-slate-500"
        >
          <div class="space-y-1">
            <div class="text-sm font-semibold">Disabled policy branch</div>
            <div class="text-sm text-slate-500">
              This matches FDSPressable's source-level responsibility instead of adding new disabled behavior inside CometPressable.
            </div>
          </div>
        </FDSPressable>
      </div>
    `,
  }),
}
