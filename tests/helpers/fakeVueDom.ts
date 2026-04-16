import { createRenderer } from 'vue'

type Listener = (event: Event) => void

export class FakeElement {
  children: FakeElement[] = []
  nodeType = 1
  parent: FakeElement | null = null
  props: Record<string, unknown> = {}
  text?: string
  readonly type: string

  private readonly listeners = new Map<string, Set<Listener>>()

  constructor(type: string) {
    this.type = type
  }

  addEventListener(type: string, listener: Listener): void {
    const listeners = this.listeners.get(type) ?? new Set<Listener>()
    listeners.add(listener)
    this.listeners.set(type, listeners)
  }

  removeEventListener(type: string, listener: Listener): void {
    const listeners = this.listeners.get(type)

    if (listeners == null) {
      return
    }

    listeners.delete(listener)

    if (listeners.size === 0) {
      this.listeners.delete(type)
    }
  }

  contains(node: Node | FakeElement | null): boolean {
    let current = node as FakeElement | null

    while (current != null) {
      if (current === this) {
        return true
      }

      current = current.parent
    }

    return false
  }

  dispatch(type: string, event: Event): void {
    this.listeners.get(type)?.forEach((listener) => {
      listener(event)
    })
  }
}

export interface FakeDocument {
  activeElement: FakeElement | null
}

export const renderer = createRenderer<FakeElement, FakeElement>({
  cloneNode(node) {
    const clone = new FakeElement(node.type)
    clone.children = [...node.children]
    clone.props = { ...node.props }
    clone.text = node.text
    return clone
  },
  createComment(text) {
    const node = new FakeElement('comment')
    node.text = text
    return node
  },
  createElement(type) {
    return new FakeElement(type)
  },
  createText(text) {
    const node = new FakeElement('text')
    node.text = text
    return node
  },
  insert(child, parent) {
    child.parent = parent
    parent.children.push(child)
  },
  insertStaticContent(content, parent) {
    const node = new FakeElement('static')
    node.text = content
    node.parent = parent
    parent.children.push(node)
    return [node, node]
  },
  nextSibling() {
    return null
  },
  parentNode(node) {
    return node.parent
  },
  patchProp(node, key, _previousValue, nextValue) {
    node.props[key] = nextValue
  },
  querySelector() {
    return null
  },
  remove(node) {
    if (node.parent == null) {
      return
    }

    node.parent.children = node.parent.children.filter((child) => child !== node)
    node.parent = null
  },
  setElementText(node, text) {
    node.text = text
  },
  setScopeId() {},
  setText(node, text) {
    node.text = text
  },
})

export function createFakeDocument(): FakeDocument {
  return {
    activeElement: null,
  }
}

export function createFocusEvent(
  type: 'blur' | 'focusin' | 'focusout',
  target: FakeElement,
  relatedTarget: FakeElement | null = null,
): FocusEvent {
  const event = {
    nativeEvent: {
      relatedTarget,
    },
    relatedTarget,
    target,
    type,
  } as FocusEvent

  return event
}

export function createKeyboardEvent(
  target: FakeElement,
  overrides: Partial<KeyboardEvent> = {},
): KeyboardEvent {
  return {
    altKey: false,
    ctrlKey: false,
    key: 'Tab',
    metaKey: false,
    shiftKey: false,
    target,
    type: 'keydown',
    ...overrides,
  } as KeyboardEvent
}

export function bubbleEvent(
  target: FakeElement,
  type: string,
  event: Event,
): void {
  let current: FakeElement | null = target

  while (current != null) {
    current.dispatch(type, event)
    current = current.parent
  }
}
