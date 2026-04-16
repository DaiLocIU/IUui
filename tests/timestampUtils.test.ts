import { describe, expect, it } from 'vitest'

import {
  getAbsoluteTimestamp,
  getAbsoluteTimestampFbt,
  getTimestamp,
} from '../src/utils/timestampUtils'

const DAY = 24 * 60 * 60 * 1000
const OPTIONS = {
  locale: 'en-US',
  timeZone: 'UTC',
} as const

describe('getTimestamp', () => {
  const now = new Date('2026-04-14T12:00:00.000Z')

  it('returns today, yesterday, and tomorrow labels around the reference date', () => {
    expect(getTimestamp(now, new Date('2026-04-14T08:15:00.000Z'), OPTIONS)).toBe(
      'Today at 8:15 AM',
    )
    expect(getTimestamp(now, new Date('2026-04-13T08:15:00.000Z'), OPTIONS)).toBe(
      'Yesterday at 8:15 AM',
    )
    expect(getTimestamp(now, new Date('2026-04-15T08:15:00.000Z'), OPTIONS)).toBe(
      'Tomorrow at 8:15 AM',
    )
  })

  it('includes time for dates within 30 days and omits it at the 30-day boundary', () => {
    expect(getTimestamp(now, new Date('2026-04-01T17:45:00.000Z'), OPTIONS)).toBe(
      'April 1 at 5:45 PM',
    )
    expect(
      getTimestamp(now, new Date(now.valueOf() - 30 * DAY), OPTIONS),
    ).toBe('March 15')
  })

  it('includes the year when the target date is in a different year', () => {
    expect(
      getTimestamp(now, new Date('2025-12-31T23:15:00.000Z'), OPTIONS),
    ).toBe('December 31, 2025')
  })

  it('uses the provided timezone when deciding calendar-day labels', () => {
    const referenceDate = new Date('2026-04-14T00:30:00.000Z')
    const targetDate = new Date('2026-04-13T23:45:00.000Z')

    expect(
      getTimestamp(referenceDate, targetDate, {
        locale: 'en-US',
        timeZone: 'America/Los_Angeles',
      }),
    ).toBe('Today at 4:45 PM')
  })
})

describe('absolute timestamp helpers', () => {
  it('combines date and time text with the same template as the source utility', () => {
    expect(getAbsoluteTimestampFbt('April 14', '12:00 PM')).toBe(
      'April 14 at 12:00 PM',
    )
  })

  it('returns a fully explicit timestamp label', () => {
    expect(
      getAbsoluteTimestamp(new Date('2026-04-14T12:00:00.000Z'), OPTIONS),
    ).toBe('Tuesday, April 14, 2026 at 12:00 PM')
  })
})
