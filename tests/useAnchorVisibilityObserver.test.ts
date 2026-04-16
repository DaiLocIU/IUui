import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  createRenderer,
  defineComponent,
  h,
  nextTick,
  type Ref,
} from 'vue'

import {
  MODERATE_INTERSECTION_RATIO,
  useAnchorVisibilityObserver,
} from '../src/composables/useAnchorVisibilityObserver'

interface TestNode {
  children: TestNode[]
  props?: Record<string, unknown>
  text?: string
  type: string
}

const renderer = createRenderer<TestNode, TestNode>({
  cloneNode(node) {
    return {
      ...node,
      children: [...node.children],
      props: node.props != null ? { ...node.props } : undefined,
    }
  },
  createComment(text) {
    return { type: 'comment', text, children: [] }
  },
  createElement(type) {
    return { type, children: [], props: {} }
  },
  createText(text) {
    return { type: 'text', text, children: [] }
  },
  insert(child, parent) {
    parent.children.push(child)
  },
  insertStaticContent(content, parent) {
    const node = { type: 'static', text: content, children: [] }
    parent.children.push(node)
    return [node, node]
  },
  nextSibling() {
    return null
  },
  parentNode() {
    return null
  },
  patchProp(node, key, _previousValue, nextValue) {
    node.props ??= {}
    node.props[key] = nextValue
  },
  querySelector() {
    return null
  },
  remove() {},
  setElementText(node, text) {
    node.text = text
  },
  setScopeId() {},
  setText(node, text) {
    node.text = text
  },
})

interface MockIntersectionObserverInstance {
  callback: IntersectionObserverCallback
  disconnect: ReturnType<typeof vi.fn>
  observe: ReturnType<typeof vi.fn>
  options?: IntersectionObserverInit
}

describe('useAnchorVisibilityObserver', () => {
  const instances: MockIntersectionObserverInstance[] = []

  afterEach(() => {
    vi.unstubAllGlobals()
    instances.length = 0
  })

  function installIntersectionObserverMock(): void {
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn((callback: IntersectionObserverCallback, options?: IntersectionObserverInit) => {
        const instance: MockIntersectionObserverInstance = {
          callback,
          disconnect: vi.fn(),
          observe: vi.fn(),
          options,
        }

        instances.push(instance)

        return instance
      }),
    )
  }

  it('tracks visibility using a 50 percent intersection threshold', async () => {
    installIntersectionObserverMock()

    const root: TestNode = { type: 'root', children: [] }
    let anchorRef!: Ref<HTMLElement | null>
    let isVisible!: Ref<boolean>

    const TestComponent = defineComponent({
      setup() {
        const result = useAnchorVisibilityObserver()
        anchorRef = result[0]
        isVisible = result[1]

        return () => h('div', { ref: anchorRef })
      },
    })

    renderer.createApp(TestComponent).mount(root)
    await nextTick()

    expect(isVisible.value).toBe(true)
    expect(instances).toHaveLength(1)
    expect(instances[0]?.options).toEqual({
      threshold: MODERATE_INTERSECTION_RATIO,
    })

    instances[0]?.callback([
      {
        intersectionRatio: 0.49,
      } as IntersectionObserverEntry,
    ], {} as IntersectionObserver)

    await nextTick()

    expect(isVisible.value).toBe(false)

    instances[0]?.callback([
      {
        intersectionRatio: 0.5,
      } as IntersectionObserverEntry,
    ], {} as IntersectionObserver)

    await nextTick()

    expect(isVisible.value).toBe(true)
  })

  it('disconnects the observer on unmount', async () => {
    installIntersectionObserverMock()

    const root: TestNode = { type: 'root', children: [] }
    let anchorRef!: Ref<HTMLElement | null>

    const TestComponent = defineComponent({
      setup() {
        const result = useAnchorVisibilityObserver()
        anchorRef = result[0]

        return () => h('div', { ref: anchorRef })
      },
    })

    const app = renderer.createApp(TestComponent)
    app.mount(root)
    await nextTick()

    app.unmount()

    expect(instances[0]?.disconnect).toHaveBeenCalledTimes(1)
  })
})
