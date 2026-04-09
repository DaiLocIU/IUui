import type { Meta, StoryObj } from '@storybook/vue3'

import BaseLoadingStateElement from './BaseLoadingStateElement.vue'

const meta: Meta<typeof BaseLoadingStateElement> = {
  title: 'Feedback/BaseLoadingStateElement',
  component: BaseLoadingStateElement,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Indeterminate: Story = {
  render: () => ({
    components: { BaseLoadingStateElement },
    template: `
      <BaseLoadingStateElement
        xstyle="rounded-xl bg-slate-100 p-4 text-sm text-slate-600"
      >
        Loading your sidebar...
      </BaseLoadingStateElement>
    `,
  }),
}

export const Determinate: Story = {
  render: () => ({
    components: { BaseLoadingStateElement },
    template: `
      <BaseLoadingStateElement
        :progress="48"
        xstyle="rounded-xl bg-slate-100 p-4 text-sm text-slate-600"
      >
        Loading 48%
      </BaseLoadingStateElement>
    `,
  }),
}

export const Decorative: Story = {
  render: () => ({
    components: { BaseLoadingStateElement },
    template: `
      <BaseLoadingStateElement
        is-decorative
        xstyle="rounded-xl bg-slate-100 p-4"
      >
        <div class="h-3 w-40 animate-pulse rounded bg-slate-300" />
      </BaseLoadingStateElement>
    `,
  }),
}

export const NestedWrappers: Story = {
  render: () => ({
    components: { BaseLoadingStateElement },
    template: `
      <BaseLoadingStateElement
        xstyle="rounded-2xl border border-slate-200 bg-white p-4"
      >
        <div class="space-y-3">
          <div class="text-sm font-medium text-slate-900">Outer loading wrapper</div>
          <BaseLoadingStateElement
            :progress="72"
            xstyle="rounded-xl bg-slate-100 p-3 text-sm text-slate-600"
          >
            Nested loading wrapper should render without extra loading ARIA.
          </BaseLoadingStateElement>
        </div>
      </BaseLoadingStateElement>
    `,
  }),
}

export const CustomAriaLabel: Story = {
  render: () => ({
    components: { BaseLoadingStateElement },
    template: `
      <BaseLoadingStateElement
        aria-label="Loading search results"
        xstyle="rounded-xl bg-slate-100 p-4 text-sm text-slate-600"
      >
        Fetching search results...
      </BaseLoadingStateElement>
    `,
  }),
}
