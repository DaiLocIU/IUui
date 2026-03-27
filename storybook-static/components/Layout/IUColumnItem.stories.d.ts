import { Meta, StoryObj } from '@storybook/vue3';
import { default as IUColumnItem } from '../IUColumnItem.vue';

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
declare const meta: Meta<typeof IUColumnItem>;
export default meta;
type Story = StoryObj<typeof meta>;
/** Explicit IUColumnItem with padding overrides per item. */
export declare const Default: Story;
/** expanding=true makes the item grow to fill the column height. */
export declare const Expanding: Story;
/** Custom per-item paddingVertical gives items their own breathing room. */
export declare const PaddingVertical: Story;
/** Silent error boundary — item disappears cleanly if it throws. */
export declare const SilentErrorBoundary: Story;
