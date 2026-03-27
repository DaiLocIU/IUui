import { Meta, StoryObj } from '@storybook/vue3';
import { default as IURowItem } from '../IURowItem.vue';

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
declare const meta: Meta<typeof IURowItem>;
export default meta;
type Story = StoryObj<typeof meta>;
/** Explicit IURowItem usage inside a Row — controls expanding per slot. */
export declare const Default: Story;
/** Error boundary — when fallback=null the slot renders nothing on error. */
export declare const SilentErrorBoundary: Story;
/** verticalAlign — alignSelf override per item. */
export declare const VerticalAlign: Story;
