import './style.css'

// ─── Public API ───────────────────────────────────────────────────────────────
// Primary layout primitives
import BaseImage from './components/BaseImage.vue'
import BaseSVGIcon from './components/BaseSVGIcon.vue'
import CometSVGIcon from './components/CometSVGIcon.vue'
import FDSIcon from './components/FDSIcon.vue'
import CometImage from './components/CometImage.vue'
import BaseBadge from './components/BaseBadge.vue'
import BaseStyledBadge from './components/BaseStyledBadge.vue'
import FDSBadge from './components/FDSBadge.vue'
import BaseButton from './components/BaseButton'
import BaseGlimmer from './components/BaseGlimmer.vue'
import BaseLoadingStateElement from './components/BaseLoadingStateElement.vue'
import BaseLink from './components/BaseLink.vue'
import FDSGlimmer from './components/FDSGlimmer.vue'
import FDSListCellGlimmer from './components/FDSListCellGlimmer.vue'
import ScreenReaderText from './components/ScreenReaderText.vue'
import FDSPressable from './components/FDSPressable'
import FDSListCellPressable from './components/FDSListCellPressable.vue'
import CometBookmarkListItem from './components/CometBookmarkListItem.vue'
import CometBookmarkListItemWrapper from './components/CometBookmarkListItemWrapper.vue'
import CometBookmarksHeader from './components/CometBookmarksHeader.vue'
import CometFolderBookmarkListItem from './components/CometFolderBookmarkListItem.vue'
import CometClassicHomeRailSeparator from './components/CometClassicHomeRailSeparator.vue'
import CometHomeLeftRailBookmarkRefetchListCell from './components/CometHomeLeftRailBookmarkRefetchListCell.vue'
import CometHomeLeftRailWithBlueRankingRefetchSection from './components/CometHomeLeftRailWithBlueRankingRefetchSection.vue'
import BaseLinkDefaultTargetProvider from './components/BaseLinkDefaultTargetProvider.vue'
import IURow from './components/IURow.vue'
import IUColumn from './components/IUColumn.vue'
import CometScrollView from './components/CometScrollView.vue'
import SidebarRail from './components/SidebarRail.vue'
import SidebarRailSection from './components/SidebarRailSection.vue'
import SidebarRailItem from './components/SidebarRailItem.vue'
import SidebarRailFooter from './components/SidebarRailFooter.vue'
import TruncationTooltip from './components/TruncationTooltip.vue'
import CometDensityModeStateProvider from './components/CometDensityModeStateProvider.vue'
import FDSTextContextNew from './components/FDSTextContextNew.vue'
import FDSBaseTextImpl from './components/FDSBaseTextImpl.vue'
import FDSTextWithBadge from './components/FDSTextWithBadge.vue'
import FDSTextWithIcon from './components/FDSTextWithIcon.vue'
import BaseListCell from './components/BaseListCell.vue'
import FDSTextPairing from './components/FDSTextPairing.vue'
import FDSHeadlineWithAddOn from './components/FDSHeadlineWithAddOn.vue'
import FDSUnitHeader from './components/FDSUnitHeader.vue'
import FDSUnitHeaderTextAction from './components/FDSUnitHeaderTextAction.vue'
import PressableText from './components/WebPressable/PressableText.vue'
import useGlimmerPausedState from './composables/useGlimmerPausedState'
import usePartialViewImpression from './composables/usePartialViewImpression'
import {
  provideBaseIsDecorativeContext,
  useBaseIsDecorativeContext,
} from './composables/useBaseIsDecorativeContext'
import { useCometIconColors } from './composables/useCometIconColors'
import focusManager, {
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
} from './utils/focusManager'
import getFDSBadgeColorStyle from './utils/getFDSBadgeColorStyle'
import getTabbableNodes, {
  createDOMFocusQueryScope,
} from './utils/getTabbableNodes'
export type { SidebarRailItemData, SidebarRailSectionData, SidebarRailFooterItemData } from './system/sidebarRail'
export type { TruncationTooltipConfig } from './components/TruncationTooltip.vue'
export type { FDSTextContextValue } from './system/fdsTextKeys'
export type { FDSTextPairingLevel } from './utils/getFDSTextHierarchyStyle'
export type {
  FDSBadgeColor,
  FDSBadgeColorVersion,
  GetFDSBadgeColorStyleOptions,
} from './utils/getFDSBadgeColorStyle'
export type {
  DOMFocusQuery,
  FocusNodePredicate,
  FocusQueryScope,
  TabbableNodesResult,
} from './utils/getTabbableNodes'
export type {
  FocusContainmentEvent,
  FocusElementOptions,
} from './utils/focusManager'
export type {
  PartialViewHiddenReason,
  PartialViewImpressionEndPayload,
  UsePartialViewImpressionOptions,
} from './composables/usePartialViewImpression'
export type { UseGlimmerPausedStateReturn } from './composables/useGlimmerPausedState'

// Advanced — use for error boundaries and Suspense wrappers
import IURowItem from './components/IURowItem.vue'
import IUColumnItem from './components/IUColumnItem.vue'

const CometDensityProvider = CometDensityModeStateProvider
const ImagePrimitive = BaseImage
const IUListCell = BaseListCell

