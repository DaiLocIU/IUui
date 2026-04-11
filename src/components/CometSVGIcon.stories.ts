import type { Meta, StoryObj } from '@storybook/vue3';
import { Heart, Bell, Star, Settings, Info, AlertCircle, ShoppingCart, User } from 'lucide-vue-next';
import CometSVGIcon from './CometSVGIcon.vue';
import { IconColorMap } from '../composables/useCometIconColors';

const meta: Meta<typeof CometSVGIcon> = {
  title: 'Base/CometSVGIcon',
  component: CometSVGIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**CometSVGIcon** is a mid-level icon primitive that bridges the gap between raw SVG rendering and theme-aware styling.

It adds three primary features on top of \`BaseSVGIcon\`:
1. **Token Colors**: Automatically resolves semantic tokens like \`primary\`, \`placeholder\`, and \`highlight\` to their corresponding CSS variables.
2. **Styling Flags**: Includes built-in support for \`inline\` and \`shadow\` styles using Tailwind.
3. **Dual Mode**: Can either wrap an existing icon component or render a custom SVG structure with a \`viewBox\`.
        `,
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: Object.keys(IconColorMap),
      description: 'Semantic token or raw CSS color',
    },
    size: { control: { type: 'number', min: 12, max: 64, step: 4 } },
    inline: { control: 'boolean' },
    shadow: { control: 'boolean' },
    alt: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CometSVGIcon>;

// ─── Token Colors ─────────────────────────────────────────────────────────────

export const TokenColors: Story = {
  render: () => ({
    components: { CometSVGIcon },
    setup() {
      return {
        Heart,
        tokens: [
          { name: 'primary', token: 'primary' },
          { name: 'highlight', token: 'highlight' },
          { name: 'positive', token: 'positive' },
          { name: 'negative', token: 'negative' },
          { name: 'placeholder', token: 'placeholder' },
          { name: 'disabled', token: 'disabled' },
        ],
      };
    },
    template: `
      <div style="display:flex;gap:24px;flex-wrap:wrap;">
        <div v-for="t in tokens" :key="t.token" style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <CometSVGIcon :component="Heart" :color="t.token" :size="32" />
          <span style="font-size:12px;color:#65676B;">{{ t.name }}</span>
        </div>
      </div>
    `,
  }),
};

// ─── Inline vs Block ──────────────────────────────────────────────────────────

export const InlineMode: Story = {
  render: () => ({
    components: { CometSVGIcon },
    setup() {
      return { Bell };
    },
    template: `
      <div style="border:1px solid #ddd;padding:16px;border-radius:8px;font-size:14px;line-height:1.5;">
        This is an <CometSVGIcon :component="Bell" :inline="true" color="highlight" :size="16" /> inline icon inside text. 
        Compare it to a <CometSVGIcon :component="Bell" :inline="false" color="highlight" :size="16" /> block icon that breaks the flow.
      </div>
    `,
  }),
};

// ─── Shadow Mode ──────────────────────────────────────────────────────────────

export const ShadowMode: Story = {
  args: {
    component: Settings,
    color: 'primary',
    size: 48,
    shadow: true,
  },
  parameters: {
    docs: {
      description: { story: 'Adds a soft drop shadow to the icon, useful for floating or interactive elements.' },
    },
  },
};

// ─── Custom mode (SVG children) ───────────────────────────────────────────────

export const CustomMode: Story = {
  render: () => ({
    components: { CometSVGIcon },
    template: `
      <CometSVGIcon viewBox="0 0 24 24" color="highlight" :size="48">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
        <path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="2" />
      </CometSVGIcon>
    `,
  }),
  parameters: {
    docs: {
      description: { story: 'In Custom mode, you can provide any SVG structure as children by setting a `viewBox`.' },
    },
  },
};

// ─── Sizes Gallery ───────────────────────────────────────────────────────────

export const SizeGallery: Story = {
  render: () => ({
    components: { CometSVGIcon },
    setup() {
      return { Star, sizes: [16, 20, 24, 32, 40, 48] };
    },
    template: `
      <div style="display:flex;align-items:flex-end;gap:20px;">
        <div v-for="s in sizes" :key="s" style="display:flex;flex-direction:column;align-items:center;">
          <CometSVGIcon :component="Star" color="highlight" :size="s" />
          <span style="font-size:11px;margin-top:4px;">{{ s }}px</span>
        </div>
      </div>
    `,
  }),
};

// ─── Accessibility ────────────────────────────────────────────────────────────

export const Accessibility: Story = {
  args: {
    component: Info,
    color: 'blueLink',
    alt: 'Information',
    size: 24,
  },
  parameters: {
    docs: {
      description: { story: 'Providing an `alt` prop sets the `aria-label` for screen readers.' },
    },
  },
};
