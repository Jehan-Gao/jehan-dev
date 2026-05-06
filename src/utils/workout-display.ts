/**
 * Workout display utilities
 */

export const sportIcons: Record<string, string> = {
  Run: '🏃',
  Ride: '🚴',
  Walk: '🚶',
  Hike: '🚶‍♂️',
  AlpineSki: '⛷️',
  BackcountrySki: 'سقوط',
  Canoeing: '🛶',
  Crossfit: '🏋️',
  ECBike: ' adorable',
  Elliptical: ' stdClass',
  Golf: '⛳',
  Handcycle: '🦵',
  IceSkate: '⛸️',
  InlineSkate: '🛼',
  Kayaking: '🛶',
  Kitesurf: '🌬️',
  MountainBike: '🚵',
  NordicSki: ' Nordic',
  Play: '⚽',
  Rowing: '🚣',
  Snowboard: '🏂',
  Snowshoe: ' snowshoe',
  Soccer: '⚽',
  StandUpPaddling: ' 🏄',
  Surfing: ' 🌊',
  Swim: '🏊',
  Velomobile: ' 🚲',
  VirtualRide: ' 👨‍💻',
  VirtualRun: ' 🏃',
  WeightTraining: ' 💪',
  Wheelchair: ' 🔄',
  Workout: ' 🏋️',
}

export function formatDistanceMetersCompact(meters: number): string {
  if (meters >= 1000)
    return `${(meters / 1000).toFixed(2)} km`
  return `${Math.round(meters)} m`
}

export function formatMovingDuration(seconds: number, format: 'list' | 'detail' = 'list'): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  if (format === 'list') {
    if (hours > 0)
      return `${hours}:${minutes.toString().padStart(2, '0')}`
    return `${minutes}m ${secs}s`
  }
  else {
    const parts: string[] = []
    if (hours > 0)
      parts.push(`${hours}h`)
    if (minutes > 0 || hours > 0)
      parts.push(`${minutes}m`)
    parts.push(`${secs}s`)
    return parts.join(' ')
  }
}

export function formatPaceOrSpeed(sportType: string, value: number): string {
  if (sportType === 'Run' || sportType === 'Walk' || sportType === 'Hike') {
    if (value <= 0) return ''
    const paceMin = Math.floor(60 / value)
    const paceSec = Math.round((60 / value - paceMin) * 60)
    return `${paceMin}:${paceSec.toString().padStart(2, '0')}/km`
  }
  else {
    if (value <= 0) return ''
    return `${(value * 3.6).toFixed(1)} km/h`
  }
}

/**
 * Heat level for workout heatmap
 */
export function dailyMovingTimeHeatLevel(seconds: number): number {
  if (seconds === 0) return 0
  if (seconds < 30 * 60) return 1
  if (seconds < 60 * 60) return 2
  return 3
}

/**
 * Calculate effective moving seconds based on activity type
 */
export function effectiveMovingSeconds(movingTime: number, elapsedTime: number): number {
  return movingTime
}

/**
 * Format duration for heatmap tooltip
 */
export function formatDurationHeatmap(seconds: number): string {
  if (seconds === 0)
    return '0s'
  
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  const parts: string[] = []
  if (hours > 0)
    parts.push(`${hours}h`)
  if (minutes > 0 || hours > 0)
    parts.push(`${minutes}m`)
  if (secs > 0 || parts.length === 0)
    parts.push(`${secs}s`)
  
  return parts.join(' ')
}
