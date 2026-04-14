/**
 * React source: profilePhotoUtils
 *
 * Vue-facing geometry helpers for profile photo rings and badges.
 * The React source gates thinner "seen" story rings behind MetaConfig flag 73.
 * This port fixes that branch to the current chosen behavior: flag 73 is always on.
 */

export type ProfilePhotoSize =
  | 10
  | 16
  | 20
  | 24
  | 28
  | 32
  | 36
  | 40
  | 44
  | 48
  | 52
  | 56
  | 60
  | 72
  | 80
  | 88
  | 96
  | 100
  | 112
  | 120
  | 132
  | 168

export type ProfilePhotoStoryStatus =
  | 'none'
  | 'seen'
  | 'unseen'
  | 'live'
  | 'uploading'

export type ProfilePhotoBadgeType =
  | 'availabilityBadge'
  | 'activityBadge'
  | 'lastActiveTimeBadge'
  | 'notificationBadge'
  | 'trigger'
  | string

export interface ProfilePhotoStoryRingMetrics {
  ringSize: number
}

export interface ProfilePhotoBadgeMetrics {
  badgeSize: number
  strokeWidth: number
}

const storyRingCache = new Map<string, ProfilePhotoStoryRingMetrics>()
const badgeMetricsCache = new Map<string, ProfilePhotoBadgeMetrics>()

function getStoryRingCacheKey(
  size: number,
  storyStatus: ProfilePhotoStoryStatus,
): string {
  return `${storyStatus}:${size}`
}

function getBadgeMetricsCacheKey(
  size: number,
  badgeType: ProfilePhotoBadgeType | null | undefined,
): string {
  return `${size}:${badgeType ?? 'default'}`
}

function resolveSeenRingSize(size: number): number {
  switch (size) {
    case 24:
    case 32:
    case 36:
    case 40:
      return 1
    case 48:
    case 56:
    case 60:
      return 1.5
    case 132:
    default:
      return 2
  }
}

function resolveDefaultRingSize(size: number): number {
  switch (size) {
    case 24:
    case 32:
    case 36:
    case 40:
      return 2
    case 48:
    case 56:
    case 60:
      return 3
    case 132:
    default:
      return 4
  }
}

function resolveAvailabilityBadgeMetrics(size: number): ProfilePhotoBadgeMetrics {
  switch (size) {
    case 10:
    case 16:
    case 20:
    case 24:
      return { badgeSize: 6, strokeWidth: 1.5 }
    case 28:
      return { badgeSize: 7, strokeWidth: 2 }
    case 32:
    case 36:
      return { badgeSize: 8, strokeWidth: 2 }
    case 40:
    case 44:
    case 48:
      return { badgeSize: 9, strokeWidth: 2 }
    case 52:
    case 56:
    case 60:
      return { badgeSize: 10, strokeWidth: 2 }
    case 72:
      return { badgeSize: 12, strokeWidth: 2 }
    case 80:
    case 88:
      return { badgeSize: 14, strokeWidth: 2 }
    case 96:
    case 100:
    case 112:
      return { badgeSize: 15, strokeWidth: 2 }
    case 120:
    case 132:
    case 168:
      return { badgeSize: 20, strokeWidth: 4 }
    default:
      return { badgeSize: 8, strokeWidth: 2 }
  }
}

function resolveDefaultBadgeMetrics(size: number): ProfilePhotoBadgeMetrics {
  switch (size) {
    case 10:
    case 16:
    case 20:
    case 24:
      return { badgeSize: 6, strokeWidth: 1.5 }
    case 28:
      return { badgeSize: 7, strokeWidth: 1.5 }
    case 32:
      return { badgeSize: 8, strokeWidth: 2 }
    case 36:
      return { badgeSize: 9, strokeWidth: 2 }
    case 40:
      return { badgeSize: 10, strokeWidth: 2 }
    case 44:
    case 48:
      return { badgeSize: 12, strokeWidth: 2 }
    case 52:
    case 56:
      return { badgeSize: 14, strokeWidth: 2 }
    case 60:
      return { badgeSize: 15, strokeWidth: 2 }
    case 72:
      return { badgeSize: 18, strokeWidth: 2 }
    case 80:
      return { badgeSize: 20, strokeWidth: 4 }
    case 88:
      return { badgeSize: 22, strokeWidth: 4 }
    case 96:
    case 100:
    case 112:
      return { badgeSize: 24, strokeWidth: 4 }
    case 120:
    case 132:
      return { badgeSize: 32, strokeWidth: 4 }
    case 168:
      return { badgeSize: 41, strokeWidth: 4 }
    default:
      return { badgeSize: 8, strokeWidth: 2 }
  }
}

export function getProfilePhotoStoryRingMetrics(
  size: ProfilePhotoSize | number,
  storyStatus: ProfilePhotoStoryStatus,
): ProfilePhotoStoryRingMetrics {
  const cacheKey = getStoryRingCacheKey(size, storyStatus)
  const cached = storyRingCache.get(cacheKey)

  if (cached != null) {
    return cached
  }

  let resolved: ProfilePhotoStoryRingMetrics

  if (storyStatus === 'none') {
    resolved = { ringSize: 0 }
  } else if (storyStatus === 'seen') {
    resolved = { ringSize: resolveSeenRingSize(size) }
  } else {
    resolved = { ringSize: resolveDefaultRingSize(size) }
  }

  storyRingCache.set(cacheKey, resolved)
  return resolved
}

export function getProfilePhotoBadgeMetrics(
  size: ProfilePhotoSize | number,
  badgeType?: ProfilePhotoBadgeType | null,
): ProfilePhotoBadgeMetrics {
  const cacheKey = getBadgeMetricsCacheKey(size, badgeType)
  const cached = badgeMetricsCache.get(cacheKey)

  if (cached != null) {
    return cached
  }

  const resolved = badgeType === 'availabilityBadge'
    ? resolveAvailabilityBadgeMetrics(size)
    : resolveDefaultBadgeMetrics(size)

  badgeMetricsCache.set(cacheKey, resolved)
  return resolved
}
