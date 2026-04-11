import type { Meta, StoryObj } from '@storybook/vue3'

import BaseBadge from './BaseBadge.vue'

const meta: Meta<typeof BaseBadge> = {
  title: 'Feedback/BaseBadge',
  component: BaseBadge,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const frameStyle = 'width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;'

export const EmptyDotShell: Story = {
  render: () => ({
    components: { BaseBadge },
    template: `
      <div style="${frameStyle}">
        <BaseBadge xstyle="h-2.5 w-2.5 bg-emerald-500" />
      </div>
    `,
  }),
}

export const VisibleContent: Story = {
  render: () => ({
    components: { BaseBadge },
    template: `
      <div style="${frameStyle}">
        <BaseBadge xstyle="min-h-5 min-w-5 px-1.5 bg-blue-600 text-white text-[11px] font-semibold">
          3
        </BaseBadge>
      </div>
    `,
  }),
}

export const AccessibilityTextOnly: Story = {
  render: () => ({
    components: { BaseBadge },
    template: `
      <div style="${frameStyle}">
        <BaseBadge
          accessibility-text="Unread notifications"
          xstyle="h-2.5 w-2.5 bg-rose-500"
        />
      </div>
    `,
  }),
}

export const DecorativeContentWithSpokenLabel: Story = {
  render: () => ({
    components: { BaseBadge },
    template: `
      <div style="${frameStyle}">
        <BaseBadge
          accessibility-text="Online"
          xstyle="h-3 w-3 bg-lime-500"
        >
          <span aria-hidden="true" />
        </BaseBadge>
      </div>
    `,
  }),
}

export const XStyleOverride: Story = {
  render: () => ({
    components: { BaseBadge },
    template: `
      <div style="${frameStyle}">
        <BaseBadge
          testid="custom-badge"
          xstyle="rounded-md px-2 py-1 bg-slate-900 text-white text-xs font-medium"
        >
          Beta
        </BaseBadge>
      </div>
    `,
  }),
}
