import type { Meta, StoryObj } from '@storybook/vue3'
import IURow from '../IURow.vue'
import IUColumn from '../IUColumn.vue'

/**
 * ## IURow
 *
 * The primary **horizontal** layout primitive. A direct port of Facebook's `CometRow`.
 *
 * ### Two-layer design
 * - **`IURow`** (this component) — owns spacing/padding tokens
 * - **`IUBaseRow`** (internal) — owns flex-row alignment, direction, wrap
 *
 * ### Auto-wrapping
 * When `<IURow>` is placed inside another `<IURow>` or `<IUColumn>`, it
 * **automatically wraps itself** in the correct item wrapper:
 * - Inside a Row → `IURowItem` (resets Row context, applies flex-item CSS)
 * - Inside a Column → `IUColumnItem` (applies spacing margin, per-item padding)
 *
 * ### Spacing vs Padding
 * | Prop | Effect |
 * |---|---|
 * | `spacing` | `gap-x` + `gap-y` between children (default 12px) |
 * | `spacingHorizontal` | Override horizontal gap only |
 * | `spacingVertical` | Override vertical gap only |
 * | `paddingHorizontal` | Inner padding left+right (auto: 12 top-level, 0 in Column) |
 * | `paddingTop` | Inner padding top (auto: 16 top-level, 0 in Column) |
 * | `paddingVertical` | Inner padding top+bottom |
 *
 * All other props (`align`, `verticalAlign`, `direction`, `wrap`, `columns`, `expanding`)
 * are forwarded directly to `IUBaseRow`.
 */
