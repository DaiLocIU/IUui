import type { Meta, StoryObj } from '@storybook/vue3'
import {
  Heart,
  Bell,
  Star,
  Settings,
  Search,
  User,
  Home,
  AlertCircle,
  Trash2,
  Edit,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageCircle,
} from 'lucide-vue-next'
import FDSIcon from './FDSIcon.vue'
import { IconColorMap } from '../composables/useCometIconColors'

const meta: Meta<typeof FDSIcon> = {
  title: 'Base/FDSIcon',
  component: FDSIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**FDSIcon** is the top-level consumer-facing icon primitive.

It wraps \`CometSVGIcon\` (for Lucide SVG components) or \`CometImage\` (for image URL strings), and adds:
- **Token color resolution** — semantic tokens like \`primary\`, \`highlight\`, \`disabled\` are automatically resolved.
- **Disabled state** — forcibly overrides color to \`disabled\` token.
- **Pressable mode** — wraps in \`FDSPressable\` with circular hover overlay and \`scale(0.96)\` press feedback when \`onPress\` or \`linkProps\` is provided.
- **Decorative mode** — \`isDecorative\` auto-applies \`aria-hidden\` on the child icon.
- **Exact a11y logic** — \`alt\`/\`aria-label\` is routed to the correct element depending on pressable vs static mode.
        `,
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: Object.keys(IconColorMap),
    },
    size: {
      control: { type: 'number', min: 12, max: 64, step: 4 },
    },
    disabled: { control: 'boolean' },
    isDecorative: { control: 'boolean' },
    hideHoverOverlay: { control: 'boolean' },
    alt: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof FDSIcon>

const card = 'display:flex;align-items:center;gap:16px;padding:20px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;'
const label = 'font-size:11px;color:#65676B;text-align:center;margin-top:6px;'
const grid = 'display:flex;flex-wrap:wrap;gap:20px;align-items:flex-start;padding:24px;background:#f0f2f5;border-radius:20px;'

// ─── Color Tokens ─────────────────────────────────────────────────────────────

export const TokenColors: Story = {
  render: () => ({
    components: { FDSIcon },
    setup() {
      return {
        Heart,
        tokens: [
          'primary', 'secondary', 'placeholder', 'disabled',
          'highlight', 'positive', 'negative', 'warning',
          'blueLink', 'white',
        ],
      }
    },
    template: `
      <div style="${grid}">
        <div v-for="t in tokens" :key="t" style="display:flex;flex-direction:column;align-items:center;">
          <div style="padding:12px;background:${
            // show white icons on dark bg
            ''
          }${''};border-radius:12px;" :style="t === 'white' ? 'background:#1c1e21;' : 'background:white;border:1px solid #e2e8f0;'">
            <FDSIcon :icon="Heart" :color="t" :size="28" />
          </div>
          <div style="${label}">{{ t }}</div>
        </div>
      </div>
    `,
  }),
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => ({
    components: { FDSIcon },
    setup() {
      return { Bell, sizes: [16, 20, 24, 28, 32, 40, 48] }
    },
    template: `
      <div style="${grid}align-items:flex-end;">
        <div v-for="s in sizes" :key="s" style="display:flex;flex-direction:column;align-items:center;">
          <FDSIcon :icon="Bell" color="primary" :size="s" />
          <div style="${label}">{{ s }}px</div>
        </div>
      </div>
    `,
  }),
}

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const DisabledState: Story = {
  render: () => ({
    components: { FDSIcon },
    setup() {
      return { Star, Heart, Settings }
    },
    template: `
      <div style="${grid}">
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
          <div style="${card}">
            <FDSIcon :icon="Star" color="highlight" :size="28" />
          </div>
          <div style="${label}">enabled (highlight)</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
          <div style="${card}">
            <FDSIcon :icon="Star" color="highlight" :size="28" :disabled="true" />
          </div>
          <div style="${label}">disabled (forced gray)</div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'When `disabled` is true, the color token is forcibly overridden to `"disabled"` regardless of the `color` prop.',
      },
    },
  },
}

// ─── Pressable mode ───────────────────────────────────────────────────────────

export const Pressable: Story = {
  render: () => ({
    components: { FDSIcon },
    setup() {
      return {
        Heart,
        Bell,
        Search,
        handlePress: () => alert('Icon pressed!'),
      }
    },
    template: `
      <div style="${grid}">
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
          <FDSIcon :icon="Heart" color="highlight" :size="24" :on-press="handlePress" alt="Like" />
          <div style="${label}">press me</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
          <FDSIcon :icon="Bell" color="primary" :size="24" :on-press="handlePress" alt="Notifications" />
          <div style="${label}">notifications</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
          <FDSIcon :icon="Search" color="secondary" :size="24" :on-press="handlePress" alt="Search" />
          <div style="${label}">search</div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'When `onPress` is provided, the icon wraps in `FDSPressable` with a circular hover overlay and `scale(0.96)` press feedback. Hover over any icon to see the overlay.',
      },
    },
  },
}

