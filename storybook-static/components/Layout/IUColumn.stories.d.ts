import { Meta, StoryObj } from '@storybook/vue3';
import { default as IUColumn } from '../IUColumn.vue';

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
declare const meta: Meta<typeof IUColumn>;
export default meta;
type Story = StoryObj<typeof meta>;
/** Default column with 3 items. spacing=8 provides a gap between them. */
export declare const Default: Story;
/** Spacing tokens — gap applied via margin between items. */
export declare const SpacingTokens: Story;
/** hasDividers adds an hr separator before each item. */
export declare const WithDividers: Story;
/** verticalAlign controls justifyContent on the inner div. Requires fixed height. */
export declare const VerticalAlignment: Story;
/** Nested IUColumn inside another — auto-wraps in IUColumnItem. */
export declare const NestedColumns: Story;
/** paddingHorizontal is inherited by all IUColumnItem children from context. */
export declare const PaddingFromContext: Story;
