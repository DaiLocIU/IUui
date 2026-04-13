import type { Meta, StoryObj } from '@storybook/vue3'

import BaseImage from './BaseImage.vue'
import CometDensityModeStateProvider from './CometDensityModeStateProvider.vue'
import FDSTextPairing from './FDSTextPairing.vue'
import FDSListCellPressable from './FDSListCellPressable.vue'

const noop = () => {}

const meta: Meta<typeof FDSListCellPressable> = {
  title: 'Layout/FDSListCellPressable',
  component: FDSListCellPressable,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

/** Exact Meta-style FDS list cell pressable payload matching the captured bookmark configuration. */
export const MetaAIBookmarkExactProps: Story = {
  render: () => ({
    components: {
      BaseImage,
      CometDensityModeStateProvider,
      FDSTextPairing,
      FDSListCellPressable,
    },
    setup: () => ({
      imageSrc: 'https://static.xx.fbcdn.net/rsrc.php/yp/r/WrVGNAPBHOg.webp',
      pressableProps: {
        addOnEnd: undefined,
        addOnStartMarginTop: 0,
        addOnStartVerticalAlign: 'center',
        linkProps: {
          passthroughProps: {
            ref: 'bookmark',
          },
          prefetchQueriesOnHover: false,
          productAttribution: {
            bookmark_id: 1358015658191005,
            bookmark_type_name: 'meta_ai',
          },
          traceParams: {
            navigation_source: 'bookmark_click',
          },
          url: 'https://www.meta.ai/?utm_source=facebook_bookmarks',
        },
        onHoverIn: undefined,
        onHoverOut: undefined,
        onPress: noop,
        paddingHorizontal: 8,
        paddingVertical: 8,
        selected: false,
        testid: undefined,
      },
    }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <FDSListCellPressable v-bind="pressableProps">
          <template #addOnStart>
            <BaseImage
              :src="imageSrc"
              alt=""
              :draggable="false"
              :width="36"
              :height="36"
            />
          </template>

          <CometDensityModeStateProvider :initial-dense="true">
            <FDSTextPairing
              :level="4"
              :headline-line-limit="2"
              :meta-line-limit="1"
              :reduce-emphasis="true"
            >
              <template #headline>
                Meta AI
              </template>
            </FDSTextPairing>
          </CometDensityModeStateProvider>
        </FDSListCellPressable>
      </div>
    `,
  }),
}
