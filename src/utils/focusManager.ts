import getTabbableNodes, {
  type FocusNodePredicate,
  type FocusQueryScope,
} from './getTabbableNodes'

export interface FocusElementOptions {
  focusWithAutoFocus?: boolean
  focusWithoutUserIntent?: boolean
  preventScroll?: boolean
}

export interface FocusContainmentEvent {
  preventDefault: () => void
  stopPropagation: () => void
}

interface TabIndexState {
  canTab: boolean
  value: number
}

interface LexicalEditorLike {
  focus: () => void
}

interface FocusManagedElement extends HTMLElement {
  __lexicalEditor?: LexicalEditorLike
  _focusWithAutoFocus?: boolean
  _tabIndexState?: TabIndexState
}

type ScrollPositionEntry = [HTMLElement, number, number]

let isFocusingWithoutUserIntentState = false
let supportsPreventScroll = false
let hasDetectedPreventScrollSupport = false

const AUTOFOCUS_RESET_DELAY = 500

function detectPreventScrollSupport(): void {
  try {
    const element = document.createElement('div')

    element.addEventListener(
      'focus',
      (event) => {
        event.preventDefault()
        event.stopPropagation()
      },
      true,
    )

    element.focus(
      Object.defineProperty({}, 'preventScroll', {
        get() {
          supportsPreventScroll = true
          return true
        },
      }) as FocusOptions,
    )
  } catch {
    // Ignore: unsupported environments simply fall back to manual scroll restore.
  }
}

function getScrollPositions(element: HTMLElement): ScrollPositionEntry[] {
  const entries: ScrollPositionEntry[] = []
  const scrollingElement = (document.scrollingElement || document.documentElement) as HTMLElement | null

  for (
    let parent = element.parentElement;
    parent != null && parent !== scrollingElement;
    parent = parent.parentElement
  ) {
    if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth) {
      entries.push([parent, parent.scrollTop, parent.scrollLeft])
    }
  }

  if (scrollingElement != null) {
    entries.push([scrollingElement, scrollingElement.scrollTop, scrollingElement.scrollLeft])
  }

  return entries
}

function restoreScrollPositions(entries: ScrollPositionEntry[]): void {
  entries.forEach(([element, scrollTop, scrollLeft]) => {
    element.scrollTop = scrollTop
    element.scrollLeft = scrollLeft
  })
}

function focusHTMLElement(element: HTMLElement, options?: FocusOptions): void {
  if ('focus' in element) {
    element.focus(options)
    return
  }

  HTMLElement.prototype.focus.call(element, options)
}

export function getAllNodesFromOneOrManyQueries<Query>(
  query: Query | Query[],
  scope: FocusQueryScope<Query>,
): HTMLElement[] | null {
  const queries = Array.isArray(query) ? query : [query]

  for (const currentQuery of queries) {
    const nodes = scope.DO_NOT_USE_queryAllNodes(currentQuery)

    if (nodes != null) {
      return nodes
    }
  }

  return null
}

export function getFirstNodeFromOneOrManyQueries<Query>(
  query: Query | Query[],
  scope: FocusQueryScope<Query>,
): HTMLElement | null {
  const queries = Array.isArray(query) ? query : [query]

  for (const currentQuery of queries) {
    const node = scope.DO_NOT_USE_queryFirstNode(currentQuery)

    if (node != null) {
      return node
    }
  }

  return null
}

export function focusFirst<Query>(
  query: Query | Query[],
  scope: FocusQueryScope<Query>,
  options?: FocusElementOptions,
): void {
  const firstNode = getFirstNodeFromOneOrManyQueries(query, scope)

  if (firstNode != null) {
    focusElement(firstNode, options)
  }
}

export function isFocusingWithoutUserIntent(): boolean {
  return isFocusingWithoutUserIntentState
}

export function wasElementAutoFocused(element: FocusManagedElement): boolean {
  return element._focusWithAutoFocus === true
}

