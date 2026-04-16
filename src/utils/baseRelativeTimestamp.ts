export type RelativeTimestampFormat = 'normal' | 'shortened' | 'minimized'
export type RelativeTimestampRounding = 'roundDown' | 'roundUp'
export type RelativeTimestampDayMode = '1 day' | '24 hours'

const SECONDS_PER_MINUTE = 60
const MINUTES_PER_HOUR = 60
const HOURS_PER_DAY = 24
const DAYS_PER_WEEK = 7
const DAYS_PER_YEAR = 365

function formatPastSeconds(format: RelativeTimestampFormat): string {
  if (format === 'minimized') {
    return '1m'
  }

  if (format === 'shortened') {
    return 'Just now'
  }

  return 'a few seconds ago'
}

function formatFutureSeconds(format: RelativeTimestampFormat): string {
  if (format === 'minimized') {
    return '1 m'
  }

  return 'in a few seconds'
}

function formatPastMinutes(
  value: number,
  format: RelativeTimestampFormat,
): string {
  if (format === 'minimized') {
    return `${value}m`
  }

  if (format === 'shortened') {
    return value === 1 ? '1 min' : `${value} mins`
  }

  return value === 1 ? 'about a minute ago' : `${value} minutes ago`
}

function formatFutureMinutes(
  value: number,
  format: RelativeTimestampFormat,
): string {
  if (format === 'minimized') {
    return `in ${value}m`
  }

  if (format === 'shortened') {
    return value === 1 ? 'in 1 min' : `in ${value} mins`
  }

  return value === 1 ? 'in about a minute' : `in ${value} minutes`
}

function formatPastHours(value: number, format: RelativeTimestampFormat): string {
  if (format === 'minimized') {
    return `${value}h`
  }

  if (format === 'shortened') {
    return value === 1 ? '1 hr' : `${value} hrs`
  }

  return value === 1 ? 'about an hour ago' : `${value} hours ago`
}

function formatFutureHours(
  value: number,
  format: RelativeTimestampFormat,
): string {
  if (format === 'minimized') {
    return `in ${value}h`
  }

  if (format === 'shortened') {
    return value === 1 ? 'in 1 hr' : `in ${value} hrs`
  }

  return value === 1 ? 'in about an hour' : `in ${value} hours`
}

function formatPastDays(value: number, format: RelativeTimestampFormat): string {
  if (format === 'minimized') {
    return `${value}d`
  }

  if (format === 'shortened') {
    return value === 1 ? '1 day' : `${value} days`
  }

  return value === 1 ? 'a day ago' : `${value} days ago`
}

function formatFutureDays(
  value: number,
  format: RelativeTimestampFormat,
): string {
  if (format === 'minimized') {
    return `in ${value}d`
  }

  if (format === 'shortened') {
    return value === 1 ? 'in 1 day' : `in ${value} days`
  }

  return value === 1 ? 'in a day' : `in ${value} days`
}

function formatPastWeeks(value: number, format: RelativeTimestampFormat): string {
  if (format === 'minimized') {
    return `${value}w`
  }

  if (format === 'shortened') {
    return value === 1 ? '1 wk' : `${value} wks`
  }

  return value === 1 ? 'a week ago' : `${value} weeks ago`
}

function formatFutureWeeks(
  value: number,
  format: RelativeTimestampFormat,
): string {
  if (format === 'minimized') {
    return `in ${value}w`
  }

  if (format === 'shortened') {
    return value === 1 ? 'in 1 wk' : `in ${value} wks`
  }

  return value === 1 ? 'in a week' : `in ${value} weeks`
}

function formatPastYears(value: number, format: RelativeTimestampFormat): string {
  if (format === 'minimized') {
    return `${value}y`
  }

  if (format === 'shortened') {
    return value === 1 ? '1 yr' : `${value} yrs`
  }

  return value === 1 ? 'a year ago' : `${value} years ago`
}

function formatFutureYears(
  value: number,
  format: RelativeTimestampFormat,
): string {
  if (format === 'minimized') {
    return `in ${value}y`
  }

  if (format === 'shortened') {
    return value === 1 ? 'in 1 yr' : `in ${value} yrs`
  }

  return value === 1 ? 'in a year' : `in ${value} years`
}

export function getRelativeTimestamp(
  now: Date,
  date: Date,
  format: RelativeTimestampFormat = 'normal',
): string {
  const seconds = (now.valueOf() - date.valueOf()) / 1000

  if (seconds < SECONDS_PER_MINUTE) {
    return formatPastSeconds(format)
  }

  const minutes = seconds / SECONDS_PER_MINUTE
  const wholeMinutes = Math.floor(minutes)

  if (wholeMinutes < MINUTES_PER_HOUR) {
    return formatPastMinutes(wholeMinutes, format)
  }

  const hours = minutes / MINUTES_PER_HOUR
  const wholeHours = Math.floor(hours)

  if (wholeHours < HOURS_PER_DAY) {
    return formatPastHours(wholeHours, format)
  }

  const days = hours / HOURS_PER_DAY
  const wholeDays = Math.floor(days)

  if (wholeDays < DAYS_PER_WEEK) {
    return formatPastDays(wholeDays, format)
  }

  if (days < DAYS_PER_YEAR) {
    return formatPastWeeks(Math.floor(days / DAYS_PER_WEEK), format)
  }

  return formatPastYears(Math.floor(days / DAYS_PER_YEAR), format)
}

export function getRelativeTimestampInFuture(
  start: Date,
  end: Date,
  format: RelativeTimestampFormat = 'normal',
  rounding: RelativeTimestampRounding = 'roundDown',
  dayMode: RelativeTimestampDayMode = '1 day',
): string {
  const seconds = (end.valueOf() - start.valueOf()) / 1000

  if (seconds < SECONDS_PER_MINUTE) {
    return formatFutureSeconds(format)
  }

  const round = rounding === 'roundDown' ? Math.floor : Math.ceil
  const minutes = seconds / SECONDS_PER_MINUTE
  const wholeMinutes = round(minutes)

  if (wholeMinutes < MINUTES_PER_HOUR) {
    return formatFutureMinutes(wholeMinutes, format)
  }

  const hours = minutes / MINUTES_PER_HOUR
  const wholeHours = round(hours)

  if (
    wholeHours < HOURS_PER_DAY ||
    (dayMode === '24 hours' && wholeHours === HOURS_PER_DAY)
  ) {
    return formatFutureHours(wholeHours, format)
  }

  const days = hours / HOURS_PER_DAY
  const wholeDays = round(days)

  if (wholeDays < DAYS_PER_WEEK) {
    return formatFutureDays(wholeDays, format)
  }

  if (days < DAYS_PER_YEAR) {
    return formatFutureWeeks(round(days / DAYS_PER_WEEK), format)
  }

  return formatFutureYears(round(days / DAYS_PER_YEAR), format)
}
