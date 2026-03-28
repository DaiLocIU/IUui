import type { Meta, StoryObj } from '@storybook/vue3'
import BaseScrollableArea from './BaseScrollableArea.vue'

/**
 * ## BaseScrollableArea
 *
 * A high-performance, custom-styled scrollable container ported directly from Facebook's codebase.
 * It provides custom OS-agnostic overlay scrollbars (like macOS) on Windows and generic devices,
 * but automatically falls back to native scrollbars on touch devices (iOS/Android) where touch
 * inertia is negatively impacted by custom scroll wrappers.
 *
 * ### Features
 * - Custom overlay scrollbars with matrix3d hardware acceleration scaling.
 * - Intersection observers for pagination boundaries (`scrollTop`, `scrollBottom`).
 * - Context projection for deeply nested child scroll coordination.
 * - Optional gradient scrolling shadows.
 *
 * ### Props
 * | Prop | Default | Description |
 * |---|---|---|
 * | `horizontal` | `false` | Enables horizontal scrolling. |
 * | `vertical` | `false` | Enables vertical scrolling. |
 * | `hideScrollbar` | `false` | Hides the scrollbar entirely (but keeps element scrollable). |
 * | `persistentScrollbar` | `false` | Keeps the custom scroll thumb always visible. |
 * | `forceBrowserDefault` | `false` | Bypasses custom scrollbar logic and uses standard OS scrollbars. |
 * | `withTopShadow` | `false` | Shows a sticky top inner gradient shadow. |
 * | `withBottomShadow` | `false` | Shows a sticky bottom inner gradient shadow. |
 * | `expanding` | `false` | Applies `flex-grow flex-shrink basis-auto min-h-0`. |
 */
