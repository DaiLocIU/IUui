<script setup lang="ts">
import { computed, ref, watch } from "vue";

import type { SidebarRailItemData, SidebarRailSectionData } from "../system/sidebarRail";
import SidebarRailItem from "./SidebarRailItem.vue";

const props = defineProps<{
  section: SidebarRailSectionData;
  loading?: boolean;
}>();

const collapsed = ref(props.section.initiallyCollapsed ?? false);

watch(
  () => props.section.id,
  () => {
    collapsed.value = props.section.initiallyCollapsed ?? false;
  },
);

const visibleItems = computed<SidebarRailItemData[]>(() =>
  props.section.items.filter((item) => item.hidden !== true),
);

const isLoading = computed(() => props.loading || props.section.loading === true);
const hasHeader = computed(() => Boolean(props.section.title) || props.section.collapsible);

function toggleCollapsed() {
  if (!props.section.collapsible) return;
  collapsed.value = !collapsed.value;
}
</script>

<template>
  <section class="w-full">
    <div
      v-if="hasHeader"
      class="flex items-center gap-2 px-4 pb-2 pt-3"
    >
      <slot
        name="header"
        :section="section"
        :collapsed="collapsed"
        :toggle-collapsed="toggleCollapsed"
      >
        <button
          v-if="section.collapsible"
          type="button"
          class="flex w-full items-center justify-between gap-3 text-left text-sm font-semibold text-slate-700"
          @click="toggleCollapsed"
        >
          <span>{{ section.title }}</span>
          <span class="text-xs text-slate-500">{{ collapsed ? "+" : "-" }}</span>
        </button>
        <h2
          v-else-if="section.title"
          class="text-sm font-semibold text-slate-700"
        >
          {{ section.title }}
        </h2>
      </slot>
    </div>

    <slot
      v-if="isLoading"
      name="loading"
      :section="section"
    >
      <div class="space-y-2 px-4 pb-3">
        <div
          v-for="index in 4"
          :key="`${section.id}-loading-${index}`"
          class="h-10 animate-pulse rounded-xl bg-slate-200"
        />
      </div>
    </slot>

    <ul
      v-else-if="!collapsed && visibleItems.length > 0"
      class="space-y-1 px-2 pb-3"
    >
      <li
        v-for="item in visibleItems"
        :key="item.id"
      >
        <slot
          name="item"
          :item="item"
          :section="section"
        >
          <SidebarRailItem :item="item" />
        </slot>
      </li>
    </ul>

    <div
      v-if="section.separator"
      class="mx-4 border-t border-slate-200"
    />
  </section>
</template>
