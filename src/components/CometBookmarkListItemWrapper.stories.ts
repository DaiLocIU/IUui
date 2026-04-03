import type { Meta, StoryObj } from '@storybook/vue3'
import { defineComponent, h, ref, watchEffect } from 'vue'

import CometBookmarkListItemWrapper from './CometBookmarkListItemWrapper.vue'

/**
 * ## CometBookmarkListItemWrapper
 *
 * `CometBookmarkListItemWrapper` is the strict bookmark-data adapter over the
 * reusable bookmark row primitive. It turns a raw bookmark-shaped object into
 * the row UI while preserving the render gates and selected-state derivation
 * from the React wrapper.
 *
 * These stories focus on the UI adapter contract only: data mapping, strict
 * gating, selected-state derivation, and leading-visual resolution.
 */
const meta: Meta<typeof CometBookmarkListItemWrapper> = {
  title: 'Primitives/CometBookmarkListItemWrapper',
  component: CometBookmarkListItemWrapper,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const listWrap =
  'list-style:none; margin:0; padding:24px; background:#e2e8f0; border-radius:16px;'
const surfaceWrap =
  'padding:24px; background:#f8fafc; font:14px/1.5 ui-sans-serif, system-ui;'
const statusPanel =
  'margin-top:12px; border-radius:12px; background:#ffffff; border:1px solid #cbd5e1; padding:12px; font-size:12px; color:#475569;'

function createBookmark(
  overrides: Record<string, unknown> = {},
): Record<string, unknown> {
  return {
    id: 'bookmark-1',
    title: 'Saved designs',
    subtitle: 'Shared primitives and migration progress',
    url: '/design-system',
    section: 'PAGE',
    fallback_initial: 'S',
    ...overrides,
  }
}

function renderBookmarkStory(
  props: Record<string, unknown>,
  options: {
    observeRender?: boolean
    statusText?: (rendered: boolean) => string
  } = {},
) {
  return defineComponent({
    name: 'CometBookmarkListItemWrapperStory',
    setup() {
      const rootRef = ref<HTMLElement | null>(null)
      const rendered = ref(false)

      if (options.observeRender) {
        watchEffect(() => {
          rendered.value = rootRef.value?.querySelector('li') != null
        })
      }

      return () =>
        h('div', { ref: rootRef, style: surfaceWrap }, [
          h(
            'ul',
            { style: listWrap },
            [h(CometBookmarkListItemWrapper, props)],
          ),
          options.observeRender
            ? h(
                'div',
                { style: statusPanel },
                options.statusText?.(rendered.value) ??
                  `rendered=${String(rendered.value)}`,
              )
            : null,
        ])
    },
  })
}

/**
 * Behavior: Shows the default bookmark-object path where the wrapper adapts raw bookmark data into the shared bookmark row primitive.
 * Benefit: Establishes the wrapper as a real data adapter instead of making callers flatten bookmark data by hand before rendering.
 * Use when: You already have bookmark-shaped data and want the standard row UI without rebuilding the mapping layer in each parent surface.
 */
export const DefaultBookmarkObject: Story = {
  render: () =>
    renderBookmarkStory({
      bookmark: createBookmark(),
    }),
}

/**
 * Behavior: Shows the selected branch being derived from bookmark data when the item represents news feed and the current tab key is `home`.
 * Benefit: Makes the wrapper-level selected-state rule visible so callers do not have to manually restate the same selection logic everywhere.
 * Use when: You want bookmark rows to become active automatically from route-aware data instead of pushing `selected` down yourself.
 */
export const SelectedFromData: Story = {
  render: () =>
    renderBookmarkStory({
      bookmark: createBookmark({
        id: 'bookmark-home',
        is_news_feed: true,
        title: 'Home',
      }),
      currentTabKey: 'home',
    }),
}

/**
 * Behavior: Shows the strict hidden-bookmark gate where the wrapper returns nothing instead of rendering a partial row.
 * Benefit: Makes the adapter contract explicit by proving that hidden bookmarks are removed before they reach the row primitive.
 * Use when: You need wrapper behavior that matches product data rules rather than best-effort rendering of every bookmark object.
 */
export const HiddenBookmarkGate: Story = {
  render: () =>
    renderBookmarkStory(
      {
        bookmark: createBookmark({
          has_user_hidden: true,
        }),
      },
      {
        observeRender: true,
        statusText: (rendered) => `hidden bookmark rendered=${String(rendered)}`,
      },
    ),
}

/**
 * Behavior: Shows the strict missing-leading-visual gate where the wrapper refuses to render without an effective start add-on source.
 * Benefit: Surfaces the adapter’s required UI inputs so missing image, sprite, and fallback data fail visibly in review instead of silently degrading.
 * Use when: You need to confirm that incomplete bookmark data is filtered before reaching the shared bookmark row primitive.
 */
export const MissingLeadingVisualGate: Story = {
  render: () =>
    renderBookmarkStory(
      {
        bookmark: createBookmark({
          fallback_initial: null,
          image: null,
          image_url: null,
          bookmark_icon_sprite: null,
        }),
      },
      {
        observeRender: true,
        statusText: (rendered) =>
          `missing leading visual rendered=${String(rendered)}`,
      },
    ),
}

/**
 * Behavior: Shows the optional trailing add-on path while the wrapper still derives the rest of the row from the bookmark object.
 * Benefit: Demonstrates that parents can attach secondary UI like counts or badges without giving up the wrapper’s data-adapter role.
 * Use when: You want bookmark rows that carry trailing metadata or actions while still being driven from a single bookmark object.
 */
export const WithTrailingAddOn: Story = {
  render: () =>
    renderBookmarkStory({
      addOnEnd: {
        template:
          '<span style="display:inline-flex;align-items:center;height:24px;padding:0 10px;border-radius:999px;background:#eff6ff;color:#1d4ed8;font-size:11px;font-weight:700;">8 new</span>',
      },
      bookmark: createBookmark({
        title: 'Notifications',
      }),
    }),
}

/**
 * Behavior: Shows the link-backed path where the wrapper derives navigation semantics directly from the bookmark URL.
 * Benefit: Clarifies that callers can pass bookmark data only once and still get the expected navigation branch on the underlying pressable row.
 * Use when: You want a data-adapter layer that preserves the bookmark’s destination without flattening `linkProps` yourself.
 */
export const LinkBackedRow: Story = {
  render: () =>
    renderBookmarkStory({
      bookmark: createBookmark({
        title: 'Bookmarks',
        url: '/bookmarks',
      }),
    }),
}

/**
 * Behavior: Compares the image-backed leading visual against the fallback-initial leading visual while keeping the same wrapper-level data contract.
 * Benefit: Makes the wrapper’s start-visual resolution easy to inspect without switching to the lower-level row primitive directly.
 * Use when: You want to verify how bookmark data with imagery differs from bookmark data that only carries fallback start-tile information.
 */
export const ImageVsFallbackLeadingVisual: Story = {
  render: () =>
    defineComponent({
      name: 'CometBookmarkListItemWrapperImageVsFallbackStory',
      setup() {
        return () =>
          h('div', { style: surfaceWrap }, [
            h(
              'ul',
              { style: listWrap },
              [
                h(CometBookmarkListItemWrapper, {
                  bookmark: createBookmark({
                    id: 'bookmark-image',
                    image_url:
                      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80',
                    title: 'Travel board',
                  }),
                }),
                h(CometBookmarkListItemWrapper, {
                  bookmark: createBookmark({
                    id: 'bookmark-fallback',
                    fallback_initial: 'D',
                    image_url: null,
                    title: 'Design board',
                  }),
                }),
              ],
            ),
          ])
      },
    }),
}
