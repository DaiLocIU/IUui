export type FocusNodePredicate = (
  query: unknown,
  index: number,
  node: HTMLElement,
) => boolean

export interface FocusQueryScope<Query = unknown> {
  DO_NOT_USE_queryAllNodes: (query: Query) => HTMLElement[] | null
  DO_NOT_USE_queryFirstNode: (query: Query) => HTMLElement | null
}

export type DOMFocusQuery = string | FocusNodePredicate

export type TabbableNodesResult = [
  HTMLElement[] | null,
  HTMLElement | null,
  HTMLElement | null,
  number,
  HTMLElement | null,
]

const DEFAULT_FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button',
  'iframe',
  'input',
  'select',
  'summary',
  'textarea',
  'audio[controls]',
  'video[controls]',
  '[contenteditable="true"]',
  '[tabindex]',
].join(', ')

function isElement(value: unknown): value is Element {
  return typeof Element !== 'undefined' && value instanceof Element
}

function isHTMLElement(value: unknown): value is HTMLElement {
  return typeof HTMLElement !== 'undefined' && value instanceof HTMLElement
}

function collectCandidateNodes(root: ParentNode): HTMLElement[] {
  if (typeof document === 'undefined') {
    return []
  }

  const nodes = Array.from(root.querySelectorAll<HTMLElement>(DEFAULT_FOCUSABLE_SELECTOR))

  if (isElement(root) && root.matches(DEFAULT_FOCUSABLE_SELECTOR) && isHTMLElement(root)) {
    return [root, ...nodes]
  }

  return nodes
}

export function createDOMFocusQueryScope(root: ParentNode): FocusQueryScope<DOMFocusQuery> {
  return {
    DO_NOT_USE_queryAllNodes(query) {
      if (typeof document === 'undefined') {
        return null
      }

      if (typeof query === 'string') {
        const matches = Array.from(root.querySelectorAll<HTMLElement>(query))
        return matches.length > 0 ? matches : null
      }

      const matches = collectCandidateNodes(root).filter((node, index) => query(query, index, node))
      return matches.length > 0 ? matches : null
    },

    DO_NOT_USE_queryFirstNode(query) {
      if (typeof document === 'undefined') {
        return null
      }

      if (typeof query === 'string') {
        const match = root.querySelector<HTMLElement>(query)
        return match ?? null
      }

      const candidates = collectCandidateNodes(root)

      for (let index = 0; index < candidates.length; index += 1) {
        const node = candidates[index]

        if (query(query, index, node)) {
          return node
        }
      }

      return null
    },
  }
}

export function getTabbableNodes(
  isValidNode: FocusNodePredicate,
  scope: FocusQueryScope<FocusNodePredicate>,
): TabbableNodesResult {
  const activeElement = isHTMLElement(document.activeElement)
    ? document.activeElement
    : null

  const predicate: FocusNodePredicate = (query, index, node) => {
    if (node === activeElement) {
      return true
    }

    return isValidNode(query, index, node)
      && node.offsetWidth > 0
      && node.offsetHeight > 0
      && node.tabIndex !== -1
      && window.getComputedStyle(node).visibility !== 'hidden'
  }

  let nodes = activeElement != null
    ? scope.DO_NOT_USE_queryAllNodes(predicate)
    : null

  if (nodes == null) {
    return [null, null, null, 0, null]
  }

  const radioGroups: Record<string, HTMLInputElement[]> = {}

  for (const node of nodes) {
    if (
      node instanceof HTMLInputElement
      && node.tagName === 'INPUT'
      && node.type === 'radio'
      && node.name !== ''
    ) {
      radioGroups[node.name] = [...(radioGroups[node.name] ?? []), node]
    }
  }

  const radiosToRemove = Object.values(radioGroups)
    .map((group) => {
      const checkedRadio = group.find((radio) => radio.checked)

      if (checkedRadio != null) {
        return group.filter((radio) => radio !== checkedRadio)
      }

      return group.slice(1)
    })
    .flat()

  nodes = nodes.filter((node) => !radiosToRemove.includes(node as HTMLInputElement))

  const firstNode = nodes[0] ?? null
  const lastNode = nodes[nodes.length - 1] ?? null
  const activeIndex = activeElement != null ? nodes.indexOf(activeElement) : -1
  const activeNode = activeIndex !== -1 ? nodes[activeIndex] : null

  return [nodes, firstNode, lastNode, activeIndex, activeNode]
}

export default getTabbableNodes
