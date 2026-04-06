import { defineComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'

import { provideBaseDisabledContext } from '../../system/baseDisabledKeys'
import type { StyleCapableValue } from '../../utils/resolveStyling'
import CometPressable from './CometPressable.vue'
import { provideSuppressInteractiveContext } from './context/SuppressInteractiveContext'
import BaseImage from '../BaseImage.vue'
import CometDensityModeStateProvider from '../CometDensityModeStateProvider.vue'
import FDSListCellImplNew from '../FDSListCellImplNew.vue'
import FDSTextPairing from '../FDSTextPairing.vue'
const noop = () => {}
const exactMetaBookmarkXStyle = [
  'd-block'
] as unknown as StyleCapableValue

const meta: Meta<typeof CometPressable> = {
  title: 'Components/CometPressable',
  component: CometPressable,
  tags: ['autodocs'],
  argTypes: {
    cursorDisabled: { control: 'boolean' },
    disabled: { control: 'boolean' },
    display: {
      control: 'radio',
      options: ['block', 'inline'],
    },
    hideFocusOverlay: { control: 'boolean' },
    hideHoverOverlay: { control: 'boolean' },
    overlayDisabled: { control: 'boolean' },
    suppressFocusRing: { control: 'boolean' },
    testOnly_pressed: { control: 'boolean' },
  },
  args: {
    cursorDisabled: false,
    disabled: false,
    display: 'block',
    hideFocusOverlay: false,
    hideHoverOverlay: false,
    overlayDisabled: false,
    suppressFocusRing: false,
    testOnly_pressed: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const ButtonBranch: Story = {
  render: (args) => ({
    components: { CometPressable },
    setup: () => ({ args }),
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: #f8fafc;">
        <CometPressable
          v-bind="args"
          class="rounded-[18px] border border-slate-200 bg-white px-4 py-4 text-left text-slate-900 shadow-sm transition-colors hover:bg-slate-50"
        >
          <div class="space-y-1">
            <div class="text-sm font-semibold">Open composer</div>
            <div class="text-sm text-slate-500">
              Default branch routes through BaseButton and keeps the Comet overlay behavior.
            </div>
          </div>
        </CometPressable>
      </div>
    `,
  }),
}

export const StateSlot: Story = {
  render: (args) => ({
    components: { CometPressable },
    setup: () => ({ args }),
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <CometPressable
          v-bind="args"
          class="rounded-[18px] border border-slate-200 bg-white px-4 py-4"
        >
          <template #default="{ pressed, hovered, focused, focusVisible, disabled }">
            <div class="space-y-3">
              <div class="text-sm font-semibold text-slate-900">Scoped slot state</div>
              <div class="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div>pressed: {{ pressed }}</div>
                <div>hovered: {{ hovered }}</div>
                <div>focused: {{ focused }}</div>
                <div>focusVisible: {{ focusVisible }}</div>
                <div>disabled: {{ disabled }}</div>
              </div>
              <div class="rounded-[12px] border border-dashed border-slate-300 px-3 py-2 text-xs text-slate-500">
                Use Tab, Enter, Space, and pointer input to inspect the CometPressable state machine.
              </div>
            </div>
          </template>
        </CometPressable>
      </div>
    `,
  }),
}

export const LinkBranch: Story = {
  render: () => ({
    components: { CometPressable },
    setup: () => ({
      linkProps: {
        rel: 'noreferrer',
        target: '_blank',
        url: 'https://example.com',
      },
    }),
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <CometPressable
          :link-props="linkProps"
          class="rounded-[18px] border border-sky-200 bg-sky-50 px-4 py-4 text-left text-sky-900 shadow-sm transition-colors"
        >
          <div class="space-y-1">
            <div class="text-sm font-semibold">Open external help center</div>
            <div class="text-sm text-sky-800/80">
              Suppresses the button path and upgrades the wrapper to BaseLink.
            </div>
          </div>
        </CometPressable>
      </div>
    `,
  }),
}

export const ExactMetaBookmarkProps: Story = {
  render: () => ({
    components: { CometPressable, FDSListCellImplNew, BaseImage, CometDensityModeStateProvider, FDSTextPairing },
    setup: () => ({
      imageSrc: 'https://static.xx.fbcdn.net/rsrc.php/yp/r/WrVGNAPBHOg.webp',
      bookmarkProps: {
        ariaChecked: undefined,
        ariaControls: undefined,
        ariaCurrent: undefined,
        ariaExpanded: undefined,
        ariaLabel: undefined,
        ariaLabelledby: undefined,
        ariaPressed: undefined,
        disabled: undefined,
        expanding: true,
        focusable: undefined,
        hideHoverOverlay: undefined,
        id: undefined,
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
        onFocusChange: undefined,
        onHoverIn: undefined,
        onHoverOut: undefined,
        onPress: noop,
        onPressIn: undefined,
        onPressOut: undefined,
        overlayDisabled: false,
        overlayFocusRingPosition: 'inset',
        overlayRadius: 8,
        role: undefined,
        suppressHydrationWarning: undefined,
        testOnly_pressed: undefined,
        xstyle: exactMetaBookmarkXStyle,
      },
    }),
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <div style="margin-bottom: 12px; font-size: 13px; color: #64748b;">
          This story keeps the raw React-inspector-style prop payload, including the exact Stylex-style <code>xstyle</code> array.
        </div>
        <CometPressable v-bind="bookmarkProps" class="w-full">
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
                headline="Meta AI"
                :headline-line-limit="2"
                :meta-line-limit="1"
                :reduce-emphasis="true"
              />
            </CometDensityModeStateProvider>
          </FDSListCellImplNew>
        </CometPressable>
      </div>
    `,
  }),
}

export const SuppressedInteractiveShell: Story = {
  render: () => defineComponent({
    components: { CometPressable },
    setup() {
      provideSuppressInteractiveContext(true)

      return {
        args: {
          onPress: noop,
          overlayPressedStyle: '[background-color:rgba(15,23,42,0.12)]',
          testOnly_pressed: true,
        },
      }
    },
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <div style="margin-bottom: 12px; font-size: 13px; color: #64748b;">
          The suppress-interactive context forces the raw <code>div</code>/<code>span</code> branch, but CometPressable still renders its visual shell and overlay child.
        </div>
        <CometPressable
          v-bind="args"
          class="rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-4 text-left text-slate-900"
        >
          <div class="space-y-1">
            <div class="text-sm font-semibold">Suppressed interactive shell</div>
            <div class="text-sm text-slate-500">
              The pressed overlay is forced via <code>testOnly_pressed</code> because this branch is intentionally inert.
            </div>
          </div>
        </CometPressable>
      </div>
    `,
  }),
}

export const DisabledFromContext: Story = {
  render: () => defineComponent({
    components: { CometPressable },
    setup() {
      provideBaseDisabledContext(true)

      return {
        inheritedXStyle: ({ disabled }: { disabled: boolean }) => ({
          opacity: disabled ? 0.55 : 1,
        }),
      }
    },
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <div style="margin-bottom: 12px; font-size: 13px; color: #64748b;">
          BaseDisabledContext should disable this pressable even though the local <code>disabled</code> prop is left false.
        </div>
        <CometPressable
          :xstyle="inheritedXStyle"
          class="rounded-[18px] border border-slate-200 bg-slate-100 px-4 py-4 text-left text-slate-500"
        >
          <div class="space-y-1">
            <div class="text-sm font-semibold">Inherited disabled state</div>
            <div class="text-sm text-slate-500">
              This story exercises the merged disabled path from BaseDisabledContext.
            </div>
          </div>
        </CometPressable>
      </div>
    `,
  }),
}
