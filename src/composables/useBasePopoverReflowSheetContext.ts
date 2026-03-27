import { inject, provide, type InjectionKey, ref, type Ref } from 'vue';

export interface PopoverReflowSheetContext {
  isReflowSheet: Ref<boolean>;
}

export const BasePopoverReflowSheetContextKey: InjectionKey<PopoverReflowSheetContext> = Symbol('BasePopoverReflowSheetContext');

export function provideBasePopoverReflowSheetContext(context: PopoverReflowSheetContext) {
  provide(BasePopoverReflowSheetContextKey, context);
}

export function useBasePopoverReflowSheetContext() {
  return inject(BasePopoverReflowSheetContextKey, { isReflowSheet: ref(false) });
}
