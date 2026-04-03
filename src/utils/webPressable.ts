import type { Ref } from 'vue'

export interface AccessibilityRelationship {
  activedescendant?: string
  controls?: string
  current?: boolean | 'page' | 'step' | 'location' | 'date' | 'time'
  describedby?: string
  details?: string
  errormessage?: string
  haspopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
  labelledby?: string
  owns?: string
}

export interface AccessibilityState {
  busy?: boolean
  checked?: boolean | 'mixed'
  disabled?: boolean
  expanded?: boolean
  hidden?: boolean
  invalid?: boolean | 'grammar' | 'spelling'
  modal?: boolean
  orientation?: 'horizontal' | 'vertical'
  pressed?: boolean | 'mixed'
  readonly?: boolean
  required?: boolean
  selected?: boolean
}

export interface AccessibilityValue {
  max?: number
  min?: number
  now?: number
  text?: string
}

export interface PressableLink {
  attributionsrc?: string
  download?: boolean | string
  rel?: string
  target?: string
  url?: string
}

export interface PressableState {
  disabled: boolean
  focusVisible: boolean
  focused: boolean
  hovered: boolean
  pressed: boolean
}

export interface PressEventLike {
  altKey: boolean
  buttons: number
  clientX: number
  clientY: number
  ctrlKey: boolean
  defaultPrevented: boolean
  metaKey: boolean
  pageX: number
  pageY: number
  pointerType: string
  screenX: number
  screenY: number
  shiftKey: boolean
  target: EventTarget | null
  timeStamp: number
  type: string
  x: number
  y: number
  preventDefault: () => void
  stopPropagation: () => void
}

export interface HoverEventLike {
  clientX: number
  clientY: number
  pageX: number
  pageY: number
  screenX: number
  screenY: number
  target: EventTarget | null
  timeStamp: number
  type: string
  x: number
  y: number
}

const LINKISH_ROLES = ['menuitem', 'tab', 'none']

const ROLE_TO_TAG: Record<string, string> = {
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

export const isMac = typeof window !== 'undefined' && window.navigator != null
  ? /^Mac/.test(window.navigator.platform)
  : false

export const hasPointerEvents =
  typeof window !== 'undefined' && window.PointerEvent != null

export const canUseDOM =
  typeof window !== 'undefined' && typeof document !== 'undefined'

export const getPressableTag = (
  accessibilityRole: string | undefined,
  link: PressableLink | undefined,
): string => {
  let tag = 'div'

  if (
    accessibilityRole != null &&
    LINKISH_ROLES.includes(accessibilityRole) &&
    link?.url != null
  ) {
    tag = 'a'
  } else if (accessibilityRole != null) {
    const mapped = ROLE_TO_TAG[accessibilityRole]

    if (mapped != null) {
      tag = mapped
    }
  }

  return tag
}

export const normalizeRole = (role: string | undefined): string | undefined => {
  if (role === 'label') {
    return undefined
  }

  return role
}

const BUTTON_LIKE_KEYBOARD_ROLES = new Set([
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

export const shouldHandleKeyboardPress = (event: KeyboardEvent): boolean => {
  const target = event.target

  if (!(target instanceof HTMLElement) || target.tabIndex !== 0) {
    return false
  }

  const tagName = target.tagName
  const isNativeInteractive =
    target.isContentEditable ||
    (tagName === 'A' && (target as HTMLAnchorElement).href != null) ||
    tagName === 'BUTTON' ||
    tagName === 'INPUT' ||
    tagName === 'SELECT' ||
    tagName === 'TEXTAREA'

  if (isNativeInteractive) {
    return false
  }

  if (event.key === 'Enter') {
    return true
  }

  const role = target.getAttribute('role')

  return (
    (event.key === ' ' || event.key === 'Spacebar') &&
    role != null &&
    BUTTON_LIKE_KEYBOARD_ROLES.has(role)
  )
}

export const containsNode = (root: Node | null, candidate: EventTarget | null): boolean => {
  if (root == null || !(candidate instanceof Node)) {
    return false
  }

  return root.contains(candidate)
}

export const containsInteractiveLink = (node: EventTarget | null): boolean => {
  let current = node instanceof Node ? node : null

  while (current != null) {
    if (
      current instanceof HTMLAnchorElement &&
      current.href != null &&
      current.href !== ''
    ) {
      return true
    }

    current = current.parentNode
  }

  return false
}

export const shouldPreventDefaultForClick = (
  event: MouseEvent,
  preventDefault: boolean | undefined,
): boolean => {
  const currentTarget = event.currentTarget
  const fallbackTarget = currentTarget instanceof EventTarget ? currentTarget : null
  const target = containsNode(document, event.target) ? event.target : fallbackTarget
  const hasNestedLink = containsInteractiveLink(target)
  const hasModifier = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey

  return preventDefault !== false && hasNestedLink && !hasModifier
}

export const createPressEvent = (
  type: string,
  buttons: number,
  pointerType: string,
  nativeEvent: MouseEvent | PointerEvent,
  target: EventTarget | null,
): PressEventLike => {
  const pressEvent: PressEventLike = {
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
    preventDefault: () => {
      pressEvent.defaultPrevented = true
      nativeEvent.preventDefault()
    },
    stopPropagation: () => {
      nativeEvent.stopPropagation()
    },
  }

  return pressEvent
}

export const createHoverEvent = (
  type: string,
  nativeEvent: MouseEvent | PointerEvent,
  target: EventTarget | null,
): HoverEventLike => ({
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
})

export const isValidFocusVisibleKey = (event: KeyboardEvent): boolean =>
  !(event.metaKey || (!isMac && event.altKey) || event.ctrlKey)

export const isTextInputLike = (event: KeyboardEvent): boolean => {
  const target = event.target

  if (!(target instanceof HTMLElement)) {
    return false
  }

  if (event.key === 'Tab' || event.key === 'Escape') {
    return false
  }

  return (
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.isContentEditable
  )
}

export const isSafariBrowser = (): boolean => {
  if (!canUseDOM || navigator == null) {
    return false
  }

  const userAgent = navigator.userAgent

  return /Safari/i.test(userAgent) && !/Chrome|Chromium|Android/i.test(userAgent)
}
