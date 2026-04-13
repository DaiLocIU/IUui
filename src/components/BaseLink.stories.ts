import type { Meta, StoryObj } from '@storybook/vue3'
import type { StyleCapableValue } from '../utils/resolveStyling'

import BaseImage from './BaseImage.vue'
import BaseLink from './BaseLink.vue'
import BaseLinkDefaultTargetProvider from './BaseLinkDefaultTargetProvider.vue'
import CometDensityModeStateProvider from './CometDensityModeStateProvider.vue'
import FDSListCellImplNew from './FDSListCellImplNew.vue'
import FDSTextPairing from './FDSTextPairing.vue'

const exactMetaBusinessLinkXStyle: StyleCapableValue[] = [
  'no-underline hover:underline',
  '[color:var(--secondary-text,#65686C)]',
  'font-semibold',
]

const exactMetaBookmarkLinkXStyle: StyleCapableValue[] = [
  [
    {
      borderStartStartRadius: 'inherit',
      borderStartEndRadius: 'inherit',
      borderEndEndRadius: 'inherit',
      borderEndStartRadius: 'inherit',
      display: 'inline-flex',
      flexDirection: 'row',
      WebkitUserSelect: 'none',
    },
    'hover:no-underline',
  ],

  { display: 'flex' },
  { display: 'inline-block' },
  { outline: 'none' },
  [
    { display: 'block' },
  ],
]
const meta: Meta<typeof BaseLink> = {
  title: 'Components/BaseLink',
  component: BaseLink,
  tags: ['autodocs'],
  argTypes: {
    display: { control: 'radio', options: ['inline', 'block'] },
    disabled: { control: 'boolean' },
    focusable: { control: 'boolean' },
    preventDefault: { control: 'boolean' },
    suppressFocusRing: { control: 'boolean' },
  },
  args: {
    display: 'inline',
    disabled: false,
    preventDefault: false,
    suppressFocusRing: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const InlineLink: Story = {
  render: () => ({
    components: { BaseLink },
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white; color: #0f172a; font-size: 14px; line-height: 1.5;">
        Read more about
        <BaseLink
          href="/help-center"
          class="text-sky-700"
        >
          Meta AI
        </BaseLink>
        in the help center.
      </div>
    `,
  }),
}

export const ExactMetaBusinessLinkProps: Story = {
  render: () => ({
    components: { BaseLink },
    setup: () => ({
      exactMetaBusinessLinkProps: {
        'aria-disabled': undefined,
        disabled: false,
        display: 'inline',
        href: '/business/',
        onClick: undefined,
        role: undefined,
        target: '_self',
        testID: undefined,
        xstyle: exactMetaBusinessLinkXStyle,
      },
    }),
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white; color: #0f172a; font-size: 14px; line-height: 1.5;">
        <BaseLink v-bind="exactMetaBusinessLinkProps">
          Business
        </BaseLink>
      </div>
    `,
  }),
}

export const ButtonRoleInline: Story = {
  render: () => ({
    components: { BaseLink },
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white; color: #0f172a; font-size: 14px; line-height: 1.5;">
        <BaseLink
          role="button"
          href="/action"
          class="font-semibold text-slate-900 underline"
        >
          Inline button-like BaseLink
        </BaseLink>
      </div>
    `,
  }),
}

export const BlockLink: Story = {
  render: () => ({
    components: { BaseLink },
    template: `
      <div style="width: 420px; padding: 24px; background: #f8fafc;">
        <BaseLink
          display="block"
          href="https://example.com"
          class="rounded-[18px] border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:bg-slate-50"
        >
          <div class="flex items-start gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700">
              AI
            </div>
            <div class="min-w-0">
              <div class="text-sm font-semibold text-slate-900">
                Open Meta AI help center
              </div>
              <div class="mt-1 text-sm text-slate-500">
                This block variant routes through WebPressable.
              </div>
            </div>
          </div>
        </BaseLink>
      </div>
    `,
  }),
}

export const ExactMetaBookmarkLinkProps: Story = {
  render: () => ({
    components: {
      BaseLink,
      BaseImage,
      CometDensityModeStateProvider,
      FDSListCellImplNew,
      FDSTextPairing,
    },
    setup: () => ({
      imageSrc: 'https://static.xx.fbcdn.net/rsrc.php/yp/r/WrVGNAPBHOg.webp',
      exactMetaBookmarkLinkProps: {
        'aria-checked': undefined,
        'aria-controls': undefined,
        'aria-current': undefined,
        'aria-expanded': undefined,
        'aria-label': undefined,
        'aria-labelledby': undefined,
        'aria-pressed': undefined,
        disabled: false,
        display: 'block',
        focusable: undefined,
        href: 'https://www.meta.ai/?utm_source=facebook_bookmarks',
        id: undefined,
        onBlur: undefined,
        onClick: () => {},
        onFocus: undefined,
        onFocusChange: () => {},
        onFocusVisibleChange: () => {},
        onHoverChange: () => {},
        onHoverEnd: undefined,
        onHoverMove: undefined,
        onHoverStart: undefined,
        onPressChange: () => {},
        onPressEnd: undefined,
        onPressStart: undefined,
        preventContextMenu: undefined,
        role: undefined,
        style: {},
        suppressFocusRing: true,
        target: '_self',
        testID: undefined,
        xstyle: exactMetaBookmarkLinkXStyle,
      },
    }),
    template: `
      <div style="width: 420px;">
        <BaseLink v-bind="exactMetaBookmarkLinkProps">
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
        </BaseLink>
      </div>
    `,
  }),
}

export const DisabledLink: Story = {
  render: () => ({
    components: { BaseLink },
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white; color: #0f172a; font-size: 14px; line-height: 1.5;">
        <BaseLink
          href="https://example.com"
          :disabled="true"
          class="text-slate-400 underline"
        >
          Disabled external link
        </BaseLink>
      </div>
    `,
  }),
}

export const ExternalAutoTarget: Story = {
  render: () => ({
    components: { BaseLink },
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white; color: #0f172a; font-size: 14px; line-height: 1.5;">
        This external link should resolve to <code>target="_blank"</code> and auto-build <code>rel</code>:
        <BaseLink
          href="https://example.com"
          class="ml-1 text-sky-700 underline"
        >
          Example
        </BaseLink>
      </div>
    `,
  }),
}

export const ExplicitBlankNoReferrerDisabled: Story = {
  render: () => ({
    components: { BaseLink },
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white; color: #0f172a; font-size: 14px; line-height: 1.5;">
        <BaseLink
          href="https://example.com"
          target="_blank"
          :no-referrer="false"
          class="text-sky-700 underline"
        >
          Explicit _blank without noreferrer
        </BaseLink>
      </div>
    `,
  }),
}

export const DownloadLink: Story = {
  render: () => ({
    components: { BaseLink },
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white; color: #0f172a; font-size: 14px; line-height: 1.5;">
        <BaseLink
          href="/files/guide.pdf"
          download="guide.pdf"
          class="text-sky-700 underline"
        >
          Download PDF guide
        </BaseLink>
      </div>
    `,
  }),
}

export const LocalNavigationPrevented: Story = {
  render: () => ({
    components: { BaseLink },
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white; color: #0f172a; font-size: 14px; line-height: 1.5;">
        <BaseLink
          href="/settings"
          :prevent-local-navigation="true"
          class="text-sky-700 underline"
        >
          Local link with preventLocalNavigation
        </BaseLink>
      </div>
    `,
  }),
}

export const NestedLinkFallback: Story = {
  render: () => ({
    components: { BaseLink },
    template: `
      <div style="width: 420px; padding: 24px; background: #f8fafc;">
        <BaseLink
          href="https://outer.example.com"
          display="block"
          class="rounded-[18px] border border-slate-200 bg-white p-4 text-slate-900"
        >
          <div class="space-y-2">
            <div class="text-sm font-semibold">Outer block link</div>
            <div class="text-sm text-slate-600">
              Inner link should degrade to a non-anchor wrapper instead of rendering invalid nested anchors:
              <BaseLink
                href="https://inner.example.com"
                class="ml-1 text-sky-700 underline"
              >
                Inner link
              </BaseLink>
            </div>
          </div>
        </BaseLink>
      </div>
    `,
  }),
}

export const ProviderTarget: Story = {
  render: () => ({
    components: { BaseLink, BaseLinkDefaultTargetProvider },
    template: `
      <BaseLinkDefaultTargetProvider target="_blank">
        <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white; color: #0f172a; font-size: 14px; line-height: 1.5;">
          All descendant links should inherit the default target:
          <BaseLink
            href="/docs"
            class="ml-1 text-sky-700 underline"
          >
            Docs
          </BaseLink>
        </div>
      </BaseLinkDefaultTargetProvider>
    `,
  }),
}
