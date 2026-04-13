import type { Meta, StoryObj } from '@storybook/vue3'

import FDSTextWithBadge from './FDSTextWithBadge.vue'
import FDSBadge from './FDSBadge.vue'

const meta: Meta<typeof FDSTextWithBadge> = {
  title: 'FDS/FDSTextWithBadge',
  component: FDSTextWithBadge,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const frame = 'font-size:15px;line-height:1.3333;color:#1c1e21;padding:20px 24px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;display:inline-flex;max-width:500px;'

export const BadgeAfter: Story = {
  render: () => ({
    components: { FDSTextWithBadge, FDSBadge },
    template: `
      <div style="${frame}">
        <FDSTextWithBadge>
          <template #badgeAfter>
            <FDSBadge color="blue" :size="10" :is-profile-badge="true" />
          </template>
          Featured creator
        </FDSTextWithBadge>
      </div>
    `,
  }),
}

export const BadgeBefore: Story = {
  render: () => ({
    components: { FDSTextWithBadge, FDSBadge },
    template: `
      <div style="${frame}">
        <FDSTextWithBadge>
          <template #badgeBefore>
            <FDSBadge color="red" :size="8" />
          </template>
          Notifications
        </FDSTextWithBadge>
      </div>
    `,
  }),
}
