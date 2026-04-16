import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, ref, type Ref } from 'vue'

import useFocusWithin from '../src/components/WebPressable/composables/useFocusWithin'
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

describe('useFocusWithin', () => {
  afterEach(() => {
    fakeDocument.activeElement = null
  })

  async function mountComposableHost(disabled = ref(false)): Promise<{
    childOneRef: Ref<HTMLElement | null>
    childTwoRef: Ref<HTMLElement | null>
    focusedWithin: Ref<boolean>
    focusVisibleWithin: Ref<boolean>
    onBlurWithin: ReturnType<typeof vi.fn>
    onFocusWithin: ReturnType<typeof vi.fn>
    onFocusWithinChange: ReturnType<typeof vi.fn>
    onFocusWithinVisibleChange: ReturnType<typeof vi.fn>
    rootRef: Ref<HTMLElement | null>
    unmount: () => void
  }> {
    const root = new FakeElement('root')
    const rootRef = ref<HTMLElement | null>(null)
    const childOneRef = ref<HTMLElement | null>(null)
    const childTwoRef = ref<HTMLElement | null>(null)
    const onBlurWithin = vi.fn()
    const onFocusWithin = vi.fn()
    const onFocusWithinChange = vi.fn()
    const onFocusWithinVisibleChange = vi.fn()
    let focusedWithin!: Ref<boolean>
    let focusVisibleWithin!: Ref<boolean>

    const TestComponent = defineComponent({
      setup() {
        const result = useFocusWithin(rootRef, {
          disabled,
          onBlurWithin,
          onFocusWithin,
          onFocusWithinChange,
          onFocusWithinVisibleChange,
        })

        focusedWithin = result.focusedWithin
        focusVisibleWithin = result.focusVisibleWithin

        return () =>
          h('div', { ref: rootRef }, [
            h('button', { ref: childOneRef }),
            h('button', { ref: childTwoRef }),
          ])
      },
    })

    const app = renderer.createApp(TestComponent)
    app.mount(root)
    await nextTick()

    return {
      childOneRef,
      childTwoRef,
      focusedWithin,
      focusVisibleWithin,
      onBlurWithin,
      onFocusWithin,
      onFocusWithinChange,
      onFocusWithinVisibleChange,
      rootRef,
      unmount: () => app.unmount(),
    }
  }

  it('enters once, ignores descendant transitions, and exits only on full leave', async () => {
    const host = await mountComposableHost()
    const childOne = host.childOneRef.value as unknown as FakeElement
    const childTwo = host.childTwoRef.value as unknown as FakeElement

    fakeDocument.activeElement = childOne
    bubbleEvent(childOne, 'focusin', createFocusEvent('focusin', childOne))
    await nextTick()

    expect(host.focusedWithin.value).toBe(true)
    expect(host.onFocusWithinChange).toHaveBeenCalledTimes(1)
    expect(host.onFocusWithinChange).toHaveBeenCalledWith(true)
    expect(host.onFocusWithin).toHaveBeenCalledTimes(1)

    fakeDocument.activeElement = childTwo
    bubbleEvent(
      childOne,
      'focusout',
      createFocusEvent('focusout', childOne, childTwo),
    )
    bubbleEvent(childTwo, 'focusin', createFocusEvent('focusin', childTwo, childOne))
    await nextTick()

    expect(host.focusedWithin.value).toBe(true)
    expect(host.onFocusWithinChange).toHaveBeenCalledTimes(1)
    expect(host.onBlurWithin).not.toHaveBeenCalled()
    expect(host.onFocusWithin).toHaveBeenCalledTimes(2)

    fakeDocument.activeElement = null
    bubbleEvent(childTwo, 'focusout', createFocusEvent('focusout', childTwo))
    await nextTick()

    expect(host.focusedWithin.value).toBe(false)
    expect(host.onBlurWithin).toHaveBeenCalledTimes(1)
    expect(host.onFocusWithinChange).toHaveBeenCalledTimes(2)
    expect(host.onFocusWithinChange).toHaveBeenLastCalledWith(false)
  })

  it('tracks focus-visible from keyboard focus and descendant keydown', async () => {
    const host = await mountComposableHost()
    const childOne = host.childOneRef.value as unknown as FakeElement

    fakeWindow.dispatch('keydown', createKeyboardEvent(childOne))
    fakeDocument.activeElement = childOne
    bubbleEvent(childOne, 'focusin', createFocusEvent('focusin', childOne))
    await nextTick()

    expect(host.focusVisibleWithin.value).toBe(true)
    expect(host.onFocusWithinVisibleChange).toHaveBeenCalledWith(true)

    fakeDocument.activeElement = null
    bubbleEvent(childOne, 'focusout', createFocusEvent('focusout', childOne))
    await nextTick()

    expect(host.focusVisibleWithin.value).toBe(false)
    expect(host.onFocusWithinVisibleChange).toHaveBeenLastCalledWith(false)
  })

  it('suppresses focus-visible for pointer-driven focus and respects disabled', async () => {
    const disabled = ref(false)
    const host = await mountComposableHost(disabled)
    const childOne = host.childOneRef.value as unknown as FakeElement

    fakeWindow.dispatch(
      'mousedown',
      {
        target: childOne,
        type: 'mousedown',
      } as Event,
    )
    fakeDocument.activeElement = childOne
    bubbleEvent(childOne, 'focusin', createFocusEvent('focusin', childOne))
    await nextTick()

    expect(host.focusVisibleWithin.value).toBe(false)
    expect(host.onFocusWithinVisibleChange).not.toHaveBeenCalledWith(true)

    disabled.value = true
    await nextTick()

    expect(host.focusedWithin.value).toBe(false)

    fakeDocument.activeElement = childOne
    bubbleEvent(childOne, 'focusin', createFocusEvent('focusin', childOne))
    await nextTick()

    expect(host.focusedWithin.value).toBe(false)
    expect(host.onFocusWithinChange).toHaveBeenCalledTimes(2)
  })

  it('cleans up state on unmount', async () => {
    const host = await mountComposableHost()
    const childOne = host.childOneRef.value as unknown as FakeElement

    fakeWindow.dispatch('keydown', createKeyboardEvent(childOne))
    fakeDocument.activeElement = childOne
    bubbleEvent(childOne, 'focusin', createFocusEvent('focusin', childOne))
    await nextTick()

    host.unmount()

    expect(host.onBlurWithin).toHaveBeenCalledTimes(1)
    expect(host.onFocusWithinChange).toHaveBeenLastCalledWith(false)
    expect(host.onFocusWithinVisibleChange).toHaveBeenLastCalledWith(false)
  })
})
