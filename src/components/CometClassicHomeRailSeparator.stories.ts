import type { Meta, StoryObj } from '@storybook/vue3'

import CometClassicHomeRailSeparator from './CometClassicHomeRailSeparator.vue'

const meta: Meta<typeof CometClassicHomeRailSeparator> = {
  title: 'Navigation/CometClassicHomeRailSeparator',
  component: CometClassicHomeRailSeparator,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Standalone: Story = {
  render: () => ({
    components: { CometClassicHomeRailSeparator },
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <CometClassicHomeRailSeparator />
      </div>
    `,
  }),
}

export const BetweenRailBlocks: Story = {
  render: () => ({
    components: { CometClassicHomeRailSeparator },
    template: `
      <div style="width: 360px; border: 1px solid #e2e8f0; border-radius: 18px; background: white; overflow: hidden;">
        <div style="padding: 16px; font-size: 14px; font-weight: 600; color: #0f172a;">
          Professional tools
        </div>
        <CometClassicHomeRailSeparator />
        <div style="padding: 16px; font-size: 14px; font-weight: 600; color: #0f172a;">
          Explore
        </div>
      </div>
    `,
  }),
}
