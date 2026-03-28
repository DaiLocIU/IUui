<script setup lang="ts">
import type { SidebarRailFooterItemData } from "../system/sidebarRail";

defineProps<{
  items?: SidebarRailFooterItemData[];
}>();
</script>

<template>
  <div class="px-4 pb-4 pt-4 text-xs leading-5 text-slate-500">
    <div class="flex flex-wrap gap-x-3 gap-y-1">
      <template v-for="item in items ?? []" :key="item.id">
        <a
          v-if="item.href"
          :href="item.href"
          class="hover:text-slate-700"
        >
          {{ item.label }}
        </a>
        <span v-else>{{ item.label }}</span>
      </template>
    </div>
  </div>
</template>
