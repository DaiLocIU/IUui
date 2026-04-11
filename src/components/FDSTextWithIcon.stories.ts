import type { Meta, StoryObj } from '@storybook/vue3'
import { Lock, Star } from 'lucide-vue-next'

import FDSTextWithIcon from './FDSTextWithIcon.vue'
import FDSIcon from './FDSIcon.vue'

const meta: Meta<typeof FDSTextWithIcon> = {
  title: 'FDS/FDSTextWithIcon',
  component: FDSTextWithIcon,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const frame = 'font-size:15px;line-height:1.3333;color:#1c1e21;padding:20px 24px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;display:inline-flex;max-width:500px;'

export const IconBefore: Story = {
  render: () => ({
    components: { FDSTextWithIcon, FDSIcon },
    setup: () => ({ Lock }),
    template: `
      <div style="${frame}">
        <FDSTextWithIcon>
          <template #iconBefore>
            <FDSIcon :icon="Lock" :size="16" color="secondary" />
          </template>
          Private audience
        </FDSTextWithIcon>
      </div>
    `,
  }),
}

export const IconAfter: Story = {
  render: () => ({
    components: { FDSTextWithIcon, FDSIcon },
    setup: () => ({ Star }),
    template: `
      <div style="${frame}">
        <FDSTextWithIcon>
          <template #iconAfter>
            <FDSIcon :icon="Star" :size="16" color="highlight" />
          </template>
          Featured creator
        </FDSTextWithIcon>
      </div>
    `,
  }),
}
