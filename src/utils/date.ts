/**
 * Format date to YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

/**
 * Parse date string to Date object (local time)
 */
export function parseDate(dateStr: string): Date {
  return new Date(`${dateStr}T12:00:00`)
}

/**
 * Get current date as YYYY-MM-DD string
 */
export function getTodayStr(): string {
  return formatDate(new Date())
}
