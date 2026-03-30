import { default as IURow } from './components/IURow.vue';
import { default as IUColumn } from './components/IUColumn.vue';
import { default as CometScrollView } from './components/CometScrollView.vue';
import { default as SidebarRail } from './components/SidebarRail.vue';
import { default as SidebarRailSection } from './components/SidebarRailSection.vue';
import { default as SidebarRailItem } from './components/SidebarRailItem.vue';
import { default as SidebarRailFooter } from './components/SidebarRailFooter.vue';
import { default as TruncationTooltip } from './components/TruncationTooltip.vue';
import { default as IURowItem } from './components/IURowItem.vue';
import { default as IUColumnItem } from './components/IUColumnItem.vue';

export type { SidebarRailItemData, SidebarRailSectionData, SidebarRailFooterItemData } from './system/sidebarRail';
export type { TruncationTooltipConfig } from './components/TruncationTooltip.vue';
export { IURow, IUColumn, IURowItem, IUColumnItem, CometScrollView, SidebarRail, SidebarRailSection, SidebarRailItem, SidebarRailFooter, TruncationTooltip };
declare const _default: {
    install: (app: any) => void;
};
export default _default;
