import type { Meta, StoryObj } from '@storybook/vue3'
import { Bell, Flame, Star } from 'lucide-vue-next'
import { defineComponent, markRaw } from 'vue'

import FDSProfilePhotoActivityBadge from './FDSProfilePhotoActivityBadge.vue'

const icon = (component: typeof Bell | typeof Flame | typeof Star, size: number, color = '#1c1e21') =>
  markRaw({
    component,
    props: {
      color,
      size,
      strokeWidth: 2.25,
    },
  })

const card =
  'display:flex; align-items:center; justify-content:center; min-height:160px; padding:24px; border:1px solid #e2e8f0; border-radius:18px; background:#f8fafc;'

const meta = {
  title: 'FDS/FDSProfilePhotoActivityBadge',
  component: FDSProfilePhotoActivityBadge,
  tags: ['autodocs'],
  args: {
    backgroundColor: 'white',
    icon: icon(Bell, 10),
    isDecorative: true,
    overflow: undefined,
    pressed: false,
    size: 10,
  },
  argTypes: {
    icon: { control: false },
  },
} satisfies Meta<typeof FDSProfilePhotoActivityBadge>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) =>
    defineComponent({
      components: { FDSProfilePhotoActivityBadge },
      setup: () => ({ args, card }),
      template: `
        <div :style="card">
          <FDSProfilePhotoActivityBadge v-bind="args" />
        </div>
      `,
    }),
}

export const Sizes: Story = {
  render: () =>
    defineComponent({
      components: { FDSProfilePhotoActivityBadge },
      setup: () => ({
        card,
        badges: [
          { label: '8', size: 8, icon: icon(Flame, 8) },
          { label: '10', size: 10, icon: icon(Bell, 10) },
          { label: '16', size: 16, icon: icon(Star, 16) },
          { label: '24', size: 24, icon: icon(Star, 24) },
        ],
      }),
      template: `
        <div :style="card">
          <div class="flex items-end gap-6">
            <div
              v-for="badge in badges"
              :key="badge.label"
              class="flex flex-col items-center gap-3"
            >
              <FDSProfilePhotoActivityBadge
                :icon="badge.icon"
                :size="badge.size"
              />
              <span class="text-xs font-medium text-slate-500">{{ badge.label }}</span>
            </div>
          </div>
        </div>
      `,
    }),
}

export const CustomBackground: Story = {
  args: {
    backgroundColor: '#E7F3FF',
    icon: icon(Flame, 10, '#1877F2'),
  },
  render: Default.render,
}

export const Pressed: Story = {
  args: {
    icon: icon(Star, 10),
    pressed: true,
  },
  render: Default.render,
}

export const NonDecorative: Story = {
  args: {
    icon: icon(Bell, 10),
    isDecorative: false,
  },
  render: Default.render,
}

export const SlotOverridesIconProp: Story = {
  render: (args) =>
    defineComponent({
      components: { FDSProfilePhotoActivityBadge, Star },
      setup: () => ({ args, card }),
      template: `
        <div :style="card">
          <FDSProfilePhotoActivityBadge v-bind="args">
            <Star
              :size="10"
              color="#7C3AED"
              :stroke-width="2.25"
            />
          </FDSProfilePhotoActivityBadge>
        </div>
      `,
    }),
  args: {
    backgroundColor: '#F5F3FF',
    icon: icon(Bell, 10, '#EF4444'),
    size: 10,
  },
}
