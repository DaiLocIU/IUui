import type { Meta, StoryObj } from '@storybook/vue3'

import ScreenReaderText from './ScreenReaderText.vue'

const meta: Meta<typeof ScreenReaderText> = {
  title: 'Accessibility/ScreenReaderText',
  component: ScreenReaderText,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Standalone: Story = {
  args: {
    text: 'Unread notifications',
  },
  render: (args) => ({
    components: { ScreenReaderText },
    setup: () => ({ args }),
    template: `
      <div style="position: relative; width: 320px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <div style="font-size: 14px; color: #475569;">
          Hidden accessibility text is mounted in the DOM but not visible in this card.
        </div>
        <ScreenReaderText v-bind="args" />
      </div>
    `,
  }),
}

export const DecorativeDotWithSpokenLabel: Story = {
  render: () => ({
    components: { ScreenReaderText },
    template: `
      <div style="position: relative; width: 320px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <div style="display: inline-flex; align-items: center; gap: 10px;">
          <span style="display:inline-block; width:10px; height:10px; border-radius:999px; background:#22c55e;" />
          <span style="font-size:14px; font-weight:600; color:#0f172a;">Status dot only</span>
        </div>
        <ScreenReaderText text="Online" />
      </div>
    `,
  }),
}
