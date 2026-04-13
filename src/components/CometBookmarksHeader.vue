<template>
  <FDSUnitHeader
    :action="action"
    :headline="props.sectionHeader"
    headline-color="secondary"
    :level="3"
  />
</template>

<script setup lang="ts">
import { computed, markRaw } from 'vue'

import FDSUnitHeader from './FDSUnitHeader.vue'
import FDSUnitHeaderTextAction from './FDSUnitHeaderTextAction.vue'

const props = withDefaults(defineProps<{
  canEdit?: boolean
  editHovered?: boolean
  onActionPress?: (event: MouseEvent | KeyboardEvent) => void
  sectionHeader: string | number
}>(), {
  canEdit: false,
  editHovered: false,
  onActionPress: undefined,
})

const action = computed(() => {
  if (!(props.canEdit && props.editHovered)) {
    return undefined
  }

  return markRaw({
    component: FDSUnitHeaderTextAction,
    props: {
      'aria-label': 'Edit Shortcuts',
      label: 'Edit',
      onPress: props.onActionPress,
    },
  })
})
</script>
