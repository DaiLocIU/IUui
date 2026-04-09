<template>
  <CometBookmarkListItem
    v-if="shouldRender"
    v-bind="attrs"
    :id="bookmark.id"
    :link-props="resolvedLinkProps"
    :meta="meta"
    :meta-color="metaColor"
    :meta-line-limit="metaLineLimit"
    :name="resolvedName"
    :on-press="resolvedOnPress"
    :selected="resolvedSelected"
  >
    <template #addOnStart>
      <BaseImage
        :src="addOnStartSrc"
        alt=""
        :draggable="false"
        :width="36"
        :height="36"
      />
    </template>

    <template
      v-if="$slots.addOnEnd != null"
      #addOnEnd
    >
      <slot name="addOnEnd" />
    </template>
  </CometBookmarkListItem>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'

import BaseImage from './BaseImage.vue'
import CometBookmarkListItem from './CometBookmarkListItem.vue'
import type { LinkProps } from './WebPressable/types'
import type { FDSTextColor } from '../utils/getFDSTextHierarchyStyle'

defineOptions({
  inheritAttrs: false,
})

interface BookmarkImageSource {
  src?: string | null
  uri?: string | null
}

interface BookmarkData {
  bookmarkIconSprite?: BookmarkImageSource | string | null
  hasUserHidden?: boolean | null
  id?: string
  image?: BookmarkImageSource | string | null
  isNewsFeed?: boolean | null
  name?: string | number | null
  section?: string | null
  url?: string | null
}

interface Props {
  bookmark: BookmarkData
  bookmarkSection?: string
  currentTabKey?: string
  index?: number
  meta?: string | number | null
  metaColor?: FDSTextColor
  metaLineLimit?: number
  onExpand?: () => void
  onPress?: (event: MouseEvent | KeyboardEvent) => void
  selected?: boolean
  useNucleusIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  bookmarkSection: undefined,
  currentTabKey: undefined,
  index: undefined,
  meta: null,
  metaColor: undefined,
  metaLineLimit: undefined,
  onExpand: undefined,
  onPress: undefined,
  selected: undefined,
  useNucleusIcon: undefined,
})

const attrs = useAttrs()
const slots = useSlots()

function resolveBookmarkImageSource(value: BookmarkImageSource | string | null | undefined): string | undefined {
  if (typeof value === 'string') {
    return value
  }

  return value?.uri ?? value?.src ?? undefined
}

const addOnStartSrc = computed(() =>
  resolveBookmarkImageSource(props.bookmark.image)
  ?? resolveBookmarkImageSource(props.bookmark.bookmarkIconSprite),
)

const hasTrailingAddOn = computed(() => slots.addOnEnd != null)

const resolvedName = computed(() => props.bookmark.name ?? '')

const shouldRender = computed(() => {
  if (props.bookmark.hasUserHidden === true) {
    return false
  }

  if (addOnStartSrc.value == null) {
    return false
  }

  if (props.bookmark.name == null) {
    return false
  }

  if (props.bookmark.url == null && !hasTrailingAddOn.value) {
    return false
  }

  return true
})

const resolvedSelected = computed(() =>
  props.selected
  ?? (
    props.bookmark.isNewsFeed === true
    && props.currentTabKey === 'home'
  ),
)

const resolvedLinkProps = computed<LinkProps | null>(() =>
  props.bookmark.url == null
    ? null
    : {
        url: props.bookmark.url,
      },
)

const resolvedOnPress = computed<((event: MouseEvent | KeyboardEvent) => void) | undefined>(() =>
  props.bookmark.url == null
    ? (props.onExpand == null ? undefined : () => props.onExpand?.())
    : props.onPress
)
</script>
