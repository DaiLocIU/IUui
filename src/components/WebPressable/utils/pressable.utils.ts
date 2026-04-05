// React sources: ReactEventHelpers, WebPressable.react,
// ReactPressEvent.react, ReactHoverEvent.react

import type { HoverEvent, LinkProps, PressEvent } from '../types'

// ─── ReactEventHelpers ─────────────────────────────────────────────────────────

/**
 * React: isMac — module-level constant
 */
export const isMac: boolean =
  typeof window !== 'undefined' && window.navigator != null
    ? /^Mac/.test(window.navigator.platform)
    : false

/**
 * React: hasPointerEvents — module-level constant
 */
export const hasPointerEvents: boolean =
  typeof window !== 'undefined' && window.PointerEvent != null

/**
 * React: isRelatedTargetWithin(element, relatedTarget)
 * Handles both DOM nodes (contains) and Selection objects (containsNode).
 */
export function isRelatedTargetWithin(
  element: HTMLElement,
  relatedTarget: EventTarget | null,
): boolean {
  if (relatedTarget == null) {
    return false
  }

  const elementWithContainsNode = element as HTMLElement & {
    containsNode?: (target: EventTarget) => boolean
  }

  if (typeof elementWithContainsNode.containsNode === 'function') {
    return elementWithContainsNode.containsNode(relatedTarget)
  }

  return element.contains(relatedTarget as Node)
}

// ─── SSR guard ─────────────────────────────────────────────────────────────────

/**
 * React: ExecutionEnvironment.canUseDOM
 */
export const canUseDOM: boolean =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'

// ─── Safari detection ──────────────────────────────────────────────────────────

/**
 * React: UserAgent.isBrowser("Safari") || UserAgent.isBrowser("Mobile Safari")
 */
export const isSafari: boolean = canUseDOM
  && (
    /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent)
    || (/iPad|iPhone|iPod/.test(window.navigator.userAgent) && !(window as Window & {
      MSStream?: unknown
    }).MSStream)
  )

// ─── Tag resolution ────────────────────────────────────────────────────────────

// React: y — roles that upgrade to <a> only when a link is present
const ANCHOR_UPGRADE_ROLES = ['menuitem', 'tab', 'none']

// React: C — semantic role -> HTML tag map
const ROLE_TAG_MAP: Record<string, string> = {
  article: 'article',
  banner: 'header',
  complementary: 'aside',
  contentinfo: 'footer',
  figure: 'figure',
  form: 'form',
  heading: 'h1',
  label: 'label',
  link: 'a',
  list: 'ul',
  listitem: 'li',
  main: 'main',
  navigation: 'nav',
  none: 'div',
  region: 'section',
}

/**
 * React: b(accessibilityRole, link) — resolveElementTag
 */
export function resolveTag(
  role: string | undefined,
  link: LinkProps | undefined,
): string {
  if (role != null && ANCHOR_UPGRADE_ROLES.includes(role) && link?.url != null) {
    return 'a'
  }

  if (role != null) {
    const mappedTag = ROLE_TAG_MAP[role]

    if (mappedTag != null) {
      return mappedTag
    }
  }

  return 'div'
}

/**
 * React: v(role) — filterRoleForDOM
 */
export function filterRoleForDOM(role: string | undefined): string | undefined {
  if (role === 'label') {
    return undefined
  }

  return role
}

// ─── Keyboard press synthesis ──────────────────────────────────────────────────

// React: roles where Space fires a press
const SPACE_PRESS_ROLES = new Set([
  'button',
  'checkbox',
  'combobox',
  'menuitem',
  'menuitemcheckbox',
  'menuitemradio',
  'option',
  'radio',
  'switch',
  'tab',
])

/**
 * React: S(e) — shouldTriggerKeyboardPress
 */
