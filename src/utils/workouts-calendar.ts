/**
 * Workouts calendar utilities
 */

export interface CalendarDay {
  date: string
  inYear: boolean
}

export interface ContributionColumn {
  date: string
  day: CalendarDay
}

/**
 * Get contribution columns for the last rolling year
 */
export function getRollingYearContributionColumns(today: Date): ContributionColumn[][] {
  const columns: ContributionColumn[][] = []
  const columnsCount = 52
  const currentDate = new Date(today)
  
  // Go back to start of year minus 52 weeks
  currentDate.setDate(today.getDate() - (columnsCount * 7))
  currentDate.setHours(0, 0, 0, 0)
  
  for (let i = 0; i < columnsCount; i++) {
    const week: ContributionColumn[] = []
    
    for (let j = 0; j < 7; j++) {
      const date = new Date(currentDate)
      date.setDate(currentDate.getDate() + j)
      
      const dateStr = formatDate(date)
      const inYear = date.getFullYear() === today.getFullYear()
      
      week.push({
        date: dateStr,
        day: {
          date: dateStr,
          inYear,
        },
      })
    }
    
    columns.push(week)
    currentDate.setDate(currentDate.getDate() + 7)
  }
  
  return columns
}

/**
 * Get rolling year window bounds
 */
export function getRollingYearWindowBounds(today: Date): { start: string, end: string } {
  const startDate = new Date(today)
  startDate.setDate(today.getDate() - 364)
  
  return {
    start: formatDate(startDate),
    end: formatDate(today),
  }
}

/**
 * Format date to YYYY-MM-DD
 */
function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}
