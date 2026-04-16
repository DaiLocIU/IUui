import {
  computed,
  defineComponent,
  ref,
  toRef,
  watch,
  type PropType,
  type Ref,
} from 'vue'

import useFocusWithin from './WebPressable/composables/useFocusWithin'

export interface FocusWithinHandlerTestOnlyState {
  focus?: boolean
  focusVisible?: boolean
}

export default defineComponent({
  name: 'FocusWithinHandler',
  emits: ['blurwithin', 'focuschange', 'focusvisiblechange', 'focuswithin'],
  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
    testOnly: {
      default: undefined,
      type: Object as PropType<FocusWithinHandlerTestOnlyState | undefined>,
    },
  },
  setup(props, { emit, slots }) {
    const rootRef = ref<HTMLElement | null>(null)
    const lastFocusWithinEvent = ref<FocusEvent | null>(null)
    const lastBlurWithinEvent = ref<FocusEvent | null>(null)

    const { focusedWithin, focusVisibleWithin } = useFocusWithin(rootRef, {
      disabled: toRef(props, 'disabled'),
      onBlurWithin(event) {
        lastBlurWithinEvent.value = event
      },
      onFocusWithin(event) {
        lastFocusWithinEvent.value = event
      },
      onFocusWithinChange(focused) {
        emit('focuschange', focused)
      },
      onFocusWithinVisibleChange(visible) {
        emit('focusvisiblechange', visible)
      },
    })

    const focused = computed(() => props.testOnly?.focus ?? focusedWithin.value)
    const focusVisible = computed(
      () => props.testOnly?.focusVisible ?? focusVisibleWithin.value,
    )

    watch(focusedWithin, (value, previousValue) => {
      if (value === previousValue) {
        return
      }

      if (value) {
        if (lastFocusWithinEvent.value != null) {
          emit('focuswithin', lastFocusWithinEvent.value)
        }

        return
      }

      if (lastBlurWithinEvent.value != null) {
        emit('blurwithin', lastBlurWithinEvent.value)
      }
    })

    return () =>
      slots.default?.({
        focusVisible: focusVisible.value,
        focused: focused.value,
        ref: rootRef as Ref<HTMLElement | null>,
      }) ?? null
  },
})
