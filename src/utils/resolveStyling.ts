import type { CSSProperties, StyleValue } from 'vue'
import type { ClassLike, StyleCapableValue } from '../components/WebPressable/types'

export type { ClassLike, StyleCapableValue } from '../components/WebPressable/types'

type ResolvableStylingValue =
  | StyleCapableValue
  | Array<ResolvableStylingValue | undefined | null | false>
  | undefined
  | null
  | false

export interface ResolvedStyling {
  className: Array<ClassLike>
  style: StyleValue[]
}

const isBooleanRecord = (value: Record<string, unknown>): boolean =>
  Object.values(value).every((entry) => typeof entry === 'boolean')

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
