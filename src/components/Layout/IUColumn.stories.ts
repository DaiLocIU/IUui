import type { Meta, StoryObj } from '@storybook/vue3'
import IUColumn from '../IUColumn.vue'
import IUColumnItem from '../IUColumnItem.vue'
import IURow from '../IURow.vue'
/**
 * ## IUColumn
 *
 * The primary **vertical** layout primitive. A direct port of Facebook's `CometColumn`.
 *
 * ### Structure
 * `IUColumn` renders **two divs**:
 * - **Outer** — receives rest props + `expanding`/`paddingVertical`/`paddingTop` styles
 * - **Inner** — `flex-col flex-grow` + `verticalAlign` (justifyContent)
 *
 * Children are provided with a `ColumnContext` carrying:
 * `spacing`, `paddingHorizontal`, `align`, `hasDividers`
 *
 * `IUColumnItem` (auto-used internally or explicitly) reads this context to apply
 * per-item margin gap and horizontal padding automatically.
 *
 * ### Auto-wrapping
 * When nested inside another `<IUColumn>`, the entire column wraps itself in
 * `IUColumnItem { expanding }` automatically.
 *
 * ### Props
 * | Prop | Default | Description |
 * |---|---|---|
 * | `spacing` | — | Gap between items via margin. Tokens: 4–40px |
 * | `paddingHorizontal` | — | Inherited by all child items as default `px` |
 * | `paddingTop` | — | Outer top padding override |
 * | `paddingVertical` | `0` | Outer top + bottom padding |
 * | `align` | — | Default `alignItems` for all `IUColumnItem` children |
 * | `verticalAlign` | `"top"` | `justifyContent` on inner div |
 * | `expanding` | `false` | `flex-grow + flex-shrink-0 + min-h-0` |
 * | `hasDividers` | `false` | Render `<hr>` before each item |
 */
