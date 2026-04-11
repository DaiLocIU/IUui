import { inject, provide, type InjectionKey } from 'vue';

/**
 * Mirrors Facebook's `BaseIsDecorativeContext`.
 *
 * When a parent provides `true`, all `BaseSVGIcon` children inside that tree
 * will automatically render with `aria-hidden="true"` (unless they have an
 * explicit `alt` label, in which case the label takes precedence).
 *
 * Usage:
 *   // Provider (e.g. a button that already has a visible label)
 *   provideBaseIsDecorativeContext(true)
 *
 *   // Consumer (BaseSVGIcon reads this automatically)
 *   const isDecorative = useBaseIsDecorativeContext()  // → true | false | undefined
 */

export const BaseIsDecorativeContextKey: InjectionKey<boolean> =
  Symbol('BaseIsDecorativeContext');

/** Call inside a component's setup() to mark all descendant icons as decorative. */
export function provideBaseIsDecorativeContext(value: boolean): void {
  provide(BaseIsDecorativeContextKey, value);
}

/**
 * Returns the current decorative context value.
 * `undefined` means no parent has set the context (treat as non-decorative).
 */
export function useBaseIsDecorativeContext(): boolean | undefined {
  return inject(BaseIsDecorativeContextKey, undefined);
}
