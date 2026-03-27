import { Ref } from 'vue';

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
export declare function useBaseRowA11yWrap(enabled: boolean): [Ref<boolean>, Ref<HTMLElement | null>];
