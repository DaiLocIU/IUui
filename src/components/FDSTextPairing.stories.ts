import type { Meta, StoryObj } from '@storybook/vue3'

import CometDensityModeStateProvider from './CometDensityModeStateProvider.vue'
import FDSTextPairing from './FDSTextPairing.vue'

const meta: Meta<typeof FDSTextPairing> = {
  title: 'Typography/FDSTextPairing',
  component: FDSTextPairing,
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 'entityHeader1', 'entityHeader2'],
    },
    metaLocation: {
      control: 'radio',
      options: ['above', 'in-between', 'below'],
    },
    textAlign: {
      control: 'radio',
      options: ['auto', 'center', 'start', 'end'],
    },
    reduceEmphasis: {
      control: 'boolean',
    },
    isPrimaryHeading: {
      control: 'boolean',
    },
    isSemanticHeading: {
      control: 'boolean',
    },
    bodyColor: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    headlineColor: {
      control: 'select',
      options: ['primary', 'secondary', 'highlight'],
    },
    metaColor: {
      control: 'select',
      options: ['secondary', 'tertiary', 'highlight'],
    },
  },
  args: {
    level: 2,
    headline: 'Design systems work best when typography is semantic instead of ad hoc.',
    meta: 'Updated 2 hours ago',
    body: 'FDSTextPairing packages headline, supporting metadata, and optional body copy into a reusable vertical stack with stable hierarchy tokens.',
    metaLocation: 'below',
    textAlign: 'start',
    bodyColor: 'primary',
    headlineColor: 'primary',
    metaColor: 'secondary',
    reduceEmphasis: false,
    isPrimaryHeading: false,
    isSemanticHeading: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

/** Default library-facing composition: one semantic text stack with consistent spacing and token mapping. */
export const Default: Story = {
  render: (args) => ({
    components: { CometDensityModeStateProvider, FDSTextPairing },
    setup: () => ({ args }),
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <CometDensityModeStateProvider :initial-dense="true">
          <FDSTextPairing v-bind="args" />
        </CometDensityModeStateProvider>
      </div>
    `,
  }),
}

/** Meta placement is a first-class design-system behavior: the same content can read as kicker, divider, or caption. */
export const MetaPlacementVariants: Story = {
  render: () => ({
    components: { CometDensityModeStateProvider, FDSTextPairing },
    setup: () => ({
      cards: [
        {
          title: 'Meta Above',
          props: {
            level: 2,
            metaLocation: 'above',
            meta: 'Team workspace',
            headline: 'A kicker-style label frames the main headline before the user reads it.',
            body: 'This is useful when the supporting label sets category or context.',
          },
        },
        {
          title: 'Meta In-Between',
          props: {
            level: 2,
            metaLocation: 'in-between',
            meta: '5 min read',
            headline: 'Meta between headline and body behaves like supporting status or timing information.',
            body: 'This layout is common in cards, feed units, and editorial summaries.',
          },
        },
        {
          title: 'Meta Below',
          props: {
            level: 2,
            metaLocation: 'below',
            meta: 'Edited yesterday',
            headline: 'Meta under the body reads more like caption or secondary detail.',
            body: 'This is the default React behavior mirrored in the Vue port.',
          },
        },
      ],
    }),
    template: `
      <div style="display:grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px;">
        <div
          v-for="card in cards"
          :key="card.title"
          style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;"
        >
          <div style="margin-bottom: 12px; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #64748b;">
            {{ card.title }}
          </div>
          <CometDensityModeStateProvider :initial-dense="true">
            <FDSTextPairing v-bind="card.props" />
          </CometDensityModeStateProvider>
        </div>
      </div>
    `,
  }),
}

/** Level and emphasis drive token selection, so consumers can scale one primitive across dense lists and large headers. */
export const HierarchyScale: Story = {
  render: () => ({
    components: { CometDensityModeStateProvider, FDSTextPairing },
    setup: () => ({
      variants: [
        {
          title: 'Level 1',
          props: {
            level: 1,
            meta: 'Hero surface',
            headline: 'Largest pairing level for prominent page entry points.',
            body: 'Use this when the pairing is carrying the main screen hierarchy.',
          },
        },
        {
          title: 'Level 3 Reduced',
          props: {
            level: 3,
            reduceEmphasis: true,
            meta: 'Dense module',
            headline: 'Reduced emphasis softens the headline without changing layout semantics.',
            body: 'Useful when the headline should not overpower surrounding content.',
          },
        },
        {
          title: 'Entity Header',
          props: {
            level: 'entityHeader1',
            metaLocation: 'above',
            meta: 'Creator profile',
            headline: 'Entity header levels map to a different token family.',
            body: 'That makes the component reusable for profile, page, or object headers.',
          },
        },
      ],
    }),
    template: `
      <div style="display:grid; gap: 16px;">
        <div
          v-for="variant in variants"
          :key="variant.title"
          style="padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;"
        >
          <div style="margin-bottom: 10px; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #64748b;">
            {{ variant.title }}
          </div>
          <CometDensityModeStateProvider :initial-dense="true">
            <FDSTextPairing v-bind="variant.props" />
          </CometDensityModeStateProvider>
        </div>
      </div>
    `,
  }),
}

/** Headline add-ons keep the main text tokens while reserving a dedicated slot for badges or status UI. */
export const WithHeadlineAddOn: Story = {
  render: () => ({
    components: { CometDensityModeStateProvider, FDSTextPairing },
    setup: () => ({
      addOn: {
        template: `
          <span
            style="
              display:inline-flex;
              align-items:center;
              height:20px;
              padding:0 8px;
              border-radius:999px;
              background:#dbeafe;
              color:#1d4ed8;
              font-size:11px;
              font-weight:700;
              letter-spacing:0.02em;
              text-transform:uppercase;
            "
          >
            Beta
          </span>
        `,
      },
    }),
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <CometDensityModeStateProvider :initial-dense="true">
          <FDSTextPairing
            :level="2"
            meta="Component API"
            headline="Headline add-ons let the primary label carry status without rebuilding the layout."
            :headline-add-on="addOn"
            body="This mirrors the React branch that swaps in FDSHeadlineWithAddOn when add-on content exists."
            meta-location="in-between"
          />
        </CometDensityModeStateProvider>
      </div>
    `,
  }),
}

/** Truncation stays delegated to the underlying text primitives, so long copy can clamp per role without changing the pairing layout. */
export const TruncatedContent: Story = {
  render: () => ({
    components: { CometDensityModeStateProvider, FDSTextPairing },
    setup: () => ({
      headlineTooltip:
        'A long headline that overflows its line limit should still preserve the pairing hierarchy and reveal its full value on hover.',
      metaTooltip:
        'A long metadata string can be clamped independently from headline and body content.',
      bodyTooltip:
        'Body copy can also truncate without forcing the headline or meta block to change order or styling.',
    }),
    template: `
      <div style="width: 280px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <CometDensityModeStateProvider :initial-dense="true">
          <FDSTextPairing
            :level="3"
            meta="A very long metadata string that should clamp independently from the headline and body copy"
            :meta-line-limit="1"
            :meta-truncation-tooltip="metaTooltip"
            headline="A long headline that demonstrates how truncation works inside the pairing without breaking the overall text hierarchy"
            :headline-line-limit="2"
            :headline-truncation-tooltip="headlineTooltip"
            body="A long body paragraph that intentionally exceeds the available width so the story can show independent truncation rules on each text role inside the same component."
            :body-line-limit="3"
            :body-truncation-tooltip="bodyTooltip"
            meta-location="in-between"
          />
        </CometDensityModeStateProvider>
      </div>
    `,
  }),
}

/** Headline-only reduced emphasis variant for dense surfaces where meta is intentionally omitted. */
export const ReducedEmphasisHeadlineOnly: Story = {
  args: {
    headline: 'Lê Đại Lộc',
    headlineLineLimit: 2,
    level: 4,
    meta: undefined,
    metaColor: undefined,
    metaLineLimit: 1,
    reduceEmphasis: true,
    body: undefined,
  },
  render: (args) => ({
    components: { CometDensityModeStateProvider, FDSTextPairing },
    setup: () => ({ args }),
    template: `
      <div style="width: 220px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <CometDensityModeStateProvider :initial-dense="true">
          <FDSTextPairing v-bind="args" />
        </CometDensityModeStateProvider>
      </div>
    `,
  }),
}
