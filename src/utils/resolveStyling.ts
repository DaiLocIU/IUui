import type { CSSProperties, StyleValue } from 'vue'
import type { ClassLike, StyleCapableValue } from '../components/WebPressable/types'

export type { ClassLike, StyleCapableValue } from '../components/WebPressable/types'

interface StylexTokenObject {
  $$css: true
  [key: string]: unknown
}

type ResolvableStylingValue =
  | StyleCapableValue
  | StylexTokenObject
  | Array<ResolvableStylingValue | undefined | null | false>
  | undefined
  | null
  | false

export interface ResolvedStyling {
  className: Array<ClassLike>
  style: StyleValue[]
}

const STYLEX_TOKEN_CLASS_MAP: Record<string, string> = {
  x10b6aqq: '[padding-bottom:6px]',
  x12pbpz1: '[padding-top:var(--x-paddingBlock)]',
  x1lliihq: 'block',
  x1gtkyd9: '[padding-bottom:var(--x-paddingBlock)]',
  x1icxu4v: '[padding-inline-end:6px]',
  x1r8uycs: '[row-gap:var(--x-rowGap)]',
  x1tr5nd9: '[padding-inline-start:var(--x-paddingInline)]',
  x1ws5yxj: '[margin-inline-end:-6px]',
  x1yrsyyn: '[padding-top:6px]',
  x25sj25: '[padding-inline-start:6px]',
  x3su7b9: '[padding-inline-end:var(--x-paddingInline)]',
  x4cne27: '[margin-bottom:-6px]',
  xbktkl8: 'min-h-[56px]',
  xp1r0qw: 'gap-y-[12px]',
  xw01apr: '[margin-inline-start:-6px]',
  xsag5q8: '[padding-bottom:12px]',
  xz9dl7a: '[padding-top:12px]',
  xifccgj: '[margin-top:-6px]',
}

const isStylexToken = (value: string): boolean => /^x[a-z0-9]+$/i.test(value)

const isBooleanRecord = (value: Record<string, unknown>): boolean =>
  Object.values(value).every((entry) => typeof entry === 'boolean')

const resolveStylexValue = (value: unknown): string | number | undefined => {
  if (value == null || value === false || value === '') {
    return undefined
  }

  if (typeof value === 'number') {
    return value
  }

  if (typeof value !== 'string') {
    return undefined
  }

  const mappedValue = STYLEX_TOKEN_CLASS_MAP[value]

  if (mappedValue != null) {
    return mappedValue
  }

  if (isStylexToken(value)) {
    return undefined
  }

  return value
}

const isStylexObject = (value: Record<string, unknown>): value is StylexTokenObject =>
  value.$$css === true

const resolveStylexObject = (value: StylexTokenObject): ResolvedStyling => {
  const className: Array<ClassLike> = []
  const resolvedEntries = Object.entries(value).flatMap(([key, entryValue]) => {
    if (key === '$$css') {
      return []
    }

    if (typeof entryValue === 'string') {
      const mappedClassName = STYLEX_TOKEN_CLASS_MAP[entryValue]

      if (mappedClassName != null) {
        className.push(mappedClassName)
        return []
      }
    }

    const resolvedValue = resolveStylexValue(entryValue)

    return resolvedValue == null
      ? []
      : [[key, resolvedValue] as const]
  })

  const style = resolvedEntries.length === 0
    ? null
    : Object.fromEntries(resolvedEntries) as CSSProperties

  return {
    className,
    style: style == null ? [] : [style],
  }
}

const looksLikeStyleObject = (value: Record<string, unknown>): boolean => {
  if (Object.keys(value).length === 0) {
    return false
  }

  if (Object.keys(value).some((key) => key.startsWith('--') || key.includes('-'))) {
    return true
  }

  return !isBooleanRecord(value)
}

const pushResolvedStyling = (
  value: ResolvableStylingValue,
  className: Array<ClassLike>,
  style: StyleValue[],
): void => {
  if (value == null || value === false) {
    return
  }

  if (Array.isArray(value)) {
    value.forEach((entry) => pushResolvedStyling(entry, className, style))
    return
  }

  if (typeof value === 'string') {
    className.push(value)
    return
  }

  if (typeof value === 'object') {
    if (isStylexObject(value as Record<string, unknown>)) {
      const resolvedStylexObject = resolveStylexObject(value as StylexTokenObject)

      className.push(...resolvedStylexObject.className)
      style.push(...resolvedStylexObject.style)

      return
    }

    if (looksLikeStyleObject(value as Record<string, unknown>)) {
      style.push(value as CSSProperties)
      return
    }

    className.push(value as Record<string, boolean>)
  }
}

export const resolveStyling = (...values: StyleCapableValue[]): ResolvedStyling => {
  const className: Array<ClassLike> = []
  const style: StyleValue[] = []

  values.forEach((value) => pushResolvedStyling(value, className, style))

  return {
    className,
    style,
  }
}
