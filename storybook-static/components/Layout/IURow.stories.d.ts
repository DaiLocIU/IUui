import { Meta, StoryObj } from '@storybook/vue3';
import { default as IURow } from '../IURow.vue';

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
declare const meta: Meta<typeof IURow>;
export default meta;
type Story = StoryObj<typeof meta>;
/** Default row with 3 items and default spacing (12px gap). */
export declare const Default: Story;
/** Spacing tokens from 0 to 32px — control how wide the gap between items is. */
export declare const SpacingTokens: Story;
/** Align children along the main axis (justify-content). */
export declare const Alignment: Story;
/** Vertical alignment of items (align-items). */
export declare const VerticalAlign: Story;
/** Row inside a Column: auto-wraps in IUColumnItem, inherits column spacing. */
export declare const NestedInColumn: Story;
/** Expanding row fills available width (flex-1). */
export declare const Expanding: Story;
/** Direction: forward (ltr) vs backward (rtl / row-reverse). */
export declare const Direction: Story;
/** Equal-width column grid (3 columns = each item is 1/3 width). */
export declare const ColumnGrid: Story;
