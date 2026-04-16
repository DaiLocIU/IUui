import { afterEach, describe, expect, it, vi } from 'vitest'
import { createRenderer, defineComponent, h } from 'vue'

import useDelayedState, {
  type SetDelayedState,
} from '../src/composables/useDelayedState'

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

describe('useDelayedState', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  function mountTestComponent<T>(initialValue: T): {
    root: TestNode
    stateRef: { value: T }
    setDelayedState: SetDelayedState<T>
    unmount: () => void
  } {
    const root: TestNode = { type: 'root', children: [] }
    let stateRef!: { value: T }
    let setDelayedState!: SetDelayedState<T>

    const TestComponent = defineComponent({
      setup() {
        const [state, setState] = useDelayedState(initialValue)
        stateRef = state
        setDelayedState = setState

        return () => h('div', String(state.value))
      },
    })

    const app = renderer.createApp(TestComponent)
    app.mount(root)

    return {
      root,
      setDelayedState,
      stateRef,
      unmount: () => {
        app.unmount()
      },
    }
  }

  it('updates immediately and runs the callback when delay is 0', () => {
    const { stateRef, setDelayedState } = mountTestComponent(false)
    const callback = vi.fn()

    setDelayedState(true, 0, callback)

    expect(stateRef.value).toBe(true)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(true)
  })

  it('delays the update until the timeout elapses', async () => {
    vi.useFakeTimers()

    const { stateRef, setDelayedState } = mountTestComponent(false)
    const callback = vi.fn()

    setDelayedState(true, 100, callback)

    expect(stateRef.value).toBe(false)
    expect(callback).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(99)

    expect(stateRef.value).toBe(false)
    expect(callback).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(1)

    expect(stateRef.value).toBe(true)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(true)
  })

  it('cancels the previous pending update when a new one is scheduled', async () => {
    vi.useFakeTimers()

    const { stateRef, setDelayedState } = mountTestComponent(false)
    const firstCallback = vi.fn()
    const secondCallback = vi.fn()

    setDelayedState(true, 100, firstCallback)
    setDelayedState(false, 0, secondCallback)

    await vi.runAllTimersAsync()

    expect(stateRef.value).toBe(false)
    expect(firstCallback).not.toHaveBeenCalled()
    expect(secondCallback).toHaveBeenCalledTimes(1)
    expect(secondCallback).toHaveBeenCalledWith(false)
  })

  it('cleans up pending timeouts on unmount', async () => {
    vi.useFakeTimers()

    const { stateRef, setDelayedState, unmount } = mountTestComponent(false)
    const callback = vi.fn()

    setDelayedState(true, 100, callback)
    unmount()

    await vi.runAllTimersAsync()

    expect(stateRef.value).toBe(false)
    expect(callback).not.toHaveBeenCalled()
  })
})
