<script setup lang="ts">
import { computed, useAttrs } from "vue";

import type {
  SidebarRailFooterItemData,
  SidebarRailSectionData,
} from "../system/sidebarRail";
import SidebarRailFooter from "./SidebarRailFooter.vue";
import SidebarRailSection from "./SidebarRailSection.vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    sections?: SidebarRailSectionData[];
    footerItems?: SidebarRailFooterItemData[];
    loading?: boolean;
  }>(),
  {
    sections: () => [],
    footerItems: () => [],
    loading: false,
  },
);

const attrs = useAttrs();

const visibleSections = computed(() =>
  props.sections.filter((section) =>
    section.loading === true ||
    section.items.some((item) => item.hidden !== true),
  ),
);

const hasRenderableContent = computed(
  () => props.loading || visibleSections.value.length > 0,
);
</script>

<template>
  <div
    v-bind="attrs"
    class="flex min-h-0 flex-1 flex-col"
  >
    <div class="min-h-0 flex-1">
      <template v-if="hasRenderableContent">
        <SidebarRailSection
          v-for="section in visibleSections"
          :key="section.id"
          :section="section"
          :loading="loading"
        >
          <template
            v-if="$slots['section-header']"
            #header="slotProps"
          >
            <slot
              name="section-header"
              v-bind="slotProps"
            />
          </template>

          <template
            v-if="$slots.item"
            #item="slotProps"
          >
            <slot
              name="item"
              v-bind="slotProps"
            />
          </template>

          <template
            v-if="$slots.loading"
            #loading="slotProps"
          >
            <slot
              name="loading"
              v-bind="slotProps"
            />
          </template>
        </SidebarRailSection>
      </template>

      <slot
        v-else
        name="empty-state"
      >
        <div class="px-4 py-6 text-sm text-slate-500">
          No navigation items.
        </div>
      </slot>
    </div>

    <slot
      v-if="$slots.footer"
      name="footer"
      :items="footerItems"
    />
    <SidebarRailFooter
      v-else-if="footerItems.length > 0"
      :items="footerItems"
    />
  </div>
</template>