const meta: Meta<typeof IURow> = {
  title: 'Layout/IURow',
  component: IURow,
  tags: ['autodocs'],
  argTypes: {
    spacing: {
      control: { type: 'select' },
      options: [0, 4, 8, 12, 16, 24, 32],
      description: 'Gap between children (both H and V). Token: 4px base.',
    },
    spacingHorizontal: {
      control: { type: 'select' },
      options: [undefined, 0, 4, 8, 12, 16, 24, 32],
      description: 'Override horizontal gap only.',
    },
    spacingVertical: {
      control: { type: 'select' },
      options: [undefined, 0, 4, 8, 12, 16, 24, 32],
      description: 'Override vertical gap only.',
    },
    paddingHorizontal: {
      control: { type: 'select' },
      options: [undefined, 0, 4, 8, 12, 16, 24, 32],
      description: 'Inner horizontal padding. Auto: 12 at top-level, 0 inside Column.',
    },
    paddingTop: {
      control: { type: 'select' },
      options: [undefined, 0, 4, 8, 12, 16, 24, 40],
      description: 'Inner top padding. Auto: 16 at top-level, 0 inside Column.',
    },
    paddingVertical: {
      control: { type: 'select' },
      options: [undefined, 0, 4, 8, 12, 16, 24, 40],
      description: 'Inner top + bottom padding.',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── Stories ─────────────────────────────────────────────────────────────────

const Box = (label: string, color = '#4f8ef7') =>
  `<div style="background:${color};color:#fff;padding:8px 16px;border-radius:6px;font-size:13px;font-weight:600;white-space:nowrap">${label}</div>`

/** Default row with 3 items and default spacing (12px gap). */
export const Default: Story = {
  render: () => ({
    components: { IURow },
    template: `
      <IURow :padding-top="0" :padding-horizontal="0">
        ${Box('Item A')} ${Box('Item B')} ${Box('Item C')}
      </IURow>
    `,
  }),
}

/** Spacing tokens from 0 to 32px — control how wide the gap between items is. */
export const SpacingTokens: Story = {
  render: () => ({
    components: { IURow },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:16px">
        <div v-for="s in [0,4,8,12,16,24,32]" :key="s">
          <div style="font-size:11px;color:#888;margin-bottom:4px">spacing={{ s }}</div>
          <IURow :spacing="s" :padding-top="0" :padding-horizontal="0">
            ${Box('A','#4f8ef7')} ${Box('B','#7c6af7')} ${Box('C','#e06f6f')}
          </IURow>
        </div>
      </div>
    `,
  }),
}

/** Align children along the main axis (justify-content). */
export const Alignment: Story = {
  render: () => ({
    components: { IURow },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px">
        <div v-for="a in ['start','center','end','justify']" :key="a">
          <div style="font-size:11px;color:#888;margin-bottom:4px">align={{ a }}</div>
          <IURow :align="a" :padding-top="0" :padding-horizontal="0" style="background:#f5f5f5;border-radius:8px;padding:8px">
            ${Box('A','#4f8ef7')} ${Box('B','#7c6af7')}
          </IURow>
        </div>
      </div>
    `,
  }),
}

/** Vertical alignment of items (align-items). */
export const VerticalAlign: Story = {
  render: () => ({
    components: { IURow },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px">
        <div v-for="v in ['top','center','bottom','stretch']" :key="v">
          <div style="font-size:11px;color:#888;margin-bottom:4px">verticalAlign={{ v }}</div>
          <IURow :vertical-align="v" :padding-top="0" :padding-horizontal="0" style="background:#f5f5f5;border-radius:8px;height:80px">
            ${Box('Tall','#4f8ef7')} <div style="background:#7c6af7;color:#fff;padding:4px 16px;border-radius:6px;font-size:13px;font-weight:600">Short</div>
          </IURow>
        </div>
      </div>
    `,
  }),
}

/** Row inside a Column: auto-wraps in IUColumnItem, inherits column spacing. */
export const NestedInColumn: Story = {
  render: () => ({
    components: { IURow, IUColumn },
    template: `
      <IUColumn :spacing="8" :padding-horizontal="12" style="background:#f5f5f5;border-radius:12px;width:400px">
        <IURow :spacing="8" :padding-top="0" :padding-horizontal="0">
          ${Box('Row 1 — A','#4f8ef7')} ${Box('Row 1 — B','#7c6af7')}
        </IURow>
        <IURow :spacing="8" :padding-top="0" :padding-horizontal="0">
          ${Box('Row 2 — A','#e06f6f')} ${Box('Row 2 — B','#e09f4f')}
        </IURow>
        <IURow :spacing="8" :padding-top="0" :padding-horizontal="0">
          ${Box('Row 3 — A','#4fb87c')} ${Box('Row 3 — B','#5bbce0')}
        </IURow>
      </IUColumn>
    `,
  }),
}

/** Expanding row fills available width (flex-1). */
export const Expanding: Story = {
  render: () => ({
    components: { IURow },
    template: `
      <IURow :padding-top="0" :padding-horizontal="0" style="background:#f0f4ff;border-radius:8px;padding:8px">
        ${Box('Fixed','#4f8ef7')}
        <IURow :expanding="true" :spacing="4" :padding-top="0" :padding-horizontal="0" style="background:#e0eaff;border-radius:6px">
          ${Box('Grows','#7c6af7')} ${Box('to fill','#a06af7')}
        </IURow>
        ${Box('Fixed','#4f8ef7')}
      </IURow>
    `,
  }),
}

/** Direction: forward (ltr) vs backward (rtl / row-reverse). */
export const Direction: Story = {
  render: () => ({
    components: { IURow },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px">
        <div>
          <div style="font-size:11px;color:#888;margin-bottom:4px">direction=forward (default)</div>
          <IURow :padding-top="0" :padding-horizontal="0">
            ${Box('1','#4f8ef7')} ${Box('2','#7c6af7')} ${Box('3','#e06f6f')}
          </IURow>
        </div>
        <div>
          <div style="font-size:11px;color:#888;margin-bottom:4px">direction=backward</div>
          <IURow direction="backward" :padding-top="0" :padding-horizontal="0">
            ${Box('1','#4f8ef7')} ${Box('2','#7c6af7')} ${Box('3','#e06f6f')}
          </IURow>
        </div>
      </div>
    `,
  }),
}

/** Equal-width column grid (3 columns = each item is 1/3 width). */
export const ColumnGrid: Story = {
  render: () => ({
    components: { IURow },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px">
        <div v-for="cols in [2,3,4,5]" :key="cols">
          <div style="font-size:11px;color:#888;margin-bottom:4px">columns={{ cols }}</div>
          <IURow :columns="cols" :padding-top="0" :padding-horizontal="0">
            <div v-for="i in cols" :key="i" style="background:#4f8ef7;color:#fff;text-align:center;padding:10px;border-radius:6px;font-size:13px;font-weight:600">Col {{ i }}</div>
          </IURow>
        </div>
      </div>
    `,
  }),
}
