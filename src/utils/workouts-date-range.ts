/**
 * Workouts date range utilities
 */

export interface DateRange {
  from: string
  to: string
}

/**
 * Normalize date range
 */
export function normalizeRange(from: string, to: string): DateRange {
  return from <= to ? { from, to } : { from: to, to: from }
}

/**
 * Parse date string to Date object
 */
export function parseDate(dateStr: string): Date {
  return new Date(`${dateStr}T12:00:00`)
}
