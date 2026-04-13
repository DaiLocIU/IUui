import type { Meta, StoryObj } from '@storybook/vue3'
import { Bell, ChevronRight } from 'lucide-vue-next'
import { defineComponent } from 'vue'

import FDSIcon from './FDSIcon.vue'
import FDSUnitHeader from './FDSUnitHeader.vue'
import FDSUnitHeaderTextAction from './FDSUnitHeaderTextAction.vue'

const meta = {
  title: 'FDS/FDSUnitHeader',
  component: FDSUnitHeader,
  tags: ['autodocs'],
  args: {
    actionHidden: false,
    body: null,
    bodyColor: 'secondary',
    bodyLineLimit: 3,
    disabled: false,
    hasTopDivider: false,
    headline: 'Saved',
    headlineColor: 'primary',
    headlineId: undefined,
    isSemanticHeading: true,
    level: 2,
    meta: null,
    metaColor: 'secondary',
    metaLocation: 'below',
    metaTestID: undefined,
    paddingHorizontal: 16,
    paddingTop: 20,
    showActionOnHover: false,
    useFocusCell: false,
  },
  argTypes: {
    bodyColor: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    headlineColor: {
      control: 'select',
      options: ['primary', 'secondary', 'highlight'],
    },
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 'entityHeader1', 'entityHeader2'],
    },
    metaColor: {
      control: 'select',
      options: ['secondary', 'tertiary', 'highlight'],
    },
    metaLocation: {
      control: 'radio',
      options: ['above', 'in-between', 'below'],
    },
  },
} satisfies Meta<typeof FDSUnitHeader>

export default meta

type Story = StoryObj<typeof meta>

const card =
  'width: 460px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;'

export const HeadlineOnly: Story = {
  render: (args) => ({
    components: { FDSUnitHeader },
    setup: () => ({ args, card }),
    template: `
      <div :style="card">
        <FDSUnitHeader v-bind="args" />
      </div>
    `,
  }),
}

export const WithBodyAndMeta: Story = {
  args: {
    body: 'A compact section header that carries headline, body, and meta through FDSTextPairing.',
    meta: 'Updated 2 hours ago',
  },
  render: HeadlineOnly.render,
}

export const TextActionSlot: Story = {
  args: {
    headline: 'Shortcuts',
    meta: 'Manage what appears in the left rail',
  },
  render: (args) =>
    defineComponent({
      components: { FDSUnitHeader, FDSUnitHeaderTextAction },
      setup() {
        return { args, card }
      },
      template: `
        <div :style="card">
          <FDSUnitHeader v-bind="args">
            <template #action>
              <FDSUnitHeaderTextAction label="Edit" />
            </template>
          </FDSUnitHeader>
        </div>
      `,
    }),
}

export const IconActionSlot: Story = {
  args: {
    headline: 'Notifications',
    meta: 'Critical alerts stay visible at the section level',
  },
  render: (args) =>
    defineComponent({
      components: { Bell, FDSIcon, FDSUnitHeader },
      setup() {
        return { args, card }
      },
      template: `
        <div :style="card">
          <FDSUnitHeader v-bind="args">
            <template #action>
              <FDSIcon
                alt="Open notification settings"
                :icon="Bell"
                color="primary"
                :size="16"
              />
            </template>
          </FDSUnitHeader>
        </div>
      `,
    }),
}

export const CustomActionSlot: Story = {
  args: {
    headline: 'Experiments',
    meta: 'Direct slot content replaces the old action prop path.',
  },
  render: (args) =>
    defineComponent({
      components: { FDSUnitHeader },
      setup() {
        return { args, card }
      },
      template: `
        <div :style="card">
          <FDSUnitHeader v-bind="args">
            <template #action>
              <span
                class="inline-flex items-center rounded-full bg-sky-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-sky-700"
              >
                Beta
              </span>
            </template>
          </FDSUnitHeader>
        </div>
      `,
    }),
}

export const ShowActionOnHover: Story = {
  args: {
    actionHidden: true,
    headline: 'Hover reveal',
    meta: 'On fine pointers the action hides until hover or keyboard focus-visible.',
    showActionOnHover: true,
  },
  render: (args) =>
    defineComponent({
      components: { FDSUnitHeader, FDSUnitHeaderTextAction },
      setup() {
        return { args, card }
      },
      template: `
        <div :style="card">
          <FDSUnitHeader v-bind="args">
            <template #action>
              <FDSUnitHeaderTextAction label="Edit" />
            </template>
          </FDSUnitHeader>
        </div>
      `,
    }),
}

export const ActionHidden: Story = {
  args: {
    actionHidden: true,
    headline: 'Keyboard reveal',
    meta: 'Focus the action to prove focus-visible removes the hidden opacity state.',
  },
  render: (args) =>
    defineComponent({
      components: { FDSUnitHeader, FDSUnitHeaderTextAction },
      setup() {
        return { args, card }
      },
      template: `
        <div :style="card">
          <FDSUnitHeader v-bind="args">
            <template #action>
              <FDSUnitHeaderTextAction label="Edit" />
            </template>
          </FDSUnitHeader>
        </div>
      `,
    }),
}

export const WithTopDivider: Story = {
  args: {
    hasTopDivider: true,
    headline: 'Saved',
    meta: 'Divider and content spacing follow the source structure.',
  },
  render: (args) =>
    defineComponent({
      components: { FDSUnitHeader, FDSUnitHeaderTextAction },
      setup() {
        return { args, card }
      },
      template: `
        <div :style="card">
          <FDSUnitHeader v-bind="args">
            <template #action>
              <FDSUnitHeaderTextAction label="Manage" />
            </template>
          </FDSUnitHeader>
        </div>
      `,
    }),
}

export const NestedLevel: Story = {
  args: {
    headline: 'Nested section',
    level: 3,
    meta: 'The propagated level should push text actions to body3.',
  },
  render: (args) =>
    defineComponent({
      components: { FDSUnitHeader, FDSUnitHeaderTextAction },
      setup() {
        return { args, card }
      },
      template: `
        <div :style="card">
          <FDSUnitHeader v-bind="args">
            <template #action>
              <FDSUnitHeaderTextAction label="Nested action" />
            </template>
          </FDSUnitHeader>
        </div>
      `,
    }),
}

export const AddOnSlot: Story = {
  args: {
    headline: 'Legacy add-on becomes plain slot content',
    meta: 'There is one action slot now instead of multiple prop-driven action APIs.',
  },
  render: (args) =>
    defineComponent({
      components: { ChevronRight, FDSUnitHeader },
      setup() {
        return { args, card }
      },
      template: `
        <div :style="card">
          <FDSUnitHeader v-bind="args">
            <template #action>
              <ChevronRight class="h-4 w-4 text-slate-500" />
            </template>
          </FDSUnitHeader>
        </div>
      `,
    }),
}
