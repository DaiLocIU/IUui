import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, ref, type Ref } from 'vue'

import FocusWithinHandler from '../src/components/FocusWithinHandler'
import {
  bubbleEvent,
  createFakeDocument,
  createFocusEvent,
  createKeyboardEvent,
  FakeElement,
  renderer,
} from './helpers/fakeVueDom'

const fakeWindow = new FakeElement('window')
const fakeDocument = createFakeDocument()

beforeAll(() => {
  vi.stubGlobal('window', fakeWindow)
  vi.stubGlobal('document', fakeDocument as Document)
  vi.stubGlobal(
    'FocusEvent',
    class FocusEvent extends Event {
      relatedTarget: EventTarget | null

      constructor(type: string, init?: FocusEventInit) {
        super(type)
        this.relatedTarget = init?.relatedTarget ?? null
      }
    },
  )
})

describe('FocusWithinHandler', () => {
  afterEach(() => {
    fakeDocument.activeElement = null
  })

  async function mountHandler(
    testOnly?: { focus?: boolean; focusVisible?: boolean },
  ) {
    const root = new FakeElement('root')
    const childRef = ref<HTMLElement | null>(null)
    const slotState = ref({
      focusVisible: false,
      focused: false,
      ref: ref<HTMLElement | null>(null) as Ref<HTMLElement | null>,
    })
    const onBlurWithin = vi.fn()
    const onFocusChange = vi.fn()
    const onFocusVisibleChange = vi.fn()
    const onFocusWithin = vi.fn()

    const Host = defineComponent({
      setup() {
        return () =>
          h(
            FocusWithinHandler,
            {
              onBlurwithin: onBlurWithin,
              onFocuschange: onFocusChange,
              onFocusvisiblechange: onFocusVisibleChange,
              onFocuswithin: onFocusWithin,
              testOnly,
            },
            {
              default: (props: {
                focusVisible: boolean
                focused: boolean
                ref: Ref<HTMLElement | null>
              }) => {
                slotState.value = props
                return h('button', {
                  ref: (element: HTMLElement | null) => {
                    props.ref.value = element
                    childRef.value = element
                  },
                })
              },
            },
          )
      },
    })

    const app = renderer.createApp(Host)
    app.mount(root)
    await nextTick()

    return {
      childRef,
      onBlurWithin,
      onFocusChange,
      onFocusVisibleChange,
      onFocusWithin,
      slotState,
      unmount: () => app.unmount(),
    }
  }

  it('emits subtree focus transitions once and exposes scoped slot state', async () => {
    const handler = await mountHandler()
    const child = handler.childRef.value as unknown as FakeElement

    fakeWindow.dispatch('keydown', createKeyboardEvent(child))
    fakeDocument.activeElement = child
    bubbleEvent(child, 'focusin', createFocusEvent('focusin', child))
    await nextTick()

    expect(handler.slotState.value.focused).toBe(true)
    expect(handler.slotState.value.focusVisible).toBe(true)
    expect(handler.onFocusWithin).toHaveBeenCalledTimes(1)
    expect(handler.onFocusChange).toHaveBeenCalledWith(true)
    expect(handler.onFocusVisibleChange).toHaveBeenCalledWith(true)

    fakeDocument.activeElement = null
    bubbleEvent(child, 'focusout', createFocusEvent('focusout', child))
    await nextTick()

    expect(handler.slotState.value.focused).toBe(false)
    expect(handler.slotState.value.focusVisible).toBe(false)
    expect(handler.onBlurWithin).toHaveBeenCalledTimes(1)
    expect(handler.onFocusChange).toHaveBeenLastCalledWith(false)
    expect(handler.onFocusVisibleChange).toHaveBeenLastCalledWith(false)
  })

  it('supports testOnly state overrides for stories and deterministic tests', async () => {
    const handler = await mountHandler({
      focus: true,
      focusVisible: false,
    })

    expect(handler.slotState.value.focused).toBe(true)
    expect(handler.slotState.value.focusVisible).toBe(false)
  })
})
