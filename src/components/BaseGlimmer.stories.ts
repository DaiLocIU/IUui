import type { Meta, StoryObj } from '@storybook/vue3'

import BaseGlimmer from './BaseGlimmer.vue'

const meta: Meta<typeof BaseGlimmer> = {
  title: 'Feedback/BaseGlimmer',
  component: BaseGlimmer,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultPulse: Story = {
  render: () => ({
    components: { BaseGlimmer },
    template: `
      <div style="width: 320px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <BaseGlimmer xstyle="rounded-xl bg-slate-200 h-4 w-full" />
      </div>
    `,
  }),
}

export const StaggeredList: Story = {
  render: () => ({
    components: { BaseGlimmer },
    setup: () => ({
      items: Array.from({ length: 4 }, (_, index) => index),
    }),
    template: `
      <div style="width: 320px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <div style="display:grid; gap:12px;">
          <BaseGlimmer
            v-for="item in items"
            :key="item"
            :index="item"
            xstyle="rounded-xl bg-slate-200 h-4 w-full"
          />
        </div>
      </div>
    `,
  }),
}

export const FiniteIteration: Story = {
  render: () => ({
    components: { BaseGlimmer },
    template: `
      <div style="width: 320px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <BaseGlimmer
          :iteration="3"
          xstyle="rounded-full bg-slate-200 h-4 w-48"
        />
      </div>
    `,
  }),
}

export const StartUnpaused: Story = {
  render: () => ({
    components: { BaseGlimmer },
    template: `
      <div style="width: 320px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <BaseGlimmer
          :start-paused="false"
          xstyle="rounded-xl bg-slate-200 h-4 w-full"
        />
      </div>
    `,
  }),
}

export const VariantOverride: Story = {
  render: () => ({
    components: { BaseGlimmer },
    setup: () => ({
      variant: {
        xstyleConfig: {
          animation: [
            '[animation-duration:600ms]',
            '[animation-iteration-count:infinite]',
            '[animation-name:iu-glimmer-pulse]',
            '[animation-timing-function:linear]',
            '[opacity:var(--glimmer-opacity-min)]',
          ],
          animationDelay: {
            '--x-animationDelay': '120ms',
            animationDelay: 'var(--x-animationDelay)',
          },
          animationIteration: undefined,
          container: [
            'rounded-2xl h-5 w-full',
            {
              '--glimmer-opacity-max': 0.95,
              '--glimmer-opacity-min': 0.2,
              backgroundColor: '#bfdbfe',
            },
          ],
        },
      },
    }),
    template: `
      <div style="width: 320px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <BaseGlimmer :variant="variant" />
      </div>
    `,
  }),
}
