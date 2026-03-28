import './style.css'

// ─── Public API ───────────────────────────────────────────────────────────────
// Primary layout primitives
import IURow from './components/IURow.vue'
import IUColumn from './components/IUColumn.vue'
import CometScrollView from './components/CometScrollView.vue'
import SidebarRail from './components/SidebarRail.vue'
import SidebarRailSection from './components/SidebarRailSection.vue'
import SidebarRailItem from './components/SidebarRailItem.vue'
import SidebarRailFooter from './components/SidebarRailFooter.vue'
export type { SidebarRailItemData, SidebarRailSectionData, SidebarRailFooterItemData } from './system/sidebarRail'

// Advanced — use for error boundaries and Suspense wrappers
import IURowItem from './components/IURowItem.vue'
import IUColumnItem from './components/IUColumnItem.vue'

export { IURow, IUColumn, IURowItem, IUColumnItem, CometScrollView, SidebarRail, SidebarRailSection, SidebarRailItem, SidebarRailFooter }

export default {
  install: (app: any) => {
    app.component('IURow', IURow)
    app.component('IUColumn', IUColumn)
    app.component('IURowItem', IURowItem)
    app.component('IUColumnItem', IUColumnItem)
    app.component('IUScrollView', CometScrollView)
    app.component('IUSidebarRail', SidebarRail)
    app.component('IUSidebarRailSection', SidebarRailSection)
    app.component('IUSidebarRailItem', SidebarRailItem)
    app.component('IUSidebarRailFooter', SidebarRailFooter)
  }
}
