import type { Meta, StoryObj } from '@storybook/vue3'

import WebPressable from './WebPressable.vue'

const meta: Meta<typeof WebPressable> = {
  title: 'Primitives/WebPressable',
  component: WebPressable,
  tags: ['autodocs'],
  argTypes: {
    accessibilityRole: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    suppressFocusRing: {
      control: 'boolean',
    },
    tabbable: {
      control: 'boolean',
    },
  },
  args: {
    accessibilityRole: 'button',
    disabled: false,
    suppressFocusRing: false,
    tabbable: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { WebPressable },
    setup: () => ({ args }),
    template: `
      <div style="padding: 24px; background: #f8fafc;">
        <WebPressable
          v-bind="args"
          style="display:inline-flex; align-items:center; justify-content:center; min-width:140px; min-height:44px; padding:0 16px; border-radius:12px; background:#0f172a; color:white; font-size:14px; font-weight:700;"
        >
          <template #default="{ pressed, hovered, focusVisible }">
            <span :style="{ opacity: pressed ? 0.82 : hovered || focusVisible ? 0.92 : 1 }">
              Pressable action
            </span>
          </template>
        </WebPressable>
      </div>
    `,
  }),
}

export const LinkSurface: Story = {
  render: () => ({
    components: { WebPressable },
    template: `
      <div style="padding: 24px; background: #f8fafc;">
        <WebPressable
          accessibility-role="link"
          :link="{ url: 'https://example.com', target: '_blank', rel: 'noreferrer' }"
          style="display:flex; width:320px; align-items:center; justify-content:space-between; gap:12px; border-radius:16px; background:white; border:1px solid #e2e8f0; padding:14px 16px; color:#0f172a;"
        >
          <template #default="{ hovered }">
            <div style="display:flex; align-items:center; justify-content:space-between; width:100%;">
              <div>
                <div style="font-size:14px; font-weight:700;">External destination</div>
                <div style="margin-top:4px; font-size:13px; color:#64748b;">Anchor-only props are applied when the surface is an enabled link.</div>
              </div>
              <div :style="{ color: hovered ? '#1d4ed8' : '#64748b', fontWeight: 700 }">Open</div>
            </div>
          </template>
        </WebPressable>
      </div>
    `,
  }),
}

export const RenderState: Story = {
  render: () => ({
    components: { WebPressable },
    template: `
      <div style="padding: 24px; background: #f8fafc;">
        <WebPressable
          accessibility-role="button"
          style="display:block; width:320px; border-radius:18px; padding:18px; background:white; border:1px solid #e2e8f0;"
        >
          <template #default="{ pressed, hovered, focused, focusVisible }">
            <div
              :style="{
                borderRadius: '14px',
                padding: '16px',
                background: pressed ? '#dbeafe' : hovered ? '#eff6ff' : focused || focusVisible ? '#f8fafc' : '#ffffff',
                border: focusVisible ? '2px solid #2563eb' : '1px solid #cbd5e1',
                transition: 'all 120ms ease'
              }"
            >
              <div style="font-size:14px; font-weight:700; color:#0f172a;">Slot state demo</div>
              <div style="margin-top:8px; font-size:12px; color:#475569;">
                pressed={{ pressed }} hovered={{ hovered }} focused={{ focused }} focusVisible={{ focusVisible }}
              </div>
            </div>
          </template>
        </WebPressable>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { WebPressable },
    template: `
      <div style="padding: 24px; background: #f8fafc;">
        <WebPressable
          accessibility-role="button"
          :disabled="true"
          style="display:inline-flex; align-items:center; justify-content:center; min-width:180px; min-height:44px; padding:0 16px; border-radius:12px; background:#e2e8f0; color:#64748b; font-size:14px; font-weight:700;"
        >
          <template #default="{ disabled }">
            Disabled surface: {{ disabled }}
          </template>
        </WebPressable>
      </div>
    `,
  }),
}
