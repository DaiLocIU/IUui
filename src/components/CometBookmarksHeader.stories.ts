import type { Meta, StoryObj } from '@storybook/vue3'

import CometBookmarksHeader from './CometBookmarksHeader.vue'

const meta = {
  title: 'Comet/CometBookmarksHeader',
  component: CometBookmarksHeader,
  tags: ['autodocs'],
  args: {
    canEdit: false,
    editHovered: false,
    sectionHeader: 'Shortcuts',
  },
  argTypes: {
    onActionPress: { action: 'actionPress' },
  },
} satisfies Meta<typeof CometBookmarksHeader>

export default meta

type Story = StoryObj<typeof meta>

const card =
  'width: 460px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;'

export const Default: Story = {
  render: (args) => ({
    components: { CometBookmarksHeader },
    setup: () => ({ args, card }),
    template: `
      <div :style="card">
        <CometBookmarksHeader v-bind="args" />
      </div>
    `,
  }),
}

export const EditableNotHovered: Story = {
  args: {
    canEdit: true,
    editHovered: false,
  },
  render: Default.render,
}

export const EditableAndHovered: Story = {
  args: {
    canEdit: true,
    editHovered: true,
  },
  render: Default.render,
}

export const ActionPressWiring: Story = {
  args: {
    canEdit: true,
    editHovered: true,
    sectionHeader: 'Pinned shortcuts',
  },
  render: Default.render,
}