export function shouldTriggerKeyboardPress(e: KeyboardEvent): boolean {
  const target = e.target as HTMLElement
  const tagName = target.tagName
  const isNativelyInteractive =
    target.isContentEditable
    || (tagName === 'A' && (target as HTMLAnchorElement).href != null)
    || tagName === 'BUTTON'
    || tagName === 'INPUT'
    || tagName === 'SELECT'
    || tagName === 'TEXTAREA'

  if (target.tabIndex !== 0 || isNativelyInteractive) {
    return false
  }

  if (e.key === 'Enter') {
    return true
  }

  if (e.key === ' ' || e.key === 'Spacebar') {
    const role = target.getAttribute('role')
    return role != null && SPACE_PRESS_ROLES.has(role)
  }

  return false
}

// ─── Link navigation helpers ───────────────────────────────────────────────────

/**
 * React: R(e) — isInDocument
 */
export function isInDocument(element: Element): boolean {
  return (
    typeof document !== 'undefined'
    && typeof document.contains === 'function'
    && document.contains(element)
  )
}

/**
 * React: L(element) — isInsideAnchor
 */
export function isInsideAnchor(element: Element | null): boolean {
  for (let node = element; node != null; node = node.parentNode as Element | null) {
    if (node.tagName === 'A' && (node as HTMLAnchorElement).href != null) {
      return true
    }
  }

  return false
}

/**
 * React: E(event, preventDefault) — shouldPreventLinkNavigation
 */
export function shouldPreventLinkNavigation(
  e: MouseEvent,
  preventDefault: boolean | undefined,
): boolean {
  const eventTarget = e.target instanceof Element ? e.target : null
  const currentTarget = e.currentTarget instanceof Element ? e.currentTarget : null
  const resolvedTarget = eventTarget != null && isInDocument(eventTarget)
    ? eventTarget
    : currentTarget
  const insideAnchor = isInsideAnchor(resolvedTarget)
  const hasModifier = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey

  return preventDefault !== false && insideAnchor && !hasModifier
}

// ─── Press event factory ───────────────────────────────────────────────────────

/**
 * React: m(type, buttons, pointerType, nativeEvent, target) — createPressEvent
 */
export function createPressEvent(
  type: string,
  buttons: number,
  pointerType: string,
  nativeEvent: PointerEvent | MouseEvent,
  target: HTMLElement,
): PressEvent {
  const event: PressEvent = {
    altKey: nativeEvent.altKey,
    buttons,
    clientX: nativeEvent.clientX,
    clientY: nativeEvent.clientY,
    ctrlKey: nativeEvent.ctrlKey,
    defaultPrevented: nativeEvent.defaultPrevented,
    metaKey: nativeEvent.metaKey,
    pageX: nativeEvent.pageX,
    pageY: nativeEvent.pageY,
    pointerType,
    screenX: nativeEvent.screenX,
    screenY: nativeEvent.screenY,
    shiftKey: nativeEvent.shiftKey,
    target,
    timeStamp: nativeEvent.timeStamp,
    type,
    x: nativeEvent.clientX,
    y: nativeEvent.clientY,
    preventDefault() {
      event.defaultPrevented = true
      nativeEvent.preventDefault()
    },
    stopPropagation() {
      nativeEvent.stopPropagation()
    },
  }

  return event
}

// ─── Hover event factory ───────────────────────────────────────────────────────

/**
 * React: d(type, nativeEvent, target) — createHoverEvent
 */
export function createHoverEvent(
  type: string,
  nativeEvent: PointerEvent | MouseEvent,
  target: HTMLElement,
): HoverEvent {
  return {
    clientX: nativeEvent.clientX,
    clientY: nativeEvent.clientY,
    pageX: nativeEvent.pageX,
    pageY: nativeEvent.pageY,
    screenX: nativeEvent.screenX,
    screenY: nativeEvent.screenY,
    target,
    timeStamp: nativeEvent.timeStamp,
    type,
    x: nativeEvent.clientX,
    y: nativeEvent.clientY,
  }
}
