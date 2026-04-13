<template>
  <div
    class="w-full"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <template v-if="shouldRenderHeader">
      <template
        v-for="(identityItem, identityIndex) in leadingIdentityItemsBeforeHeader"
        :key="`identity-before-header-${identityIndex}`"
      >
        <IdentityItemRenderer :item="identityItem" />
      </template>
    </template>

    <div
      v-if="shouldRenderHeader"
      class="w-full"
    >
      <CometBookmarksHeader
        :can-edit="isEditableSection"
        :edit-hovered="editHovered"
        :on-action-press="onEditShortcuts"
        :section-header="sectionHeader"
      />
    </div>

    <template v-if="isRefetching">
      <FDSListCellGlimmer
        :image-size="36"
        image-style="roundedRect"
        :number-of-items="visibleCount"
      />
    </template>

    <template v-else-if="shouldRenderList">
      <ul>
        <template
          v-for="(identityItem, identityIndex) in leadingIdentityItemsInList"
          :key="`identity-in-list-${identityIndex}`"
        >
          <IdentityItemRenderer :item="identityItem" />
        </template>

        <CometFolderBookmarkListItem
          v-for="(bookmark, index) in visibleItems"
          :ref="(instance) => registerRowRef(index, instance)"
          :key="bookmark.id ?? `${section}-${index}`"
          :badge-style="badgeStyle"
          :bookmark="bookmark"
          :bookmark-section="section"
          :index="index"
          :total-shortcut-count="totalShortcutCount"
          :use-nucleus-icon="useNucleusIcon"
        />
      </ul>
    </template>

    <template v-if="shouldRenderControls">
      <CometHomeLeftRailBookmarkRefetchListCell
        v-if="expanded"
        :on-press="handleSeeLess"
        :section="section"
        type="less"
        
      />

      <CometHomeLeftRailBookmarkRefetchListCell
        v-else-if="shouldShowSeeMore"
        :is-loading-next="isLoadingNext"
        :on-press="handleSeeMore"
        :section="section"
        type="more"
      />
    </template>

    <CometClassicHomeRailSeparator v-if="shouldRenderSeparator" />
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineComponent,
  h,
  isVNode,
  nextTick,
  ref,
  watch,
  type Component,
  type ComponentPublicInstance,
  type PropType,
  type VNodeChild,
} from 'vue'

import CometBookmarksHeader from './CometBookmarksHeader.vue'
import CometClassicHomeRailSeparator from './CometClassicHomeRailSeparator.vue'
import CometFolderBookmarkListItem from './CometFolderBookmarkListItem.vue'
import CometHomeLeftRailBookmarkRefetchListCell from './CometHomeLeftRailBookmarkRefetchListCell.vue'
import FDSListCellGlimmer from './FDSListCellGlimmer.vue'
import { focusElement } from '../utils/focusManager'

type BadgeStyle = 'dot' | 'string' | 'none'

interface BookmarkLike {
  bookmarkIconSprite?: BookmarkImageSource | string | null
  contextSentence?: string | null
  hasUserHidden?: boolean | null
  has_user_hidden?: boolean | null
  id?: string
  image?: BookmarkImageSource | string | null
  isNewsFeed?: boolean | null
  name?: string | number | null
  shouldDemote?: boolean | null
  shouldPrioritize?: boolean | null
  should_demote?: boolean | null
  should_prioritize?: boolean | null
  section?: string | null
  unreadCount?: number | null
  unreadCountString?: string | null
  url?: string | null
}

interface BookmarkImageSource {
  src?: string | null
  uri?: string | null
}

interface BookmarkEdgeLike {
  node?: BookmarkLike | null
}

interface LoadMoreOptions {
  onComplete?: () => void
}

type IdentityItem =
  | string
  | number
  | Component
  | VNodeChild
  | {
      component: Component | object | string
      props?: Record<string, unknown>
    }

type RowInstance =
  | ComponentPublicInstance<{ $el?: unknown; el?: unknown }>
  | Element
  | HTMLElement
  | null

const IdentityItemRenderer = defineComponent({
  name: 'CometHomeLeftRailIdentityItemRenderer',
  props: {
    item: {
      type: null,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const item = props.item as IdentityItem

      if (item == null) {
        return null
      }

      if (isVNode(item)) {
        return item
      }

      if (typeof item === 'string' || typeof item === 'number') {
        return h('div', item)
      }

      if (
        typeof item === 'object'
        && 'component' in item
        && item.component != null
      ) {
        return h(item.component as Component, item.props ?? {})
      }

      return h(item as Component)
    }
  },
})

const props = withDefaults(defineProps<{
  badgeStyle?: BadgeStyle
  items: Array<BookmarkEdgeLike | BookmarkLike>
  identityItems?: IdentityItem[]
  initialCount?: number
  section: 'shortcuts' | 'communities' | 'explore' | string
  sectionHeader?: string
  sectionIndex?: number
  totalShortcutCount?: number
  useNucleusIcon?: boolean
  withSeparator?: boolean
  hasNext?: boolean
  isLoadingNext?: boolean
  onLoadMore?: (count: number, options?: LoadMoreOptions) => void
  onEditShortcuts?: () => void
  isRefetching?: boolean
  setIsRefetching?: (value: boolean) => void
}>(), {
  badgeStyle: 'string',
  identityItems: () => [],
  initialCount: 4,
  sectionHeader: undefined,
  sectionIndex: 0,
  totalShortcutCount: undefined,
  useNucleusIcon: undefined,
  withSeparator: true,
  hasNext: false,
  isLoadingNext: false,
  onLoadMore: undefined,
  onEditShortcuts: undefined,
  isRefetching: false,
  setIsRefetching: undefined,
})