// ─── Link mode ───────────────────────────────────────────────────────────────

export const LinkMode: Story = {
  render: () => ({
    components: { FDSIcon },
    setup() {
      return {
        Home,
        linkProps: { url: 'https://facebook.com', target: '_blank' },
      }
    },
    template: `
      <div style="${grid}">
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
          <FDSIcon :icon="Home" color="blueLink" :size="24" :link-props="linkProps" alt="Go to Facebook" />
          <div style="${label}">link icon</div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'When `linkProps` is provided, the icon renders as an `<a>` tag with full pressable behavior.',
      },
    },
  },
}

// ─── Disabled Pressable ───────────────────────────────────────────────────────

export const DisabledPressable: Story = {
  render: () => ({
    components: { FDSIcon },
    setup() {
      return { Trash2, handlePress: () => alert('Should not fire') }
    },
    template: `
      <div style="${grid}">
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
          <FDSIcon :icon="Trash2" color="negative" :size="24" :on-press="handlePress" alt="Delete" />
          <div style="${label}">enabled</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
          <FDSIcon :icon="Trash2" color="negative" :size="24" :on-press="handlePress" alt="Delete" :disabled="true" />
          <div style="${label}">disabled (no press)</div>
        </div>
      </div>
    `,
  }),
}

// ─── Accessibility ────────────────────────────────────────────────────────────

export const Accessibility: Story = {
  render: () => ({
    components: { FDSIcon },
    setup() {
      return { AlertCircle, ThumbsUp, MessageCircle }
    },
    template: `
      <div style="${grid}">
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
          <FDSIcon :icon="AlertCircle" color="warning" :size="28" alt="Warning: Please review" />
          <div style="${label}">alt label on icon</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
          <FDSIcon :icon="ThumbsUp" color="highlight" :size="28" :is-decorative="true" />
          <div style="${label}">decorative (aria-hidden)</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
          <FDSIcon :icon="MessageCircle" color="primary" :size="28" :on-press="() => {}" alt="Reply to comment" />
          <div style="${label}">pressable (alt on wrapper)</div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
- **Static with \`alt\`**: \`aria-label\` is placed on the SVG element.
- **\`isDecorative\`**: \`aria-hidden="true"\` is applied via \`BaseIsDecorativeContext\`.
- **Pressable with \`alt\`**: \`aria-label\` moves to the \`FDSPressable\` wrapper; the icon itself has no label.
        `,
      },
    },
  },
}

// ─── Toolbar row (real-world usage) ───────────────────────────────────────────

export const ToolbarRow: Story = {
  render: () => ({
    components: { FDSIcon },
    setup() {
      return {
        ThumbsUp,
        MessageCircle,
        Share2,
        Bookmark,
        Edit,
        handleLike: () => alert('Liked!'),
        handleComment: () => alert('Comment!'),
        handleShare: () => alert('Share!'),
        handleSave: () => alert('Saved!'),
      }
    },
    template: `
      <div style="padding:16px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;display:inline-flex;align-items:center;gap:4px;">
        <FDSIcon :icon="ThumbsUp" color="secondary" :size="20" :on-press="handleLike" alt="Like" />
        <FDSIcon :icon="MessageCircle" color="secondary" :size="20" :on-press="handleComment" alt="Comment" />
        <FDSIcon :icon="Share2" color="secondary" :size="20" :on-press="handleShare" alt="Share" />
        <FDSIcon :icon="Bookmark" color="secondary" :size="20" :on-press="handleSave" alt="Save" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'A typical Facebook-style reaction toolbar — each icon is pressable with a circular overlay on hover.',
      },
    },
  },
}

// ─── Image mode ───────────────────────────────────────────────────────────────

export const ImageMode: Story = {
  render: () => ({
    components: { FDSIcon },
    template: `
      <div style="${grid}">
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
          <FDSIcon
            icon="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/240px-Facebook_Logo_%282019%29.png"
            :size="40"
            alt="Facebook logo"
          />
          <div style="${label}">image icon</div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'When `icon` is a string URL, the component renders `CometImage` instead of `CometSVGIcon`.',
      },
    },
  },
}
