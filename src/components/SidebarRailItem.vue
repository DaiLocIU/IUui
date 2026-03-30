<script setup lang="ts">
import { computed, useAttrs } from "vue";

import type { SidebarRailItemData } from "../system/sidebarRail";
import TruncationTooltip from "./TruncationTooltip.vue";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  item: SidebarRailItemData;
}>();

const attrs = useAttrs();

const isLink = computed(() => Boolean(props.item.href) && !props.item.disabled);
const label = computed(() => props.item.label);
</script>

<template>
  <component
    :is="isLink ? 'a' : 'button'"
    v-bind="attrs"
    :href="isLink ? item.href : undefined"
    :disabled="!isLink && item.disabled ? true : undefined"
    :aria-current="item.active ? 'page' : undefined"
    class="flex min-h-10 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors"
    :class="[
      item.disabled
        ? 'cursor-not-allowed text-slate-400'
        : item.active
          ? 'bg-slate-900 text-white'
          : 'text-slate-800 hover:bg-slate-100',
    ]"
  >
    <div
      v-if="item.icon"
      class="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg"
      :class="item.active ? 'bg-white/15 text-white' : 'bg-slate-200 text-slate-600'"
    >
      <component
        :is="item.icon"
        v-if="typeof item.icon !== 'string'"
        class="size-4"
      />
      <span v-else class="text-xs font-semibold">
        {{ item.icon }}
      </span>
    </div>

    <TruncationTooltip class="min-w-0 flex-1">
      <span class="block truncate font-medium">
        {{ label }}
      </span>
    </TruncationTooltip>

    <span
      v-if="item.badge !== undefined && item.badge !== null"
      class="shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold"
      :class="item.active ? 'bg-white/15 text-white' : 'bg-slate-200 text-slate-600'"
    >
      {{ item.badge }}
    </span>
  </component>
</template>
