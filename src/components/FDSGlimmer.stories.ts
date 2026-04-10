import type { Meta, StoryObj } from '@storybook/vue3'

import FDSGlimmer from './FDSGlimmer.vue'

const meta: Meta<typeof FDSGlimmer> = {
  title: 'Feedback/FDSGlimmer',
  component: FDSGlimmer,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { FDSGlimmer },
    template: `
      <div style="width: 320px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <FDSGlimmer xstyle="rounded-xl h-4 w-full" />
      </div>
    `,
  }),
}

export const Staggered: Story = {
  render: () => ({
    components: { FDSGlimmer },
    setup: () => ({
      items: Array.from({ length: 4 }, (_, index) => index),
    }),
    template: `
      <div style="width: 320px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <div style="display:grid; gap:12px;">
          <FDSGlimmer
            v-for="item in items"
            :key="item"
            :index="item"
            xstyle="rounded-xl h-4 w-full"
          />
        </div>
      </div>
    `,
  }),
}

export const FiniteIteration: Story = {
  render: () => ({
    components: { FDSGlimmer },
    template: `
      <div style="width: 320px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <FDSGlimmer
          :iteration="3"
          xstyle="rounded-full h-4 w-48"
        />
      </div>
    `,
  }),
}

export const ShapeOverride: Story = {
  render: () => ({
    components: { FDSGlimmer },
    template: `
      <div style="width: 320px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <FDSGlimmer
          xstyle="rounded-2xl h-16 w-full"
        />
      </div>
    `,
  }),
}

export const VariantPassThrough: Story = {
  render: () => ({
    components: { FDSGlimmer },
    setup: () => ({
      variant: {
        xstyleConfig: {
          animation: [
            '[animation-duration:500ms]',
            '[animation-iteration-count:infinite]',
            '[animation-name:iu-glimmer-pulse]',
            '[animation-timing-function:linear]',
            '[opacity:var(--glimmer-opacity-min)]',
          ],
          animationDelay: {
            '--x-animationDelay': '80ms',
            animationDelay: 'var(--x-animationDelay)',
          },
          animationIteration: undefined,
          container: [
            'rounded-xl h-5 w-full',
            {
              backgroundColor: '#cbd5e1',
              '--glimmer-opacity-max': 0.9,
              '--glimmer-opacity-min': 0.25,
            },
          ],
        },
      },
    }),
    template: `
      <div style="width: 320px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <FDSGlimmer :variant="variant" />
      </div>
    `,
  }),
}
