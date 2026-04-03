<template>
  <li
    v-if="hasEffectiveStartAddon"
    :data-testid="testid || undefined"
  >
    <FDSListCellPressable
      ref="pressableRef"
      add-on-start-margin-top="0"
      add-on-start-vertical-align="center"
      :content-padding-horizontal="8"
      :padding-horizontal="8"
      :padding-vertical="8"
      :link-props="linkProps"
      :on-hover-in="onHoverIn"
      :on-hover-out="onHoverOut"
      :on-press="onPress"
      :selected="selected"
    >
      <template #addOnStart>
        <slot
          v-if="slots.addOnStart != null"
          name="addOnStart"
        />
        <AddOnRenderer
          v-else-if="addOnStart != null"
          :content="addOnStart"
        />
        <div
          v-else
          :style="generatedStartStyle"
        >
          <BaseImage
            v-if="imageSrc"
            :alt="resolvedImageAlt"
            object-fit="cover"
            :src="imageSrc"
            xstyle="h-full w-full"
          />
          <span v-else>
            {{ resolvedFallbackInitial }}
          </span>
        </div>
      </template>

      <FDSTextPairing
        :headline="name"
        :headline-line-limit="2"
        :level="4"
        :meta="meta"
        :meta-color="metaColor"
        :meta-line-limit="metaLineLimit"
        :reduce-emphasis="true"
      />

      <template
        v-if="slots.addOnEnd != null"
        #addOnEnd
      >
        <slot name="addOnEnd" />
      </template>

      <template
        v-else-if="addOnEnd != null"
        #addOnEnd
      >
        <AddOnRenderer :content="addOnEnd" />
      </template>
    </FDSListCellPressable>
  </li>
</template>

<script setup lang="ts">
import {
  computed,
  defineComponent,
  h,
  isVNode,
  ref,
  useSlots,
  type PropType,
} from 'vue'

import BaseImage from './BaseImage.vue'
import FDSListCellPressable from './FDSListCellPressable.vue'
import FDSTextPairing from './FDSTextPairing.vue'
import type { FDSTextColor } from '../utils/getFDSTextHierarchyStyle'

type LinkProps = {
  attributionsrc?: string
  brid?: string
  download?: boolean | string
  fbclid?: string
  rel?: string
  target?: string
  url?: string
  [key: string]: unknown
}

const AddOnRenderer = defineComponent({
  name: 'CometBookmarkListItemAddOnRenderer',
  props: {
    content: {
      type: null as unknown as PropType<unknown>,
      default: null,
    },
  },
  setup(props) {
    return () => {
      const content = props.content

      if (content == null) {
        return null
      }

      if (isVNode(content)) {
        return content
      }

      if (typeof content === 'function') {
        return (content as () => unknown)()
      }

      if (typeof content === 'string' || typeof content === 'number') {
        return content
      }

      return h(content as any)
    }
  },
})

interface Props {
  addOnEnd?: unknown
  addOnStart?: unknown
  bookmarkSection?: string | null
  fallbackInitial?: string | null
  id?: string | number | null
  imageAlt?: string | null
  imageSrc?: string | null
  index?: number | null
  linkProps?: LinkProps
  meta?: string | number | null
  metaColor?: FDSTextColor
  metaLineLimit?: number
  name?: string | number | null
  onHoverIn?: (event: unknown) => void
  onHoverOut?: (event: unknown) => void
  onPress?: (event: MouseEvent | KeyboardEvent) => void
  selected?: boolean
  testid?: string
  totalShortcutCount?: number | null
  tracking?: Record<string, unknown> | null
}

const props = withDefaults(defineProps<Props>(), {
  addOnEnd: undefined,
  addOnStart: undefined,
  bookmarkSection: null,
  fallbackInitial: null,
  id: null,
  imageAlt: null,
  imageSrc: null,
  index: null,
  linkProps: undefined,
  meta: null,
  metaColor: 'secondary',
  metaLineLimit: undefined,
  name: null,
  onHoverIn: undefined,
  onHoverOut: undefined,
  onPress: undefined,
  selected: false,
  testid: '',
  totalShortcutCount: null,
  tracking: null,
})

const slots = useSlots()
const pressableRef = ref<unknown>(null)

const resolvedFallbackInitial = computed(() => {
  const source =
    props.fallbackInitial ??
    (typeof props.name === 'string' && props.name.trim().length > 0
      ? props.name.trim().slice(0, 1)
      : null)

  return source != null && source !== '' ? source.slice(0, 1).toUpperCase() : ''
})

const resolvedImageAlt = computed(() =>
  props.imageAlt ??
  (typeof props.name === 'string' && props.name.trim().length > 0 ? props.name : ''),
)

const hasGeneratedStartAddon = computed(
  () => Boolean(props.imageSrc) || resolvedFallbackInitial.value !== '',
)

const hasEffectiveStartAddon = computed(
  () =>
    slots.addOnStart != null ||
    props.addOnStart != null ||
    hasGeneratedStartAddon.value,
)

const generatedStartStyle =
  'display:flex; align-items:center; justify-content:center; width:40px; height:40px; overflow:hidden; border-radius:12px; background:#dbeafe; color:#1d4ed8; font-size:12px; font-weight:700; text-transform:uppercase;'

defineExpose({
  el: pressableRef,
})
</script>
