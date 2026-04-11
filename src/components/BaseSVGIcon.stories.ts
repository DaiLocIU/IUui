import type { Meta, StoryObj } from '@storybook/vue3'
import { Heart, Star, Bell, Search, Settings, Home, User, Lock, AlertTriangle, Info } from 'lucide-vue-next'
import { defineComponent, h } from 'vue'
import BaseSVGIcon from './BaseSVGIcon.vue'
import { provideBaseIsDecorativeContext } from '../composables/useBaseIsDecorativeContext'

const meta: Meta<typeof BaseSVGIcon> = {
  title: 'Base/BaseSVGIcon',
  component: BaseSVGIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**BaseSVGIcon** is the lowest-level icon primitive — a direct Vue port of Facebook's \`BaseSVGIcon.react\`.

Uses **Lucide** icons instead of FB's internal SVG system, but preserves all original features:

| Feature | How |
|---|---|
| Decorative context | \`provideBaseIsDecorativeContext(true)\` from a parent |
| \`aria-hidden\` | Auto-set when no \`alt\` + decorative context is \`true\` |
| \`aria-label\` | Set from \`alt\` when icon is meaningful |
| Color | CSS custom property \`--x-color\` trick (same as Stylex original) |
| Size | Single \`size\` prop controls \`width\` + \`height\` |
| Stroke | \`strokeWidth\` for Lucide-specific line thickness |
        `,
      },
    },
  },
  argTypes: {
    icon: { control: false },
    size: { control: { type: 'number', min: 12, max: 64, step: 4 } },
    strokeWidth: { control: { type: 'number', min: 0.5, max: 4, step: 0.5 } },
    color: { control: 'color' },
    alt: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof BaseSVGIcon>

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    icon: Heart,
    size: 24,
  },
  parameters: {
    docs: {
      description: { story: 'Basic icon, no color, no alt — inherits color from CSS cascade.' },
    },
  },
}

// ─── With Color ───────────────────────────────────────────────────────────────

export const WithColor: Story = {
  args: {
    icon: Heart,
    size: 24,
    color: '#e3264a',
  },
  parameters: {
    docs: {
      description: {
        story: 'Color applied via CSS custom property `--x-color`. Mirrors the original Stylex trick.',
      },
    },
  },
}

// ─── With Alt (Meaningful Icon) ───────────────────────────────────────────────

export const WithAlt: Story = {
  args: {
    icon: Bell,
    size: 24,
    alt: 'Notifications',
  },
  parameters: {
    docs: {
      description: {
        story: 'When `alt` is provided, `aria-label` is set and the icon is announced to screen readers.',
      },
    },
  },
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => ({
    components: { BaseSVGIcon },
    setup() {
      return { Star, sizes: [12, 16, 20, 24, 32, 40, 48] }
    },
    template: `
      <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
        <div
          v-for="s in sizes"
          :key="s"
          style="display:flex;flex-direction:column;align-items:center;gap:6px;"
        >
          <BaseSVGIcon :icon="Star" :size="s" color="#f4a929" />
          <span style="font-size:11px;color:#666;">{{ s }}px</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: { description: { story: 'All sizes from 12px to 48px.' } },
  },
}

// ─── Color Palette ────────────────────────────────────────────────────────────

export const ColorPalette: Story = {
  render: () => ({
    components: { BaseSVGIcon },
    setup() {
      return {
        Heart,
        colors: [
          { label: 'Primary', value: '#1877f2' },
          { label: 'Positive', value: '#31a24c' },
          { label: 'Negative', value: '#e3264a' },
          { label: 'Warning', value: '#f4a929' },
          { label: 'Secondary', value: '#65676b' },
          { label: 'currentColor', value: undefined },
        ],
      }
    },
    template: `
      <div style="display:flex;gap:20px;flex-wrap:wrap;">
        <div
          v-for="c in colors"
          :key="c.label"
          style="display:flex;flex-direction:column;align-items:center;gap:6px;"
        >
          <BaseSVGIcon :icon="Heart" :size="24" :color="c.value" />
          <span style="font-size:11px;color:#666;">{{ c.label }}</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: { description: { story: 'Color applied via `--x-color` CSS custom property.' } },
  },
}

// ─── Stroke Width ─────────────────────────────────────────────────────────────

export const StrokeWidths: Story = {
  render: () => ({
    components: { BaseSVGIcon },
    setup() {
      return { Settings, strokes: [0.5, 1, 1.5, 2, 2.5, 3] }
    },
    template: `
      <div style="display:flex;align-items:center;gap:20px;">
        <div
          v-for="sw in strokes"
          :key="sw"
          style="display:flex;flex-direction:column;align-items:center;gap:6px;"
        >
          <BaseSVGIcon :icon="Settings" :size="28" color="#1877f2" :stroke-width="sw" />
          <span style="font-size:11px;color:#666;">{{ sw }}</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: { description: { story: 'Lucide-specific `strokeWidth` prop. Default is 2.' } },
  },
}

// ─── Decorative Context (aria-hidden) ─────────────────────────────────────────

export const DecorativeContext: Story = {
  render: () =>
    defineComponent({
      components: { BaseSVGIcon },
      setup() {
        // Simulate a parent (e.g. a button with visible label) that marks
        // all icons inside it as decorative → aria-hidden="true"
        provideBaseIsDecorativeContext(true)
        return { Home, User, Lock }
      },
      template: `
        <div>
          <p style="font-size:13px;margin-bottom:12px;color:#444;">
            <code>provideBaseIsDecorativeContext(true)</code> is active in this tree.<br/>
            All icons below render with <code>aria-hidden="true"</code> (inspect the DOM).
          </p>
          <div style="display:flex;gap:16px;">
            <BaseSVGIcon :icon="Home" :size="24" color="#1877f2" />
            <BaseSVGIcon :icon="User" :size="24" color="#31a24c" />
            <BaseSVGIcon :icon="Lock" :size="24" color="#e3264a" />
          </div>
          <p style="font-size:12px;color:#999;margin-top:10px;">
            These icons have no alt — and decorative context is true → aria-hidden="true"
          </p>
        </div>
      `,
    }),
  parameters: {
    docs: {
      description: {
        story:
          'Mirrors `BaseIsDecorativeContext`. When a parent calls `provideBaseIsDecorativeContext(true)`, all icon descendants without `alt` get `aria-hidden="true` automatically.',
      },
    },
  },
}

