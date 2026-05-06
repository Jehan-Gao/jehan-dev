import { fnv1a32 } from './fnv1a32'

export interface ThoughtLayoutInput {
  id: string
  slug: string
  dateMs: number
}

export interface ThoughtLayoutRow {
  slug: string
  bandIndex: number
  bandKey: string
  x: number
  y: number
  rotateDeg: number
  tabIndex: number
}

export interface LayoutOptions {
  focusOrder?: 'new-first' | 'old-first'
  containerWidth?: number
}

const PAD_X = 16
const PAD_Y = 48
const NOTE_W = 300
const NOTE_MAX_H = 480
const BAND_H = NOTE_MAX_H + PAD_Y + 72

export const THOUGHT_LAYOUT_CONTAINER_W = 1120

function unitFloat(seed: string, salt: string): number {
  const h = fnv1a32(`${seed}\0${salt}`)
  return (h % 10_000) / 10_000
}

function calendarYear(ms: number): number {
  return new Date(ms).getUTCFullYear()
}

export function layoutStickyNotes(
  inputs: ThoughtLayoutInput[],
  options: LayoutOptions = {},
): ThoughtLayoutRow[] {
  const focusOrder = options.focusOrder ?? 'new-first'
  const byYear = new Map<number, ThoughtLayoutInput[]>()
  for (const t of inputs) {
    const y = calendarYear(t.dateMs)
    if (!byYear.has(y))
      byYear.set(y, [])
    byYear.get(y)!.push(t)
  }
  const yearsAsc = [...byYear.keys()].sort((a, b) => a - b)
  const yearRank = new Map<number, number>()
  yearsAsc.forEach((y, i) => yearRank.set(y, i))

  const rows: ThoughtLayoutRow[] = []
  const containerW = options.containerWidth ?? THOUGHT_LAYOUT_CONTAINER_W
  const xSpread = Math.max(0, containerW - NOTE_W - 2 * PAD_X)
  for (const t of inputs) {
    const y = calendarYear(t.dateMs)
    const bandIndex = yearRank.get(y) ?? 0
    const bandKey = String(y)
    const u = unitFloat(t.slug, 'x')
    const v = unitFloat(t.slug, 'y')
    const x = PAD_X + u * xSpread
    const yPx = PAD_Y + bandIndex * BAND_H + v * (BAND_H - NOTE_MAX_H - PAD_Y)
    const rot = (unitFloat(t.slug, 'rot') - 0.5) * 26
    rows.push({
      slug: t.slug,
      bandIndex,
      bandKey,
      x,
      y: yPx,
      rotateDeg: rot,
      tabIndex: 0,
    })
  }

  const chron = [...inputs].sort((a, b) => a.dateMs - b.dateMs)
  const order = focusOrder === 'new-first' ? [...chron].reverse() : chron
  const rowMap = new Map(rows.map(r => [r.slug, r]))
  order.forEach((t, i) => {
    const row = rowMap.get(t.slug)
    if (row)
      row.tabIndex = 10 + i
  })

  return rows
}

export const THOUGHT_STICKY_NOTE_W = NOTE_W
export const THOUGHT_STICKY_NOTE_MAX_H = NOTE_MAX_H

export function worldBounds(rows: ThoughtLayoutRow[], containerWidth = THOUGHT_LAYOUT_CONTAINER_W): { width: number, height: number } {
  if (rows.length === 0)
    return { width: containerWidth, height: PAD_Y * 2 + BAND_H }
  let maxX = 0
  let maxY = 0
  let maxBand = 0
  for (const r of rows) {
    maxX = Math.max(maxX, r.x + NOTE_W)
    maxY = Math.max(maxY, r.y + NOTE_MAX_H)
    maxBand = Math.max(maxBand, r.bandIndex)
  }
  const minH = PAD_Y + (maxBand + 1) * BAND_H + PAD_Y
  return {
    width: Math.max(containerWidth, maxX + PAD_X),
    height: Math.max(minH, maxY + PAD_Y),
  }
}