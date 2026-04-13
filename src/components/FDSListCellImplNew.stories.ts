import type { Meta, StoryObj } from '@storybook/vue3'

import BaseImage from './BaseImage.vue'
import CometDensityModeStateProvider from './CometDensityModeStateProvider.vue'
import FDSListCellImplNew from './FDSListCellImplNew.vue'
import FDSTextPairing from './FDSTextPairing.vue'

const meta: Meta<typeof FDSListCellImplNew> = {
  title: 'Layout/FDSListCellImplNew',
  component: FDSListCellImplNew,
  tags: ['autodocs'],
  argTypes: {
    addOnBottomResponsive: {
      control: 'boolean',
    },
    addOnStartMarginTop: {
      control: 'number',
    },
    contentPaddingHorizontal: {
      control: 'number',
    },
    hasBottomDivider: {
      control: 'boolean',
    },
    nestedSpacing: {
      control: 'number',
    },
    paddingVertical: {
      control: 'number',
    },
    spacingHorizontal: {
      control: 'number',
    },
    spacingVertical: {
      control: 'number',
    },
    verticalAlign: {
      control: 'radio',
      options: ['top', 'center', 'bottom', 'stretch'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/** Source-faithful FDS wrapper around BaseListCell using the default Meta-style spacing variant. */
export const Default: Story = {
  render: () => ({
    components: {
      BaseImage,
      CometDensityModeStateProvider,
      FDSListCellImplNew,
      FDSTextPairing,
    },
    setup: () => ({
      imageSrc: 'https://static.xx.fbcdn.net/rsrc.php/yp/r/WrVGNAPBHOg.webp',
    }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <FDSListCellImplNew>
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

          <template #addOnEnd>
            <div class="flex items-center justify-center rounded-full bg-slate-100 px-3 py-1 text-[12px] font-semibold text-slate-700">
              Open
            </div>
          </template>
        </FDSListCellImplNew>
      </div>
    `,
  }),
}

/** Dynamic spacing example that exercises the helper-generated CSS variable formulas and divider composition. */
export const DynamicSpacing: Story = {
  render: () => ({
    components: {
      BaseImage,
      CometDensityModeStateProvider,
      FDSListCellImplNew,
      FDSTextPairing,
    },
    setup: () => ({
      imageSrc: 'https://static.xx.fbcdn.net/rsrc.php/yp/r/WrVGNAPBHOg.webp',
    }),
    template: `
      <div style="width: 380px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <FDSListCellImplNew
          :add-on-bottom-responsive="true"
          :add-on-start-margin-top="0"
          :content-padding-horizontal="12"
          :has-bottom-divider="true"
          :padding-vertical="10"
          :spacing-horizontal="12"
          :spacing-vertical="8"
        >
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

              <template #meta>
                Assistant updates ready
              </template>
            </FDSTextPairing>
          </CometDensityModeStateProvider>

          <template #addOnBottom>
            <div class="rounded-[12px] bg-slate-100 px-3 py-2 text-[12px] font-medium text-slate-600">
              Dynamic spacing and divider are enabled in this example.
            </div>
          </template>

          <template #addOnEnd>
            <div class="flex items-center justify-center rounded-full bg-slate-900 px-3 py-1 text-[12px] font-semibold text-white">
              Try
            </div>
          </template>
        </FDSListCellImplNew>
      </div>
    `,
  }),
}

/** Dedicated divider example for verifying the optional BaseDivider sibling. */
export const WithBottomDivider: Story = {
  render: () => ({
    components: {
      BaseImage,
      CometDensityModeStateProvider,
      FDSListCellImplNew,
      FDSTextPairing,
    },
    setup: () => ({
      imageSrc: 'https://static.xx.fbcdn.net/rsrc.php/yp/r/WrVGNAPBHOg.webp',
    }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <FDSListCellImplNew :has-bottom-divider="true">
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

              <template #meta>
                Divider enabled
              </template>
            </FDSTextPairing>
          </CometDensityModeStateProvider>
        </FDSListCellImplNew>
      </div>
    `,
  }),
}

/** Exact Meta AI prop shape matching the captured FDSListCellImpl_New configuration. */
export const MetaAIExactProps: Story = {
  render: () => ({
    components: {
      BaseImage,
      CometDensityModeStateProvider,
      FDSListCellImplNew,
      FDSTextPairing,
    },
    setup: () => ({
      imageSrc: 'https://static.xx.fbcdn.net/rsrc.php/yp/r/WrVGNAPBHOg.webp',
    }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <FDSListCellImplNew
          :add-on-start-margin-top="0"
          add-on-start-vertical-align="center"
          :content-padding-horizontal="8"
          :padding-vertical="8"
        >
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
        </FDSListCellImplNew>
      </div>
    `,
  }),
}