// ─── Alt Overrides Decorative Context ─────────────────────────────────────────

export const AltOverridesDecorativeContext: Story = {
  render: () =>
    defineComponent({
      components: { BaseSVGIcon },
      setup() {
        provideBaseIsDecorativeContext(true)
        return { AlertTriangle, Info }
      },
      template: `
        <div>
          <p style="font-size:13px;margin-bottom:12px;color:#444;">
            Decorative context is <code>true</code>, but icons with <code>alt</code> still get <code>aria-label</code>.
          </p>
          <div style="display:flex;gap:16px;align-items:center;">
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
              <BaseSVGIcon :icon="AlertTriangle" :size="24" color="#f4a929" alt="Warning" />
              <span style="font-size:11px;color:#666;">alt="Warning"</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
              <BaseSVGIcon :icon="Info" :size="24" color="#1877f2" />
              <span style="font-size:11px;color:#666;">no alt → aria-hidden</span>
            </div>
          </div>
        </div>
      `,
    }),
  parameters: {
    docs: {
      description: {
        story:
          'Even inside a decorative context, an icon with `alt` text still renders as accessible — `alt` always takes precedence.',
      },
    },
  },
}

// ─── Icon Gallery ─────────────────────────────────────────────────────────────

export const IconGallery: Story = {
  render: () => ({
    components: { BaseSVGIcon },
    setup() {
      return {
        icons: [
          { label: 'Home', icon: Home },
          { label: 'Search', icon: Search },
          { label: 'Bell', icon: Bell },
          { label: 'Heart', icon: Heart },
          { label: 'Star', icon: Star },
          { label: 'User', icon: User },
          { label: 'Settings', icon: Settings },
          { label: 'Lock', icon: Lock },
          { label: 'Warning', icon: AlertTriangle },
          { label: 'Info', icon: Info },
        ],
      }
    },
    template: `
      <div style="display:flex;gap:20px;flex-wrap:wrap;">
        <div
          v-for="item in icons"
          :key="item.label"
          style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px;border:1px solid #e4e6eb;border-radius:8px;min-width:64px;"
        >
          <BaseSVGIcon :icon="item.icon" :size="24" color="#1877f2" />
          <span style="font-size:11px;color:#65676b;">{{ item.label }}</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: { description: { story: 'A gallery of Lucide icons rendered through `BaseSVGIcon`.' } },
  },
}
