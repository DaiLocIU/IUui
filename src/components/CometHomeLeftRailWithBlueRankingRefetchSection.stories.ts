import type { Meta, StoryObj } from '@storybook/vue3'
import { defineComponent, ref } from 'vue'

import CometFolderBookmarkListItem from './CometFolderBookmarkListItem.vue'
import CometHomeLeftRailWithBlueRankingRefetchSection from './CometHomeLeftRailWithBlueRankingRefetchSection.vue'

const imageSrc = 'https://static.xx.fbcdn.net/rsrc.php/yp/r/WrVGNAPBHOg.webp'

function buildBookmark(id: string, name: string, overrides: Record<string, unknown> = {}) {
  return {
    id,
    image: { uri: imageSrc },
    name,
    section: 'shortcuts',
    url: `#${id}`,
    ...overrides,
  }
}

const shortcutItems = [
  buildBookmark('1592249071005526', 'Meta AI'),
  buildBookmark('1592249071005527', 'Friends', {
    unreadCount: 3,
    unreadCountString: '3 new',
  }),
  buildBookmark('1592249071005528', 'Groups'),
  buildBookmark('1592249071005529', 'Saved'),
  buildBookmark('1592249071005530', 'Marketplace'),
]

const exploreItems = [
  buildBookmark('644715445650924-1', 'Campus'),
  buildBookmark('644715445650924-2', 'Climate Science Center'),
  buildBookmark('644715445650924-3', 'Events'),
  buildBookmark('644715445650924-4', 'Feeds'),
  buildBookmark('644715445650924-5', 'Fundraisers'),
  buildBookmark('644715445650924-6', 'Gaming Video'),
  buildBookmark('644715445650924-7', 'Memories'),
  buildBookmark('644715445650924-8', 'Messenger Kids'),
  buildBookmark('644715445650924-9', 'Movies'),
  buildBookmark('644715445650924-10', 'Offers'),
]

const meta: Meta = {
  title: 'Comet/CometHomeLeftRailWithBlueRankingRefetchSection',
  component: CometHomeLeftRailWithBlueRankingRefetchSection,
  tags: ['autodocs'],
  args: {
    badgeStyle: 'string',
    items: shortcutItems,
    identityItems: [],
    initialCount: 5,
    section: 'shortcuts',
    sectionHeader: 'Your shortcuts',
    sectionIndex: 1,
    totalShortcutCount: 13,
    useNucleusIcon: false,
    withSeparator: false,
    hasNext: false,
    isLoadingNext: false,
    isRefetching: false,
  },
  argTypes: {
    identityItems: { control: false },
    items: { control: false },
    onEditShortcuts: { action: 'editShortcuts' },
    onLoadMore: { action: 'loadMore' },
    setIsRefetching: { action: 'setIsRefetching' },
  },
}

export default meta

type Story = StoryObj<typeof meta>

const card =
  'width: 360px; padding-block: 20px; border: 1px solid #e2e8f0; border-radius: 20px; background: white;'

export const Default: Story = {
  render: (args) => ({
    components: { CometHomeLeftRailWithBlueRankingRefetchSection },
    setup: () => ({ args, card }),
    template: `
      <div :style="card">
        <CometHomeLeftRailWithBlueRankingRefetchSection v-bind="args" />
      </div>
    `,
  }),
}

export const ExploreWithIdentityItem: Story = {
  args: {
    badgeStyle: 'string',
    identityItems: [
      {
        component: CometFolderBookmarkListItem,
        props: {
          badgeStyle: 'dot',
          bookmark: buildBookmark('Ym9va21hcms6MTAwMDA1MjcxMTIwNjgxOjM3MDM5OTQyMzMxODc4Mzo1MDAwMDUyNzExMjA2ODE6OjQ0NjA2OjA6dW5rbm93bg==', 'Meta Verified', {
            unreadCount: 1,
          }),
          index: 0,
          totalShortcutCount: 13,
          useNucleusIcon: false,
        },
      },
    ],
    items: exploreItems.map((item) => ({
      ...item,
      section: 'explore',
    })),
    initialCount: 7,
    section: 'explore',
    sectionHeader: undefined,
    sectionIndex: 0,
    totalShortcutCount: 13,
    useNucleusIcon: false,
    withSeparator: true,
    hasNext: false,
    isLoadingNext: false,
    isRefetching: false,
  },
  render: Default.render,
}

export const ExploreWithLoadingDelay: Story = {
  args: {
    badgeStyle: 'string',
    identityItems: [
      {
        component: CometFolderBookmarkListItem,
        props: {
          badgeStyle: 'dot',
          bookmark: buildBookmark('Ym9va21hcms6MTAwMDA1MjcxMTIwNjgxOjM3MDM5OTQyMzMxODc4Mzo1MDAwMDUyNzExMjA2ODE6OjQ0NjA2OjA6dW5rbm93bg==', 'Meta Verified', {
            unreadCount: 1,
          }),
          index: 0,
          totalShortcutCount: 13,
          useNucleusIcon: false,
        },
      },
    ],
    items: exploreItems.map((item) => ({
      ...item,
      section: 'explore',
    })),
    initialCount: 7,
    section: 'explore',
    sectionHeader: undefined,
    sectionIndex: 0,
    totalShortcutCount: 13,
    useNucleusIcon: false,
    withSeparator: true,
    hasNext: true,
    isLoadingNext: false,
    isRefetching: false,
  },
  render: (args) =>
    defineComponent({
      components: { CometHomeLeftRailWithBlueRankingRefetchSection },
      setup() {
        const isLoadingNext = ref(false)
        const hasNext = ref(true)

        function handleLoadMore(_count: number, options?: { onComplete?: () => void }) {
          isLoadingNext.value = true

          window.setTimeout(() => {
            isLoadingNext.value = false
            hasNext.value = false
            options?.onComplete?.()
          }, 500)
        }

        return {
          args,
          card,
          handleLoadMore,
          hasNext,
          isLoadingNext,
        }
      },
      template: `
        <div :style="card">
          <CometHomeLeftRailWithBlueRankingRefetchSection
            v-bind="args"
            :has-next="hasNext"
            :is-loading-next="isLoadingNext"
            :on-load-more="handleLoadMore"
          />
        </div>
      `,
    }),
}
