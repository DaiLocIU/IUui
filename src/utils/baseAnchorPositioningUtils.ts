export type ContextualLayerPosition = 'above' | 'below' | 'start' | 'end' | 'auto'
export type ContextualLayerAlignment = 'start' | 'middle' | 'end' | 'stretch'

export type AnchorPositionAreaToken =
  | 'block-start'
  | 'block-end'
  | 'span-inline-start'
  | 'span-inline-end'
  | 'span-block-start'
  | 'span-block-end'
  | 'inline-start'
  | 'inline-end'
  | 'center'

export type AnchorPositionAreaCompat = readonly [
  AnchorPositionAreaToken,
  AnchorPositionAreaToken,
]

const CONTEXTUAL_LAYER_TO_ANCHOR_POSITION_AREA: Record<
  Exclude<ContextualLayerPosition, 'auto'>,
  Record<Exclude<ContextualLayerAlignment, 'stretch'>, AnchorPositionAreaCompat>
> = {
  above: {
    end: ['block-start', 'span-inline-start'],
    middle: ['block-start', 'center'],
    start: ['block-start', 'span-inline-end'],
  },
  below: {
    end: ['block-end', 'span-inline-start'],
    middle: ['block-end', 'center'],
    start: ['block-end', 'span-inline-end'],
  },
  end: {
    end: ['span-block-start', 'inline-end'],
    middle: ['center', 'inline-end'],
    start: ['span-block-end', 'inline-end'],
  },
  start: {
    end: ['span-block-start', 'inline-start'],
    middle: ['center', 'inline-start'],
    start: ['span-block-end', 'inline-start'],
  },
}

function supportsCssDeclaration(property: string, value: string): boolean {
  return (
    typeof globalThis.CSS !== 'undefined'
    && typeof globalThis.CSS.supports === 'function'
    && globalThis.CSS.supports(property, value)
  )
}

export function contextualLayerToAnchorPositionAreaCompat(
  position?: ContextualLayerPosition | null,
  alignment?: ContextualLayerAlignment | null,
): AnchorPositionAreaCompat {
  const normalizedAlignment =
    alignment == null || alignment === 'stretch' ? 'middle' : alignment
  const normalizedPosition =
    position == null || position === 'auto' ? 'below' : position

  return CONTEXTUAL_LAYER_TO_ANCHOR_POSITION_AREA[normalizedPosition][
    normalizedAlignment
  ]
}

export function anchorPositionAreaCompatToCssValue(
  area: AnchorPositionAreaCompat,
): string {
  return `${area[0]} ${area[1]}`
}

export function supportsCSSAnchorPositioning(): boolean {
  return (
    supportsCssDeclaration('anchor-name', '--x-anchor')
    && (
      supportsCssDeclaration('position-area', 'block-start center')
      || supportsCssDeclaration('position-anchor', '--x-anchor')
      || supportsCssDeclaration('top', 'anchor(bottom)')
    )
  )
}

export function passesAnchorPositionExperiment(): boolean {
  return supportsCSSAnchorPositioning()
}
