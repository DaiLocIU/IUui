<script setup lang="ts">
import { computed } from "vue";

/**
 * CometHomeLeftRailWithBlueRanking.react
 *
 * This is a Vue-oriented port of the rail orchestration logic, not a Relay clone.
 * The original component mostly decides section order, counts, headers, filtering,
 * and attribution boundaries around app-specific child components.
 */

type BookmarkNode = {
  id: string;
  title?: string | null;
  url?: string | null;
  has_user_hidden?: boolean | null;
  image_url?: string | null;
  subtitle?: string | null;
};

type BookmarkEdge = {
  node?: BookmarkNode | null;
};

type BookmarkConnection = {
  count?: number | null;
  edges?: BookmarkEdge[] | null;
};

type ViewerData = {
  comet_classic_identity?: {
    bookmarks?: {
      edges?: BookmarkEdge[] | null;
    } | null;
  } | null;
  shortcut_bookmarks?: {
    shortcut_bookmark?: BookmarkConnection | null;
  } | null;
  explore_bookmarks?: {
    explore_bookmark?: BookmarkConnection | null;
  } | null;
  professional_tools?: {
    professional_bookmark?: BookmarkConnection | null;
  } | null;
} | null;

type RailSectionKey = "professional_tools" | "explore" | "shortcuts";

type RailSection = {
  key: RailSectionKey;
  header?: string;
  items: BookmarkNode[];
  badgeStyle: "string";
  withSeparator: boolean;
  attribution: "bookmarks" | "shortcuts";
};

interface Props {
  viewer?: ViewerData;
  enableSimplifiedSidebarIcons?: boolean;
  enableExpandedShortcutCount?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  viewer: null,
  enableSimplifiedSidebarIcons: false,
  enableExpandedShortcutCount: false,
  loading: false,
});

/**
 * React source: function d(e, t, n)
 * Balances how many items belong to the shortcuts section vs the explore section.
 */
function splitSectionCounts(
  shortcutEdgeCount: number | null | undefined,
  exploreEdgeCount: number | null | undefined,
  maxShortcutCount: number,
) {
  const shortcutCount = shortcutEdgeCount ?? 5;
  const exploreCount =
    exploreEdgeCount != null
      ? Math.max(exploreEdgeCount - shortcutCount, maxShortcutCount)
      : maxShortcutCount;

  return {
    exploreCount,
    shortcutCount,
  };
}

/**
 * React source: T = classic identity bookmarks filtered by has_user_hidden
 */
const identityItems = computed(() =>
  (
    props.viewer?.comet_classic_identity?.bookmarks?.edges?.map((edge) => edge?.node ?? null) ??
    []
  ).filter((node): node is BookmarkNode => node != null && node.has_user_hidden !== true),
);

const totalShortcutCount = computed(
  () => props.viewer?.shortcut_bookmarks?.shortcut_bookmark?.count ?? undefined,
);

const shortcutNodes = computed(() =>
  (
    props.viewer?.shortcut_bookmarks?.shortcut_bookmark?.edges?.map((edge) => edge?.node ?? null) ??
    []
  ).filter((node): node is BookmarkNode => Boolean(node)),
);

const exploreNodes = computed(() =>
  (
    props.viewer?.explore_bookmarks?.explore_bookmark?.edges?.map((edge) => edge?.node ?? null) ??
    []
  ).filter((node): node is BookmarkNode => Boolean(node)),
);

const professionalNodes = computed(() =>
  (
    props.viewer?.professional_tools?.professional_bookmark?.edges?.map((edge) => edge?.node ?? null) ??
    []
  ).filter((node): node is BookmarkNode => Boolean(node)),
);

/**
 * React source: B
 * Default shortcut budget:
 * - 3 when professional tools exist
 * - 7 when the gating flag is disabled
 * - otherwise 5
 */
const maxShortcutBudget = computed(() => {
  if (professionalNodes.value.length > 0) return 3;
  if (!props.enableExpandedShortcutCount) return 7;
  return 5;
});

const countSplit = computed(() =>
  splitSectionCounts(
    shortcutNodes.value.length,
    exploreNodes.value.length,
    maxShortcutBudget.value,
  ),
);

const sections = computed<RailSection[]>(() => {
  const result: RailSection[] = [];

  if (professionalNodes.value.length > 0) {
    result.push({
      key: "professional_tools",
      items: professionalNodes.value.slice(0, professionalNodes.value.length),
      badgeStyle: "string",
      withSeparator: countSplit.value.exploreCount !== 0,
      attribution: "bookmarks",
    });
  }

  if (exploreNodes.value.length > 0) {
    result.push({
      key: "explore",
      header: professionalNodes.value.length > 0 ? "Suggested" : undefined,
      items: exploreNodes.value.slice(0, countSplit.value.exploreCount),
      badgeStyle: "string",
      withSeparator: countSplit.value.shortcutCount !== 0,
      attribution: "bookmarks",
    });
  }

  if (shortcutNodes.value.length > 0) {
    result.push({
      key: "shortcuts",
      header: "Your shortcuts",
      items: shortcutNodes.value.slice(0, countSplit.value.shortcutCount),
      badgeStyle: "string",
      withSeparator: false,
      attribution: "shortcuts",
    });
  }

  return result;
});

