import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

import CometImage from './CometImage.vue'

const heroSrc = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480">
    <defs>
      <linearGradient id="sky" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="55%" stop-color="#1d4ed8" />
        <stop offset="100%" stop-color="#7dd3fc" />
      </linearGradient>
      <linearGradient id="ground" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stop-color="#14532d" />
        <stop offset="100%" stop-color="#22c55e" />
      </linearGradient>
    </defs>
    <rect width="800" height="480" fill="url(#sky)" />
    <circle cx="640" cy="120" r="54" fill="#fde68a" />
    <path d="M0 360C120 300 220 290 320 320C410 347 540 352 800 300V480H0Z" fill="url(#ground)" />
    <path d="M120 330L250 170L360 330Z" fill="#e2e8f0" opacity="0.82" />
    <path d="M260 340L420 140L580 340Z" fill="#cbd5e1" opacity="0.9" />
  </svg>
`)}`

const brokenSrc = 'https://example.invalid/comet-image-error.jpg'
const bookmarkIconSrc = 'https://static.xx.fbcdn.net/rsrc.php/yp/r/yD3PZM_5DK8.webp'

const meta: Meta<typeof CometImage> = {
  title: 'Media/CometImage',
  component: CometImage,
  tags: ['autodocs'],
  args: {
    alt: 'Layered mountains at sunrise',
    cornerRadius: 'medium',
    objectFit: 'cover',
    sizes: '(min-width: 640px) 320px, 100vw',
    src: heroSrc,
  },
  argTypes: {
    alt: { control: 'text' },
    cornerRadius: {
      control: 'radio',
      options: ['none', 'small', 'medium', 'large'],
    },
    objectFit: {
      control: 'radio',
      options: ['fill', 'cover', 'contain'],
    },
    sizes: { control: 'text' },
    src: { control: 'text' },
    srcSet: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const frameStyle = 'width: 360px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;'
const imageFrameStyle = 'width: 312px; height: 190px; overflow: hidden; background: #e2e8f0;'

export const Default: Story = {
  render: (args) => ({
    components: { CometImage },
    setup: () => ({ args }),
    template: `
      <div style="${frameStyle}">
        <div style="${imageFrameStyle}">
          <CometImage
            v-bind="args"
            xstyle="block h-full w-full"
          />
        </div>
      </div>
    `,
  }),
}

export const CornerRadiusVariants: Story = {
  render: () => ({
    components: { CometImage },
    setup: () => ({
      cards: [
        { cornerRadius: 'none', label: 'None' },
        { cornerRadius: 'small', label: 'Small' },
        { cornerRadius: 'medium', label: 'Medium' },
        { cornerRadius: 'large', label: 'Large' },
      ],
      src: heroSrc,
    }),
    template: `
      <div style="display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:16px;">
        <div
          v-for="card in cards"
          :key="card.cornerRadius"
          style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;"
        >
          <div style="margin-bottom: 12px; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #64748b;">
            {{ card.label }}
          </div>
          <div style="width: 100%; height: 160px; overflow: hidden; background: #e2e8f0;">
            <CometImage
              :src="src"
              :alt="card.label + ' corner radius example'"
              :corner-radius="card.cornerRadius"
              object-fit="cover"
              xstyle="block h-full w-full"
            />
          </div>
        </div>
      </div>
    `,
  }),
}

export const ObjectFitModes: Story = {
  render: () => ({
    components: { CometImage },
    setup: () => ({
      cards: [
        { objectFit: 'fill', label: 'Fill' },
        { objectFit: 'cover', label: 'Cover' },
        { objectFit: 'contain', label: 'Contain' },
      ],
      src: heroSrc,
    }),
    template: `
      <div style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:16px;">
        <div
          v-for="card in cards"
          :key="card.objectFit"
          style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;"
        >
          <div style="margin-bottom: 12px; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #64748b;">
            {{ card.label }}
          </div>
          <div style="width: 100%; height: 160px; overflow: hidden; background: linear-gradient(135deg, #e2e8f0, #cbd5e1);">
            <CometImage
              :src="src"
              :alt="card.label + ' object-fit example'"
              :object-fit="card.objectFit"
              corner-radius="large"
              xstyle="block h-full w-full"
            />
          </div>
        </div>
      </div>
    `,
  }),
}

export const EventCallbacks: Story = {
  render: () => ({
    components: { CometImage },
    setup: () => {
      const loadCount = ref(0)
      const errorCount = ref(0)

      return {
        brokenSrc,
        heroSrc,
        errorCount,
        handleError: () => {
          errorCount.value += 1
        },
        handleLoad: () => {
          loadCount.value += 1
        },
        loadCount,
      }
    },
    template: `
      <div style="display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:16px;">
        <div style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
          <div style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #0f172a;">Load callback</div>
          <div style="margin-bottom: 12px; font-size: 13px; color: #64748b;">Load count: {{ loadCount }}</div>
          <div style="width: 100%; height: 160px; overflow: hidden; background: #e2e8f0;">
            <CometImage
              :src="heroSrc"
              alt="Successful image load"
              corner-radius="medium"
              object-fit="cover"
              xstyle="block h-full w-full"
              :on-load="handleLoad"
            />
          </div>
        </div>
        <div style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 18px; background: white;">
          <div style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #0f172a;">Error callback</div>
          <div style="margin-bottom: 12px; font-size: 13px; color: #64748b;">Error count: {{ errorCount }}</div>
          <div style="width: 100%; height: 160px; overflow: hidden; background: #f8fafc; display:flex; align-items:center; justify-content:center;">
            <CometImage
              :src="brokenSrc"
              alt="Broken image example"
              corner-radius="medium"
              object-fit="cover"
              xstyle="block h-full w-full"
              :on-error="handleError"
            />
          </div>
        </div>
      </div>
    `,
  }),
}

export const XStyleOverride: Story = {
  render: () => ({
    components: { CometImage },
    setup: () => ({
      src: heroSrc,
    }),
    template: `
      <div style="${frameStyle}">
        <div style="width: 312px; height: 190px; overflow: hidden; background: #dbeafe;">
          <CometImage
            :src="src"
            alt="Image with custom shadow and ring"
            corner-radius="large"
            object-fit="cover"
            :xstyle="[
              'block h-full w-full shadow-[0_18px_48px_rgba(15,23,42,0.22)]',
              {
                border: '3px solid rgba(255, 255, 255, 0.9)',
              },
            ]"
          />
        </div>
      </div>
    `,
  }),
}

export const BookmarkIcon24: Story = {
  render: () => ({
    components: { CometImage },
    setup: () => ({
      iconProps: {
        height: 24,
        src: bookmarkIconSrc,
        width: 24,
      },
    }),
    template: `
      <div style="${frameStyle}">
        <div style="display:flex; align-items:center; gap:12px;">
          <CometImage
            v-bind="iconProps"
            alt=""
            xstyle="block"
          />
          <div style="font-size: 13px; color: #64748b;">
            Exact remote 24x24 bookmark image payload
          </div>
        </div>
      </div>
    `,
  }),
}
