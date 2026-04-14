import type { Meta, StoryObj } from '@storybook/vue3'
import { markRaw } from 'vue'

import CometPressableChildrenWithOverlay_DEPRECATED from './CometPressableChildrenWithOverlay_DEPRECATED.vue'
import CometPressableOverlay from './CometPressableOverlay.vue'

const meta = {
  title: 'Comet/CometPressableChildrenWithOverlay_DEPRECATED',
  component: CometPressableChildrenWithOverlay_DEPRECATED,
  tags: ['autodocs'],
} satisfies Meta<typeof CometPressableChildrenWithOverlay_DEPRECATED>

export default meta

type Story = StoryObj<typeof meta>

const card =
  'width: 220px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;'

function createOverlayPropStory(
  label: string,
  backgroundClass: string,
  overlayProps: Record<string, unknown>,
): Story {
  return {
    render: () => ({
      components: { CometPressableChildrenWithOverlay_DEPRECATED },
      setup: () => ({
        card,
        overlay: markRaw({
          component: CometPressableOverlay,
          props: {
            offset: 0,
            radius: '50%',
            ...overlayProps,
          },
        }),
      }),
      template: `
        <div :style="card">
          <CometPressableChildrenWithOverlay_DEPRECATED
            class="inline-flex h-10 w-10 items-center justify-center rounded-full text-white ${backgroundClass}"
            :overlay="overlay"
          >
            <span class="text-sm font-semibold">${label}</span>
          </CometPressableChildrenWithOverlay_DEPRECATED>
        </div>
      `,
    }),
  }
}

export const OverlaySlot: Story = {
  render: () => ({
    components: {
      CometPressableChildrenWithOverlay_DEPRECATED,
      CometPressableOverlay,
    },
    setup: () => ({ card }),
    template: `
      <div :style="card">
        <CometPressableChildrenWithOverlay_DEPRECATED class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white">
          <span class="text-sm font-semibold">A</span>

          <template #overlay>
            <CometPressableOverlay
              :offset="0"
              :pressed="true"
              radius="50%"
            />
          </template>
        </CometPressableChildrenWithOverlay_DEPRECATED>
      </div>
    `,
  }),
}

export const OverlayProp: Story = {
  render: () => ({
    components: { CometPressableChildrenWithOverlay_DEPRECATED },
    setup: () => ({
      card,
      overlay: markRaw({
        component: CometPressableOverlay,
        props: {
          offset: 0,
          pressed: true,
          radius: '50%',
        },
      }),
    }),
    template: `
      <div :style="card">
        <CometPressableChildrenWithOverlay_DEPRECATED
          class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white"
          :overlay="overlay"
        >
          <span class="text-sm font-semibold">B</span>
        </CometPressableChildrenWithOverlay_DEPRECATED>
      </div>
    `,
  }),
}

export const ForceHovered = createOverlayPropStory('H', 'bg-violet-500', {
  hovered: true,
})

export const ForcePressed = createOverlayPropStory('P', 'bg-rose-500', {
  pressed: true,
})
