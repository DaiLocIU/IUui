import type { Meta, StoryObj } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FDSProfilePhotoActivePill from './FDSProfilePhotoActivePill.vue'

const card =
  'display:flex; align-items:center; justify-content:center; min-height:160px; padding:24px; border:1px solid #e2e8f0; border-radius:18px; background:#f8fafc;'

const meta = {
  title: 'FDS/FDSProfilePhotoActivePill',
  component: FDSProfilePhotoActivePill,
  tags: ['autodocs'],
  args: {
    ariaLabel: 'Last active time:',
    border: 'card-background',
    pressed: false,
  },
} satisfies Meta<typeof FDSProfilePhotoActivePill>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) =>
    defineComponent({
      components: { FDSProfilePhotoActivePill },
      setup: () => ({ args, card }),
      template: `
        <div :style="card">
          <FDSProfilePhotoActivePill v-bind="args">
            5m
          </FDSProfilePhotoActivePill>
        </div>
      `,
    }),
}

export const BorderVariants: Story = {
  render: () =>
    defineComponent({
      components: { FDSProfilePhotoActivePill },
      setup: () => ({
        card,
        variants: [
          { label: 'card-background', border: 'card-background' },
          { label: 'secondary-button-background-floating', border: 'secondary-button-background-floating' },
          { label: 'web-wash', border: 'web-wash' },
        ],
      }),
      template: `
        <div :style="card">
          <div class="flex flex-col items-center gap-4">
            <FDSProfilePhotoActivePill
              v-for="variant in variants"
              :key="variant.label"
              :aria-label="variant.label"
              :border="variant.border"
            >
              {{ variant.label }}
            </FDSProfilePhotoActivePill>
          </div>
        </div>
      `,
    }),
}

export const Pressed: Story = {
  args: {
    pressed: true,
  },
  render: Default.render,
}

export const LongContent: Story = {
  render: (args) =>
    defineComponent({
      components: { FDSProfilePhotoActivePill },
      setup: () => ({ args, card }),
      template: `
        <div :style="card">
          <FDSProfilePhotoActivePill v-bind="args">
            Active 1 hour ago
          </FDSProfilePhotoActivePill>
        </div>
      `,
    }),
}
