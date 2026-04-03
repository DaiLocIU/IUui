import './style.css'

// ─── Public API ───────────────────────────────────────────────────────────────
// Primary layout primitives
import BaseImage from './components/BaseImage.vue'
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
import BaseListCell from './components/BaseListCell.vue'
import BaseLink from './components/BaseLink.vue'
import BaseButton from './components/BaseButton.vue'
import CometBookmarkListItem from './components/CometBookmarkListItem.vue'
import CometBookmarkListItemWrapper from './components/CometBookmarkListItemWrapper.vue'
import FDSListCell from './components/FDSListCell.vue'
import FDSListCellPressable from './components/FDSListCellPressable.vue'
import FDSPressable from './components/FDSPressable.vue'
import CometPressable from './components/CometPressable.vue'
import WebPressable from './components/WebPressable.vue'
import FDSTextPairing from './components/FDSTextPairing.vue'
import FDSHeadlineWithAddOn from './components/FDSHeadlineWithAddOn.vue'
export {
  provideBaseButtonPopoverContext,
  provideBaseDisabledContext,
  provideBasePlaceholderContext,
  provideCometContainerPressableContext,
  provideCometDangerouslySuppressInteractiveElementsContext,
  useBaseButtonPopoverContext,
  useBaseDisabledContext,
  useBasePlaceholderContext,
  useCometContainerPressableContext,
  useCometDangerouslySuppressInteractiveElementsContext,
} from './system/cometPressableKeys'
export {
  provideBaseLinkDefaultTarget,
  provideBaseLinkNestedPressable,
  provideBaseLinkRouter,
  provideCometCustomLinkshimHash,
  provideCometGHLRendering,
  provideCometProductAttribution,
  provideCometTrackingCode,
  provideCometTrackingNodes,
  useBaseLinkDefaultTarget,
  useBaseLinkNestedPressable,
  useBaseLinkRouter,
  useCometCustomLinkshimHash,
  useCometGHLRendering,
  useCometProductAttribution,
  useCometTrackingCode,
  useCometTrackingNodes,
} from './system/baseLinkKeys'
export type {
  BaseButtonPopoverContextValue,
  CometContainerPressableContextValue,
  CometContainerPressableRegistration,
} from './system/cometPressableKeys'
export type {
  BaseLinkNavigationOptions,
  BaseLinkPrefetchHandle,
  BaseLinkRouterAdapter,
  ProductAttributionContextValue,
  TrackingCodeContextValue,
} from './system/baseLinkKeys'
export type { SidebarRailItemData, SidebarRailSectionData, SidebarRailFooterItemData } from './system/sidebarRail'
export type { TruncationTooltipConfig } from './components/TruncationTooltip.vue'
export type { FDSTextContextValue } from './system/fdsTextKeys'
export type { FDSTextPairingLevel } from './utils/getFDSTextHierarchyStyle'

// Advanced — use for error boundaries and Suspense wrappers
import IURowItem from './components/IURowItem.vue'
import IUColumnItem from './components/IUColumnItem.vue'

const CometDensityProvider = CometDensityModeStateProvider
const ImagePrimitive = BaseImage
const IUListCell = BaseListCell

export { BaseImage, ImagePrimitive, IURow, IUColumn, IURowItem, IUColumnItem, CometScrollView, SidebarRail, SidebarRailSection, SidebarRailItem, SidebarRailFooter, TruncationTooltip, CometDensityModeStateProvider, CometDensityProvider, FDSTextContextNew, FDSBaseTextImpl, BaseListCell, BaseLink, BaseButton, CometBookmarkListItem, CometBookmarkListItemWrapper, FDSPressable, CometPressable, IUListCell, FDSListCell, FDSListCellPressable, WebPressable, FDSHeadlineWithAddOn, FDSTextPairing }

export default {
  install: (app: any) => {
    app.component('IUImage', BaseImage)
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
    app.component('IUBaseListCell', BaseListCell)
    app.component('IUBaseLink', BaseLink)
    app.component('IUBaseButton', BaseButton)
    app.component('IUCometBookmarkListItem', CometBookmarkListItem)
    app.component('IUCometBookmarkListItemWrapper', CometBookmarkListItemWrapper)
    app.component('IUFDSPressable', FDSPressable)
    app.component('IUCometPressable', CometPressable)
    app.component('IUListCell', IUListCell)
    app.component('IUFDSListCell', FDSListCell)
    app.component('IUFDSListCellPressable', FDSListCellPressable)
    app.component('IUWebPressable', WebPressable)
    app.component('IUFDSHeadlineWithAddOn', FDSHeadlineWithAddOn)
    app.component('IUFDSTextPairing', FDSTextPairing)
  }
}
