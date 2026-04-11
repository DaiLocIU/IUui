import type { Meta, StoryObj } from '@storybook/vue3'

import BaseStyledBadge from './BaseStyledBadge.vue'

const meta: Meta<typeof BaseStyledBadge> = {
  title: 'Feedback/BaseStyledBadge',
  component: BaseStyledBadge,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const frameStyle = 'width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;'

export const Default: Story = {
  render: () => ({
    components: { BaseStyledBadge },
    template: `
      <div style="${frameStyle}">
        <BaseStyledBadge :size="8" :color-x-style="{ backgroundColor: '#2563eb' }" />
      </div>
    `,
  }),
}

export const Bordered: Story = {
  render: () => ({
    components: { BaseStyledBadge },
    template: `
      <div style="${frameStyle}">
        <BaseStyledBadge
          border
          :size="20"
          :color-x-style="{ backgroundColor: '#ffffff', borderColor: '#0f172a' }"
        />
      </div>
    `,
  }),
}

export const WithContent: Story = {
  render: () => ({
    components: { BaseStyledBadge },
    template: `
      <div style="${frameStyle}">
        <BaseStyledBadge
          accessibility-text="3 unread notifications"
          :size="24"
          :color-x-style="{ backgroundColor: '#dc2626', color: '#ffffff' }"
        >
          <span style="font-size: 11px; font-weight: 700; line-height: 1;">3</span>
        </BaseStyledBadge>
      </div>
    `,
  }),
}

export const LargeSizes: Story = {
  render: () => ({
    components: { BaseStyledBadge },
    setup: () => ({
      sizes: [6, 8, 12, 18, 24, 32, 41],
    }),
    template: `
      <div style="${frameStyle} display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
        <BaseStyledBadge
          v-for="size in sizes"
          :key="size"
          :size="size"
          :color-x-style="{ backgroundColor: '#059669' }"
        />
      </div>
    `,
  }),
}

export const XStyleOverride: Story = {
  render: () => ({
    components: { BaseStyledBadge },
    template: `
      <div style="${frameStyle}">
        <BaseStyledBadge
          :size="22"
          :color-x-style="{ backgroundColor: '#7c3aed' }"
          xstyle="shadow-[0_0_0_2px_rgba(124,58,237,0.2)]"
        />
      </div>
    `,
  }),
}

export const ReactPropSnapshot: Story = {
  render: () => ({
    components: { BaseStyledBadge },
    setup: () => ({
      metaProps: {
        accessibilityText: 'New notification in settings',
        border: true,
        colorXStyle: {
          backgroundColor: 'var(--badge-background-color-red)',
        },
        size: 10,
        xstyle: [
          {
            borderBottomColor: 'var(--card-background)',
            borderInlineEndColor: 'var(--card-background)',
            borderInlineStartColor: 'var(--card-background)',
            borderTopColor: 'var(--card-background)',
          },
        ],
      },
    }),
    template: `
      <div style="${frameStyle}">
        <div style="margin-bottom: 12px; font-size: 12px; color: #64748b;">
          React prop snapshot port. accessibilityText is flattened from the React fbt instance to a plain string.
        </div>
        <BaseStyledBadge v-bind="metaProps" />
      </div>
    `,
  }),
}
