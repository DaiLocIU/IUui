import type { Meta, StoryObj } from '@storybook/vue3'

import BaseImage from '../BaseImage.vue'
import CometPressableOverlay from '../CometPressableOverlay.vue'
import CometDensityModeStateProvider from '../CometDensityModeStateProvider.vue'
import FDSListCellImplNew from '../FDSListCellImplNew.vue'
import FDSTextPairing from '../FDSTextPairing.vue'
import WebPressable from './WebPressable.vue'
import type { StyleCapableValue } from '../../utils/resolveStyling'

const meta: Meta<typeof WebPressable> = {
  title: 'Components/WebPressable',
  component: WebPressable,
  tags: ['autodocs'],
  argTypes: {
    accessibilityRole: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    suppressFocusRing: {
      control: 'boolean',
    },
    tabbable: {
      control: 'boolean',
    },
  },
  args: {
    accessibilityRole: 'button',
    disabled: false,
    suppressFocusRing: false,
    tabbable: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

const noop = () => {}

/**
 * Source mapping for the provided Stylex payload:
 * - radii inherit tokens -> arbitrary border radius classes
 * - x87ps6o -> -webkit-user-select:none
 * - x1lku1pv:hover -> hover:no-underline
 * - display tokens were overridden several times in Stylex:
 *   inline-flex -> flex -> inline-block -> block
 *   final Stylex winner is `display:block`, so the Tailwind version keeps only `block`
 * - x1a2a7pz -> outline:none
 */
const exactMetaLinkXStyle: StyleCapableValue = [
  [
    '[border-start-start-radius:inherit]',
    '[border-start-end-radius:inherit]',
    '[border-end-end-radius:inherit]',
    '[border-end-start-radius:inherit]',
    'hover:no-underline',
    'block',
    'outline-none',
  ].join(' '),
  {
    WebkitUserSelect: 'none',
  },
]

const exactMetaLinkProps = {
  accessibilityRelationship: {},
  accessibilityRole: 'link',
  accessibilityState: {
    disabled: false,
  },
  disabled: false,
  draggable: undefined,
  link: {
    attributionsrc: undefined,
    download: undefined,
    rel: undefined,
    target: undefined,
    url: 'https://www.facebook.com/blue.lovepoem',
  },
  onBlur: noop,
  onContextMenu: noop,
  onFocus: noop,
  onFocusChange: noop,
  onFocusVisibleChange: noop,
  onHoverChange: noop,
  onHoverEnd: noop,
  onHoverMove: noop,
  onHoverStart: noop,
  onPress: noop,
  onPressChange: noop,
  onPressStart: noop,
  preventDefault: true,
  style: {},
  suppressFocusRing: true,
  xstyle: exactMetaLinkXStyle
} as const

/** Basic button-like pressable using the built-in WebPressable defaults plus caller classes. */
export const Default: Story = {
  render: (args) => ({
    components: { WebPressable },
    setup: () => ({ args }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: #f8fafc;">
        <WebPressable
          v-bind="args"
          class="rounded-[16px] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
        >
          Open composer
        </WebPressable>
      </div>
    `,
  }),
}

/** Scoped slot consumers can render directly from the pressable state object. */
export const StateSlot: Story = {
  render: (args) => ({
    components: { WebPressable },
    setup: () => ({ args }),
    template: `
      <div style="width: 380px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <WebPressable
          v-bind="args"
          class="rounded-[18px] border border-slate-200 px-4 py-4 transition-colors"
          :xstyle="[
            'bg-white',
            {
              'bg-slate-50': false,
            },
          ]"
        >
          <template #default="{ pressed, hovered, focused, focusVisible, disabled }">
            <div class="space-y-3">
              <div class="text-sm font-semibold text-slate-900">
                Interaction state
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div>pressed: {{ pressed }}</div>
                <div>hovered: {{ hovered }}</div>
                <div>focused: {{ focused }}</div>
                <div>focusVisible: {{ focusVisible }}</div>
                <div>disabled: {{ disabled }}</div>
              </div>
              <div
                class="rounded-[12px] border border-dashed border-slate-300 px-3 py-2 text-xs text-slate-500"
              >
                Use mouse, keyboard Tab, Enter, and Space to inspect behavior.
              </div>
            </div>
          </template>
        </WebPressable>
      </div>
    `,
  }),
}

/** When link props are present, WebPressable upgrades to anchor semantics and preserves link attributes. */
export const Link: Story = {
  render: () => ({
    components: { WebPressable },
    setup: () => ({
      link: {
        url: 'https://example.com',
        rel: 'noreferrer',
        target: '_blank',
      },
    }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <WebPressable
          accessibility-role="link"
          :link="link"
          class="rounded-[16px] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-sky-700 transition-colors hover:bg-sky-50"
        >
          Open external help center
        </WebPressable>
      </div>
    `,
  }),
}

/** Disabled state removes anchor activation, exits the tab order, and applies the disabled styling path. */
export const Disabled: Story = {
  args: {
    accessibilityRole: 'button',
    disabled: true,
  },
  render: (args) => ({
    components: { WebPressable },
    setup: () => ({ args }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <WebPressable
          v-bind="args"
          class="rounded-[16px] border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-500"
        >
          Unavailable action
        </WebPressable>
      </div>
    `,
  }),
}

/** Mirrors the provided React prop payload and converts its Stylex xstyle to resolveStyling-friendly Tailwind/style values. */
export const ExactMetaLinkProps: Story = {
  render: () => ({
    components: {
      WebPressable,
      CometPressableOverlay,
      BaseImage,
      CometDensityModeStateProvider,
      FDSListCellImplNew,
      FDSTextPairing,
    },
    setup: () => ({
      props: exactMetaLinkProps,
      imageSrc: 'https://static.xx.fbcdn.net/rsrc.php/yp/r/WrVGNAPBHOg.webp',
    }),
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background: white;">
        <WebPressable
          v-bind="props"
        >
          <template #default="{ hovered, pressed, focusVisible }">
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

            <CometPressableOverlay
              focus-ring-position="inset"
              :hovered="hovered"
              :pressed="pressed"
              :focus-visible="focusVisible"
              :radius="8"
              :show-focus-ring="true"
            />
          </template>
        </WebPressable>
      </div>
    `,
  }),
}