const meta: Meta<typeof IUColumn> = {
  title: 'Layout/IUColumn',
  component: IUColumn,
  tags: ['autodocs'],
  argTypes: {
    spacing: {
      control: { type: 'select' },
      options: [undefined, 4, 8, 12, 16, 20, 24, 32, 40],
      description: 'Gap between child items (margin-based). Token: 4px base.',
    },
    paddingHorizontal: {
      control: { type: 'select' },
      options: [undefined, 4, 8, 12, 16, 20],
      description: 'Inherited by all IUColumnItems as default paddingHorizontal.',
    },
    paddingTop: {
      control: { type: 'select' },
      options: [undefined, 0, 4, 8, 12, 16, 20, 24, 40],
      description: 'Outer top padding override.',
    },
    paddingVertical: {
      control: { type: 'select' },
      options: [0, 4, 8, 12, 16, 20, 24, 40],
      description: 'Outer top + bottom padding.',
    },
    align: {
      control: { type: 'select' },
      options: [undefined, 'stretch', 'center', 'end', 'start'],
      description: 'Default alignItems passed to all IUColumnItems.',
    },
    verticalAlign: {
      control: { type: 'select' },
      options: ['top', 'center', 'bottom', 'space-between'],
      description: 'justifyContent on the inner flex-col div.',
    },
    expanding: {
      control: 'boolean',
      description: 'flex-grow + flex-shrink-0 + min-height:0 on outer div.',
    },
    hasDividers: {
      control: 'boolean',
      description: 'Render a separator line before each child item.',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── Stories ─────────────────────────────────────────────────────────────────

const Card = (label: string, color = '#f5f5f5', height = '') =>
  `<div style="background:${color};padding:12px 16px;border-radius:8px;font-size:13px;font-weight:600;color:#333;${height ? `height:${height};` : ''}display:flex;align-items:center">${label}</div>`

/** Default column with 3 items. spacing=8 provides a gap between them. */
export const Default: Story = {
  render: () => ({
    components: { IUColumn },
    template: `
      <IUColumn :spacing="8" style="width:320px;background:#fafafa;border-radius:12px">
        ${Card('Item A', '#e8f0fe')}
        ${Card('Item B', '#fce8f3')}
        ${Card('Item C', '#e8fef0')}
      </IUColumn>
    `,
  }),
}

/** Spacing tokens — gap applied via margin between items. */
export const SpacingTokens: Story = {
  render: () => ({
    components: { IUColumn },
    template: `
      <div style="display:flex;gap:24px;padding:16px;flex-wrap:wrap">
        <div v-for="s in [4,8,12,16,24]" :key="s" style="flex:1;min-width:140px">
          <div style="font-size:11px;color:#888;margin-bottom:8px;font-weight:600">spacing={{ s }}</div>
          <IUColumn :spacing="s" style="background:#fafafa;border-radius:10px">
            ${Card('A', '#e8f0fe')}
            ${Card('B', '#fce8f3')}
            ${Card('C', '#e8fef0')}
          </IUColumn>
        </div>
      </div>
    `,
  }),
}

/** hasDividers adds an hr separator before each item. */
export const WithDividers: Story = {
  render: () => ({
    components: { IUColumn, IUColumnItem },
    template: `
      <IUColumn :has-dividers="true" :spacing="0" style="width:320px;background:#fff;border-radius:12px;border:1px solid #e0e0e0;overflow:hidden">
        <IUColumnItem>${Card('Profile', '#fff')}</IUColumnItem>
        <IUColumnItem>${Card('Settings', '#fff')}</IUColumnItem>
        <IUColumnItem>${Card('Help & Support', '#fff')}</IUColumnItem>
        <IUColumnItem>${Card('Log out', '#fff')}</IUColumnItem>
      </IUColumn>
    `,
  }),
}

/** verticalAlign controls justifyContent on the inner div. Requires fixed height. */
export const VerticalAlignment: Story = {
  render: () => ({
    components: { IUColumn },
    template: `
      <div style="display:flex;gap:16px;padding:16px">
        <div v-for="v in ['top','center','bottom','space-between']" :key="v" style="flex:1">
          <div style="font-size:11px;color:#888;margin-bottom:8px;font-weight:600">{{ v }}</div>
          <IUColumn :vertical-align="v" :spacing="8" style="height:200px;background:#fafafa;border-radius:10px;border:1px dashed #ddd">
            ${Card('A', '#e8f0fe')}
            ${Card('B', '#fce8f3')}
          </IUColumn>
        </div>
      </div>
    `,
  }),
}

/** Nested IUColumn inside another — auto-wraps in IUColumnItem. */
export const NestedColumns: Story = {
  render: () => ({
    components: { IUColumn, IURow },
    template: `
      <IUColumn :spacing="12" :padding-horizontal="12" style="width:400px;background:#f5f5f5;border-radius:12px">
        ${Card('Header', '#e8f0fe')}
        <IURow :spacing="8" :padding-top="0" :padding-horizontal="0">
          <IUColumn :spacing="8" :expanding="true" style="background:#fff;border-radius:10px">
            ${Card('Left A', '#fafafa')}
            ${Card('Left B', '#fafafa')}
          </IUColumn>
          <IUColumn :spacing="8" :expanding="true" style="background:#fff;border-radius:10px">
            ${Card('Right A', '#fafafa')}
            ${Card('Right B', '#fafafa')}
          </IUColumn>
        </IURow>
        ${Card('Footer', '#e8fef0')}
      </IUColumn>
    `,
  }),
}

/** paddingHorizontal is inherited by all IUColumnItem children from context. */
export const PaddingFromContext: Story = {
  render: () => ({
    components: { IUColumn, IUColumnItem },
    template: `
      <div style="display:flex;gap:16px;padding:16px">
        <div v-for="ph in [0,8,16]" :key="ph" style="flex:1">
          <div style="font-size:11px;color:#888;margin-bottom:8px">paddingHorizontal={{ ph }}</div>
          <IUColumn :spacing="8" :padding-horizontal="ph" style="background:#f5f5f5;border-radius:10px">
            <IUColumnItem>${Card('Item A', '#e8f0fe')}</IUColumnItem>
            <IUColumnItem>${Card('Item B', '#fce8f3')}</IUColumnItem>
          </IUColumn>
        </div>
      </div>
    `,
  }),
}
