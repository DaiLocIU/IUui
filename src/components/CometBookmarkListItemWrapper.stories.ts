import type { Meta, StoryObj } from '@storybook/vue3'

import CometBookmarkListItemWrapper from './CometBookmarkListItemWrapper.vue'

const noop = () => {}

const imageSrc = 'https://static.xx.fbcdn.net/rsrc.php/yp/r/WrVGNAPBHOg.webp'

const meta: Meta<typeof CometBookmarkListItemWrapper> = {
  title: 'Navigation/CometBookmarkListItemWrapper',
  component: CometBookmarkListItemWrapper,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      CometBookmarkListItemWrapper,
    },
    setup: () => ({
      args: {
        bookmark: {
          id: 'meta-ai',
          image: { uri: imageSrc },
          isNewsFeed: false,
          name: 'Meta AI',
          section: 'shortcuts',
          url: 'https://www.meta.ai/?utm_source=facebook_bookmarks',
        },
        meta: 'AI assistant',
        metaLineLimit: 1,
        onPress: noop,
      },
    }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <ul style="margin: 0; padding: 0; list-style: none;">
          <CometBookmarkListItemWrapper v-bind="args" />
        </ul>
      </div>
    `,
  }),
}

export const SelectedNewsFeed: Story = {
  render: () => ({
    components: {
      CometBookmarkListItemWrapper,
    },
    setup: () => ({
      args: {
        bookmark: {
          id: 'feed',
          image: { uri: imageSrc },
          isNewsFeed: true,
          name: 'Home',
          section: 'shortcuts',
          url: '/home',
        },
        currentTabKey: 'home',
        meta: 'Selected by route',
        metaLineLimit: 1,
        onPress: noop,
      },
    }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <ul style="margin: 0; padding: 0; list-style: none;">
          <CometBookmarkListItemWrapper v-bind="args" />
        </ul>
      </div>
    `,
  }),
}

export const HiddenBookmark: Story = {
  render: () => ({
    components: {
      CometBookmarkListItemWrapper,
    },
    setup: () => ({
      args: {
        bookmark: {
          hasUserHidden: true,
          id: 'hidden',
          image: { uri: imageSrc },
          name: 'Hidden bookmark',
          url: '/hidden',
        },
      },
    }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <div style="margin-bottom: 12px; font-size: 13px; color: #64748b;">
          Hidden bookmarks should render nothing.
        </div>
        <ul style="margin: 0; padding: 0; list-style: none;">
          <CometBookmarkListItemWrapper v-bind="args" />
        </ul>
      </div>
    `,
  }),
}

export const MissingName: Story = {
  render: () => ({
    components: {
      CometBookmarkListItemWrapper,
    },
    setup: () => ({
      args: {
        bookmark: {
          id: 'missing-name',
          image: { uri: imageSrc },
          url: '/missing-name',
        },
      },
    }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <div style="margin-bottom: 12px; font-size: 13px; color: #64748b;">
          Missing bookmark names should render nothing.
        </div>
        <ul style="margin: 0; padding: 0; list-style: none;">
          <CometBookmarkListItemWrapper v-bind="args" />
        </ul>
      </div>
    `,
  }),
}

export const NoUrlWithTrailingAddOn: Story = {
  render: () => ({
    components: {
      CometBookmarkListItemWrapper,
    },
    setup: () => ({
      args: {
        bookmark: {
          id: 'expandable',
          image: { uri: imageSrc },
          isNewsFeed: false,
          name: 'Expandable bookmark',
          section: 'explore',
          url: null,
        },
        meta: 'Uses onExpand when no URL exists',
        onExpand: noop,
      },
    }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <ul style="margin: 0; padding: 0; list-style: none;">
          <CometBookmarkListItemWrapper v-bind="args">
            <template #addOnEnd>
              <button type="button" style="border:0;background:#e2e8f0;border-radius:999px;padding:8px 10px;font-size:12px;font-weight:600;color:#334155;">
                More
              </button>
            </template>
          </CometBookmarkListItemWrapper>
        </ul>
      </div>
    `,
  }),
}

export const NoUrlAndNoTrailingAddOn: Story = {
  render: () => ({
    components: {
      CometBookmarkListItemWrapper,
    },
    setup: () => ({
      args: {
        bookmark: {
          id: 'missing-url',
          image: { uri: imageSrc },
          isNewsFeed: false,
          name: 'Incomplete bookmark',
          section: 'explore',
          url: null,
        },
      },
    }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <div style="margin-bottom: 12px; font-size: 13px; color: #64748b;">
          Bookmarks without a URL or trailing action should render nothing.
        </div>
        <ul style="margin: 0; padding: 0; list-style: none;">
          <CometBookmarkListItemWrapper v-bind="args" />
        </ul>
      </div>
    `,
  }),
}
