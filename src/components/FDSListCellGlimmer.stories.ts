import type { Meta, StoryObj } from '@storybook/vue3'

import FDSListCellGlimmer from './FDSListCellGlimmer.vue'

const meta: Meta<typeof FDSListCellGlimmer> = {
  title: 'Feedback/FDSListCellGlimmer',
  component: FDSListCellGlimmer,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const frameStyle = 'width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;'

export const Default: Story = {
  render: () => ({
    components: { FDSListCellGlimmer },
    template: `
      <div style="${frameStyle}">
        <FDSListCellGlimmer />
      </div>
    `,
  }),
}

export const MultiRow: Story = {
  render: () => ({
    components: { FDSListCellGlimmer },
    template: `
      <div style="${frameStyle}">
        <FDSListCellGlimmer :number-of-items="4" :spacing="8" />
      </div>
    `,
  }),
}

export const CircleImage: Story = {
  render: () => ({
    components: { FDSListCellGlimmer },
    template: `
      <div style="${frameStyle}">
        <FDSListCellGlimmer
          image-style="circle"
          :number-of-items="3"
          :spacing="8"
        />
      </div>
    `,
  }),
}

export const RoundedRectImage: Story = {
  render: () => ({
    components: { FDSListCellGlimmer },
    template: `
      <div style="${frameStyle}">
        <FDSListCellGlimmer
          image-style="roundedRect"
          :image-size="48"
          :number-of-items="3"
          :spacing="8"
        />
      </div>
    `,
  }),
}

export const AlternateImageSizes: Story = {
  render: () => ({
    components: { FDSListCellGlimmer },
    setup: () => ({
      sizes: [20, 36, 40, 48, 56, 60],
    }),
    template: `
      <div style="${frameStyle} display:grid; gap:16px;">
        <div
          v-for="size in sizes"
          :key="size"
          style="display:grid; gap:6px;"
        >
          <div style="font-size:12px; font-weight:600; color:#475569;">imageSize {{ size }}</div>
          <FDSListCellGlimmer
            image-style="circle"
            :image-size="size"
          />
        </div>
      </div>
    `,
  }),
}

export const KeepFirstItemPadding: Story = {
  render: () => ({
    components: { FDSListCellGlimmer },
    template: `
      <div style="${frameStyle}">
        <FDSListCellGlimmer
          image-style="roundedRect"
          :number-of-items="3"
          :remove-first-item-padding="false"
          :spacing="8"
        />
      </div>
    `,
  }),
}
