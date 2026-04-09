import './style.css'

// ─── Public API ───────────────────────────────────────────────────────────────
// Primary layout primitives
import BaseImage from './components/BaseImage.vue'
import BaseButton from './components/BaseButton'
import BaseLink from './components/BaseLink.vue'
import FDSPressable from './components/FDSPressable'
import FDSListCellPressable from './components/FDSListCellPressable.vue'
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
import BaseListCell from './components/BaseListCell.vue'
import FDSTextPairing from './components/FDSTextPairing.vue'
import FDSHeadlineWithAddOn from './components/FDSHeadlineWithAddOn.vue'
import PressableText from './components/WebPressable/PressableText.vue'
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

export { BaseImage, BaseButton, BaseLink, FDSPressable, FDSListCellPressable, BaseLinkDefaultTargetProvider, ImagePrimitive, IURow, IUColumn, IURowItem, IUColumnItem, CometScrollView, SidebarRail, SidebarRailSection, SidebarRailItem, SidebarRailFooter, TruncationTooltip, CometDensityModeStateProvider, CometDensityProvider, FDSTextContextNew, FDSBaseTextImpl, BaseListCell, IUListCell, FDSHeadlineWithAddOn, FDSTextPairing, PDSTextPairing, PressableText }

export default {
  install: (app: any) => {
    app.component('IUImage', BaseImage)
    app.component('IUBaseButton', BaseButton)
    app.component('IUBaseLink', BaseLink)
    app.component('IUFDSPressable', FDSPressable)
    app.component('IUFDSListCellPressable', FDSListCellPressable)
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
    app.component('IUBaseListCell', BaseListCell)
    app.component('IUListCell', IUListCell)
    app.component('IUFDSHeadlineWithAddOn', FDSHeadlineWithAddOn)
    app.component('IUFDSTextPairing', FDSTextPairing)
    app.component('IUPressableText', PressableText)
  }
}