const meta: Meta<typeof BaseScrollableArea> = {
  title: 'Components/BaseScrollableArea',
  component: BaseScrollableArea,
  tags: ['autodocs'],
  argTypes: {
    horizontal: { control: 'boolean', description: 'Enable horizontal scrolling' },
    vertical: { control: 'boolean', description: 'Enable vertical scrolling' },
    hideScrollbar: { control: 'boolean', description: 'Hide the scrollbar but keep scrollable' },
    persistentScrollbar: { control: 'boolean', description: 'Force custom scrollbar to always show' },
    forceBrowserDefault: { control: 'boolean', description: 'Use native browser scrollbars' },
    withTopShadow: { control: 'boolean', description: 'Show gradient shadow over top edge' },
    withBottomShadow: { control: 'boolean', description: 'Show gradient shadow over bottom edge' },
    expanding: { control: 'boolean', description: 'Flex grow container' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── Helpers ─────────────────────────────────────────────────────────────────

const generateBlocks = (count: number, width: string = '100%', height: string = '80px') => {
  return Array.from({ length: count })
    .map(
      (_, i) =>
        `<div style="width: ${width}; height: ${height}; background-color: ${
          i % 2 === 0 ? '#f0f4f8' : '#e1e7ec'
        }; border-radius: 8px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #475569; border: 1px solid #cbd5e1; margin: 4px;">Item ${
          i + 1
        }</div>`
    )
    .join('')
}

// ─── Stories ─────────────────────────────────────────────────────────────────

/** The standard vertical scroll view. Hover over the area to see the custom Mac-like scrollbar appear. */
export const DefaultVertical: Story = {
  render: () => ({
    components: { BaseScrollableArea },
    template: `
      <div style="height: 300px; width: 320px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: white;">
        <BaseScrollableArea :vertical="true" style="height: 100%;" testid="default">
          <div style="padding: 12px; display: flex; flex-direction: column;">
            ${generateBlocks(10)}
          </div>
        </BaseScrollableArea>
      </div>
    `,
  }),
}

/** Horizontal scrolling view. */
export const Horizontal: Story = {
  render: () => ({
    components: { BaseScrollableArea },
    template: `
      <div style="width: 500px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: white; padding: 16px;">
        <BaseScrollableArea :horizontal="true" testid="default">
          <div style="display: flex; flex-direction: row; padding-bottom: 8px;">
            ${generateBlocks(10, '120px', '120px')}
          </div>
        </BaseScrollableArea>
      </div>
    `,
  }),
}

/** Bi-directional scrolling. */
export const HorizontalAndVertical: Story = {
  render: () => ({
    components: { BaseScrollableArea },
    template: `
      <div style="height: 300px; width: 400px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: white;">
        <BaseScrollableArea :vertical="true" :horizontal="true" testid="HorizontalAndVertical" style="height: 100%;">
          <div style="padding: 12px; width: 800px;">
            <div style="display: flex; margin-bottom: 12px;">${generateBlocks(6, '200px', '100px')}</div>
            <div style="display: flex; margin-bottom: 12px;">${generateBlocks(6, '200px', '100px')}</div>
            <div style="display: flex; margin-bottom: 12px;">${generateBlocks(6, '200px', '100px')}</div>
            <div style="display: flex; margin-bottom: 12px;">${generateBlocks(6, '200px', '100px')}</div>
          </div>
        </BaseScrollableArea>
      </div>
    `,
  }),
}

/** Keeps the custom scroll track and thumb consistently visible, bypassing the auto-hide. */
export const PersistentScrollbar: Story = {
  render: () => ({
    components: { BaseScrollableArea },
    template: `
      <div style="height: 250px; width: 320px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: white;">
        <BaseScrollableArea :vertical="true" :persistentScrollbar="true" testid="PersistentScrollbar" style="height: 100%;">
          <div style="padding: 12px; display: flex; flex-direction: column;">
            ${generateBlocks(8)}
          </div>
        </BaseScrollableArea>
      </div>
    `,
  }),
}

/** Inner shadows that stick to the top and bottom of the scrolling boundary, commonly used in modals to indicate more content exists. */
export const WithShadows: Story = {
  render: () => ({
    components: { BaseScrollableArea },
    template: `
      <div style="height: 300px; width: 320px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: white; margin: 20px;">
        <BaseScrollableArea :vertical="true" :withTopShadow="true" :withBottomShadow="true" testid="withshadow" style="height: 100%;">
          <div style="padding: 16px; display: flex; flex-direction: column;">
            <p style="margin-bottom: 16px; color: #64748b; font-size: 14px;">Scroll down to see the shadows stay sticky to the edges.</p>
            ${generateBlocks(8)}
          </div>
        </BaseScrollableArea>
      </div>
    `,
  }),
}

/** Disables the custom overlay styling and gracefully degrades to whatever native scrollbar the operating system uses. */
export const ForceBrowserDefault: Story = {
  render: () => ({
    components: { BaseScrollableArea },
    template: `
      <div style="height: 250px; width: 320px; border: 1px dashed #94a3b8; border-radius: 12px; overflow: hidden; background: #f8fafc;">
        <BaseScrollableArea :vertical="true" :forceBrowserDefault="true" testid="ForceBrowserDefault" style="height: 100%;">
          <div style="padding: 12px; display: flex; flex-direction: column;">
             ${generateBlocks(8)}
          </div>
        </BaseScrollableArea>
      </div>
    `,
  }),
}

/** Completely hides the scrollbar thumb and track using CSS methods, but allows the container to remain fully scrollable via mouse wheel or touch. */
export const HiddenScrollbar: Story = {
  render: () => ({
    components: { BaseScrollableArea },
    template: `
      <div style="height: 250px; width: 320px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: white;">
        <BaseScrollableArea :vertical="true" :hideScrollbar="true" testid="HiddenScrollbar" style="height: 100%;">
          <div style="padding: 12px; display: flex; flex-direction: column;">
             ${generateBlocks(8)}
          </div>
        </BaseScrollableArea>
      </div>
    `,
  }),
}
