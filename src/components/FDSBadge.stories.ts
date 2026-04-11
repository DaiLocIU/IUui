import type { Meta, StoryObj } from '@storybook/vue3'

import FDSBadge from './FDSBadge.vue'

const meta: Meta<typeof FDSBadge> = {
  title: 'Feedback/FDSBadge',
  component: FDSBadge,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const frameStyle = 'width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;'

export const Default: Story = {
  render: () => ({
    components: { FDSBadge },
    template: `
      <div style="${frameStyle}">
        <FDSBadge />
      </div>
    `,
  }),
}

export const ColorPalette: Story = {
  render: () => ({
    components: { FDSBadge },
    setup: () => ({
      colors: ['blue', 'gray', 'darkGray', 'green', 'lightBlue', 'red', 'yellow'],
    }),
    template: `
      <div style="${frameStyle} display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
        <div
          v-for="color in colors"
          :key="color"
          style="display:flex; flex-direction:column; align-items:center; gap:8px;"
        >
          <FDSBadge :color="color" />
          <div style="font-size:11px; color:#64748b;">{{ color }}</div>
        </div>
      </div>
    `,
  }),
}

export const BorderVariants: Story = {
  render: () => ({
    components: { FDSBadge },
    template: `
      <div style="${frameStyle} display:flex; align-items:center; gap:18px;">
        <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
          <FDSBadge border="white" color="red" :size="20" />
          <div style="font-size:11px; color:#64748b;">white border</div>
        </div>
        <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
          <FDSBadge border="dark" color="lightBlue" :size="20" />
          <div style="font-size:11px; color:#64748b;">dark border</div>
        </div>
      </div>
    `,
  }),
}

export const WideVariants: Story = {
  render: () => ({
    components: { FDSBadge },
    template: `
      <div style="${frameStyle} display:flex; align-items:center; gap:24px;">
        <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
          <FDSBadge color="green" :size="20" wide="wide" />
          <div style="font-size:11px; color:#64748b;">wide</div>
        </div>
        <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
          <FDSBadge color="green" :size="20" wide="extraWide" />
          <div style="font-size:11px; color:#64748b;">extraWide</div>
        </div>
      </div>
    `,
  }),
}

export const ProfileSpacing: Story = {
  render: () => ({
    components: { FDSBadge },
    template: `
      <div style="${frameStyle} display:flex; flex-direction:column; gap:16px;">
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="font-size:12px; color:#64748b; min-width:110px;">Default spacing</div>
          <div style="display:flex; align-items:center; background:#f8fafc; padding:8px 12px;">
            <FDSBadge color="blue" :size="10" />
            <span style="font-size:12px; color:#0f172a;">Label after badge</span>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="font-size:12px; color:#64748b; min-width:110px;">Profile badge</div>
          <div style="display:flex; align-items:center; background:#f8fafc; padding:8px 12px;">
            <FDSBadge color="blue" :size="10" :is-profile-badge="true" />
            <span style="font-size:12px; color:#0f172a;">Label after badge</span>
          </div>
        </div>
      </div>
    `,
  }),
}

export const ColorOverride: Story = {
  render: () => ({
    components: { FDSBadge },
    setup: () => ({
      override: {
        backgroundColor: '#7c3aed',
      },
    }),
    template: `
      <div style="${frameStyle}">
        <FDSBadge
          color="red"
          :color-override="override"
          :size="14"
        />
      </div>
    `,
  }),
}

export const WithContent: Story = {
  render: () => ({
    components: { FDSBadge },
    template: `
      <div style="${frameStyle}">
        <FDSBadge
          accessibility-text="3 unread notifications"
          border="white"
          color="red"
          :size="24"
        >
          <span style="font-size: 11px; font-weight: 700; line-height: 1; color: white;">3</span>
        </FDSBadge>
      </div>
    `,
  }),
}
