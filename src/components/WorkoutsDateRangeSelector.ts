import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import {
  clampToMax,
  formatRangeLabel,
  formatYmd,
  normalizeRange,
  parseYmd,
  rangeCurrentMonth,
  rangeCurrentWeek,
  rangePreviousMonth,
  YMD,
} from '../utils/workouts-date-range'

interface RangeSnapshot { from: string, to: string, awaiting: boolean }

export function initWorkoutsDateRange(root: HTMLElement): void {
  const listSel = root.dataset.selectorList || '#activity-list'
  const countSel = root.dataset.selectorCount || '#activity-count'
  const emptySel = root.dataset.selectorEmpty || '#empty-state'
  const todayCap = root.dataset.today || ''

  const popover = root.querySelector<HTMLElement>('[data-dr-popover]')
  const trigger = root.querySelector<HTMLButtonElement>('[data-dr-trigger]')
  const labelEl = root.querySelector<HTMLElement>('[data-dr-label]')
  const clearBtn = root.querySelector<HTMLButtonElement>('[data-dr-clear]')
  const monthLabel = root.querySelector<HTMLElement>('[data-dr-month-label]')
  const monthPrev = root.querySelector<HTMLButtonElement>('[data-dr-month-prev]')
  const monthNext = root.querySelector<HTMLButtonElement>('[data-dr-month-next]')
  const grid = root.querySelector<HTMLElement>('[data-dr-grid]')

  const items = document.querySelectorAll(`${listSel} > li`)
  const activityCount = document.querySelector(countSel)
  const emptyState = document.querySelector(emptySel)
  const total = items.length

  if (
    !popover || !trigger || !labelEl || !clearBtn || !monthLabel
    || !monthPrev || !monthNext || !grid || !activityCount || !emptyState
  ) {
    return
  }

  const dom = {
    popover, trigger, labelEl, clearBtn, monthLabel,
    monthPrev, monthNext, grid, activityCount, emptyState,
  }

  let viewMonth = startOfMonth(new Date())
  let rangeFrom = ''
  let rangeTo = ''
  let awaitingTo = false

  let openSnapshot: RangeSnapshot = { from: '', to: '', awaiting: false }

  function readUrlRange(): { from: string, to: string } {
    const params = new URLSearchParams(window.location.search)
    const qFrom = params.get('from')
    const qTo = params.get('to')
    if (qFrom && qTo && YMD.test(qFrom) && YMD.test(qTo))
      return normalizeRange(qFrom, qTo)
    const dFrom = root.dataset.initialFrom || ''
    const dTo = root.dataset.initialTo || ''
    if (dFrom && dTo && YMD.test(dFrom) && YMD.test(dTo))
      return normalizeRange(dFrom, dTo)
    return { from: '', to: '' }
  }

  function applyFilter(from: string | null, to: string | null): void {
    let visible = 0
    items.forEach((li) => {
      const row = li as HTMLElement
      const date = row.getAttribute('data-date')
      if (!from || !to || (date && date >= from && date <= to)) {
        row.style.display = ''
        visible++
      }
      else {
        row.style.display = 'none'
      }
    })
    const n = from ? visible : total
    dom.activityCount.textContent = n === 0
      ? 'No activities'
      : n === 1
        ? '1 activity'
        : `${n} activities`
    dom.emptyState.classList.toggle('hidden', visible > 0)
  }

  function syncUrl(from: string, to: string): void {
    if (from && to)
      history.replaceState(null, '', `?from=${from}&to=${to}`)
    else
      history.replaceState(null, '', window.location.pathname)
  }

  function updateTriggerEmptyState(): void {
    dom.trigger.dataset.empty = !rangeFrom || !rangeTo ? 'true' : 'false'
    dom.labelEl.textContent = formatRangeLabel(rangeFrom, rangeTo)
  }

  function applySnapshot(s: RangeSnapshot): void {
    rangeFrom = s.from
    rangeTo = s.to
    awaitingTo = s.awaiting
    if (!rangeFrom) {
      applyFilter(null, null)
      syncUrl('', '')
    }
    else if (awaitingTo) {
      applyFilter(rangeFrom, rangeFrom)
      syncUrl(rangeFrom, rangeFrom)
    }
    else {
      const n = normalizeRange(rangeFrom, rangeTo)
      applyFilter(n.from, n.to)
      syncUrl(n.from, n.to)
    }
    updateTriggerEmptyState()
    renderCalendar()
  }

  function setRange(from: string, to: string): void {
    const n = normalizeRange(from, to)
    let f = n.from
    let t = n.to
    if (todayCap && f) f = clampToMax(f, todayCap)
    if (todayCap && t) t = clampToMax(t, todayCap)
    if (f && t && f > t) { const x = f; f = t; t = x }
    rangeFrom = f
    rangeTo = t
    awaitingTo = Boolean(f && !t)

    if (f && t) {
      applyFilter(f, t)
      syncUrl(f, t)
    }
    else {
      applyFilter(null, null)
      syncUrl('', '')
    }
    updateTriggerEmptyState()
    renderCalendar()
  }

  function closePopover(): void {
    try {
      const p = dom.popover
      if ('hidePopover' in p && typeof p.hidePopover === 'function')
        p.hidePopover()
    }
    catch { /* noop */ }
  }

  function positionPopoverNearTrigger(): void {
    const t = dom.trigger.getBoundingClientRect()
    const pad = 8
    const panelWidth = Math.min(window.innerWidth - 32, 20 * 16)
    let left = t.left
    const top = t.bottom + pad
    const maxLeft = window.innerWidth - panelWidth - 16
    if (left > maxLeft) left = Math.max(16, maxLeft)
    if (left < 16) left = 16
    dom.popover.style.top = `${top}px`
    dom.popover.style.left = `${left}px`
  }

  function onRepositionPopover(): void {
    if (dom.popover.matches(':popover-open'))
      positionPopoverNearTrigger()
  }

  function onEscape(ev: KeyboardEvent): void {
    if (ev.key !== 'Escape') return
    if (!dom.popover.matches(':popover-open')) return
    ev.preventDefault()
    applySnapshot(openSnapshot)
    closePopover()
  }

  function updatePresetActiveIndicators(): void {
    const capStr = todayCap || formatYmd(new Date())
    const weekR = rangeCurrentWeek(capStr)
    const monthR = rangeCurrentMonth(capStr)
    const prevR = rangePreviousMonth(capStr)
    const canMatch = !awaitingTo && Boolean(rangeFrom && rangeTo)
    const cur = canMatch ? normalizeRange(rangeFrom, rangeTo) : { from: '', to: '' }

    root.querySelectorAll<HTMLButtonElement>('[data-dr-preset]').forEach((btn) => {
      const kind = btn.dataset.drPreset
      let match = false
      if (canMatch) {
        if (kind === 'week') match = cur.from === weekR.from && cur.to === weekR.to
        else if (kind === 'month') match = cur.from === monthR.from && cur.to === monthR.to
        else if (kind === 'prev-month') match = cur.from === prevR.from && cur.to === prevR.to
      }
      btn.dataset.active = match ? 'true' : 'false'
    })
  }

  function renderCalendar(): void {
    if (!grid) return
    grid.innerHTML = ''
    const ref = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1)
    const monthStart = startOfMonth(ref)
    const monthEnd = endOfMonth(ref)
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 })
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })
    const days = eachDayOfInterval({ start: gridStart, end: gridEnd })

    dom.monthLabel.textContent = format(ref, 'MMMM yyyy')

    for (const day of days) {
      const ymd = formatYmd(day)
      const inMonth = day.getMonth() === ref.getMonth()
      const isToday = ymd === (todayCap || formatYmd(new Date()))
      const isFuture = todayCap ? ymd > todayCap : false
      const isSelected = rangeFrom && rangeTo
        ? ymd >= rangeFrom && ymd <= rangeTo
        : rangeFrom === ymd
      const isStart = rangeFrom === ymd
      const isEnd = (rangeTo || rangeFrom) === ymd

      const btn = document.createElement('button')
      btn.type = 'button'
      btn.textContent = String(day.getDate())
      btn.className = [
        'flex size-7 items-center justify-center rounded-none font-mono text-xs transition-colors',
        inMonth ? 'text-gray-900' : 'text-gray-300',
        isFuture ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
        isSelected && !isStart && !isEnd ? 'bg-gray-100' : '',
        isStart || isEnd ? 'bg-gray-900 text-white font-medium' : '',
        isToday && !isStart && !isEnd ? 'ring-1 ring-gray-400 ring-inset' : '',
        !isSelected && !isFuture ? 'hover:bg-gray-50' : '',
      ].filter(Boolean).join(' ')

      if (!isFuture) {
        btn.addEventListener('click', () => {
          if (!rangeFrom || (rangeFrom && rangeTo)) {
            setRange(ymd, '')
          }
          else {
            setRange(rangeFrom, ymd)
          }
        })
      }
      else {
        btn.disabled = true
      }

      grid.appendChild(btn)
    }

    updatePresetActiveIndicators()
  }

  // Presets
  root.querySelectorAll<HTMLButtonElement>('[data-dr-preset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const capStr = todayCap || formatYmd(new Date())
      const kind = btn.dataset.drPreset
      let r: { from: string, to: string }
      if (kind === 'week') r = rangeCurrentWeek(capStr)
      else if (kind === 'month') r = rangeCurrentMonth(capStr)
      else if (kind === 'prev-month') r = rangePreviousMonth(capStr)
      else return
      setRange(r.from, r.to)
    })
  })

  // Month navigation
  dom.monthPrev.addEventListener('click', () => {
    viewMonth = addMonths(viewMonth, -1)
    renderCalendar()
  })
  dom.monthNext.addEventListener('click', () => {
    viewMonth = addMonths(viewMonth, 1)
    renderCalendar()
  })

  // Clear
  dom.clearBtn.addEventListener('click', () => {
    setRange('', '')
    closePopover()
  })

  // Popover events
  dom.popover.addEventListener('toggle', (e) => {
    if ((e as ToggleEvent).newState === 'open') {
      openSnapshot = { from: rangeFrom, to: rangeTo, awaiting: awaitingTo }
      const url = readUrlRange()
      if (url.from) {
        viewMonth = parseYmd(url.from) ?? new Date()
      }
      else {
        viewMonth = startOfMonth(new Date())
      }
      renderCalendar()
      positionPopoverNearTrigger()
    }
  })

  // Init from URL
  const url = readUrlRange()
  if (url.from && url.to) {
    rangeFrom = url.from
    rangeTo = url.to
    awaitingTo = false
    updateTriggerEmptyState()
    applyFilter(url.from, url.to)
  }

  window.addEventListener('resize', onRepositionPopover)
  window.addEventListener('keydown', onEscape)
}
