import type { Meta, StoryObj } from '@storybook/vue3'

import FDSLoadingAnimation from './FDSLoadingAnimation.vue'

const meta = {
  title: 'FDS/FDSLoadingAnimation',
  component: FDSLoadingAnimation,
  tags: ['autodocs'],
  args: {
    animationPaused: false,
    color: 'default',
    size: 60,
  },
  argTypes: {
    color: {
      control: 'radio',
      options: ['default', 'media'],
    },
    size: {
      control: 'radio',
      options: [36, 40, 60],
    },
  },
} satisfies Meta<typeof FDSLoadingAnimation>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllSizes: Story = {
  render: (args) => ({
    components: { FDSLoadingAnimation },
    setup: () => ({ args }),
    template: `
      <div class="flex items-center gap-6 rounded-2xl border border-slate-200 bg-white p-6">
        <FDSLoadingAnimation v-bind="args" :size="36" />
        <FDSLoadingAnimation v-bind="args" :size="40" />
        <FDSLoadingAnimation v-bind="args" :size="60" />
      </div>
    `,
  }),
}

export const MediaColor: Story = {
  args: {
    color: 'media',
  },
  render: (args) => ({
    components: { FDSLoadingAnimation },
    setup: () => ({ args }),
    template: `
      <div class="rounded-2xl bg-slate-900 p-8">
        <FDSLoadingAnimation v-bind="args" />
      </div>
    `,
  }),
}

export const Paused: Story = {
  args: {
    animationPaused: true,
  },
}
