import { defineComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import type { StyleCapableValue } from '../../utils/resolveStyling'

import BaseButton from './BaseButton.vue'
import { provideBaseButtonPopoverContext } from '../../system/baseButtonPopoverKeys'
import FDSBaseTextImpl from '../FDSBaseTextImpl.vue'

const noop = () => {}

/**
 * Decoded from the provided Stylex payload:
 * - outer reset keeps inherited radii, inline-flex semantics, no text decoration on hover, and no outline
 * - inner block overrides to the final visual tab button shape
 * - final background token is the selected-state background
 */
const exactMetaTabButtonXStyle: StyleCapableValue[] = [
  [
    {
      borderStartStartRadius: 'inherit',
      borderStartEndRadius: 'inherit',
      borderEndEndRadius: 'inherit',
      borderEndStartRadius: 'inherit',
      display: 'inline-flex',
      flexDirection: 'row',
      WebkitUserSelect: 'none',
      userSelect: 'none',
    },
    'hover:no-underline',
  ],
  {
    outline: 'none',
  },
  [
    {
      alignItems: 'center',
      backgroundColor: 'var(--secondary-button-background)',
      borderStartStartRadius: '18px',
      borderStartEndRadius: '18px',
      borderEndEndRadius: '18px',
      borderEndStartRadius: '18px',
      display: 'flex',
      flexDirection: 'row',
      height: '36px',
      justifyContent: 'center',
      paddingInlineEnd: '12px',
      paddingInlineStart: '12px',
      position: 'relative',
      width: '100%',
    },
    {
      backgroundColor: 'transparent',
    },
    {
      backgroundColor: 'var(--primary-deemphasized-button-background)',
    },
  ],
]

const exactMetaTabButtonProps = {
  allowClickEventPropagation: undefined,
  ariaDescribedby: undefined,
  ariaSelected: true,
  disabled: false,
  display: 'block' as const,
  focusable: true,
  onBlur: undefined,
  onClick: noop,
  onContextMenu: undefined,
  onFocus: undefined,
  onFocusChange: noop,
  onFocusVisibleChange: noop,
  onHoverChange: noop,
  onHoverEnd: undefined,
  onHoverMove: undefined,
  onHoverStart: undefined,
  onPressChange: noop,
  onPressEnd: undefined,
  onPressStart: undefined,
  preventContextMenu: undefined,
  role: 'tab',
  style: {},
  suppressFocusRing: true,
  testID: undefined,
  xstyle: exactMetaTabButtonXStyle,
}

const meta: Meta<typeof BaseButton> = {
  title: 'Components/BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    allowClickEventPropagation: { control: 'boolean' },
    disabled: { control: 'boolean' },
    display: {
      control: 'radio',
      options: ['inline', 'block'],
    },
    focusable: { control: 'boolean' },
    role: { control: 'text' },
    suppressFocusRing: { control: 'boolean' },
  },
  args: {
    disabled: false,
    display: 'inline',
    suppressFocusRing: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const InlineDefaultButton: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white; color: #0f172a; font-size: 14px; line-height: 1.5;">
        This sentence contains an inline
        <BaseButton
          label="Open composer"
          class="mx-1 rounded-[4px] text-sky-700 underline-offset-2 hover:underline"
        >
          button-like control
        </BaseButton>
        rendered through PressableText.
      </div>
    `,
  }),
}

export const BlockRoleFallback: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <div style="margin-bottom: 12px; font-size: 13px; color: #64748b;">
          This story intentionally passes <code>role=&quot;link&quot;</code> in block mode. BaseButton should fall back to <code>button</code>.
        </div>
        <BaseButton
          display="block"
          role="link"
          label="Create story"
          class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-slate-900 shadow-sm hover:bg-slate-100"
        >
          <strong style="display: block; margin-bottom: 4px;">Create story</strong>
          <span style="color: #475569;">Block mode routes through WebPressable and rejects the link role.</span>
        </BaseButton>
      </div>
    `,
  }),
}

export const PopoverContextAriaInheritance: Story = {
  render: () => defineComponent({
    components: { BaseButton },
    setup() {
      provideBaseButtonPopoverContext({
        expanded: true,
        haspopup: 'menu',
      })

      return {}
    },
    template: `
      <div style="width: 460px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <div style="margin-bottom: 16px; font-size: 13px; color: #64748b;">
          The first button inherits <code>aria-haspopup=&quot;menu&quot;</code> and <code>aria-expanded=&quot;true&quot;</code> from context. The second overrides both explicitly.
        </div>
        <div style="display: grid; gap: 12px;">
          <BaseButton
            display="block"
            label="Inherited menu trigger"
            class="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-slate-900 shadow-sm hover:bg-slate-50"
          >
            Inherited menu trigger
          </BaseButton>
          <BaseButton
            display="block"
            aria-haspopup="dialog"
            :aria-expanded="false"
            label="Explicit dialog trigger"
            class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-slate-900 shadow-sm hover:bg-slate-100"
          >
            Explicit dialog trigger
          </BaseButton>
        </div>
      </div>
    `,
  }),
}

export const ExactMetaTabButtonProps: Story = {
  render: () => ({
    components: { BaseButton, FDSBaseTextImpl },
    setup: () => ({
      exactMetaTabButtonProps,
    }),
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <div style="margin-bottom: 12px; font-size: 13px; color: #64748b;">
          Mirrors the provided BaseButton prop payload and decoded Stylex xstyle for a selected <code>tab</code> button.
        </div>
        <BaseButton v-bind="exactMetaTabButtonProps">
          <FDSBaseTextImpl
            color="highlight"
            numberOfLines=1
            type="button2"
          >
            All
          </FDSBaseTextImpl>
        </BaseButton>
      </div>
    `,
  }),
}
