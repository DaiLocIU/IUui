import type { Meta, StoryObj } from '@storybook/vue3'
import { Heart, Star, Bell, ArrowRight, ExternalLink, CheckCircle, AlertCircle } from 'lucide-vue-next'
import BaseTextWithIcon from './BaseTextWithIcon.vue'
import CometSVGIcon from './CometSVGIcon.vue'
import FDSBadge from './FDSBadge.vue'

const meta: Meta<typeof BaseTextWithIcon> = {
  title: 'Base/BaseTextWithIcon',
  component: BaseTextWithIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**BaseTextWithIcon** places an icon before and/or after a text run without breaking the line between the icon and the adjacent word.

Key behaviors:
- **No line-break** between icon and adjacent text — uses \`BaseNonBreakingSpace\` with \`white-space: nowrap\` on the icon container.
- **\`iconBefore\`** slot → icon placed before text with a gap after it.
- **\`iconAfter\`** slot → icon placed after text with a gap before it.
- **\`spacing\`** (default \`0.5\`) → gap in \`ch\` units (scales with font).
- **\`spacingPx\`** → gap in exact pixels (overrides \`spacing\`).

Stylex → Tailwind mapping:
| Style | Classes |
|---|---|
| \`iconContainerWeb\` | \`inline whitespace-nowrap\` |
| \`iconWeb\` | \`inline-flex items-center align-middle\` |
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof BaseTextWithIcon>

const frame = 'font-size:15px;line-height:1.3333;color:#1c1e21;padding:20px 24px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;display:inline-flex;align-items:center;max-width:500px;'


// ─── Icon Before ──────────────────────────────────────────────────────────────

export const IconBefore: Story = {
  render: () => ({
    components: { BaseTextWithIcon, CometSVGIcon },
    setup: () => ({ Heart }),
    template: `
      <div style="${frame}">
        <BaseTextWithIcon>
          <template #iconBefore>
            <CometSVGIcon :component="Heart" color="negative" :size="16" />
          </template>
          Liked this post
        </BaseTextWithIcon>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Icon placed before text. The gap between icon and text uses `spacing` (default `0.5ch`). The icon and the word "Liked" will never line-break apart.',
      },
    },
  },
}

// ─── Icon After ───────────────────────────────────────────────────────────────

export const IconAfter: Story = {
  render: () => ({
    components: { BaseTextWithIcon, CometSVGIcon },
    setup: () => ({ ExternalLink }),
    template: `
      <div style="${frame}">
        <BaseTextWithIcon>
          <template #iconAfter>
            <CometSVGIcon :component="ExternalLink" color="blueLink" :size="14" />
          </template>
          Open in new tab
        </BaseTextWithIcon>
      </div>
    `,
  }),
}

// ─── Both Before and After ────────────────────────────────────────────────────

export const BothIcons: Story = {
  render: () => ({
    components: { BaseTextWithIcon, CometSVGIcon },
    setup: () => ({ Star, ArrowRight }),
    template: `
      <div style="${frame}">
        <BaseTextWithIcon>
          <template #iconBefore>
            <CometSVGIcon :component="Star" color="highlight" :size="16" />
          </template>
          <template #iconAfter>
            <CometSVGIcon :component="ArrowRight" color="secondary" :size="14" />
          </template>
          Premium feature
        </BaseTextWithIcon>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Using both `#iconBefore` and `#iconAfter` slots simultaneously.',
      },
    },
  },
}

// ─── Spacing variants ─────────────────────────────────────────────────────────

