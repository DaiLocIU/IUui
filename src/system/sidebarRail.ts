import type { Component } from "vue";

export interface SidebarRailItemData {
  id: string | number;
  label: string;
  href?: string;
  icon?: string | Component;
  badge?: string | number;
  hidden?: boolean;
  disabled?: boolean;
  active?: boolean;
  meta?: Record<string, unknown>;
}

export interface SidebarRailSectionData {
  id: string | number;
  title?: string;
  items: SidebarRailItemData[];
  separator?: boolean;
  collapsible?: boolean;
  initiallyCollapsed?: boolean;
  loading?: boolean;
  kind?: string;
  meta?: Record<string, unknown>;
}

export interface SidebarRailFooterItemData {
  id: string | number;
  label: string;
  href?: string;
  meta?: Record<string, unknown>;
}
