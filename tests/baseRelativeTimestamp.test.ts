import { describe, expect, it } from 'vitest'

import {
  getRelativeTimestamp,
  getRelativeTimestampInFuture,
} from '../src/utils/baseRelativeTimestamp'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

describe('getRelativeTimestamp', () => {
  const now = new Date('2026-04-14T12:00:00.000Z')

  it('preserves the past threshold boundaries in normal format', () => {
    expect(getRelativeTimestamp(now, new Date(now.valueOf() - 59 * SECOND))).toBe(
      'a few seconds ago',
    )
    expect(getRelativeTimestamp(now, new Date(now.valueOf() - 60 * SECOND))).toBe(
      'about a minute ago',
    )
    expect(getRelativeTimestamp(now, new Date(now.valueOf() - 59 * MINUTE))).toBe(
      '59 minutes ago',
    )
    expect(getRelativeTimestamp(now, new Date(now.valueOf() - 60 * MINUTE))).toBe(
      'about an hour ago',
    )
    expect(getRelativeTimestamp(now, new Date(now.valueOf() - 23 * HOUR))).toBe(
      '23 hours ago',
    )
    expect(getRelativeTimestamp(now, new Date(now.valueOf() - 24 * HOUR))).toBe(
      'a day ago',
    )
    expect(getRelativeTimestamp(now, new Date(now.valueOf() - 6 * DAY))).toBe(
      '6 days ago',
    )
    expect(getRelativeTimestamp(now, new Date(now.valueOf() - 7 * DAY))).toBe(
      'a week ago',
    )
    expect(getRelativeTimestamp(now, new Date(now.valueOf() - 364 * DAY))).toBe(
      '52 weeks ago',
    )
    expect(getRelativeTimestamp(now, new Date(now.valueOf() - 365 * DAY))).toBe(
      'a year ago',
    )
  })

  it('preserves shortened and minimized wording quirks', () => {
    expect(
      getRelativeTimestamp(now, new Date(now.valueOf() - 59 * SECOND), 'shortened'),
    ).toBe('Just now')
    expect(
      getRelativeTimestamp(now, new Date(now.valueOf() - 59 * SECOND), 'minimized'),
    ).toBe('1m')
    expect(
      getRelativeTimestamp(now, new Date(now.valueOf() - 60 * SECOND), 'shortened'),
    ).toBe('1 min')
    expect(
      getRelativeTimestamp(now, new Date(now.valueOf() - 2 * MINUTE), 'shortened'),
    ).toBe('2 mins')
    expect(
      getRelativeTimestamp(now, new Date(now.valueOf() - 60 * MINUTE), 'minimized'),
    ).toBe('1h')
    expect(
      getRelativeTimestamp(now, new Date(now.valueOf() - 7 * DAY), 'shortened'),
    ).toBe('1 wk')
    expect(
      getRelativeTimestamp(now, new Date(now.valueOf() - 14 * DAY), 'minimized'),
    ).toBe('2w')
    expect(
      getRelativeTimestamp(now, new Date(now.valueOf() - 365 * DAY), 'shortened'),
    ).toBe('1 yr')
  })

  it('always rounds down for past timestamps', () => {
    expect(
      getRelativeTimestamp(now, new Date(now.valueOf() - (59 * MINUTE + 59 * SECOND))),
    ).toBe('59 minutes ago')
    expect(
      getRelativeTimestamp(now, new Date(now.valueOf() - (23 * HOUR + 59 * MINUTE))),
    ).toBe('23 hours ago')
  })
})

