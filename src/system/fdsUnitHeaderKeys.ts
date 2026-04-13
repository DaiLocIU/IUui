/**
 * FDSUnitHeaderConstants
 *
 * React source: FDSUnitHeaderConstants.js
 *   var ACTION_TEXT_OVERLAY_OFFSET = 8
 *   var ACTION_TEXT_OVERLAY_RADIUS = 6
 *
 * Shared across FDSUnitHeaderTextAction and FDSUnitHeader.
 * Controls the hover/focus overlay ring on text action buttons.
 *
 * Usage:
 *   import { ACTION_TEXT_OVERLAY_OFFSET, ACTION_TEXT_OVERLAY_RADIUS } from '../system/fdsUnitHeaderKeys'
 */

/**
 * Pixels the pressable overlay extends beyond the action button's content box.
 * Gives the small text link a larger click/tap target without affecting layout.
 *
 * React source: var e = 8
 */
export const ACTION_TEXT_OVERLAY_OFFSET = 8 as const

/**
 * Border radius of the pressable overlay rectangle (in px).
 * Gives the hover ring a slightly rounded rectangle — distinct from the
 * circular overlay used on icon-only buttons (FDSIcon overlayRadius = '50%').
 *
 * React source: var l = 6
 */
export const ACTION_TEXT_OVERLAY_RADIUS = 6 as const