const bookmarkSections = computed(() =>
  sections.value.filter((section) => section.attribution === "bookmarks"),
);

const shortcutSection = computed(
  () => sections.value.find((section) => section.attribution === "shortcuts") ?? null,
);

function bookmarkLabel(item: BookmarkNode) {
  return item.title ?? item.subtitle ?? "Untitled";
}
</script>

<template>
  <div
    class="flex min-h-0 flex-1 flex-col"
    data-visualcompletion="ignore-dynamic"
  >
    <div class="flex-1" data-testid="">
      <div
        v-for="section in bookmarkSections"
        :key="section.key"
        :data-attribution="section.attribution"
        class="w-full"
      >
        <section class="w-full">
          <h2
            v-if="section.header"
            class="px-4 pb-2 pt-3 text-sm font-semibold text-slate-700"
          >
            {{ section.header }}
          </h2>

          <div v-if="loading" class="space-y-2 px-4 pb-3">
            <div
              v-for="index in 4"
              :key="`${section.key}-loading-${index}`"
              class="h-9 animate-pulse rounded-xl bg-slate-200"
            />
          </div>

          <ul v-else class="space-y-1 px-2 pb-3">
            <li
              v-for="item in section.items"
              :key="item.id"
              class="flex min-h-9 items-center gap-3 rounded-xl px-2 py-2 text-sm text-slate-800 hover:bg-slate-100"
            >
              <div
                class="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-200 text-xs font-semibold uppercase text-slate-600"
              >
                <img
                  v-if="item.image_url"
                  :src="item.image_url"
                  :alt="bookmarkLabel(item)"
                  class="size-full object-cover"
                />
                <span v-else>
                  {{ bookmarkLabel(item).slice(0, 1) }}
                </span>
              </div>

              <a
                :href="item.url || '#'"
                class="min-w-0 flex-1 truncate font-medium no-underline"
              >
                {{ bookmarkLabel(item) }}
              </a>

              <span
                v-if="props.enableSimplifiedSidebarIcons"
                class="size-2 shrink-0 rounded-full bg-sky-500"
              />
            </li>
          </ul>
        </section>

        <div
          v-if="section.withSeparator"
          class="mx-4 border-t border-slate-200"
        />
      </div>

      <div
        v-if="shortcutSection"
        data-attribution="shortcuts"
        class="w-full"
      >
        <section class="w-full">
          <h2
            v-if="shortcutSection.header"
            class="px-4 pb-2 pt-3 text-sm font-semibold text-slate-700"
          >
            {{ shortcutSection.header }}
          </h2>

          <div v-if="loading" class="space-y-2 px-4 pb-3">
            <div
              v-for="index in 4"
              :key="`shortcuts-loading-${index}`"
              class="h-9 animate-pulse rounded-xl bg-slate-200"
            />
          </div>

          <ul v-else class="space-y-1 px-2 pb-3">
            <li
              v-for="item in shortcutSection.items"
              :key="item.id"
              class="flex min-h-9 items-center gap-3 rounded-xl px-2 py-2 text-sm text-slate-800 hover:bg-slate-100"
            >
              <div
                class="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-200 text-xs font-semibold uppercase text-slate-600"
              >
                <img
                  v-if="item.image_url"
                  :src="item.image_url"
                  :alt="bookmarkLabel(item)"
                  class="size-full object-cover"
                />
                <span v-else>
                  {{ bookmarkLabel(item).slice(0, 1) }}
                </span>
              </div>

              <a
                :href="item.url || '#'"
                class="min-w-0 flex-1 truncate font-medium no-underline"
              >
                {{ bookmarkLabel(item) }}
              </a>

              <span class="size-2 shrink-0 rounded-full bg-slate-400" />
            </li>
          </ul>
        </section>
      </div>
    </div>

    <div class="shrink-0 px-4 pb-4 pt-4 text-xs leading-5 text-slate-500">
      <div class="flex flex-wrap gap-x-3 gap-y-1">
        <span>Privacy</span>
        <span>Terms</span>
        <span>Advertising</span>
        <span>Ad Choices</span>
        <span>Cookies</span>
        <span>More</span>
      </div>
    </div>
  </div>
</template>
