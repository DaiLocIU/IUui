import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  createRenderer,
  defineComponent,
  h,
  nextTick,
  type ComputedRef,
  type Ref,
  type StyleValue,
} from 'vue'

import useBaseAnchorElement from '../src/composables/useBaseAnchorElement'

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
}

describe('useBaseAnchorElement', () => {
  const instances: MockIntersectionObserverInstance[] = []

  afterEach(() => {
    vi.unstubAllGlobals()
    instances.length = 0
  })

  function installIntersectionObserverMock(): void {
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn((callback: IntersectionObserverCallback) => {
        const instance: MockIntersectionObserverInstance = {
          callback,
          disconnect: vi.fn(),
          observe: vi.fn(),
        }

        instances.push(instance)

        return instance
      }),
    )
  }

  it('returns a stable anchor name and hides it when the anchor is not visible enough', async () => {
    installIntersectionObserverMock()

    const root: TestNode = { type: 'root', children: [] }
    let anchorName!: ComputedRef<string | null>
    let anchorStyle!: ComputedRef<StyleValue | null>
    let anchorRef!: Ref<HTMLElement | null>

    const TestComponent = defineComponent({
      setup() {
        const result = useBaseAnchorElement()
        anchorName = result[0]
        anchorStyle = result[1]
        anchorRef = result[2]

        return () => h('div', { ref: anchorRef, style: anchorStyle.value ?? undefined })
      },
    })

    renderer.createApp(TestComponent).mount(root)
    await nextTick()

    const initialAnchorName = anchorName.value

    expect(initialAnchorName).toMatch(/^--/)
    expect(anchorStyle.value).toEqual({
      '--x-anchorName': initialAnchorName,
      'anchor-name': initialAnchorName,
    })

    instances[0]?.callback([
      {
        intersectionRatio: 0.2,
      } as IntersectionObserverEntry,
    ], {} as IntersectionObserver)
    await nextTick()

    expect(anchorName.value).toBeNull()
    expect(anchorStyle.value).toBeNull()

    instances[0]?.callback([
      {
        intersectionRatio: 1,
      } as IntersectionObserverEntry,
    ], {} as IntersectionObserver)
    await nextTick()

    expect(anchorName.value).toBe(initialAnchorName)
    expect(anchorStyle.value).toEqual({
      '--x-anchorName': initialAnchorName,
      'anchor-name': initialAnchorName,
    })
  })
})
