export interface LoadingStateRange {
  max?: number
  min?: number
}

export function getLoadingStateAriaProps(
  progress?: number | null,
  range?: LoadingStateRange,
): Record<string, string | number> {
  return progress == null
    ? {
        'aria-label': 'Loading...',
        role: 'status',
      }
    : {
        'aria-valuemax': range?.max ?? 100,
        'aria-valuemin': range?.min ?? 0,
        'aria-valuenow': progress,
        role: 'progressbar',
      }
}

export default getLoadingStateAriaProps
