import type { Meta, StoryObj } from '@storybook/vue3'
import { ArrowRight } from 'lucide-vue-next'

import CometHomeLeftRailBookmarkRefetchListCell from './CometHomeLeftRailBookmarkRefetchListCell.vue'

const noop = () => {}

const meta: Meta<typeof CometHomeLeftRailBookmarkRefetchListCell> = {
  title: 'Navigation/CometHomeLeftRailBookmarkRefetchListCell',
  component: CometHomeLeftRailBookmarkRefetchListCell,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const MoreDefault: Story = {
  render: () => ({
    components: { CometHomeLeftRailBookmarkRefetchListCell },
    setup: () => ({
      args: {
        onPress: noop,
        section: 'shortcuts',
        type: 'more',
      },
    }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <CometHomeLeftRailBookmarkRefetchListCell v-bind="args" />
      </div>
    `,
  }),
}

export const MoreLoading: Story = {
  render: () => ({
    components: { CometHomeLeftRailBookmarkRefetchListCell },
    setup: () => ({
      args: {
        isLoadingNext: true,
        onPress: noop,
        section: 'shortcuts',
        type: 'more',
      },
    }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <CometHomeLeftRailBookmarkRefetchListCell v-bind="args" />
      </div>
    `,
  }),
}

export const Less: Story = {
  render: () => ({
    components: { CometHomeLeftRailBookmarkRefetchListCell },
    setup: () => ({
      args: {
        onPress: noop,
        section: 'communities',
        type: 'less',
      },
    }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <CometHomeLeftRailBookmarkRefetchListCell v-bind="args" />
      </div>
    `,
  }),
}

export const ExploreSection: Story = {
  render: () => ({
    components: { CometHomeLeftRailBookmarkRefetchListCell },
    setup: () => ({
      args: {
        onPress: noop,
        section: 'explore',
        type: 'more',
      },
    }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <CometHomeLeftRailBookmarkRefetchListCell v-bind="args" />
      </div>
    `,
  }),
}

export const SlotOverrides: Story = {
  render: () => ({
    components: { ArrowRight, CometHomeLeftRailBookmarkRefetchListCell },
    setup: () => ({
      args: {
        onPress: noop,
        section: 'shortcuts',
        type: 'more',
      },
    }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <CometHomeLeftRailBookmarkRefetchListCell v-bind="args">
          <template #addOnStart>
            <div style="width:36px;height:36px;border-radius:999px;background:#dbeafe;color:#1d4ed8;display:flex;align-items:center;justify-content:center;">
              <ArrowRight :size="16" />
            </div>
          </template>

          <template #label>
            <div style="font-size:14px;font-weight:600;color:#0f172a;">
              Open more items
            </div>
          </template>
        </CometHomeLeftRailBookmarkRefetchListCell>
      </div>
    `,
  }),
}
