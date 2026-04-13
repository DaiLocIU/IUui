import type { Meta, StoryObj } from '@storybook/vue3'
import { Bell, ChevronRight } from 'lucide-vue-next'
import { defineComponent } from 'vue'

import FDSUnitHeaderTextAction from './FDSUnitHeaderTextAction.vue'
import { provideFDSUnitHeaderLevel } from '../composables/useFDSUnitHeaderLevel'

const meta = {
  title: 'FDS/FDSUnitHeaderTextAction',
  component: FDSUnitHeaderTextAction,
  tags: ['autodocs'],
  args: {
    disabled: false,
    icon: undefined,
    label: 'See all',
    linkProps: null,
    numberOfLines: undefined,
    testOnlyActionPressed: false,
    truncationTooltip: undefined,
    xstyle: undefined,
  },
  argTypes: {
    icon: { control: false },
    linkProps: { control: false },
    onFocusVisibleChange: { action: 'focusVisibleChange' },
    onHoverIn: { action: 'hoverIn' },
    onHoverOut: { action: 'hoverOut' },
    onPress: { action: 'press' },
    onPressIn: { action: 'pressIn' },
    onPressOut: { action: 'pressOut' },
    truncationTooltip: { control: false },
    xstyle: { control: false },
  },
} satisfies Meta<typeof FDSUnitHeaderTextAction>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcon: Story = {
  args: {
    icon: ChevronRight,
    label: 'Manage',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    icon: Bell,
    label: 'Notifications',
  },
}

export const LinkAction: Story = {
  args: {
    icon: ChevronRight,
    label: 'Open settings',
    linkProps: {
      url: '#settings',
    },
  },
}

export const Truncated: Story = {
  args: {
    icon: ChevronRight,
    label: 'Open the detailed notification preferences panel for this header',
    numberOfLines: 1,
    truncationTooltip: 'Open the detailed notification preferences panel for this header',
    xstyle: 'max-w-[200px]',
  },
}

export const NestedHeaderLevel: Story = {
  render: (args) =>
    defineComponent({
      components: { FDSUnitHeaderTextAction },
      setup() {
        provideFDSUnitHeaderLevel(3)
        return { args }
      },
      template: `
        <div class="max-w-sm">
          <FDSUnitHeaderTextAction v-bind="args" />
        </div>
      `,
    }),
  args: {
    icon: ChevronRight,
    label: 'Nested action uses body3 text',
  },
}
