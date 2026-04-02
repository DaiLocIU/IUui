<!-- FDSTextContextNew.vue -->
<!--
  React source: FDSTextContext_New.react
  Thin provider that guarantees a non-null FDS text context for descendants.
-->
<template>
  <!--
    React: typeof children === "function" ? children(contextValue) : children
    Vue equivalent: expose the current context as default-slot props.
  -->
  <slot
    :context="providedValue"
    :color="providedValue.color"
    :type="providedValue.type"
  />
</template>

<script setup lang="ts">
import { reactive, provide, watchEffect } from 'vue'

import {
  FDS_TEXT_CONTEXT_KEY,
  type FDSTextContextValue,
} from '../system/fdsTextKeys'

interface Props {
  color?: string
  type: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
})

/**
 * React source:
 *   value = { color: color ?? "primary", type }
 *   <FDSTextContext.Provider value={value}>{children}</FDSTextContext.Provider>
 */
const providedValue = reactive<FDSTextContextValue>({
  color: props.color,
  type: props.type,
})

watchEffect(() => {
  providedValue.color = props.color
  providedValue.type = props.type
})

provide(FDS_TEXT_CONTEXT_KEY, providedValue)
</script>