export const SpacingVariants: Story = {
  render: () => ({
    components: { BaseTextWithIcon, CometSVGIcon },
    setup: () => ({
      Bell,
      variants: [
        { label: 'spacing: 0.25ch', props: { spacing: 0.25 } },
        { label: 'spacing: 0.5ch (default)', props: { spacing: 0.5 } },
        { label: 'spacing: 1ch', props: { spacing: 1 } },
        { label: 'spacingPx: 4px', props: { spacingPx: 4 } },
        { label: 'spacingPx: 12px', props: { spacingPx: 12 } },
      ],
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:24px;background:#f0f2f5;border-radius:20px;">
        <div
          v-for="v in variants"
          :key="v.label"
          style="display:flex;align-items:center;gap:16px;"
        >
          <div style="font-size:11px;color:#65676B;min-width:160px;">{{ v.label }}</div>
          <div style="${frame}padding:12px 16px;">
            <BaseTextWithIcon v-bind="v.props">
              <template #iconBefore>
                <CometSVGIcon :component="Bell" color="primary" :size="16" />
              </template>
              Notifications
            </BaseTextWithIcon>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '`spacing` uses `ch` units (scales with font). `spacingPx` overrides with exact pixels. When `spacingPx` is set, it wins over `spacing`.',
      },
    },
  },
}

// ─── No-break behaviour ───────────────────────────────────────────────────────

export const NoBreakBehaviour: Story = {
  render: () => ({
    components: { BaseTextWithIcon, CometSVGIcon },
    setup: () => ({ CheckCircle }),
    template: `
      <div style="padding:24px;background:#f0f2f5;border-radius:20px;display:flex;flex-direction:column;gap:16px;">
        <div style="font-size:11px;color:#65676B;">
          Resize the window — the icon and "Your" always stay on the same line.
        </div>
        <div style="font-size:15px;line-height:1.6;color:#1c1e21;padding:20px;background:#fff;border-radius:12px;border:1px solid #e2e8f0;max-width:260px;overflow-wrap:break-word;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          <BaseTextWithIcon>
            <template #iconBefore>
              <CometSVGIcon :component="CheckCircle" color="positive" :size="14" />
              Your account has been verified successfully.
            </template>
            Your account has been verified successfully.
          </BaseTextWithIcon>
          More text continues after.
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'The icon container uses `display:inline` + `white-space:nowrap`, so the icon and the first word of adjacent text never break onto separate lines.',
      },
    },
  },
}

export const SameLineWordAndTrailingIcon: Story = {
  render: () => ({
    components: { BaseTextWithIcon, CometSVGIcon },
    setup: () => ({ CheckCircle }),
    template: `
      <div style="padding:24px;background:#f0f2f5;border-radius:20px;display:flex;flex-direction:column;gap:16px;">
        <div style="font-size:11px;color:#65676B;">
          Narrow container test. The final word and the icon should stay glued together on the same line.
        </div>
        <div style="font-size:15px;line-height:1.6;color:#1c1e21;padding:20px;background:#fff;border-radius:12px;border:1px solid #e2e8f0;max-width:280px;overflow-wrap:break-word;">
          Lorem ipsum dolor sit amet, consectetur
          <span style="white-space:nowrap;">
            adipiscing
            <BaseTextWithIcon :spacing="0.5">
              <template #iconAfter>
                <CometSVGIcon :component="CheckCircle" color="positive" :size="14" />
              </template>
              elit.
            </BaseTextWithIcon>
          </span>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Manual same-line test: the last word and the trailing icon are wrapped in a `white-space: nowrap` span so they never split across lines.',
      },
    },
  },
}

// ─── With Badge (FDSTextWithBadge pattern) ───────────────────────────────────

export const WithBadge: Story = {
  render: () => ({
    components: { BaseTextWithIcon, FDSBadge },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:24px;background:#f0f2f5;border-radius:20px;">
        <div style="${frame}">
          <BaseTextWithIcon :spacing="0.5">
            <template #iconAfter>
              <FDSBadge color="red" :size="8" :is-profile-badge="false" />
            </template>
            Notifications
          </BaseTextWithIcon>
        </div>
        <div style="${frame}">
          <BaseTextWithIcon :spacing="0.5">
            <template #iconAfter>
              <FDSBadge color="blue" :size="10" />
            </template>
            Messages
          </BaseTextWithIcon>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'This simulates the `FDSTextWithBadge` pattern with a trailing badge kept inline with the text run.',
      },
    },
  },
}

export const SameLineUsernameAndBadge: Story = {
  render: () => ({
    components: { BaseTextWithIcon, FDSBadge },
    template: `
      <div style="padding:24px;background:#f0f2f5;border-radius:20px;display:flex;flex-direction:column;gap:16px;">
        <div style="font-size:11px;color:#65676B;">
          Narrow container test. The username and badge should stay together with a precise half-character gap.
        </div>
        <div style="font-size:15px;line-height:1.6;color:#1c1e21;padding:20px;background:#fff;border-radius:12px;border:1px solid #e2e8f0;max-width:240px;overflow-wrap:break-word;">
          Suggested account:
          <span style="white-space:nowrap;">
            <BaseTextWithIcon :spacing="0.5">
              <template #iconAfter>
                <FDSBadge color="blue" :size="10" :is-profile-badge="true" />
              </template>
              SomeUsername
            </BaseTextWithIcon>
          </span>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Manual same-line test for the badge case: the username and badge are wrapped in a non-breaking inline span so the whole pair moves together.',
      },
    },
  },
}

// ─── Multiple sizes ───────────────────────────────────────────────────────────

export const MultipleTextSizes: Story = {
  render: () => ({
    components: { BaseTextWithIcon, CometSVGIcon },
    setup: () => ({
      AlertCircle,
      sizes: [
        { fontSize: '12px', iconSize: 12, label: 'Small (12px)' },
        { fontSize: '15px', iconSize: 15, label: 'Body (15px)' },
        { fontSize: '20px', iconSize: 20, label: 'Large (20px)' },
        { fontSize: '28px', iconSize: 28, label: 'Heading (28px)' },
      ],
    }),
    template: `
      <div style="display:inline-flex;flex-direction:column;gap:16px;padding:24px;background:#f0f2f5;border-radius:20px;">
        <div
          v-for="s in sizes"
          :key="s.fontSize"
          style="display:flex;align-items:center;gap:16px;"
        >
          <div style="font-size:11px;color:#65676B;min-width:120px;">{{ s.label }}</div>
          <div style="display:inline-flex;padding:12px 16px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;" :style="{ fontSize: s.fontSize, lineHeight: '1.3333' }">
            <BaseTextWithIcon>
              <template #iconBefore>
                <CometSVGIcon :component="AlertCircle" color="warning" :size="s.iconSize" />
              </template>
              Warning message text
            </BaseTextWithIcon>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'The `0.5ch` default spacing scales with each font size — the gap stays proportional at any text scale.',
      },
    },
  },
}
