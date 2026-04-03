import type { Meta, StoryObj } from '@storybook/vue3'

import CometBookmarkListItem from './CometBookmarkListItem.vue'

/**
 * ## CometBookmarkListItem
 *
 * `CometBookmarkListItem` is a bookmark-row primitive built on the FDS list
 * cell pressable shell. It keeps the row reusable while adding a tiny adapter
 * for the common leading image-or-initial tile used in bookmark surfaces.
 *
 * These stories focus on the UI contract only: row anatomy, add-on overrides,
 * selection, navigation semantics, and the built-in leading visual adapter.
 */
const meta: Meta<typeof CometBookmarkListItem> = {
  title: 'Primitives/CometBookmarkListItem',
  component: CometBookmarkListItem,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const surfaceWrap =
  'padding: 24px; background: #f8fafc; font: 14px/1.5 ui-sans-serif, system-ui;'
const listWrap = 'list-style:none; margin:0; padding:24px; background:#e2e8f0;'

/**
 * Behavior: Shows the default bookmark row using the built-in image-or-initial adapter for the leading visual.
 * Benefit: Establishes the common bookmark-row path without forcing callers to hand-build the start tile for every usage.
 * Use when: You have bookmark-like data and want a reusable row primitive that already knows how to render the standard leading tile.
 */
export const DefaultRow: Story = {
  render: () => ({
    components: { CometBookmarkListItem },
    template: `
      <ul style="${listWrap}">
        <CometBookmarkListItem
          name="Design systems"
          meta="Shared primitives and migration progress"
          fallback-initial="D"
        />
      </ul>
    `,
  }),
}

/**
 * Behavior: Shows an explicit `addOnStart` override winning over the built-in bookmark-data adapter.
 * Benefit: Confirms the primitive can still be used like the React source when the caller needs full control over the leading visual.
 * Use when: You need the bookmark row shell but want to supply a custom icon, badge, or avatar instead of the default adapter tile.
 */
export const ExplicitAddOnStartOverride: Story = {
  render: () => ({
    components: { CometBookmarkListItem },
    template: `
      <ul style="${listWrap}">
        <CometBookmarkListItem
          name="Team shortcuts"
          meta="Custom leading add-on provided by the caller"
          :add-on-start="{ template: '<div style=&quot;display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:12px;background:#0f172a;color:white;font-size:12px;font-weight:700;&quot;>TS</div>' }"
          fallback-initial="T"
        />
      </ul>
    `,
  }),
}

/**
 * Behavior: Shows the selected state flowing through the bookmark row while preserving the same text-pairing and leading visual composition.
 * Benefit: Makes it easy to compare the normal row against the selected branch without changing the bookmark-specific content contract.
 * Use when: You need a bookmark-like navigation row that can represent an active or currently selected destination.
 */
export const SelectedRow: Story = {
  render: () => ({
    components: { CometBookmarkListItem },
    template: `
      <ul style="${listWrap}">
        <CometBookmarkListItem
          name="Saved reports"
          meta="Active destination"
          fallback-initial="S"
          :selected="true"
        />
      </ul>
    `,
  }),
}

/**
 * Behavior: Shows the link-backed path where the same bookmark row stays visually consistent while routing through link semantics.
 * Benefit: Clarifies that the component is still a pressable/navigation primitive rather than a static list item.
 * Use when: You want a reusable bookmark row that should navigate like a link but keep the same row anatomy.
 */
export const LinkBackedRow: Story = {
  render: () => ({
    components: { CometBookmarkListItem },
    template: `
      <ul style="${listWrap}">
        <CometBookmarkListItem
          name="Bookmarks"
          meta="Link-backed bookmark row"
          fallback-initial="B"
          :link-props="{ url: '/bookmarks' }"
        />
      </ul>
    `,
  }),
}

/**
 * Behavior: Shows a trailing add-on living on the end side of the row while the leading visual still comes from the bookmark adapter.
 * Benefit: Demonstrates the full row anatomy consumers can assemble without leaving the primitive.
 * Use when: You need bookmark rows with counts, badges, timestamps, or other secondary UI on the trailing edge.
 */
export const WithTrailingAddOn: Story = {
  render: () => ({
    components: { CometBookmarkListItem },
    template: `
      <ul style="${listWrap}">
        <CometBookmarkListItem
          name="Notifications"
          meta="Unread activity in your workspace"
          fallback-initial="N"
          :add-on-end="{ template: '<span style=&quot;display:inline-flex;align-items:center;height:24px;padding:0 10px;border-radius:999px;background:#eff6ff;color:#1d4ed8;font-size:11px;font-weight:700;&quot;>12 new</span>' }"
        />
      </ul>
    `,
  }),
}

/**
 * Behavior: Shows long headline and meta strings clamping through the underlying text-pairing component without breaking the row shell.
 * Benefit: Makes the bookmark-row text policy visible for dense rail and menu surfaces where copy length is unpredictable.
 * Use when: You need confidence that long bookmark labels still fit inside the primitive without custom truncation code.
 */
export const LongCopyBehavior: Story = {
  render: () => ({
    components: { CometBookmarkListItem },
    template: `
      <ul style="${listWrap}">
        <CometBookmarkListItem
          name="A bookmark row with a deliberately long title that should clamp through the text pairing component"
          meta="A long metadata string that demonstrates how secondary copy remains readable without blowing up the row layout"
          :meta-line-limit="1"
          fallback-initial="L"
        />
      </ul>
    `,
  }),
}

/**
 * Behavior: Compares the image-backed adapter path with the fallback-initial path side by side.
 * Benefit: Makes the tiny bookmark-data adapter explicit so consumers know when they can rely on built-in leading visuals.
 * Use when: You want to verify how the primitive behaves with real bookmark imagery versus text-only fallback data.
 */
export const ImageVsFallbackInitial: Story = {
  render: () => ({
    components: { CometBookmarkListItem },
    template: `
      <ul style="${surfaceWrap}">
        <CometBookmarkListItem
          name="Travel board"
          meta="Image-backed start tile"
          image-src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80"
          image-alt="Travel board"
        />
        <CometBookmarkListItem
          name="Design board"
          meta="Fallback initial start tile"
          fallback-initial="D"
        />
      </ul>
    `,
  }),
}
