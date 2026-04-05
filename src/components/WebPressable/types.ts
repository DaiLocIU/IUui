import type { CSSProperties, InjectionKey } from 'vue'

// ─── Styling ───────────────────────────────────────────────────────────────────
export type ClassLike = string | Record<string, boolean> | Array<ClassLike>
export type StyleCapableValue =
  | ClassLike
  | CSSProperties
  | Array<StyleCapableValue | undefined | null | false>
  | undefined
  | null
  | false

// ─── Pressable state ───────────────────────────────────────────────────────────
// React: Ce — pressableState object passed to render-props
export interface PressableState {
  disabled: boolean
  focused: boolean
  focusVisible: boolean
  hovered: boolean
  pressed: boolean
}

// ─── Link props ────────────────────────────────────────────────────────────────
// React: U — the link prop object shape
export interface LinkProps {
  url: string
  rel?: string
  target?: string
  download?: boolean | string
  attributionsrc?: string
}

// ─── Accessibility ─────────────────────────────────────────────────────────────
// React: $ — accessibilityRelationship
export interface AccessibilityRelationship {
  activedescendant?: string
  controls?: string
  current?: string | boolean
  describedby?: string
  details?: string
  errormessage?: string
  haspopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
  labelledby?: string
  owns?: string
}

// React: N — accessibilityState
export interface AccessibilityState {
  busy?: boolean
  checked?: boolean | 'mixed'
  disabled?: boolean
  expanded?: boolean
  hidden?: boolean
  invalid?: boolean
  modal?: boolean
  orientation?: 'horizontal' | 'vertical'
  pressed?: boolean
  readonly?: boolean
  required?: boolean
  selected?: boolean
}

// React: M — accessibilityValue
export interface AccessibilityValue {
  max?: number
  min?: number
  now?: number
  text?: string
}

// ─── Group context ─────────────────────────────────────────────────────────────
// React: WebPressableGroupContext value shape
export interface PressableGroupContext {
  register(el: HTMLElement, handler: (e: Event) => void): void
  unRegister(el: HTMLElement): void
  onTouchStart(): void
}

export const PRESSABLE_GROUP_KEY: InjectionKey<PressableGroupContext | undefined> =
  Symbol('WebPressableGroup')

// ─── Pressability options ──────────────────────────────────────────────────────
// React: WebPressability.usePressability options arg
export interface PressabilityOptions {
  disabled: boolean
  onBlur?: (e: FocusEvent) => void
  onFocus?: (e: FocusEvent) => void
  onFocusChange?: (focused: boolean) => void
  onFocusVisibleChange?: (visible: boolean) => void
  onContextMenu?: (e: MouseEvent) => void
  preventContextMenu?: boolean
  onHoverChange?: (hovered: boolean) => void
  onHoverEnd?: (e: HoverEvent) => void
  onHoverMove?: (e: HoverEvent) => void
  onHoverStart?: (e: HoverEvent) => void
  onPressChange?: (pressed: boolean) => void
  onPressEnd?: (e: PressEvent) => void
  onPressMove?: (e: PressEvent) => void
  onPressStart?: (e: PressEvent) => void
  preventDefault?: boolean
}

// ─── Press event object ────────────────────────────────────────────────────────
// React: m() — the normalized press event shape
export interface PressEvent {
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
  preventDefault(): void
  stopPropagation(): void
}

// ─── Hover event object ────────────────────────────────────────────────────────
// React: d() — normalized hover event shape
export interface HoverEvent {
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

// ─── Internal press state ──────────────────────────────────────────────────────
// React: _ = useRef({...}) in usePress
export interface PressStateRef {
  isPressed: boolean
  isPressActive: boolean
  pointerId: number | null
  bounds: DOMRect | null
  pointerType: string
  buttons: number
  activationEvent: PointerEvent | MouseEvent | null
}

// ─── Internal hover state ──────────────────────────────────────────────────────
// React: E = useRef({...}) in useHover
export interface HoverStateRef {
  isHovered: boolean
  isTouched: boolean
}

// ─── Internal focus state ──────────────────────────────────────────────────────
// React: p = useRef({...}) in useFocus
export interface FocusStateRef {
  isFocused: boolean
  isFocusVisible: boolean
}

// ─── WebPressable props ────────────────────────────────────────────────────────
export interface WebPressableProps {
  accessibilityLabel?: string
  accessibilityRelationship?: AccessibilityRelationship
  accessibilityRole?: string
  accessibilityState?: AccessibilityState
  accessibilityValue?: AccessibilityValue
  allowClickEventPropagation?: boolean
  className?: string | ((state: PressableState) => string | undefined)
  disabled?: boolean
  draggable?: boolean
  link?: LinkProps
  nativeID?: string
  onBlur?: (e: FocusEvent) => void
  onContextMenu?: (e: MouseEvent) => void
  onFocus?: (e: FocusEvent) => void
  onFocusChange?: (focused: boolean) => void
  onFocusVisibleChange?: (visible: boolean) => void
  onHoverChange?: (hovered: boolean) => void
  onHoverEnd?: (e: HoverEvent) => void
  onHoverMove?: (e: HoverEvent) => void
  onHoverStart?: (e: HoverEvent) => void
  onKeyDown?: (e: KeyboardEvent) => void
  onPress?: (e: MouseEvent | KeyboardEvent) => void
  onPressChange?: (pressed: boolean) => void
  onPressEnd?: (e: PressEvent) => void
  onPressMove?: (e: PressEvent) => void
  onPressStart?: (e: PressEvent) => void
  preventContextMenu?: boolean
  preventDefault?: boolean
  suppressFocusRing?: boolean
  tabbable?: boolean
  testID?: string
  testOnly_state?: Partial<PressableState>
  xstyle?: StyleCapableValue | ((state: PressableState) => StyleCapableValue)
  style?: CSSProperties | ((state: PressableState) => CSSProperties)
}
