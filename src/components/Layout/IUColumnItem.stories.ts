import type { Meta, StoryObj } from '@storybook/vue3'
import IUColumnItem from '../IUColumnItem.vue'
import IUColumn from '../IUColumn.vue'

/**
 * ## IUColumnItem
 *
 * An **explicit flex item** wrapper inside a Column. A direct port of `CometColumnItem.react`.
 *
 * ### When to use
 * You normally don't need `IUColumnItem` directly — `IUColumn` auto-wraps nested
 * components via context. Use `IUColumnItem` explicitly when you need:
 * - **Error boundary** (`fallback` prop) around a specific column slot
 * - **Suspense** (`placeholder` prop) while an async child loads
 * - **Per-item padding override** different from the column's context default
 * - **Per-item alignment override** different from the column's `align` default
 *
 * ### Key behaviour
 * - Reads `spacing`, `paddingHorizontal`, `align`, `hasDividers` from parent `ColumnContext`
 * - Applies spacing as `margin-top + margin-bottom` (with `:first-child:mt-0` / `:last-child:mb-0`)
 * - Resets `ColumnContext` to `null` for its children
 * - Optionally renders a divider `<hr>` before itself when `hasDividers=true` on the Column
 *
 * ### Props
 * | Prop | Default | Description |
 * |---|---|---|
 * | `expanding` | `false` | `flex-grow + flex-shrink-0 + basis-auto + min-h-0` |
 * | `align` | from context | `alignItems` override for this item |
 * | `verticalAlign` | `"top"` | `justifyContent` inside this item |
 * | `paddingHorizontal` | from context | Per-item horizontal padding override |
 * | `paddingTop` | — | Per-item top padding override |
 * | `paddingVertical` | `0` | Per-item top + bottom padding |
 * | `fallback` | `undefined` | Error boundary |
 * | `placeholder` | `undefined` | Suspense placeholder |
 */
const meta: Meta<typeof IUColumnItem> = {
  title: 'Layout/IUColumnItem',
  component: IUColumnItem,
  tags: ['autodocs'],
  argTypes: {
    expanding: {
      control: 'boolean',
      description: 'flex-grow + flex-shrink-0 + basis-auto + min-h-0',
    },
    align: {
      control: { type: 'select' },
      options: [undefined, 'stretch', 'center', 'end', 'start'],
      description: 'alignItems override for this specific item',
    },
    verticalAlign: {
      control: { type: 'select' },
      options: ['top', 'center', 'bottom', 'space-between'],
      description: 'justifyContent inside this item',
    },
    paddingHorizontal: {
      control: { type: 'select' },
      options: [undefined, 4, 8, 12, 16, 20],
      description: 'Override paddingInline for this item only',
    },
    paddingVertical: {
      control: { type: 'select' },
      options: [0, 4, 8, 12, 16, 20, 24, 40],
      description: 'Override paddingBlock for this item only',
    },
    fallback: {
      description: '`undefined` = no boundary, `null` = silent, VNode/fn = custom error UI',
    },
    placeholder: {
      description: 'Suspense fallback shown while async children are loading',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── Stories ─────────────────────────────────────────────────────────────────

const Card = (label: string, color = '#e8f0fe') =>
  `<div style="background:${color};padding:12px 16px;border-radius:8px;font-size:13px;font-weight:600;color:#333">${label}</div>`

/** Explicit IUColumnItem with padding overrides per item. */
export const Default: Story = {
  render: () => ({
    components: { IUColumn, IUColumnItem },
    template: `
      <IUColumn :spacing="8" style="width:320px;background:#fafafa;border-radius:12px">
        <IUColumnItem :padding-horizontal="4">
          ${Card('padding-horizontal=4', '#e8f0fe')}
        </IUColumnItem>
        <IUColumnItem :padding-horizontal="12">
          ${Card('padding-horizontal=12', '#fce8f3')}
        </IUColumnItem>
        <IUColumnItem :padding-horizontal="20">
          ${Card('padding-horizontal=20', '#e8fef0')}
        </IUColumnItem>
      </IUColumn>
    `,
  }),
}

/** expanding=true makes the item grow to fill the column height. */
export const Expanding: Story = {
  render: () => ({
    components: { IUColumn, IUColumnItem },
    template: `
      <IUColumn :spacing="8" style="width:320px;height:300px;background:#fafafa;border-radius:12px">
        <IUColumnItem>
          ${Card('Fixed height item', '#e8f0fe')}
        </IUColumnItem>
        <IUColumnItem :expanding="true">
          <div style="background:#7c6af7;color:#fff;border-radius:8px;height:100%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600">
            Expanding — grows to fill remaining space
          </div>
        </IUColumnItem>
        <IUColumnItem>
          ${Card('Fixed height item', '#e8fef0')}
        </IUColumnItem>
      </IUColumn>
    `,
  }),
}

/** Custom per-item paddingVertical gives items their own breathing room. */
export const PaddingVertical: Story = {
  render: () => ({
    components: { IUColumn, IUColumnItem },
    template: `
      <IUColumn style="width:320px;background:#fafafa;border-radius:12px">
        <IUColumnItem :padding-vertical="4">
          ${Card('paddingVertical=4', '#e8f0fe')}
        </IUColumnItem>
        <IUColumnItem :padding-vertical="12">
          ${Card('paddingVertical=12', '#fce8f3')}
        </IUColumnItem>
        <IUColumnItem :padding-vertical="24">
          ${Card('paddingVertical=24', '#e8fef0')}
        </IUColumnItem>
      </IUColumn>
    `,
  }),
}

/** Silent error boundary — item disappears cleanly if it throws. */
export const SilentErrorBoundary: Story = {
  render: () => ({
    components: { IUColumn, IUColumnItem },
    template: `
      <IUColumn :spacing="8" style="width:320px;background:#fafafa;border-radius:12px">
        <IUColumnItem>
          ${Card('Always visible', '#e8f0fe')}
        </IUColumnItem>
        <IUColumnItem :fallback="null">
          ${Card('Wrapped in silent boundary — vanishes on error', '#fce8f3')}
        </IUColumnItem>
        <IUColumnItem>
          ${Card('Always visible', '#e8fef0')}
        </IUColumnItem>
      </IUColumn>
    `,
  }),
}
