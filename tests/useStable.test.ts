import { describe, expect, it } from 'vitest'
import {
  createRenderer,
  defineComponent,
  h,
  nextTick,
  ref,
} from 'vue'

import useStable from '../src/composables/useStable'

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

describe('useStable', () => {
  it('creates the value once per mounted component instance', async () => {
    const renderTick = ref(0)
    const root: TestNode = { type: 'root', children: [] }
    let factoryCalls = 0
    let stableValue: { id: number } | undefined

    const TestComponent = defineComponent({
      setup() {
        const value = useStable(() => {
          factoryCalls += 1
          return { id: factoryCalls }
        })

        stableValue = value

        return () => h('div', `${renderTick.value}:${value.id}`)
      },
    })

    const app = renderer.createApp(TestComponent)
    app.mount(root)

    expect(factoryCalls).toBe(1)
    expect(stableValue).toEqual({ id: 1 })

    const firstValue = stableValue

    renderTick.value += 1
    await nextTick()

    expect(factoryCalls).toBe(1)
    expect(stableValue).toBe(firstValue)

    app.unmount()
    root.children = []

    renderer.createApp(TestComponent).mount(root)

    expect(factoryCalls).toBe(2)
    expect(stableValue).toEqual({ id: 2 })
  })

  it('supports null values without treating them as uninitialized', () => {
    const root: TestNode = { type: 'root', children: [] }
    let factoryCalls = 0
    let stableValue: null | undefined

    const TestComponent = defineComponent({
      setup() {
        const value = useStable(() => {
          factoryCalls += 1
          return null
        })

        stableValue = value

        return () => h('div')
      },
    })

    renderer.createApp(TestComponent).mount(root)

    expect(factoryCalls).toBe(1)
    expect(stableValue).toBeNull()
  })
})
