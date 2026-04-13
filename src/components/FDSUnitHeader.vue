<template>
  <div class="fds-unit-header group">
    <IUColumn
      v-if="props.hasTopDivider"
      :padding-horizontal="resolvedPaddingHorizontal"
    >
      <IUColumnItem>
        <div class="h-px bg-[var(--divider)] mb-[7px]" />
      </IUColumnItem>

      <IUColumnItem>
        <IUColumn
          :class="rootXStyle"
          :padding-horizontal="0"
        >
          <IUColumnItem>
            <FDSTextPairing
              :body="props.body"
              :body-color="resolvedBodyColor"
              :body-line-limit="resolvedBodyLineLimit"
              :headline="props.headline"
              :headline-add-on="headlineAddOn"
              :headline-color="resolvedHeadlineColor"
              :headline-id="props.headlineId"
              :headline-line-limit="2"
              :is-semantic-heading="resolvedSemanticHeading"
              :level="props.level"
              :meta="props.meta"
              :meta-color="resolvedMetaColor"
              :meta-line-limit="1"
              :meta-location="resolvedMetaLocation"
              :meta-test-i-d="props.metaTestID"
            />
          </IUColumnItem>
        </IUColumn>
      </IUColumnItem>
    </IUColumn>

    <IUColumn
      v-else
      :class="rootXStyle"
      :padding-horizontal="resolvedPaddingHorizontal"
    >
      <IUColumnItem>
        <FDSTextPairing
          :body="props.body"
          :body-color="resolvedBodyColor"
          :body-line-limit="resolvedBodyLineLimit"
          :headline="props.headline"
          :headline-add-on="headlineAddOn"
          :headline-color="resolvedHeadlineColor"
          :headline-id="props.headlineId"
          :headline-line-limit="2"
          :is-semantic-heading="resolvedSemanticHeading"
          :level="props.level"
          :meta="props.meta"
          :meta-color="resolvedMetaColor"
          :meta-line-limit="1"
          :meta-location="resolvedMetaLocation"
          :meta-test-i-d="props.metaTestID"
        />
      </IUColumnItem>
    </IUColumn>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, useSlots, type Component, type PropType } from 'vue'

import FDSTextPairing from './FDSTextPairing.vue'
import IUColumn from './IUColumn.vue'
import IUColumnItem from './IUColumnItem.vue'
import { provideFDSUnitHeaderLevel } from '../composables/useFDSUnitHeaderLevel'
import type { FDSTextColor, FDSTextPairingLevel } from '../utils/getFDSTextHierarchyStyle'

defineOptions({
  inheritAttrs: false,
})

type UnitHeaderMetaLocation = 'above' | 'below' | 'in-between'

const props = defineProps({
  body: {
    type: [String, Number] as PropType<string | number | null>,
    default: null,
  },
  bodyColor: {
    type: String as PropType<FDSTextColor | undefined>,
    default: undefined,
  },
  bodyLineLimit: {
    type: Number as PropType<number | undefined>,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  hasTopDivider: {
    type: Boolean,
    default: false,
  },
  headline: {
    type: [String, Number] as PropType<string | number | null>,
    default: null,
  },
  headlineColor: {
    type: String as PropType<FDSTextColor | undefined>,
    default: undefined,
  },
  headlineId: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
  isSemanticHeading: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  level: {
    type: [Number, String] as PropType<FDSTextPairingLevel>,
    required: true,
  },
  meta: {
    type: [String, Number] as PropType<string | number | null>,
    default: null,
  },
  metaColor: {
    type: String as PropType<FDSTextColor | undefined>,
    default: undefined,
  },
  metaLocation: {
    type: String as PropType<UnitHeaderMetaLocation | undefined>,
    default: undefined,
  },
  metaTestID: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
  paddingHorizontal: {
    type: Number as PropType<0 | 4 | 8 | 12 | 16 | 20 | undefined>,
    default: undefined,
  },
  paddingTop: {
    type: Number as PropType<0 | 8 | 12 | 16 | 20 | undefined>,
    default: undefined,
  },
  showActionOnHover: {
    type: Boolean,
    default: false,
  },
  actionHidden: {
    type: Boolean,
    default: false,
  },
  useFocusCell: {
    type: Boolean,
    default: false,
  },
})

const slots = useSlots()

const resolvedBodyColor = computed<FDSTextColor>(() => props.bodyColor ?? 'secondary')
const resolvedBodyLineLimit = computed(() => props.bodyLineLimit ?? 3)
const resolvedHeadlineColor = computed<FDSTextColor>(() => props.headlineColor ?? 'primary')
const resolvedSemanticHeading = computed(() => props.isSemanticHeading ?? true)
const resolvedMetaColor = computed<FDSTextColor>(() => props.metaColor ?? 'secondary')
const resolvedMetaLocation = computed<UnitHeaderMetaLocation>(() => props.metaLocation ?? 'below')
const resolvedPaddingHorizontal = computed(() => props.paddingHorizontal ?? 16)
const resolvedPaddingTop = computed(() => props.paddingTop ?? 20)

provideFDSUnitHeaderLevel(typeof props.level === 'number' ? props.level : 3)

const paddingTopClassMap: Record<0 | 8 | 12 | 16 | 20, string> = {
  0: 'pt-0',
  8: 'pt-2',
  12: 'pt-3',
  16: 'pt-4',
  20: 'pt-5',
}

const rootXStyle = computed(() => [
  'pb-1',
  paddingTopClassMap[resolvedPaddingTop.value as 0 | 8 | 12 | 16 | 20],
])

const actionShellClass = computed(() => [
  'fds-unit-header__action-shell inline-block relative align-middle m-0 p-0 border-0',
  props.showActionOnHover && 'fds-unit-header__action-shell--hover-reveal',
  props.actionHidden && 'fds-unit-header__action-shell--hidden',
])

const HeadlineActionAddOn = defineComponent({
  name: 'FDSUnitHeaderHeadlineActionAddOn',
  setup() {
    return () => {
      const content = slots.action?.()
      if (content == null || content.length === 0) {
        return null
      }

      return h(
        'div',
        {
          class: actionShellClass.value,
        },
        content,
      )
    }
  },
})

const headlineAddOn = computed<Component | undefined>(() =>
  slots.action == null ? undefined : HeadlineActionAddOn,
)
</script>

<style scoped>
@media (pointer: coarse) {
  .fds-unit-header__action-shell--hover-reveal {
    visibility: visible;
  }
}

@media (pointer: fine) {
  .fds-unit-header__action-shell--hover-reveal {
    visibility: hidden;
  }

  .fds-unit-header:hover .fds-unit-header__action-shell--hover-reveal,
  .fds-unit-header__action-shell--hover-reveal:focus-within {
    visibility: visible;
  }
}

.fds-unit-header__action-shell--hidden {
  opacity: 0;
}

.fds-unit-header__action-shell--hidden:focus-within {
  opacity: 1;
}
</style>