describe('getRelativeTimestampInFuture', () => {
  const start = new Date('2026-04-14T12:00:00.000Z')

  it('preserves the future threshold boundaries in normal format', () => {
    expect(
      getRelativeTimestampInFuture(
        start,
        new Date(start.valueOf() + 59 * SECOND),
      ),
    ).toBe('in a few seconds')
    expect(
      getRelativeTimestampInFuture(
        start,
        new Date(start.valueOf() + 60 * SECOND),
      ),
    ).toBe('in about a minute')
    expect(
      getRelativeTimestampInFuture(
        start,
        new Date(start.valueOf() + 59 * MINUTE),
      ),
    ).toBe('in 59 minutes')
    expect(
      getRelativeTimestampInFuture(
        start,
        new Date(start.valueOf() + 60 * MINUTE),
      ),
    ).toBe('in about an hour')
    expect(
      getRelativeTimestampInFuture(start, new Date(start.valueOf() + 23 * HOUR)),
    ).toBe('in 23 hours')
    expect(
      getRelativeTimestampInFuture(start, new Date(start.valueOf() + 24 * HOUR)),
    ).toBe('in a day')
    expect(
      getRelativeTimestampInFuture(start, new Date(start.valueOf() + 6 * DAY)),
    ).toBe('in 6 days')
    expect(
      getRelativeTimestampInFuture(start, new Date(start.valueOf() + 7 * DAY)),
    ).toBe('in a week')
    expect(
      getRelativeTimestampInFuture(start, new Date(start.valueOf() + 364 * DAY)),
    ).toBe('in 52 weeks')
    expect(
      getRelativeTimestampInFuture(start, new Date(start.valueOf() + 365 * DAY)),
    ).toBe('in a year')
  })

  it('supports all output formats and preserves 1m vs 1 m quirks', () => {
    expect(
      getRelativeTimestampInFuture(
        start,
        new Date(start.valueOf() + 59 * SECOND),
        'minimized',
      ),
    ).toBe('1 m')
    expect(
      getRelativeTimestampInFuture(
        start,
        new Date(start.valueOf() + 59 * SECOND),
        'shortened',
      ),
    ).toBe('in a few seconds')
    expect(
      getRelativeTimestampInFuture(
        start,
        new Date(start.valueOf() + 60 * SECOND),
        'shortened',
      ),
    ).toBe('in 1 min')
    expect(
      getRelativeTimestampInFuture(
        start,
        new Date(start.valueOf() + 2 * MINUTE),
        'shortened',
      ),
    ).toBe('in 2 mins')
    expect(
      getRelativeTimestampInFuture(
        start,
        new Date(start.valueOf() + 24 * HOUR),
        'minimized',
        'roundDown',
        '24 hours',
      ),
    ).toBe('in 24h')
    expect(
      getRelativeTimestampInFuture(
        start,
        new Date(start.valueOf() + 7 * DAY),
        'shortened',
      ),
    ).toBe('in 1 wk')
    expect(
      getRelativeTimestampInFuture(
        start,
        new Date(start.valueOf() + 365 * DAY),
        'shortened',
      ),
    ).toBe('in 1 yr')
  })

  it('supports roundDown and roundUp semantics', () => {
    expect(
      getRelativeTimestampInFuture(
        start,
        new Date(start.valueOf() + 61 * SECOND),
        'normal',
        'roundDown',
      ),
    ).toBe('in about a minute')
    expect(
      getRelativeTimestampInFuture(
        start,
        new Date(start.valueOf() + 61 * SECOND),
        'normal',
        'roundUp',
      ),
    ).toBe('in 2 minutes')
    expect(
      getRelativeTimestampInFuture(
        start,
        new Date(start.valueOf() + 25 * HOUR),
        'normal',
        'roundDown',
      ),
    ).toBe('in a day')
    expect(
      getRelativeTimestampInFuture(
        start,
        new Date(start.valueOf() + 25 * HOUR),
        'normal',
        'roundUp',
      ),
    ).toBe('in 2 days')
  })

  it('keeps exact 24-hour future values in hours when requested', () => {
    expect(
      getRelativeTimestampInFuture(
        start,
        new Date(start.valueOf() + 24 * HOUR),
        'normal',
        'roundDown',
        '24 hours',
      ),
    ).toBe('in 24 hours')
    expect(
      getRelativeTimestampInFuture(
        start,
        new Date(start.valueOf() + 24 * HOUR),
        'shortened',
        'roundDown',
        '24 hours',
      ),
    ).toBe('in 24 hrs')
  })
})