export { BaseImage, CometImage, BaseBadge, BaseStyledBadge, FDSBadge, BaseButton, BaseGlimmer, BaseLoadingStateElement, BaseLink, FDSGlimmer, FDSListCellGlimmer, ScreenReaderText, FDSPressable, FDSListCellPressable, CometBookmarkListItem, CometBookmarkListItemWrapper, CometBookmarksHeader, CometFolderBookmarkListItem, CometClassicHomeRailSeparator, CometHomeLeftRailBookmarkRefetchListCell, CometHomeLeftRailWithBlueRankingRefetchSection, BaseLinkDefaultTargetProvider, ImagePrimitive, IURow, IUColumn, IURowItem, IUColumnItem, CometScrollView, SidebarRail, SidebarRailSection, SidebarRailItem, SidebarRailFooter, TruncationTooltip, CometDensityModeStateProvider, CometDensityProvider, FDSTextContextNew, FDSBaseTextImpl, FDSTextWithBadge, FDSTextWithIcon, BaseListCell, IUListCell, FDSHeadlineWithAddOn, FDSUnitHeader, FDSUnitHeaderTextAction, FDSTextPairing, PressableText, BaseSVGIcon, CometSVGIcon, FDSIcon, createDOMFocusQueryScope, focusElement, focusFirst, focusManager, focusNext, focusNextContained, focusPrevious, focusPreviousContained, getAllNodesFromOneOrManyQueries, getFDSBadgeColorStyle, getFirstNodeFromOneOrManyQueries, getTabbableNodes, isFocusingWithoutUserIntent, provideBaseIsDecorativeContext, useBaseIsDecorativeContext, useCometIconColors, useGlimmerPausedState, usePartialViewImpression, wasElementAutoFocused }

export default {
  install: (app: any) => {
    app.component('IUImage', BaseImage)
    app.component('IUCometImage', CometImage)
    app.component('IUBaseBadge', BaseBadge)
    app.component('IUBaseStyledBadge', BaseStyledBadge)
    app.component('IUFDSBadge', FDSBadge)
    app.component('IUBaseButton', BaseButton)
    app.component('IUBaseGlimmer', BaseGlimmer)
    app.component('IUBaseLoadingStateElement', BaseLoadingStateElement)
    app.component('IUBaseLink', BaseLink)
    app.component('IUFDSGlimmer', FDSGlimmer)
    app.component('IUFDSListCellGlimmer', FDSListCellGlimmer)
    app.component('IUScreenReaderText', ScreenReaderText)
    app.component('IUFDSPressable', FDSPressable)
    app.component('IUFDSListCellPressable', FDSListCellPressable)
    app.component('IUCometBookmarkListItem', CometBookmarkListItem)
    app.component('IUCometBookmarkListItemWrapper', CometBookmarkListItemWrapper)
    app.component('IUCometBookmarksHeader', CometBookmarksHeader)
    app.component('IUCometFolderBookmarkListItem', CometFolderBookmarkListItem)
    app.component('IUCometClassicHomeRailSeparator', CometClassicHomeRailSeparator)
    app.component('IUCometHomeLeftRailBookmarkRefetchListCell', CometHomeLeftRailBookmarkRefetchListCell)
    app.component('IUCometHomeLeftRailWithBlueRankingRefetchSection', CometHomeLeftRailWithBlueRankingRefetchSection)
    app.component('IUBaseLinkDefaultTargetProvider', BaseLinkDefaultTargetProvider)
    app.component('IURow', IURow)
    app.component('IUColumn', IUColumn)
    app.component('IURowItem', IURowItem)
    app.component('IUColumnItem', IUColumnItem)
    app.component('IUScrollView', CometScrollView)
    app.component('IUSidebarRail', SidebarRail)
    app.component('IUSidebarRailSection', SidebarRailSection)
    app.component('IUSidebarRailItem', SidebarRailItem)
    app.component('IUSidebarRailFooter', SidebarRailFooter)
    app.component('IUTruncationTooltip', TruncationTooltip)
    app.component('IUCometDensityModeStateProvider', CometDensityModeStateProvider)
    app.component('IUCometDensityProvider', CometDensityProvider)
    app.component('IUFDSTextContextNew', FDSTextContextNew)
    app.component('IUFDSBaseTextImpl', FDSBaseTextImpl)
    app.component('IUFDSTextWithBadge', FDSTextWithBadge)
    app.component('IUFDSTextWithIcon', FDSTextWithIcon)
    app.component('IUBaseListCell', BaseListCell)
    app.component('IUListCell', IUListCell)
    app.component('IUFDSHeadlineWithAddOn', FDSHeadlineWithAddOn)
    app.component('IUFDSUnitHeader', FDSUnitHeader)
    app.component('IUFDSUnitHeaderTextAction', FDSUnitHeaderTextAction)
    app.component('IUFDSTextPairing', FDSTextPairing)
    app.component('IUPressableText', PressableText)
    app.component('IUBaseSVGIcon', BaseSVGIcon)
    app.component('IUCometSVGIcon', CometSVGIcon)
    app.component('IUFDSIcon', FDSIcon)
  }
}
