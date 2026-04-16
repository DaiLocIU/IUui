export interface TimestampFormatOptions {
  locale?: string
  timeZone?: string
}

const DAY_IN_MS = 24 * 60 * 60 * 1000
const THIRTY_DAYS_IN_MS = DAY_IN_MS * 30
const DEFAULT_LOCALE = 'en-US'

function assertValidDate(value: Date, label: string): void {
  if (Number.isNaN(value.getTime())) {
    throw new TypeError(`${label} must be a valid Date`)
  }
}

function normalizeOptions(
  options: TimestampFormatOptions = {},
): Required<TimestampFormatOptions> {
  return {
    locale: options.locale ?? DEFAULT_LOCALE,
    timeZone: options.timeZone ?? '',
  }
}

function getDateTimeFormatOptions(
  timeZone: string,
  extra: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormatOptions {
  return timeZone ? { ...extra, timeZone } : extra
}

function formatTime(date: Date, options: Required<TimestampFormatOptions>): string {
  return new Intl.DateTimeFormat(
    options.locale,
    getDateTimeFormatOptions(options.timeZone, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }),
  ).format(date)
}

function formatMonthDay(
  date: Date,
  options: Required<TimestampFormatOptions>,
): string {
  return new Intl.DateTimeFormat(
    options.locale,
    getDateTimeFormatOptions(options.timeZone, {
      month: 'long',
      day: 'numeric',
    }),
  ).format(date)
}

function formatMonthDayYear(
  date: Date,
  options: Required<TimestampFormatOptions>,
): string {
  return new Intl.DateTimeFormat(
    options.locale,
    getDateTimeFormatOptions(options.timeZone, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
  ).format(date)
}

function formatWeekdayMonthDayYear(
  date: Date,
  options: Required<TimestampFormatOptions>,
): string {
  return new Intl.DateTimeFormat(
    options.locale,
    getDateTimeFormatOptions(options.timeZone, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
  ).format(date)
}

function getCalendarDayKey(
  date: Date,
  options: Required<TimestampFormatOptions>,
): string {
  if (!options.timeZone) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const formatter = new Intl.DateTimeFormat(
    options.locale,
    getDateTimeFormatOptions(options.timeZone, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
  )

  const parts = formatter.formatToParts(date)
  const year = parts.find((part) => part.type === 'year')?.value
  const month = parts.find((part) => part.type === 'month')?.value
  const day = parts.find((part) => part.type === 'day')?.value

  return `${year}-${month}-${day}`
}

function isSameCalendarDay(
  first: Date,
  second: Date,
  options: Required<TimestampFormatOptions>,
): boolean {
  return getCalendarDayKey(first, options) === getCalendarDayKey(second, options)
}

export function getAbsoluteTimestampFbt(dateText: string, timeText: string): string {
  return `${dateText} at ${timeText}`
}

export function getTimestamp(
  referenceDate: Date,
  targetDate: Date,
  rawOptions: TimestampFormatOptions = {},
): string {
  assertValidDate(referenceDate, 'referenceDate')
  assertValidDate(targetDate, 'targetDate')

  const options = normalizeOptions(rawOptions)
  const time = formatTime(targetDate, options)

  if (isSameCalendarDay(targetDate, referenceDate, options)) {
    return `Today at ${time}`
  }

  const previousDay = new Date(referenceDate.valueOf() - DAY_IN_MS)
  if (isSameCalendarDay(targetDate, previousDay, options)) {
    return `Yesterday at ${time}`
  }

  const nextDay = new Date(referenceDate.valueOf() + DAY_IN_MS)
  if (isSameCalendarDay(targetDate, nextDay, options)) {
    return `Tomorrow at ${time}`
  }

  const referenceYear = getCalendarDayKey(referenceDate, options).slice(0, 4)
  const targetYear = getCalendarDayKey(targetDate, options).slice(0, 4)
  const dateLabel =
    referenceYear === targetYear
      ? formatMonthDay(targetDate, options)
      : formatMonthDayYear(targetDate, options)

  if (Math.abs(referenceDate.valueOf() - targetDate.valueOf()) < THIRTY_DAYS_IN_MS) {
    return getAbsoluteTimestampFbt(dateLabel, time)
  }

  return dateLabel
}

export function getAbsoluteTimestamp(
  date: Date,
  rawOptions: TimestampFormatOptions = {},
): string {
  assertValidDate(date, 'date')

  const options = normalizeOptions(rawOptions)
  return getAbsoluteTimestampFbt(
    formatWeekdayMonthDayYear(date, options),
    formatTime(date, options),
  )
}
