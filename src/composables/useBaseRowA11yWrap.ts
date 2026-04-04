import { ref, unref, watch } from "vue";
import type { Ref } from "vue";

/**
 * Vue 3 port of useBaseRowA11yWrap.
 *
 * When direction=forward and wrap=backward (RTL wrap trick), this composable
 * watches if the two children end up on different lines. If they do,
 * `shouldReverse` flips to true — and the parent can swap their visual order
 * so screen-reader / DOM order stays correct.
 *
 * Returns [shouldReverse, containerRef]
 */
export function useBaseRowA11yWrap(enabled: boolean | Ref<boolean>): [Ref<boolean>, Ref<HTMLElement | null>] {
  const shouldReverse = ref(false);
  const containerRef = ref<HTMLElement | null>(null);

  function checkWrap() {
    if (!unref(enabled) || !containerRef.value) {
      shouldReverse.value = false;
      return;
    }

    const children = Array.from(containerRef.value.children) as HTMLElement[];
    if (children.length < 2) {
      shouldReverse.value = false;
      return;
    }

    let prevRect: DOMRect | null = null;
    let wrapped = false;

    for (const child of children) {
      const rect = child.getBoundingClientRect();
      if (prevRect !== null) {
        const minH = Math.min(rect.height, prevRect.height);
        if (Math.abs(rect.top - prevRect.top) >= minH - 5) {
          wrapped = true;
          break;
        }
      }
      prevRect = rect;
    }

    shouldReverse.value = wrapped;
  }

  watch(
    [() => unref(enabled), containerRef],
    ([isEnabled, element], _, onCleanup) => {
      shouldReverse.value = false;

      if (!isEnabled || element == null || typeof ResizeObserver === 'undefined') {
        return;
      }

      const observer = new ResizeObserver(checkWrap);
      observer.observe(element);
      checkWrap();

      onCleanup(() => {
        observer.disconnect();
      });
    },
    {
      immediate: true,
      flush: 'post',
    },
  );

  return [shouldReverse, containerRef];
}
