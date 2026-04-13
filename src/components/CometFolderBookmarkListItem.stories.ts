import type { Meta, StoryObj } from '@storybook/vue3'

import CometFolderBookmarkListItem from './CometFolderBookmarkListItem.vue'

const imageSrc = 'https://static.xx.fbcdn.net/rsrc.php/yp/r/WrVGNAPBHOg.webp'

const meta: Meta<typeof CometFolderBookmarkListItem> = {
  title: 'Navigation/CometFolderBookmarkListItem',
  component: CometFolderBookmarkListItem,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const frame = 'width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;'

function buildBookmark(overrides: Record<string, unknown> = {}) {
  return {
    id: 'meta-ai',
    image: { uri: imageSrc },
    isNewsFeed: false,
    name: 'Meta AI',
    section: 'shortcuts',
    url: 'https://www.meta.ai/?utm_source=facebook_bookmarks',
    ...overrides,
  }
}

export const ContextSentence: Story = {
  render: () => ({
    components: { CometFolderBookmarkListItem },
    setup: () => ({
      args: {
        badgeStyle: 'string',
        bookmark: buildBookmark({
          contextSentence: 'AI assistant for writing, coding, and research',
          unreadCount: 3,
          unreadCountString: '3 new',
        }),
      },
    }),
    template: `
      <div style="${frame}">
        <ul style="margin: 0; padding: 0; list-style: none;">
          <CometFolderBookmarkListItem v-bind="args" />
        </ul>
      </div>
    `,
  }),
}

export const UnreadDot: Story = {
  render: () => ({
    components: { CometFolderBookmarkListItem },
    setup: () => ({
      args: {
        badgeStyle: 'dot',
        bookmark: buildBookmark({
          unreadCount: 4,
        }),
      },
    }),
    template: `
      <div style="${frame}">
        <ul style="margin: 0; padding: 0; list-style: none;">
          <CometFolderBookmarkListItem v-bind="args" />
        </ul>
      </div>
    `,
  }),
}

export const UnreadStringWithBadge: Story = {
  render: () => ({
    components: { CometFolderBookmarkListItem },
    setup: () => ({
      args: {
        badgeStyle: 'string',
        bookmark: buildBookmark({
          unreadCount: 12,
          unreadCountString: '12 new',
        }),
      },
    }),
    template: `
      <div style="${frame}">
        <ul style="margin: 0; padding: 0; list-style: none;">
          <CometFolderBookmarkListItem v-bind="args" />
        </ul>
      </div>
    `,
  }),
}

export const PlainBookmark: Story = {
  render: () => ({
    components: { CometFolderBookmarkListItem },
    setup: () => ({
      args: {
        badgeStyle: 'none',
        bookmark: buildBookmark(),
      },
    }),
    template: `
      <div style="${frame}">
        <ul style="margin: 0; padding: 0; list-style: none;">
          <CometFolderBookmarkListItem v-bind="args" />
        </ul>
      </div>
    `,
  }),
}

export const HiddenBookmark: Story = {
  render: () => ({
    components: { CometFolderBookmarkListItem },
    setup: () => ({
      args: {
        badgeStyle: 'dot',
        bookmark: buildBookmark({
          hasUserHidden: true,
          unreadCount: 8,
        }),
      },
    }),
    template: `
      <div style="${frame}">
        <div style="margin-bottom: 12px; font-size: 13px; color: #64748b;">
          Hidden bookmarks should render nothing.
        </div>
        <ul style="margin: 0; padding: 0; list-style: none;">
          <CometFolderBookmarkListItem v-bind="args" />
        </ul>
      </div>
    `,
  }),
}

export const MissingImage: Story = {
  render: () => ({
    components: { CometFolderBookmarkListItem },
    setup: () => ({
      args: {
        badgeStyle: 'string',
        bookmark: buildBookmark({
          image: null,
          unreadCountString: '5 new',
        }),
      },
    }),
    template: `
      <div style="${frame}">
        <div style="margin-bottom: 12px; font-size: 13px; color: #64748b;">
          Missing bookmark imagery should render nothing through the wrapper.
        </div>
        <ul style="margin: 0; padding: 0; list-style: none;">
          <CometFolderBookmarkListItem v-bind="args" />
        </ul>
      </div>
    `,
  }),
}
