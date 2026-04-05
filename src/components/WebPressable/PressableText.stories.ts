import type { Meta, StoryObj } from '@storybook/vue3'
import type { StyleCapableValue } from '../../utils/resolveStyling'

import PressableText from './PressableText.vue'

const exactMetaPolicyLinkXStyle: StyleCapableValue[] = [
  'no-underline hover:underline',
  '[color:var(--secondary-text,#65686C)]',
  'font-semibold',
]

const meta: Meta<typeof PressableText> = {
  title: 'Components/PressableText',
  component: PressableText,
  tags: ['autodocs'],
  argTypes: {
    accessibilityRole: { control: 'text' },
    disabled: { control: 'boolean' },
    focusable: { control: 'boolean' },
    selectable: { control: 'boolean' },
    suppressFocusRing: { control: 'boolean' },
  },
  args: {
    disabled: false,
    suppressFocusRing: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const InlineLink: Story = {
  render: () => ({
    components: { PressableText },
    setup: () => ({
      link: {
        url: 'https://example.com',
        rel: 'noreferrer',
        target: '_blank',
      },
    }),
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white; color: #0f172a; font-size: 14px; line-height: 1.5;">
        Read more about
        <PressableText
          accessibility-role="link"
          :link="link"
          class="text-sky-700"
          :prevent-default="false"
        >
          Meta AI
        </PressableText>
        in the help center.
      </div>
    `,
  }),
}

export const NotSelectable: Story = {
  render: () => ({
    components: { PressableText },
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white; font-size: 14px; line-height: 1.5;">
        <PressableText
          accessibility-role="button"
          :focusable="true"
          :selectable="false"
          class="text-slate-900"
          :prevent-default="false"
        >
          This pressable text should not allow text selection.
        </PressableText>
      </div>
    `,
  }),
}

export const FocusRingLink: Story = {
  render: () => ({
    components: { PressableText },
    setup: () => ({
      link: {
        url: 'https://example.com',
      },
    }),
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white; font-size: 14px;">
        <PressableText
          accessibility-role="link"
          :link="link"
          :focusable="true"
          class="rounded-[4px] text-sky-700"
          :prevent-default="false"
        >
          Tab to this inline link to see the text-specific focus ring.
        </PressableText>
      </div>
    `,
  }),
}

export const InvalidLinkProps: Story = {
  render: () => ({
    components: { PressableText },
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <div style="margin-bottom: 12px; font-size: 13px; color: #64748b;">
          This story intentionally passes an invalid prop combination. In dev mode, PressableText warns and renders nothing.
        </div>
        <PressableText accessibility-role="link">
          This content should not render.
        </PressableText>
      </div>
    `,
  }),
}

export const ExactMetaPolicyLinkProps: Story = {
  render: () => ({
    components: { PressableText },
    setup: () => ({
      exactMetaPolicyLinkXStyle,
      pressableTextProps: {
        accessibilityLabel: undefined,
        accessibilityRelationship: {
          activedescendant: undefined,
          controls: undefined,
          current: undefined,
          describedby: undefined,
          details: undefined,
          errormessage: undefined,
          haspopup: undefined,
          labelledby: undefined,
          owns: undefined,
        },
        accessibilityRole: 'link',
        accessibilityState: {
          checked: undefined,
          disabled: false,
          expanded: undefined,
          hidden: undefined,
          invalid: undefined,
          selected: undefined,
        },
        direction: 'none',
        disabled: false,
        draggable: undefined,
        focusable: undefined,
        link: {
          attributionsrc: null,
          download: undefined,
          rel: undefined,
          target: '_self',
          url: '/privacy/policy/?entry_point=comet_dropdown',
        },
        nativeID: undefined,
        onBlur: () => {},
        onContextMenu: () => {},
        onFocus: () => {},
        onFocusChange: undefined,
        onFocusVisibleChange: undefined,
        onHoverChange: undefined,
        onHoverEnd: () => {},
        onHoverMove: () => {},
        onHoverStart: () => {},
        onPress: () => {},
        onPressChange: undefined,
        onPressEnd: undefined,
        onPressStart: () => {},
        preventContextMenu: undefined,
        preventDefault: false,
        style: undefined,
        suppressFocusRing: undefined,
        testID: undefined,
        testOnly_state: {
          disabled: false,
          focusVisible: false,
          focused: false,
          hovered: false,
          pressed: false,
        },
        xstyle: exactMetaPolicyLinkXStyle,
      },
    }),
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white; font-size: 14px; line-height: 1.5;">
        <PressableText v-bind="pressableTextProps">
          Privacy
        </PressableText>
      </div>
    `,
  }),
}