const expanded = ref(false)
const editHovered = ref(false)
const pendingFocusIndex = ref<number | null>(null)
const rowRefs = ref<RowInstance[]>([])

function normalizeBookmark(entry: BookmarkEdgeLike | BookmarkLike): BookmarkLike | null {
  if (entry == null) {
    return null
  }

  const maybeEdge = entry as BookmarkEdgeLike
  const bookmark = maybeEdge.node ?? (entry as BookmarkLike)

  if (bookmark == null) {
    return null
  }

  return {
    ...bookmark,
    hasUserHidden: bookmark.hasUserHidden ?? bookmark.has_user_hidden ?? false,
    shouldDemote: bookmark.shouldDemote ?? bookmark.should_demote ?? false,
    shouldPrioritize: bookmark.shouldPrioritize ?? bookmark.should_prioritize ?? false,
  }
}

const normalizedItems = computed<BookmarkLike[]>(() =>
  props.items
    .map((item) => normalizeBookmark(item))
    .filter((bookmark): bookmark is BookmarkLike => bookmark != null && bookmark.hasUserHidden !== true),
)

const sortedItems = computed<BookmarkLike[]>(() => {
  const items = [...normalizedItems.value]

  if (!expanded.value || props.section !== 'explore') {
    return items
  }

  const head = items.slice(0, props.initialCount)
  const tail = items.slice(props.initialCount)

  tail.sort((left, right) => {
    if ((left.shouldPrioritize === true) !== (right.shouldPrioritize === true)) {
      return left.shouldPrioritize === true ? -1 : 1
    }

    if ((left.shouldDemote === true) !== (right.shouldDemote === true)) {
      return left.shouldDemote === true ? 1 : -1
    }

    const leftName = String(left.name ?? '')
    const rightName = String(right.name ?? '')
    return leftName.localeCompare(rightName)
  })

  return head.concat(tail)
})

const visibleCount = computed(() =>
  expanded.value
    ? sortedItems.value.length
    : Math.min(props.initialCount, sortedItems.value.length),
)

const visibleItems = computed(() => sortedItems.value.slice(0, visibleCount.value))

const isEditableSection = computed(() =>
  props.section === 'shortcuts' || props.section === 'communities',
)

const leadingIdentityItems = computed(() =>
  props.sectionIndex === 0 ? props.identityItems : [],
)

const shouldInsertIdentityItemsInList = computed(() =>
  props.sectionHeader == null && !props.isRefetching,
)

const leadingIdentityItemsBeforeHeader = computed(() =>
  shouldInsertIdentityItemsInList.value ? [] : leadingIdentityItems.value,
)

const leadingIdentityItemsInList = computed(() =>
  shouldInsertIdentityItemsInList.value ? leadingIdentityItems.value : [],
)

const shouldRenderList = computed(() =>
  !props.isRefetching
  && (leadingIdentityItemsInList.value.length > 0 || visibleItems.value.length > 0),
)

const hasSectionContent = computed(() =>
  props.isRefetching || shouldRenderList.value,
)

const shouldRenderHeader = computed(() =>
  hasSectionContent.value && props.sectionHeader != null,
)

const shouldShowSeeMore = computed(() => {
  if (expanded.value) {
    return false
  }

  if (!(props.isLoadingNext || props.hasNext || visibleCount.value < sortedItems.value.length)) {
    return false
  }

  if (props.section === 'shortcuts') {
    return props.totalShortcutCount == null || props.totalShortcutCount > 5
  }

  return true
})

const shouldRenderControls = computed(() =>
  hasSectionContent.value && !props.isRefetching,
)

const shouldRenderSeparator = computed(() =>
  hasSectionContent.value && props.withSeparator !== false,
)

function normalizeRowElement(value: RowInstance): HTMLElement | null {
  if (value instanceof HTMLElement) {
    return value
  }

  if (value != null && '$el' in value && value.$el instanceof HTMLElement) {
    return value.$el
  }

  if (value != null && 'el' in value && value.el instanceof HTMLElement) {
    return value.el
  }

  return null
}

function registerRowRef(index: number, instance: RowInstance): void {
  rowRefs.value[index] = instance
}

function handleMouseEnter(): void {
  if (isEditableSection.value) {
    editHovered.value = true
  }
}

function handleMouseLeave(): void {
  if (isEditableSection.value) {
    editHovered.value = false
  }
}

function handleSeeLess(): void {
  expanded.value = false
}

function expandWithFocusRestore(): void {
  pendingFocusIndex.value = visibleCount.value
  expanded.value = true
}

function handleSeeMore(): void {
  if (props.hasNext && props.onLoadMore != null) {
    props.onLoadMore(1000 - visibleCount.value, {
      onComplete: () => {
        expandWithFocusRestore()
      },
    })
    return
  }

  expandWithFocusRestore()
}

watch(
  [expanded, visibleItems],
  async ([isExpanded]) => {
    if (!isExpanded || pendingFocusIndex.value == null) {
      return
    }

    await nextTick()

    const targetRow = normalizeRowElement(rowRefs.value[pendingFocusIndex.value] ?? null)
    const targetFocusable = targetRow?.querySelector<HTMLElement>('a, button, [role="button"]') ?? targetRow

    if (targetFocusable != null) {
      focusElement(targetFocusable)
    }

    pendingFocusIndex.value = null
  },
  { flush: 'post' },
)
</script>
