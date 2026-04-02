/**
 * React source: getFDSTextHierarchyStyle
 *
 * Maps pairing level + emphasis reduction into FDS text token types.
 */
export type FDSTextPairingLevel = 1 | 2 | 3 | 4 | 'entityHeader1' | 'entityHeader2'

export type FDSTextColor =
  | 'blueLink'
  | 'disabled'
  | 'disabledButton'
  | 'highlight'
  | 'linkOnMedia'
  | 'negative'
  | 'placeholder'
  | 'positive'
  | 'primary'
  | 'primaryButton'
  | 'primaryButtonTextOnMedia'
  | 'primaryDeemphasizedButton'
  | 'primaryOnColor'
  | 'primaryOnMedia'
  | 'secondary'
  | 'secondaryButton'
  | 'secondaryOnColor'
  | 'secondaryOnMedia'
  | 'selectedOption'
  | 'tertiary'
  | 'tooltip'
  | 'white'

export type FDSTextType =
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'bodyLink1'
  | 'bodyLink2'
  | 'bodyLink3'
  | 'bodyLink4'
  | 'bodyMeta'
  | 'button1'
  | 'button2'
  | 'entityHeaderHeadline1'
  | 'entityHeaderHeadline2'
  | 'entityHeaderMeta1'
  | 'entityHeaderMeta2'
  | 'headline1'
  | 'headline2'
  | 'headline3'
  | 'headline4'
  | 'headlineDeemphasized3'
  | 'headlineDeemphasized4'
  | 'headlineEmphasized1'
  | 'headlineEmphasized2'
  | 'headlineEmphasized3'
  | 'headlineEmphasized4'
  | 'meta1'
  | 'meta2'
  | 'meta3'
  | 'meta4'

export interface FDSTextHierarchyStyle {
  bodyType: FDSTextType
  headlineType: FDSTextType
  metaType: FDSTextType
}

const cache = new Map<string, FDSTextHierarchyStyle>()

export function getFDSTextHierarchyStyle(
  level: FDSTextPairingLevel,
  reduceEmphasis: boolean,
): FDSTextHierarchyStyle {
  const cacheKey = `${String(level)}:${reduceEmphasis ? 'r' : 'e'}`
  const cached = cache.get(cacheKey)

  if (cached != null) {
    return cached
  }

  let resolved: FDSTextHierarchyStyle

  switch (level) {
    case 1:
      resolved = {
        bodyType: 'body1',
        headlineType: 'headlineEmphasized1',
        metaType: 'meta1',
      }
      break
    case 2:
      resolved = {
        bodyType: 'body2',
        headlineType: 'headlineEmphasized2',
        metaType: 'meta2',
      }
      break
    case 3:
      resolved = {
        bodyType: 'body3',
        headlineType: reduceEmphasis ? 'headline3' : 'headlineEmphasized3',
        metaType: 'meta3',
      }
      break
    case 'entityHeader1':
      resolved = {
        bodyType: 'body2',
        headlineType: 'entityHeaderHeadline1',
        metaType: 'entityHeaderMeta1',
      }
      break
    case 'entityHeader2':
      resolved = {
        bodyType: 'body2',
        headlineType: 'entityHeaderHeadline2',
        metaType: 'entityHeaderMeta2',
      }
      break
    case 4:
    default:
      resolved = {
        bodyType: 'body4',
        headlineType: reduceEmphasis ? 'headline4' : 'headlineEmphasized4',
        metaType: 'meta4',
      }
      break
  }

  cache.set(cacheKey, resolved)
  return resolved
}
