import type { Meta, StoryObj } from '@storybook/vue3'

import BaseImage from './BaseImage.vue'

const meta: Meta<typeof BaseImage> = {
  title: 'Media/IUImage',
  component: BaseImage,
  tags: ['autodocs'],
  argTypes: {
    alt: {
      control: 'text',
    },
    objectFit: {
      control: 'radio',
      options: ['fill', 'cover', 'contain'],
    },
    isDecorative: {
      control: 'boolean',
    },
    referrerPolicy: {
      control: 'select',
      options: [
        'no-referrer',
        'no-referrer-when-downgrade',
        'origin',
        'origin-when-cross-origin',
        'same-origin',
        'strict-origin',
        'strict-origin-when-cross-origin',
        'unsafe-url',
      ],
    },
    sizes: {
      control: 'text',
    },
    src: {
      control: 'text',
    },
    srcSet: {
      control: 'text',
    },
  },
  args: {
    alt: 'Mountain lake at sunrise',
    objectFit: 'cover',
    isDecorative: false,
    referrerPolicy: 'origin-when-cross-origin',
    sizes: '(min-width: 640px) 320px, 100vw',
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    srcSet: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=640&q=80 640w',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80 1200w',
    ].join(', '),
  },
}

export default meta
type Story = StoryObj<typeof meta>

/** IUImage is the base image primitive for rendering responsive images with predictable fit behavior. */
export const Default: Story = {
  render: (args) => ({
    components: {
      IUImage: BaseImage,
    },
    setup: () => ({ args }),
    template: `
      <div style="width: 320px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <div style="width: 272px; height: 180px; overflow: hidden; border-radius: 14px; background: #e2e8f0;">
          <IUImage v-bind="args" style="display:block; width:100%; height:100%;" />
        </div>
      </div>
    `,
  }),
}

/** Object-fit modes let consumers choose whether the image fills, crops, or letterboxes within a fixed frame. */
export const ObjectFitModes: Story = {
  render: () => ({
    components: {
      IUImage: BaseImage,
    },
    setup: () => ({
      cards: [
        {
          title: 'Fill',
          objectFit: 'fill',
        },
        {
          title: 'Cover',
          objectFit: 'cover',
        },
        {
          title: 'Contain',
          objectFit: 'contain',
        },
      ],
      src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    }),
    template: `
      <div style="display:grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px;">
        <div
          v-for="card in cards"
          :key="card.title"
          style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;"
        >
          <div style="margin-bottom: 12px; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #64748b;">
            {{ card.title }}
          </div>
          <div style="width: 100%; height: 180px; overflow: hidden; border-radius: 14px; background: #e2e8f0;">
            <IUImage
              :src="src"
              :alt="card.title + ' example image'"
              :object-fit="card.objectFit"
              style="display:block; width:100%; height:100%;"
            />
          </div>
        </div>
      </div>
    `,
  }),
}

/** Decorative images can be hidden from assistive technologies when they do not carry meaningful content. */
export const DecorativeImage: Story = {
  render: () => ({
    components: {
      IUImage: BaseImage,
    },
    setup: () => ({
      src: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80',
    }),
    template: `
      <div style="width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <div style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #0f172a;">
          Decorative hero accent
        </div>
        <div style="margin-bottom: 16px; font-size: 13px; color: #64748b;">
          This story demonstrates IUImage with \`isDecorative\` enabled so the image is hidden from assistive tech.
        </div>
        <div style="width: 312px; height: 160px; overflow: hidden; border-radius: 14px; background: linear-gradient(135deg, #dbeafe, #e2e8f0);">
          <IUImage
            :src="src"
            alt=""
            :is-decorative="true"
            object-fit="cover"
            style="display:block; width:100%; height:100%;"
          />
        </div>
      </div>
    `,
  }),
}

/** When \`src\` is an empty string, IUImage intentionally renders nothing and only warns in development. */
export const InvalidSrc: Story = {
  render: () => ({
    components: {
      IUImage: BaseImage,
    },
    template: `
      <div style="width: 320px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
        <div style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #0f172a;">
          Empty source fallback
        </div>
        <div style="margin-bottom: 16px; font-size: 13px; color: #64748b;">
          IUImage does not render a broken image when \`src\` is an empty string. In development, it warns instead of using Meta&apos;s recoverable violation flow.
        </div>
        <div style="width: 272px; height: 160px; border: 1px dashed #cbd5e1; border-radius: 14px; background: #f8fafc; display:flex; align-items:center; justify-content:center; color:#94a3b8; font-size:13px;">
          <IUImage src="" alt="Invalid image source" />
          Nothing is rendered
        </div>
      </div>
    `,
  }),
}
