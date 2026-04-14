import type { Meta, StoryObj } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FDSProfilePhotoAvailabilityBadge from './FDSProfilePhotoAvailabilityBadge.vue'

const card =
  'display:flex; align-items:center; justify-content:center; min-height:160px; padding:24px; border:1px solid #e2e8f0; border-radius:18px; background:#f8fafc;'

const meta = {
  title: 'FDS/FDSProfilePhotoAvailabilityBadge',
  component: FDSProfilePhotoAvailabilityBadge,
  tags: ['autodocs'],
  args: {
    isDecorative: false,
    pressed: false,
    size: 8,
  },
} satisfies Meta<typeof FDSProfilePhotoAvailabilityBadge>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) =>
    defineComponent({
      components: { FDSProfilePhotoAvailabilityBadge },
      setup: () => ({ args, card }),
      template: `
        <div :style="card">
          <FDSProfilePhotoAvailabilityBadge v-bind="args" />
        </div>
      `,
    }),
}

export const Sizes: Story = {
  render: () =>
    defineComponent({
      components: { FDSProfilePhotoAvailabilityBadge },
      setup: () => ({
        card,
        badges: [
          { label: '8', size: 8 },
          { label: '10', size: 10 },
          { label: '20', size: 20 },
        ],
      }),
      template: `
        <div :style="card">
          <div class="flex items-end gap-6">
            <div
              v-for="badge in badges"
              :key="badge.label"
              class="flex flex-col items-center gap-3"
            >
              <FDSProfilePhotoAvailabilityBadge
                :size="badge.size"
              />
              <span class="text-xs font-medium text-slate-500">{{ badge.label }}</span>
            </div>
          </div>
        </div>
      `,
    }),
}

export const Pressed: Story = {
  args: {
    pressed: true,
    size: 10,
  },
  render: Default.render,
}

export const Decorative: Story = {
  args: {
    isDecorative: true,
    size: 10,
  },
  render: Default.render,
}
