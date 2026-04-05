import type { InjectionKey, Ref } from 'vue'

export const LINK_DEFAULT_TARGET_KEY: InjectionKey<Ref<string | undefined> | undefined> =
  Symbol('BaseLinkDefaultTarget')

export const NESTED_LINK_KEY: InjectionKey<boolean | undefined> =
  Symbol('BaseLinkNested')
