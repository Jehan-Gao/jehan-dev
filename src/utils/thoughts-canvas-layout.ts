/**
 * Thoughts utilities
 */

export const THOUGHT_STICKY_NOTE_W = 200
export const THOUGHT_STICKY_NOTE_MAX_H = 500

export interface StickyNote {
  id: string
  x: number
  y: number
  width: number
  height: number
  rotateDeg: number
  tabIndex: number
}

export interface WorldBounds {
  width: number
  height: number
}

/**
 * Layout sticky notes on a virtual canvas
 */
export function layoutStickyNotes(
  thoughts: Array<{ id: string, slug: string, dateMs: number }>,
  options: { focusOrder: 'new-first' | 'old-first', containerWidth?: number } = { focusOrder: 'new-first' }
): StickyNote[] {
  const containerWidth = options.containerWidth ?? 1024
  const horizontalGap = 40
  const verticalGap = 40
  
  const sortedThoughts = [...thoughts].sort((a, b) => {
    if (options.focusOrder === 'new-first')
      return b.dateMs - a.dateMs
    return a.dateMs - b.dateMs
  })
  
  const rows: StickyNote[] = []
  let currentY = verticalGap
  let currentX = horizontalGap
  
  sortedThoughts.forEach((thought, index) => {
    // Randomize position slightly for organic feel
    const noiseX = (Math.random() - 0.5) * 40
    const noiseY = (Math.random() - 0.5) * 20
    const noiseRotate = (Math.random() - 0.5) * 10
    
    const row: StickyNote = {
      id: thought.id,
      x: currentX + noiseX,
      y: currentY + noiseY,
      width: THOUGHT_STICKY_NOTE_W,
      height: THOUGHT_STICKY_NOTE_MAX_H,
      rotateDeg: noiseRotate,
      tabIndex: index,
    }
    
    rows.push(row)
    
    currentX += THOUGHT_STICKY_NOTE_W + horizontalGap
    if (currentX + THOUGHT_STICKY_NOTE_W > containerWidth - horizontalGap) {
      currentX = horizontalGap
      currentY += THOUGHT_STICKY_NOTE_MAX_H / 2 + verticalGap
    }
  })
  
  return rows
}

/**
 * Calculate world bounds based on rows
 */
export function worldBounds(rows: StickyNote[], containerWidth?: number): WorldBounds {
  const maxColumnWidth = containerWidth ?? 1024
  const horizontalGap = 40
  const verticalGap = 40
  
  let maxRight = horizontalGap
  let maxBottom = verticalGap
  
  for (const row of rows) {
    const right = row.x + row.width
    const bottom = row.y + row.height
    
    if (right > maxRight)
      maxRight = right
    
    if (bottom > maxBottom)
      maxBottom = bottom
  }
  
  return {
    width: maxRight + horizontalGap,
    height: maxBottom + verticalGap,
  }
}
