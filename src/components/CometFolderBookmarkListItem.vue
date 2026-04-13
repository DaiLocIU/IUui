<template>
  <CometBookmarkListItemWrapper
    v-bind="attrs"
    :bookmark="bookmark"
    :bookmark-section="bookmarkSection"
    :index="index"
    :meta="resolvedMetaText"
    :meta-color="resolvedMetaColor"
    :meta-line-limit="resolvedMetaLineLimit"
    :total-shortcut-count="totalShortcutCount"
    :use-nucleus-icon="useNucleusIcon"
  >
    <template
      v-if="showUnreadDot"
      #addOnEnd
    >
      <FDSBadge
        accessibility-text="Unread items indicator"
        color="red"
        :is-profile-badge="true"
        :size="8"
      />
    </template>

    <template
      v-if="showUnreadString"
      #meta
    >
      <FDSTextWithBadge>
        <template #badgeBefore>
          <FDSBadge
            accessibility-text="Unread items indicator"
            color="red"
            :is-profile-badge="true"
            :size="7"
          />
        </template>
        {{ bookmark.unreadCountString }}
      </FDSTextWithBadge>
    </template>
  </CometBookmarkListItemWrapper>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import CometBookmarkListItemWrapper from './CometBookmarkListItemWrapper.vue'
import FDSBadge from './FDSBadge.vue'
import FDSTextWithBadge from './FDSTextWithBadge.vue'
import type { FDSTextColor } from '../utils/getFDSTextHierarchyStyle'

defineOptions({
  inheritAttrs: false,
})

type BadgeStyle = 'dot' | 'string' | 'none'

interface BookmarkImageSource {
  src?: string | null
  uri?: string | null
}

interface FolderBookmarkData {
  bookmarkIconSprite?: BookmarkImageSource | string | null
  contextSentence?: string | null
  hasUserHidden?: boolean | null
  id?: string
  image?: BookmarkImageSource | string | null
  isNewsFeed?: boolean | null
  name?: string | number | null
  section?: string | null
  unreadCount?: number | null
  unreadCountString?: string | null
  url?: string | null
}

interface Props {
  badgeStyle?: BadgeStyle
  bookmark: FolderBookmarkData
  bookmarkSection?: string
  index?: number
  totalShortcutCount?: number
  useNucleusIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  badgeStyle: 'none',
  bookmarkSection: undefined,
  index: undefined,
  totalShortcutCount: undefined,
  useNucleusIcon: undefined,
})

const attrs = useAttrs()

const unreadCount = computed(() => props.bookmark.unreadCount ?? 0)
const hasUnread = computed(() => (
  (props.bookmark.unreadCountString != null && props.bookmark.unreadCountString !== '')
  || unreadCount.value > 0
))

const hasContextSentence = computed(() => (
  props.bookmark.contextSentence != null && props.bookmark.contextSentence !== ''
))

const showUnreadDot = computed(() => (
  !hasContextSentence.value
  && props.badgeStyle === 'dot'
  && hasUnread.value
))

const showUnreadString = computed(() => (
  !hasContextSentence.value
  && props.badgeStyle === 'string'
  && props.bookmark.unreadCountString != null
  && props.bookmark.unreadCountString !== ''
))

const resolvedMetaText = computed<string | null>(() => (
  hasContextSentence.value
    ? props.bookmark.contextSentence ?? null
    : null
))

const resolvedMetaColor = computed<FDSTextColor | undefined>(() => {
  if (hasContextSentence.value) {
    return 'secondary'
  }

  if (showUnreadString.value) {
    return 'highlight'
  }

  return undefined
})

const resolvedMetaLineLimit = computed<number | undefined>(() => {
  if (hasContextSentence.value) {
    return 2
  }

  if (showUnreadString.value) {
    return 1
  }

  return undefined
})
</script>
