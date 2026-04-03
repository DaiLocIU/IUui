<template>
  <CometBookmarkListItem
    v-if="shouldRenderRow"
    ref="rowRef"
    :add-on-end="addOnEnd"
    :bookmark-section="resolvedBookmarkSection"
    :fallback-initial="resolvedFallbackInitial"
    :id="resolvedId"
    :image-alt="resolvedImageAlt"
    :image-src="resolvedImageSrc"
    :index="index"
    :link-props="resolvedLinkProps"
    :meta="resolvedMeta"
    :meta-color="metaColor"
    :meta-line-limit="metaLineLimit"
    :name="resolvedName"
    :on-hover-in="onHoverIn"
    :on-hover-out="onHoverOut"
    :on-press="resolvedOnPress"
    :selected="isSelected"
    :testid="testid"
    :total-shortcut-count="totalShortcutCount"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import CometBookmarkListItem from './CometBookmarkListItem.vue'
import type { FDSTextColor } from '../utils/getFDSTextHierarchyStyle'

type LinkProps = {
  url?: string
  [key: string]: unknown
}

type BookmarkImage = {
  is_silhouette?: boolean | null
  uri?: string | null
  url?: string | null
}

type BookmarkNodeRef = {
  id?: string | number | null
}

type BookmarkData = {
  bookmark_icon_sprite?: unknown
  bookmarked_node?: BookmarkNodeRef | null
  fallback_initial?: string | null
  fallbackInitial?: string | null
  has_user_hidden?: boolean | null
  hidden?: boolean | null
  id?: string | number | null
  image?: BookmarkImage | null
  imageAlt?: string | null
  image_url?: string | null
  is_news_feed?: boolean | null
  meta?: string | number | null
  name?: string | number | null
  section?: string | null
  subtitle?: string | number | null
  title?: string | number | null
  url?: string | null
}

interface Props {
  addOnEnd?: unknown
  bookmark?: BookmarkData | null
  bookmarkSection?: string | null
  currentTabKey?: string | null
  index?: number | null
  meta?: string | number | null
  metaColor?: FDSTextColor
  metaLineLimit?: number
  onExpand?: (event?: MouseEvent | KeyboardEvent) => void
  onHoverIn?: (event: unknown) => void
  onHoverOut?: (event: unknown) => void
  onPress?: (event: MouseEvent | KeyboardEvent) => void
  testid?: string
  totalShortcutCount?: number | null
  useNucleusIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  addOnEnd: undefined,
  bookmark: null,
  bookmarkSection: null,
  currentTabKey: null,
  index: null,
  meta: null,
  metaColor: 'secondary',
  metaLineLimit: undefined,
  onExpand: undefined,
  onHoverIn: undefined,
  onHoverOut: undefined,
  onPress: undefined,
  testid: '',
  totalShortcutCount: null,
  useNucleusIcon: false,
})

const rowRef = ref<unknown>(null)

const bookmark = computed(() => props.bookmark ?? null)

function normalizeString(value: unknown): string | null {
  if (typeof value === 'string') {
    const trimmed = value.trim()
    return trimmed === '' ? null : trimmed
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value)
  }

  return null
}

function extractUrlCandidate(value: unknown): string | null {
  if (typeof value === 'string') {
    const trimmed = value.trim()

    if (trimmed === '') {
      return null
    }

    if (
      trimmed.startsWith('http://') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('//') ||
      trimmed.startsWith('/') ||
      trimmed.startsWith('data:') ||
      trimmed.startsWith('blob:')
    ) {
      return trimmed
    }

    return null
  }

  if (value != null && typeof value === 'object') {
    const record = value as Record<string, unknown>
    return (
      extractUrlCandidate(record.uri) ??
      extractUrlCandidate(record.url) ??
      extractUrlCandidate(record.src)
    )
  }

  return null
}

const resolvedId = computed(
  () =>
    bookmark.value?.id ??
    bookmark.value?.bookmarked_node?.id ??
    null,
)

const resolvedName = computed(() => {
  const source =
    bookmark.value?.name ??
    bookmark.value?.title ??
    null

  return source != null ? source : null
})

const resolvedMeta = computed(() => {
  if (props.meta != null) {
    return props.meta
  }

  return bookmark.value?.meta ?? bookmark.value?.subtitle ?? null
})

const resolvedBookmarkSection = computed(
  () => props.bookmarkSection ?? bookmark.value?.section ?? null,
)

const resolvedUrl = computed(() => normalizeString(bookmark.value?.url))

const resolvedLinkProps = computed<LinkProps | undefined>(() =>
  resolvedUrl.value != null ? { url: resolvedUrl.value } : undefined,
)

const imageUri = computed(
  () =>
    extractUrlCandidate(bookmark.value?.image?.uri) ??
    extractUrlCandidate(bookmark.value?.image?.url) ??
    extractUrlCandidate(bookmark.value?.image_url),
)

const spriteUri = computed(() =>
  extractUrlCandidate(bookmark.value?.bookmark_icon_sprite),
)

const resolvedImageSrc = computed(() => {
  if (resolvedBookmarkSection.value === 'FOLDER') {
    return spriteUri.value
  }

  return imageUri.value ?? spriteUri.value
})

const resolvedFallbackInitial = computed(() => {
  const explicitFallback =
    normalizeString(bookmark.value?.fallback_initial) ??
    normalizeString(bookmark.value?.fallbackInitial)

  if (explicitFallback != null) {
    return explicitFallback.slice(0, 1).toUpperCase()
  }

  return null
})

const resolvedImageAlt = computed(() => {
  const explicitAlt = normalizeString(bookmark.value?.imageAlt)

  if (explicitAlt != null) {
    return explicitAlt
  }

  return normalizeString(resolvedName.value)
})

const hasEffectiveStartAddon = computed(
  () => resolvedImageSrc.value != null || resolvedFallbackInitial.value != null,
)

const hasActionableOutput = computed(
  () => resolvedUrl.value != null || props.addOnEnd != null,
)

const isSelected = computed(
  () =>
    bookmark.value?.is_news_feed === true &&
    props.currentTabKey === 'home',
)

const shouldRenderRow = computed(
  () =>
    bookmark.value?.hidden !== true &&
    bookmark.value?.has_user_hidden !== true &&
    resolvedName.value != null &&
    hasEffectiveStartAddon.value &&
    hasActionableOutput.value,
)

const resolvedOnPress = computed(() => {
  if (resolvedUrl.value == null) {
    return props.onExpand
  }

  return props.onPress
})

defineExpose({
  el: rowRef,
})
</script>
