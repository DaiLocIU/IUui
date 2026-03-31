/**
 * BaseTextV2Utils — port of Meta's BaseTextV2Utils.precomputeValues
 *
 * React source: __d("BaseTextV2Utils", [], ...) — pure utility, no React dependency.
 * This file has zero Vue reactivity imports — it's a plain TypeScript util.
 *
 * Usage:
 *   import { precomputeValues } from '../utils/baseTextV2Utils'
 *   const cv = precomputeValues({ fontMetrics, fontSize, lineGap })
 *   // pass cv to BaseTextV2SpanWrapper :computedValues
 */

// ─── Types ───────────────────────────────────────────────────────────────────

/**
 * Font metrics from the type foundry.
 * All values are in font units (absolute, not ratios).
 *
 * React source: `r` (fontMetrics object destructured throughout precomputeValues)
 */
export interface FontMetrics {
  /** Cap-height in font units */
  capHeight: number
  /** Ascender height in font units */
  ascent: number
  /** Descender depth in font units (positive or negative accepted — Math.abs applied) */
  descent: number
  /** Font's built-in line gap in font units */
  lineGap: number
  /** Units per em */
  unitsPerEm: number
}

/**
 * Input to precomputeValues — mirrors the argument shape of BaseTextV2Utils.precomputeValues.
 *
 * React source: `t` (param of function s)
 * - fontMetrics: font metric table
 * - fontSize: desired rendered font-size in px (from typeVariant.fontSize)
 * - lineGap: desired visual line gap in px (from typeVariant.lineGap)
 *   ⚠ This is NOT fontMetrics.lineGap — it's the design system's target line spacing.
 */
export interface PrecomputeInput {
  fontMetrics: FontMetrics
  /** React: e.fontSize, o — rendered font size in px */
  fontSize: number
  /** React: e.lineGap, a — desired design line gap in px (not the font's built-in lineGap) */
  lineGap: number
}

/**
 * Output of precomputeValues — CSS value strings ready for use as inline styles.
 * Matches the shape expected by BaseTextV2SpanWrapper's ComputedValues interface
 * (with string values, not numbers, because the React source appends "em"/"px").
 *
 * React source: return value of function s
 */
export interface PrecomputedValues {
  /** React: l(h) + "em" — negative em margin applied to ::after (trims baseline space) */
  baselineTrim: string
  /** React: l(g) + "em" — negative em margin applied to ::before (trims cap-height space) */
  capHeightTrim: string
  /** React: l(o) + "px" — rendered font size */
  fontSize: string
  /** React: l(a) + "px" or "normal" — computed line height */
  lineHeight: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * React source: var l = function(t) { return parseFloat(t.toFixed(4)) }
 * Rounds a floating-point value to 4 decimal places without trailing zeros.
 */
function round4(value: number): number {
  return parseFloat(value.toFixed(4))
}

/**
 * React source: function e(e) — inner helper that computes the actual lineHeight in px.
 *
 * Algorithm:
 *   capHeightRatio = capHeight / unitsPerEm
 *   capHeightPx    = fontSize * capHeightRatio
 *   lineHeight     = capHeightPx + lineGap    ← design-system lineGap, not font lineGap
 *
 * @returns { fontMetrics, fontSize, lineHeight }
 */
function computeLineHeight(input: PrecomputeInput): {
  fontMetrics: FontMetrics
  fontSize: number
  lineHeight: number
} {
  const { fontMetrics, fontSize, lineGap } = input
  const capHeightRatio = fontMetrics.capHeight / fontMetrics.unitsPerEm  // React: n
  const capHeightPx    = fontSize * capHeightRatio                        // React: o
  const lineHeight     = capHeightPx + lineGap                            // React: a
  return { fontMetrics, fontSize, lineHeight }
}

// ─── Main export ─────────────────────────────────────────────────────────────

/**
 * React source: function s(t) — i.precomputeValues = s
 *
 * Computes the CSS trim values needed to collapse the optical vertical whitespace
 * that a font naturally introduces above the cap-height and below the baseline.
 * The trim is applied via negative margins on ::before (top) and ::after (bottom)
 * pseudo-elements in BaseTextV2SpanWrapper.
 *
 * Algorithm walkthrough:
 *   1. capHeightRatio  = capHeight  / upm       ← fraction of em the cap takes
 *   2. descentRatio    = |descent|  / upm
 *   3. ascentRatio     = ascent     / upm
 *   4. lineGapRatio    = lineGap    / upm        ← font's built-in gap, not design gap
 *   5. totalUnits      = ascent + fontLineGap + |descent|
 *   6. totalRatio      = totalUnits / upm        ← full typographic box in em
 *   7. totalScaledPx   = totalRatio * fontSize   ← typographic box in px
 *   8. adjustForLineHeight(ratio):
 *        excess = (totalScaledPx - designLineHeight) / 2   ← excess half-leading per side
 *        adjusted = ratio - excess / fontSize
 *        → removes half of the gap introduced by the font box vs. desired line height
 *   9. capHeightTrim   = adjustForLineHeight(ascentRatio - capHeightRatio + fontLineGapRatio/2) * -1
 *  10. baselineTrim    = adjustForLineHeight(descentRatio + fontLineGapRatio/2) * -1
 *      (negative values → negative margins → collapse the space)
 */
export function precomputeValues(input: PrecomputeInput): PrecomputedValues {
  const { fontMetrics: r, fontSize: o, lineHeight: a } = computeLineHeight(input)

  const absDescent     = Math.abs(r.descent)           // React: i = Math.abs(r.descent)
  const capHeightRatio = r.capHeight / r.unitsPerEm    // React: s
  const descentRatio   = absDescent   / r.unitsPerEm   // React: u
  const ascentRatio    = r.ascent     / r.unitsPerEm   // React: c
  const lineGapRatio   = r.lineGap    / r.unitsPerEm   // React: d
  const totalUnits     = r.ascent + r.lineGap + absDescent  // React: m
  const totalRatio     = totalUnits / r.unitsPerEm     // React: p
  const totalScaledPx  = totalRatio * o                // React: _

  /**
   * React source: f = function(t) { if (a) { var e = (_ - a) / 2; return t - e / o } return t }
   * Adjusts a trim ratio by removing the per-side excess leading.
   */
  function adjustForLineHeight(trimRatio: number): number {
    if (a) {
      const excess = (totalScaledPx - a) / 2   // React: e = (_ - a) / 2
      return trimRatio - excess / o             // React: t - e / o
    }
    return trimRatio
  }

  const capHeightTrimRaw = adjustForLineHeight(ascentRatio - capHeightRatio + lineGapRatio / 2) * -1  // React: g
  const baselineTrimRaw  = adjustForLineHeight(descentRatio + lineGapRatio / 2) * -1                  // React: h

  return {
    baselineTrim:  round4(baselineTrimRaw)  + 'em',   // React: l(h) + "em"
    capHeightTrim: round4(capHeightTrimRaw) + 'em',   // React: l(g) + "em"
    fontSize:      round4(o)               + 'px',   // React: l(o) + "px"
    lineHeight:    a ? round4(a) + 'px' : 'normal',  // React: a ? l(a) + "px" : "normal"
  }
}
