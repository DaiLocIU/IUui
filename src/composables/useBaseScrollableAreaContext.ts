import { inject, provide, type InjectionKey } from 'vue';

export interface ScrollableAreaContextItem {
  getDOMNode: () => HTMLElement | null;
}

export const BaseScrollableAreaContextKey: InjectionKey<ScrollableAreaContextItem[]> = Symbol('BaseScrollableAreaContext');

export function provideBaseScrollableAreaContext(context: ScrollableAreaContextItem[]) {
  provide(BaseScrollableAreaContextKey, context);
}

export function useBaseScrollableAreaContext() {
  return inject(BaseScrollableAreaContextKey, []);
}
