import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  anchorPositionAreaCompatToCssValue,
  contextualLayerToAnchorPositionAreaCompat,
  passesAnchorPositionExperiment,
  supportsCSSAnchorPositioning,
} from '../src/utils/baseAnchorPositioningUtils'

describe('contextualLayerToAnchorPositionAreaCompat', () => {
  it('maps explicit position and alignment pairs to anchor position areas', () => {
    expect(contextualLayerToAnchorPositionAreaCompat('above', 'start')).toEqual([
      'block-start',
      'span-inline-end',
    ])
    expect(contextualLayerToAnchorPositionAreaCompat('below', 'end')).toEqual([
      'block-end',
      'span-inline-start',
    ])
    expect(contextualLayerToAnchorPositionAreaCompat('start', 'middle')).toEqual([
      'center',
      'inline-start',
    ])
    expect(contextualLayerToAnchorPositionAreaCompat('end', 'middle')).toEqual([
      'center',
      'inline-end',
    ])
  })

  it('preserves the facebook defaults for auto position and stretch alignment', () => {
    expect(contextualLayerToAnchorPositionAreaCompat()).toEqual([
      'block-end',
      'center',
    ])
    expect(contextualLayerToAnchorPositionAreaCompat('auto', 'stretch')).toEqual([
      'block-end',
      'center',
    ])
  })

  it('formats anchor position areas into a CSS value', () => {
    expect(
      anchorPositionAreaCompatToCssValue(
        contextualLayerToAnchorPositionAreaCompat('above', 'middle'),
      ),
    ).toBe('block-start center')
  })
})

describe('anchor positioning feature checks', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns false when CSS.supports is unavailable', () => {
    vi.stubGlobal('CSS', undefined)

    expect(supportsCSSAnchorPositioning()).toBe(false)
    expect(passesAnchorPositionExperiment()).toBe(false)
  })

  it('returns true when anchor positioning declarations are supported', () => {
    vi.stubGlobal('CSS', {
      supports: vi.fn((property: string, value: string) => {
        return (
          (property === 'anchor-name' && value === '--x-anchor')
          || (property === 'position-area' && value === 'block-start center')
        )
      }),
    })

    expect(supportsCSSAnchorPositioning()).toBe(true)
    expect(passesAnchorPositionExperiment()).toBe(true)
  })
})
