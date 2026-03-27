import type { Meta, StoryObj } from '@storybook/vue3'
import IURowItem from '../IURowItem.vue'
import IURow from '../IURow.vue'

/**
 * ## IURowItem
 *
 * An **explicit flex item** wrapper inside a Row. A direct port of `CometRowItem.react`.
 *
 * ### When to use
 * You normally don't need `IURowItem` directly — `IURow` auto-wraps nested components
 * for you. Use `IURowItem` explicitly when you need:
 * - **Error boundary** (`fallback` prop) around a specific row slot
 * - **Suspense** (`placeholder` prop) while an async child loads
 *
 * ### Key behaviour
 * - Resets `RowContext` to `null` for its children, so nested layouts don't think
 *   they are still direct children of the row.
 * - Delegates flex-item CSS (`flex-grow`, `flex-basis`, column grid, `alignSelf`)
 *   to the internal `IUBaseRowItem`.
 *
 * ### Props
 * | Prop | Default | Description |
 * |---|---|---|
 * | `fallback` | `undefined` | `undefined` = no boundary, `null` = silent, VNode/fn = custom UI |
 * | `placeholder` | `undefined` | Shown via `<Suspense>` while children load |
 *
 * All other props (`expanding`, `columns`, `verticalAlign`, `class`, etc.)
 * are forwarded directly to `IUBaseRowItem`.
 */
const meta: Meta<typeof IURowItem> = {
  title: 'Layout/IURowItem',
  component: IURowItem,
  tags: ['autodocs'],
  argTypes: {
    fallback: {
      description: '`undefined` = no error boundary, `null` = silent, VNode/fn = custom error UI',
    },
    placeholder: {
      description: 'Suspense fallback shown while async children are loading',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Explicit IURowItem usage inside a Row — controls expanding per slot. */
export const Default: Story = {
  render: () => ({
    components: { IURow, IURowItem },
    template: `
      <IURow :padding-top="0" :padding-horizontal="0" style="background:#f5f5f5;border-radius:10px;padding:8px;gap:8px">
        <IURowItem>
          <div style="background:#4f8ef7;color:#fff;padding:10px 16px;border-radius:6px;font-size:13px;font-weight:600">Fixed</div>
        </IURowItem>
        <IURowItem :expanding="true">
          <div style="background:#7c6af7;color:#fff;padding:10px 16px;border-radius:6px;font-size:13px;font-weight:600;text-align:center">Expanding (flex-1)</div>
        </IURowItem>
        <IURowItem>
          <div style="background:#4f8ef7;color:#fff;padding:10px 16px;border-radius:6px;font-size:13px;font-weight:600">Fixed</div>
        </IURowItem>
      </IURow>
    `,
  }),
}

/** Error boundary — when fallback=null the slot renders nothing on error. */
export const SilentErrorBoundary: Story = {
  render: () => ({
    components: { IURow, IURowItem },
    template: `
      <IURow :padding-top="0" :padding-horizontal="0" style="background:#f5f5f5;border-radius:10px;padding:8px;gap:8px">
        <IURowItem>
          <div style="background:#4f8ef7;color:#fff;padding:10px 16px;border-radius:6px;font-size:13px;font-weight:600">Always visible</div>
        </IURowItem>
        <IURowItem :fallback="null">
          <div style="background:#e06f6f;color:#fff;padding:10px 16px;border-radius:6px;font-size:13px;font-weight:600">
            Wrapped in silent error boundary — disappears if it throws
          </div>
        </IURowItem>
      </IURow>
    `,
  }),
}

/** verticalAlign — alignSelf override per item. */
export const VerticalAlign: Story = {
  render: () => ({
    components: { IURow, IURowItem },
    template: `
      <IURow :padding-top="0" :padding-horizontal="0" vertical-align="stretch" style="background:#f5f5f5;border-radius:10px;padding:8px;gap:8px;height:100px">
        <IURowItem vertical-align="top">
          <div style="background:#4f8ef7;color:#fff;padding:8px 14px;border-radius:6px;font-size:13px;font-weight:600">top</div>
        </IURowItem>
        <IURowItem vertical-align="center">
          <div style="background:#7c6af7;color:#fff;padding:8px 14px;border-radius:6px;font-size:13px;font-weight:600">center</div>
        </IURowItem>
        <IURowItem vertical-align="bottom">
          <div style="background:#e06f6f;color:#fff;padding:8px 14px;border-radius:6px;font-size:13px;font-weight:600">bottom</div>
        </IURowItem>
        <IURowItem vertical-align="stretch">
          <div style="background:#4fb87c;color:#fff;padding:8px 14px;border-radius:6px;font-size:13px;font-weight:600;height:100%">stretch</div>
        </IURowItem>
      </IURow>
    `,
  }),
}
