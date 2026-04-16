import type { Meta, StoryObj } from '@storybook/vue3'
import { defineComponent, ref } from 'vue'

import FocusWithinHandler from './FocusWithinHandler'

const meta: Meta<typeof FocusWithinHandler> = {
  title: 'Components/FocusWithinHandler',
  component: FocusWithinHandler,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    testOnly: {
      control: 'object',
    },
  },
  args: {
    disabled: false,
    testOnly: undefined,
  },
}

export default meta
type Story = StoryObj<typeof meta>

/** Live subtree-focus demo: Tab into the card to set focusVisible, then click to compare pointer-driven focus. */
export const InteractiveState: Story = {
  render: (args) => defineComponent({
    components: { FocusWithinHandler },
    setup() {
      const eventLog = ref<string[]>([])

      const pushEvent = (label: string) => {
        eventLog.value = [label, ...eventLog.value].slice(0, 4)
      }

      return {
        args,
        eventLog,
        pushEvent,
      }
    },
    template: `
      <div style="width: 460px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <div style="margin-bottom: 16px; font-size: 13px; line-height: 1.5; color: #64748b;">
          Tab into the region to see <code>focusVisible</code> become true. Click one of the controls to compare pointer-driven focus, where the subtree stays focused but the visible-focus signal can remain false.
        </div>
        <FocusWithinHandler
          v-bind="args"
          @focuswithin="pushEvent('focuswithin')"
          @blurwithin="pushEvent('blurwithin')"
          @focuschange="pushEvent('focuschange:' + $event)"
          @focusvisiblechange="pushEvent('focusvisiblechange:' + $event)"
        >
          <template #default="{ focused, focusVisible, ref: rootRef }">
            <div
              :ref="rootRef"
              style="display: grid; gap: 16px; border: 1px solid #cbd5e1; border-radius: 16px; padding: 16px; background: #f8fafc;"
            >
              <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px;">
                <div style="border-radius: 12px; background: white; padding: 12px; border: 1px solid #e2e8f0;">
                  <div style="font-size: 12px; color: #64748b;">focused</div>
                  <div style="margin-top: 4px; font-size: 18px; font-weight: 700; color: #0f172a;">{{ focused }}</div>
                </div>
                <div style="border-radius: 12px; background: white; padding: 12px; border: 1px solid #e2e8f0;">
                  <div style="font-size: 12px; color: #64748b;">focusVisible</div>
                  <div style="margin-top: 4px; font-size: 18px; font-weight: 700; color: #0f172a;">{{ focusVisible }}</div>
                </div>
              </div>
              <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
                <button
                  type="button"
                  style="border: 1px solid #0f172a; border-radius: 999px; background: #0f172a; color: white; padding: 10px 14px; font-size: 14px; font-weight: 600;"
                >
                  Primary action
                </button>
                <input
                  type="text"
                  placeholder="Secondary field"
                  style="min-width: 180px; border: 1px solid #cbd5e1; border-radius: 999px; padding: 10px 14px; font-size: 14px; color: #0f172a; background: white;"
                />
              </div>
              <div style="border-radius: 12px; border: 1px dashed #cbd5e1; padding: 12px; background: white;">
                <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">Recent emitted events</div>
                <div style="font-size: 13px; color: #334155;">
                  <div v-for="(entry, index) in eventLog" :key="index">{{ entry }}</div>
                  <div v-if="eventLog.length === 0">No events yet</div>
                </div>
              </div>
            </div>
          </template>
        </FocusWithinHandler>
      </div>
    `,
  }),
}

/** Deterministic docs state for stories and screenshots without requiring manual focus interaction. */
export const TestOnlyOverride: Story = {
  args: {
    testOnly: {
      focus: true,
      focusVisible: false,
    },
  },
  render: (args) => ({
    components: { FocusWithinHandler },
    setup: () => ({ args }),
    template: `
      <div style="width: 420px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <div style="margin-bottom: 16px; font-size: 13px; line-height: 1.5; color: #64748b;">
          <code>testOnly</code> lets docs and visual tests lock the slot state without synthesizing real DOM focus transitions.
        </div>
        <FocusWithinHandler v-bind="args">
          <template #default="{ focused, focusVisible, ref: rootRef }">
            <div
              :ref="rootRef"
              style="display: grid; gap: 12px; border: 1px solid #cbd5e1; border-radius: 16px; padding: 16px; background: #f8fafc;"
            >
              <div style="font-size: 14px; font-weight: 600; color: #0f172a;">
                Forced state preview
              </div>
              <div style="font-size: 13px; color: #334155;">
                focused: <strong>{{ focused }}</strong>
              </div>
              <div style="font-size: 13px; color: #334155;">
                focusVisible: <strong>{{ focusVisible }}</strong>
              </div>
              <button
                type="button"
                style="justify-self: start; border: 1px solid #94a3b8; border-radius: 999px; background: white; color: #0f172a; padding: 10px 14px; font-size: 14px;"
              >
                Static child control
              </button>
            </div>
          </template>
        </FocusWithinHandler>
      </div>
    `,
  }),
}
