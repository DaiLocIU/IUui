<template>
  <FDSUnitHeader
    :headline="props.sectionHeader"
    headline-color="secondary"
    :level="3"
  >
    <template
      v-if="props.canEdit && props.editHovered"
      #action
    >
      <FDSUnitHeaderTextAction
        aria-label="Edit Shortcuts"
        label="Edit"
        :on-press="props.onActionPress"
      />
    </template>
  </FDSUnitHeader>
</template>

<script setup lang="ts">
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
</script>
