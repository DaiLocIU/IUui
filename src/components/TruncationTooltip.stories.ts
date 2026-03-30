import type { Meta, StoryObj } from '@storybook/vue3'
import { defineAsyncComponent } from 'vue'

import SidebarRailItem from './SidebarRailItem.vue'
import TruncationTooltip from './TruncationTooltip.vue'

const meta: Meta<typeof TruncationTooltip> = {
  title: 'Components/TruncationTooltip',
  component: TruncationTooltip,
  tags: ['autodocs'],
  argTypes: {
    preloadStrategy: {
      control: 'radio',
      options: ['mount', 'interaction'],
    },
    watchResize: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const asyncTooltip = defineAsyncComponent(async () => {
  const module = await import('./OverflowTooltipContent.vue')
  return module.default
})

/** Default library primitive: render children normally, then upgrade to a tooltip only when truncation is real. */
export const Default: Story = {
  args: {
    testid: 'default',
  },
  render: (args) => ({
    components: { TruncationTooltip },
    setup: () => ({ args }),
    template: `
      <div style="width: 220px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <TruncationTooltip v-bind="args" class="block w-full">
          <span style="display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-weight:600; color:#0f172a;">
            A long rail label that only needs extra UI when the text is actually clipped.
          </span>
        </TruncationTooltip>
      </div>
    `,
  }),
}

/** Interaction mode matches the Meta behavior more closely: no tooltip code path until the user hovers truncated text. */
export const InteractionPreload: Story = {
  args: {
    preloadStrategy: 'interaction',
    watchResize: true,
    truncationTooltip: {
      component: asyncTooltip,
      tooltipProps: {
        label: 'This tooltip component is lazy-loaded on the first overflowing hover.'
      }
    },
  },
  render: (args) => ({
    components: { TruncationTooltip },
    setup: () => ({ args }),
    template: `
      <div style="width: 220px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <TruncationTooltip v-bind="args" class="block w-full">
          <span style="display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-weight:600; color:#0f172a;">
            This tooltip component is lazy-loaded on the first overflowing hover.
          </span>
        </TruncationTooltip>
      </div>
    `,
  }),
}

/** When the label fits, the component stays invisible and contributes no extra wrapper UI around the text. */
export const NoOverflow: Story = {
  args: {
    testid: 'nooverflow',
    preloadStrategy: 'mount',
    watchResize: true,
    truncationTooltip: undefined,
  },
  render: (args) => ({
    components: { TruncationTooltip },
    setup: () => ({ args }),
    template: `
      <div style="width: 280px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <TruncationTooltip v-bind="args" class="block w-full">
          <span style="display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-weight:600; color:#0f172a;">
            Short label
          </span>
        </TruncationTooltip>
      </div>
    `,
  }),
}

/** Real integration point: sidebar labels truncate in place, then reveal the full label on hover only when needed. */
export const SidebarIntegration: Story = {
  render: () => ({
    components: { SidebarRailItem },
    setup: () => ({
      item: {
        id: 'extremely-long-label',
        label: 'Enterprise account settings with an intentionally long workspace label',
        icon: 'E',
        badge: 4,
      },
    }),
    template: `
      <div style="width: 250px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <SidebarRailItem :item="item" />
      </div>
    `,
  }),
}
