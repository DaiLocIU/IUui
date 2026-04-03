import type { Meta, StoryObj } from '@storybook/vue3'
import { computed, reactive, ref, watchEffect } from 'vue'

import BaseLink from './BaseLink.vue'
import {
  provideBaseLinkDefaultTarget,
  provideBaseLinkRouter,
  provideCometCustomLinkshimHash,
  provideCometGHLRendering,
  provideCometTrackingCode,
  provideCometTrackingNodes,
  type BaseLinkRouterAdapter,
} from '../system/baseLinkKeys'

/**
 * ## BaseLink
 *
 * `BaseLink` is the policy layer that decides which href is rendered, whether
 * a link is treated as router-native or browser-native, when shim behavior is
 * applied, and whether it renders as an inline text link or a block pressable
 * surface.
 *
 * These stories are organized as a behavior matrix so each branch can be
 * understood in isolation without reading the component internals first.
 */
const meta: Meta<typeof BaseLink> = {
  title: 'Primitives/BaseLink',
  component: BaseLink,
  tags: ['autodocs'],
  argTypes: {
    display: {
      control: 'radio',
      options: ['inline', 'block'],
      description: 'Switches between text-link rendering and block pressable rendering.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables press and link interaction.',
    },
    href: {
      control: 'text',
      description: 'The raw input href before BaseLink normalization.',
    },
    target: {
      control: 'text',
      description: 'Explicit browser target, when provided.',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const surfaceWrap = 'padding: 24px; background: #f8fafc; font: 14px/1.5 ui-sans-serif, system-ui;'
const cardWrap = 'padding: 24px; background: #e2e8f0;'
const statusPanel =
  'margin-top: 12px; border-radius: 12px; background: #ffffff; border: 1px solid #cbd5e1; padding: 12px; font-size: 12px; color: #475569;'

const installTrackingProviders = (): void => {
  provideCometTrackingNodes(['storybook'])
  provideCometTrackingCode({
    encrypted_click_tracking: '1',
    encrypted_tracking: ['story-attribution'],
  })
}

const installRouterProvider = (
  state: {
    lastAction: string
    log: string[]
  },
): void => {
  const router: BaseLinkRouterAdapter = {
    go(href) {
      state.lastAction = `go:${href}`
      state.log.unshift(`go -> ${href}`)
    },
    preloadRouteCode(href) {
      state.lastAction = `preload-code:${href}`
      state.log.unshift(`preloadRouteCode -> ${href}`)
    },
    prefetchRouteDefinition(href) {
      state.lastAction = `prefetch-definition:${href}`
      state.log.unshift(`prefetchRouteDefinition -> ${href}`)
    },
    prefetchRouteQueries(href) {
      state.lastAction = `prefetch-queries:${href}`
      state.log.unshift(`prefetchRouteQueries -> ${href}`)

      return {
        cancel() {
          state.lastAction = `cancel-prefetch:${href}`
          state.log.unshift(`cancelPrefetch -> ${href}`)
        },
      }
    },
  }

  provideBaseLinkRouter(router)
}

const createObservedLink = (initialHref: string) => ({
  components: { BaseLink },
  setup() {
    const rootRef = ref<HTMLElement | null>(null)
    const observedHref = ref('not-mounted')
    const observedTarget = ref('not-mounted')
    const observedRel = ref('not-mounted')

    watchEffect(() => {
      const anchor = rootRef.value?.querySelector('a')
      observedHref.value = anchor?.getAttribute('href') ?? 'none'
      observedTarget.value = anchor?.getAttribute('target') ?? 'none'
      observedRel.value = anchor?.getAttribute('rel') ?? 'none'
    })

    return {
      initialHref,
      observedHref,
      observedRel,
      observedTarget,
      rootRef,
    }
  },
})

/**
 * Behavior: Shows the inline text-link branch for a trusted internal-style href with no shim-specific diagnostics.
 * Benefit: Makes the simplest `BaseLink` path easy to recognize before comparing it with more complex branches.
 * Use when: You are linking to local app destinations and want standard inline link behavior.
 */
export const InlineTrustedLink: Story = {
  render: () => ({
    components: { BaseLink },
    setup() {
      return {}
    },
    template: `
      <div style="${surfaceWrap}">
        <p style="color:#334155; margin:0;">
          <BaseLink href="/settings" label="Open settings">
            <template #default="{ hovered, focusVisible }">
              <span :style="{ color: hovered || focusVisible ? '#1d4ed8' : '#0f172a', textDecoration: 'underline' }">
                Trusted inline link
              </span>
            </template>
          </BaseLink>
        </p>
      </div>
    `,
  }),
}

/**
 * Behavior: Shows an external destination taking the shim-oriented branch and exposes the observed anchor attributes.
 * Benefit: Helps you see how `BaseLink` changes href, target, and rel for external links without opening DevTools.
 * Use when: You are linking to third-party pages and want to understand the external-link safety defaults.
 */
export const InlineExternalShimmed: Story = {
  render: () => {
    const story = createObservedLink('https://example.org/path?q=1')

    return {
      ...story,
      setup() {
        installTrackingProviders()
        provideCometCustomLinkshimHash('story-hash')

        const result = story.setup()

        return result
      },
      template: `
        <div ref="rootRef" style="${surfaceWrap}">
          <p style="color:#334155; margin:0;">
            <BaseLink :href="initialHref" label="Open external example">
              <template #default="{ hovered }">
                <span :style="{ color: hovered ? '#1d4ed8' : '#0f172a', textDecoration: 'underline' }">
                  External shim-aware link
                </span>
              </template>
            </BaseLink>
          </p>
          <div style="${statusPanel}">
            href={{ observedHref }}<br />
            target={{ observedTarget }}<br />
            rel={{ observedRel }}
          </div>
        </div>
      `,
    }
  },
}

/**
 * Behavior: Shows a block-rendered router-eligible link switching from anchor semantics into local navigation and prefetch callbacks.
 * Benefit: Makes the SPA navigation branch visible, including the adapter activity that is otherwise hidden.
 * Use when: You are building card-like or row-like navigation surfaces that should route locally inside the app.
 */
export const BlockRouterLink: Story = {
  render: () => ({
    components: { BaseLink },
    setup() {
      const state = reactive({
        lastAction: 'none',
        log: [] as string[],
      })

      installRouterProvider(state)
      provideBaseLinkDefaultTarget(undefined)

      const latestLog = computed(() => state.log.slice(0, 4))

      return {
        latestLog,
        state,
      }
    },
    template: `
      <div style="${cardWrap}">
        <BaseLink
          display="block"
          href="/profile"
          role="button"
          :prefetchQueriesOnHover="true"
          style="display:block; width:320px; border-radius:18px; padding:18px; background:white; border:1px solid #cbd5e1;"
        >
          <template #default="{ hovered, pressed }">
            <div :style="{ color: '#0f172a', opacity: pressed ? 0.72 : hovered ? 0.86 : 1 }">
              Router-backed block link
            </div>
          </template>
        </BaseLink>
        <div style="${statusPanel}">
          lastAction={{ state.lastAction }}
          <div v-for="entry in latestLog" :key="entry" style="margin-top:4px;">{{ entry }}</div>
        </div>
      </div>
    `,
  }),
}

/**
 * Behavior: Shows that an explicit `_blank` target keeps browser-native behavior even for a router-shaped href.
 * Benefit: Clarifies when `BaseLink` intentionally stops intercepting navigation and lets the browser take over.
 * Use when: You need a route-like destination to open in a new tab or window instead of using local navigation.
 */
export const TargetBlankNativeFallback: Story = {
  render: () => {
    const story = createObservedLink('/help')

    return {
      ...story,
      setup() {
        const state = reactive({
          lastAction: 'none',
          log: [] as string[],
        })

        installRouterProvider(state)
        const result = story.setup()

        return {
          ...result,
          state,
        }
      },
      template: `
        <div ref="rootRef" style="${surfaceWrap}">
          <BaseLink :href="initialHref" target="_blank">
            <template #default="{ hovered }">
              <span :style="{ color: hovered ? '#1d4ed8' : '#0f172a', textDecoration: 'underline' }">
                Router-shaped href with native _blank behavior
              </span>
            </template>
          </BaseLink>
          <div style="${statusPanel}">
            href={{ observedHref }}<br />
            target={{ observedTarget }}<br />
            router={{ state.lastAction }}
          </div>
        </div>
      `,
    }
  },
}

/**
 * Behavior: Shows the download branch where router and shim decisions are bypassed in favor of file-oriented anchor behavior.
 * Benefit: Makes it clear that download links are treated as asset delivery, not as application navigation.
 * Use when: You are linking to files, exports, or attachments that should download rather than navigate normally.
 */
export const DownloadLink: Story = {
  render: () => {
    const story = createObservedLink('https://cdn.example.org/archive.zip')

    return {
      ...story,
      setup() {
        installTrackingProviders()
        provideCometCustomLinkshimHash('download-hash')

        return story.setup()
      },
      template: `
        <div ref="rootRef" style="${surfaceWrap}">
          <BaseLink :href="initialHref" download="archive.zip">
            <template #default="{ hovered }">
              <span :style="{ color: hovered ? '#1d4ed8' : '#0f172a', textDecoration: 'underline' }">
                Download archive
              </span>
            </template>
          </BaseLink>
          <div style="${statusPanel}">
            href={{ observedHref }}<br />
            target={{ observedTarget }}<br />
            rel={{ observedRel }}
          </div>
        </div>
      `,
    }
  },
}

/**
 * Behavior: Shows a disabled `BaseLink` surface that still renders but no longer behaves like an active navigation target.
 * Benefit: Lets consumers verify disabled visuals and interaction semantics without reading the component internals.
 * Use when: You need to reserve space for a link-like affordance that is temporarily unavailable.
 */
export const DisabledLink: Story = {
  render: () => ({
    components: { BaseLink },
    template: `
      <div style="${surfaceWrap}">
        <BaseLink
          href="/disabled"
          :disabled="true"
          style="color:#64748b;"
        >
          <template #default="{ disabled }">
            <span :style="{ opacity: disabled ? 0.6 : 1, textDecoration: 'underline' }">
              Disabled link state: {{ disabled }}
            </span>
          </template>
        </BaseLink>
      </div>
    `,
  }),
}

/**
 * Behavior: Shows `target` being inherited from the default-target provider rather than repeated on the component itself.
 * Benefit: Demonstrates how shared link behavior can be coordinated from higher in the tree with less prop repetition.
 * Use when: You want a subtree of links to share the same default browsing target such as `_blank`.
 */
export const DefaultTargetFromProvider: Story = {
  render: () => {
    const story = createObservedLink('https://example.org/provider')

    return {
      ...story,
      setup() {
        provideBaseLinkDefaultTarget('_blank')
        installTrackingProviders()

        return story.setup()
      },
      template: `
        <div ref="rootRef" style="${surfaceWrap}">
          <BaseLink :href="initialHref">
            <template #default="{ hovered }">
              <span :style="{ color: hovered ? '#1d4ed8' : '#0f172a', textDecoration: 'underline' }">
                Inherited target from provider
              </span>
            </template>
          </BaseLink>
          <div style="${statusPanel}">
            target={{ observedTarget }}<br />
            rel={{ observedRel }}
          </div>
        </div>
      `,
    }
  },
}

/**
 * Behavior: Shows automatic `rel` derivation for an external link, including safety-oriented values like `nofollow` and `noreferrer`.
 * Benefit: Makes the derived browser-facing output explicit so consumers can trust the default external-link policy.
 * Use when: You want external links to inherit safe default `rel` behavior instead of hand-authoring those attributes.
 */
export const AutoRelDerivation: Story = {
  render: () => {
    const story = createObservedLink('https://external.example.com/docs')

    return {
      ...story,
      setup() {
        installTrackingProviders()
        provideCometCustomLinkshimHash('rel-derivation')

        return story.setup()
      },
      template: `
        <div ref="rootRef" style="${surfaceWrap}">
          <BaseLink :href="initialHref">
            <template #default="{ hovered }">
              <span :style="{ color: hovered ? '#1d4ed8' : '#0f172a', textDecoration: 'underline' }">
                External link with derived rel
              </span>
            </template>
          </BaseLink>
          <div style="${statusPanel}">
            target={{ observedTarget }}<br />
            rel={{ observedRel }}
          </div>
        </div>
      `,
    }
  },
}

/**
 * Behavior: Shows the GHL branch where hover temporarily switches the rendered href so the original destination becomes observable.
 * Benefit: Explains one of the least obvious `BaseLink` behaviors without requiring source-code context.
 * Use when: You need to validate or demonstrate original-vs-shim href exposure for externally shimmed links.
 */
export const GHLOriginalHrefOnHover: Story = {
  render: () => {
    const story = createObservedLink('https://external.example.com/path')

    return {
      ...story,
      setup() {
        provideCometGHLRendering(true)
        provideCometCustomLinkshimHash('ghl-demo')
        installTrackingProviders()

        return story.setup()
      },
      template: `
        <div ref="rootRef" style="padding:24px; background:#fff7ed;">
          <BaseLink :href="initialHref" target="_blank">
            <template #default="{ hovered }">
              <span :style="{ color: hovered ? '#c2410c' : '#9a3412', fontWeight: 600 }">
                Hover to switch to original href
              </span>
            </template>
          </BaseLink>
          <div style="${statusPanel}">
            href={{ observedHref }}<br />
            target={{ observedTarget }}<br />
            rel={{ observedRel }}
          </div>
        </div>
      `,
    }
  },
}

/**
 * Behavior: Shows the router lifecycle across mount, hover, and press with a compact status log of adapter callbacks.
 * Benefit: Makes prefetch and navigation sequencing understandable even though the important work happens outside the DOM.
 * Use when: You are integrating `BaseLink` with a router adapter and need to confirm prefetch and navigation timing.
 */
export const RouterPrefetchAndNavigation: Story = {
  render: () => ({
    components: { BaseLink },
    setup() {
      const state = reactive({
        lastAction: 'none',
        log: [] as string[],
      })

      installRouterProvider(state)

      const latestLog = computed(() => state.log.slice(0, 6))

      return {
        latestLog,
        state,
      }
    },
    template: `
      <div style="${cardWrap}">
        <BaseLink
          href="/feed"
          :prefetchQueriesOnHover="true"
          :prefetchQueriesOnMount_I_KNOW_WHAT_IM_DOING="true"
        >
          <template #default="{ hovered, focusVisible }">
            <span :style="{ color: hovered || focusVisible ? '#1d4ed8' : '#0f172a', textDecoration: 'underline', fontWeight: 600 }">
              Router prefetch and navigation link
            </span>
          </template>
        </BaseLink>
        <div style="${statusPanel}">
          lastAction={{ state.lastAction }}
          <div v-for="entry in latestLog" :key="entry" style="margin-top:4px;">{{ entry }}</div>
        </div>
      </div>
    `,
  }),
}

/**
 * Behavior: Shows a router-eligible href intentionally falling back to standard browser navigation through `preventLocalNavigation`.
 * Benefit: Clarifies that router-shaped links can still opt out of interception without changing their destination shape.
 * Use when: You need a local-looking href to preserve normal browser navigation instead of SPA routing.
 */
export const PreventLocalNavigation: Story = {
  render: () => ({
    components: { BaseLink },
    setup() {
      const state = reactive({
        lastAction: 'none',
        log: [] as string[],
      })

      installRouterProvider(state)

      return {
        state,
      }
    },
    template: `
      <div style="${surfaceWrap}">
        <BaseLink href="/privacy" :preventLocalNavigation="true">
          <template #default="{ hovered }">
            <span :style="{ color: hovered ? '#1d4ed8' : '#0f172a', textDecoration: 'underline' }">
              Prevent local navigation
            </span>
          </template>
        </BaseLink>
        <div style="${statusPanel}">
          router={{ state.lastAction }}
        </div>
      </div>
    `,
  }),
}

/**
 * Behavior: Shows the slot state contract for hover, press, focus, and focus-visible rendering inside a block link surface.
 * Benefit: Helps consumers understand how to style `BaseLink` interactively without reimplementing pressability themselves.
 * Use when: You want to build custom link surfaces that react to interaction state through the default slot.
 */
export const RenderStateSurface: Story = {
  render: () => ({
    components: { BaseLink },
    template: `
      <div style="${cardWrap}">
        <BaseLink
          display="block"
          href="/state-demo"
          role="button"
          style="display:block; width:320px; border-radius:18px; padding:18px; background:white; border:1px solid #cbd5e1;"
        >
          <template #default="{ pressed, hovered, focused, focusVisible }">
            <div
              :style="{
                borderRadius: '14px',
                padding: '16px',
                background: pressed ? '#dbeafe' : hovered ? '#eff6ff' : focused || focusVisible ? '#f8fafc' : '#ffffff',
                border: focusVisible ? '2px solid #2563eb' : '1px solid #cbd5e1',
                transition: 'all 120ms ease',
                color: '#0f172a'
              }"
            >
              <div style="font-size:14px; font-weight:700;">BaseLink slot state demo</div>
              <div style="margin-top:8px; font-size:12px; color:#475569;">
                pressed={{ pressed }} hovered={{ hovered }} focused={{ focused }} focusVisible={{ focusVisible }}
              </div>
            </div>
          </template>
        </BaseLink>
      </div>
    `,
  }),
}
