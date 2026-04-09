import type { Meta, StoryObj } from '@storybook/vue3'

import BaseImage from './BaseImage.vue'
import CometBookmarkListItem from './CometBookmarkListItem.vue'

const noop = () => {}

const meta: Meta<typeof CometBookmarkListItem> = {
  title: 'Navigation/CometBookmarkListItem',
  component: CometBookmarkListItem,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      BaseImage,
      CometBookmarkListItem,
    },
    setup: () => ({
      imageSrc: 'https://static.xx.fbcdn.net/rsrc.php/yp/r/WrVGNAPBHOg.webp',
      args: {
        linkProps: {
          url: 'https://www.meta.ai/?utm_source=facebook_bookmarks',
        },
        metaLineLimit: 1,
        name: 'Meta AI',
        onPress: noop,
        selected: false,
      },
    }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <ul style="margin: 0; padding: 0; list-style: none;">
          <CometBookmarkListItem v-bind="args">
            <template #addOnStart>
              <BaseImage
                :src="imageSrc"
                alt=""
                :draggable="false"
                :width="36"
                :height="36"
              />
            </template>
          </CometBookmarkListItem>
        </ul>
      </div>
    `,
  }),
}

export const Selected: Story = {
  render: () => ({
    components: {
      BaseImage,
      CometBookmarkListItem,
    },
    setup: () => ({
      imageSrc: 'https://static.xx.fbcdn.net/rsrc.php/yp/r/WrVGNAPBHOg.webp',
      args: {
        linkProps: {
          url: 'https://www.meta.ai/?utm_source=facebook_bookmarks',
        },
        meta: 'Pinned shortcut',
        metaLineLimit: 1,
        name: 'Meta AI',
        onPress: noop,
        selected: true,
      },
    }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <ul style="margin: 0; padding: 0; list-style: none;">
          <CometBookmarkListItem v-bind="args">
            <template #addOnStart>
              <BaseImage
                :src="imageSrc"
                alt=""
                :draggable="false"
                :width="36" 
                :height="36"
              />
            </template>
          </CometBookmarkListItem>
        </ul>
      </div>
    `,
  }),
}

export const NoMeta: Story = {
  render: () => ({
    components: {
      BaseImage,
      CometBookmarkListItem,
    },
    setup: () => ({
      imageSrc: 'https://static.xx.fbcdn.net/rsrc.php/yp/r/WrVGNAPBHOg.webp',
      args: {
        linkProps: {
          url: 'https://www.meta.ai/?utm_source=facebook_bookmarks',
        },
        name: 'Meta AI',
        onPress: noop,
        selected: false,
      },
    }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <ul style="margin: 0; padding: 0; list-style: none;">
          <CometBookmarkListItem v-bind="args">
            <template #addOnStart>
              <BaseImage
                :src="imageSrc"
                alt=""
                :draggable="false"
                :width="36"
                :height="36"
              />
            </template>
          </CometBookmarkListItem>
        </ul>
      </div>
    `,
  }),
}

export const MissingAddOnStart: Story = {
  render: () => ({
    components: {
      CometBookmarkListItem,
    },
    setup: () => ({
      args: {
        linkProps: {
          url: 'https://www.meta.ai/?utm_source=facebook_bookmarks',
        },
        meta: 'This should not render',
        name: 'Meta AI',
        onPress: noop,
        selected: false,
      },
    }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <div style="margin-bottom: 12px; font-size: 13px; color: #64748b;">
          The component should render nothing when the <code>addOnStart</code> slot is missing.
        </div>
        <ul style="margin: 0; padding: 0; list-style: none;">
          <CometBookmarkListItem v-bind="args" />
        </ul>
      </div>
    `,
  }),
}