export function focusElement(
  element: HTMLElement | null,
  options: FocusElementOptions = {},
): void {
  if (element == null || typeof document === 'undefined') {
    return
  }

  if (!hasDetectedPreventScrollSupport) {
    hasDetectedPreventScrollSupport = true
    detectPreventScrollSupport()
  }

  const managedElement = element as FocusManagedElement
  const tabIndexState = managedElement._tabIndexState

  if (tabIndexState?.canTab === false) {
    return
  }

  const originalTabIndex = tabIndexState != null ? tabIndexState.value : managedElement.tabIndex
  managedElement.tabIndex = -1

  const previousFocusWithoutIntentState = isFocusingWithoutUserIntentState

  if (options.focusWithAutoFocus === true) {
    managedElement._focusWithAutoFocus = true
    window.setTimeout(() => {
      managedElement._focusWithAutoFocus = false
    }, AUTOFOCUS_RESET_DELAY)
  }

  try {
    isFocusingWithoutUserIntentState = options.focusWithoutUserIntent ?? false

    if (managedElement.__lexicalEditor != null) {
      managedElement.__lexicalEditor.focus()
    } else if (options.preventScroll !== true) {
      focusHTMLElement(managedElement)
    } else if (supportsPreventScroll) {
      focusHTMLElement(managedElement, { preventScroll: true })
    } else {
      const scrollPositions = getScrollPositions(managedElement)
      focusHTMLElement(managedElement)
      restoreScrollPositions(scrollPositions)
    }
  } catch {
    // Ignore focus errors from detached elements or browser edge cases.
  } finally {
    isFocusingWithoutUserIntentState = previousFocusWithoutIntentState
    managedElement.tabIndex = originalTabIndex
  }
}

export function focusNext(
  isValidNode: FocusNodePredicate,
  scope: FocusQueryScope<FocusNodePredicate>,
  preventScroll?: boolean,
): void {
  const [allNodes, , lastNode, activeIndex, activeNode] = getTabbableNodes(isValidNode, scope)

  if (activeNode != null && activeNode !== lastNode && allNodes != null) {
    focusElement(allNodes[activeIndex + 1], { preventScroll })
  }
}

export function focusPrevious(
  isValidNode: FocusNodePredicate,
  scope: FocusQueryScope<FocusNodePredicate>,
  preventScroll?: boolean,
): void {
  const [allNodes, firstNode, , activeIndex, activeNode] = getTabbableNodes(isValidNode, scope)

  if (activeNode != null && activeNode !== firstNode && allNodes != null) {
    focusElement(allNodes[activeIndex - 1], { preventScroll })
  }
}

export function focusNextContained(
  isValidNode: FocusNodePredicate,
  scope: FocusQueryScope<FocusNodePredicate>,
  event: FocusContainmentEvent,
  shouldWrap?: boolean,
  onWrap?: () => void,
): void {
  const [allNodes, firstNode, lastNode, activeIndex, activeNode] = getTabbableNodes(isValidNode, scope)

  if (activeNode == null || allNodes == null) {
    return
  }

  if (activeNode === lastNode) {
    if (onWrap != null) {
      onWrap()
      return
    }

    if (shouldWrap === true && firstNode != null) {
      focusElement(firstNode)
      event.preventDefault()
      event.stopPropagation()
    }

    return
  }

  focusElement(allNodes[activeIndex + 1])
  event.preventDefault()
  event.stopPropagation()
}

export function focusPreviousContained(
  isValidNode: FocusNodePredicate,
  scope: FocusQueryScope<FocusNodePredicate>,
  event: FocusContainmentEvent,
  shouldWrap?: boolean,
  onWrap?: () => void,
): void {
  const [allNodes, firstNode, lastNode, activeIndex, activeNode] = getTabbableNodes(isValidNode, scope)

  if (activeNode == null || allNodes == null) {
    return
  }

  if (activeNode === firstNode) {
    if (onWrap != null) {
      onWrap()
      return
    }

    if (shouldWrap === true && lastNode != null) {
      focusElement(lastNode)
      event.preventDefault()
      event.stopPropagation()
    }

    return
  }

  focusElement(allNodes[activeIndex - 1])
  event.preventDefault()
  event.stopPropagation()
}

const focusManager = {
  focusElement,
  focusFirst,
  focusNext,
  focusNextContained,
  focusPrevious,
  focusPreviousContained,
  getAllNodesFromOneOrManyQueries,
  getFirstNodeFromOneOrManyQueries,
  isFocusingWithoutUserIntent,
  wasElementAutoFocused,
}

export default focusManager
