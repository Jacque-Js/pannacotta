import { useEffect, useState } from 'react'
import { energyShares, macros, type Nutrition } from '../data/menu'

/** Строка под названием блюда: «617 ккал» и тонкая полоска — из чего состоят калории. */
export function NutritionMini({ n }: { n?: Nutrition }) {
  if (!n) return null
  const shares = energyShares(n)
  return (
    <div className="mt-1.5">
      <span className="text-[12px] font-semibold text-ink-2">{n.kcal} ккал</span>
      <div className="mt-1 flex h-[3px] gap-[2px] overflow-hidden rounded-full" aria-hidden>
        {shares.map((s, i) => (
          <span key={macros[i].key} className="rounded-full" style={{ flexGrow: s, background: macros[i].color }} />
        ))}
      </div>
      <div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-0.5 text-[10.5px] tabular-nums text-muted">
        {macros.map((m) => (
          <span key={m.key} className="flex items-center gap-1 whitespace-nowrap" title={m.label}>
            <span className="size-1.5 rounded-full" style={{ background: m.color }} />
            {m.short} {n[m.key]}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Компактный бейдж калорийности — для миниатюр и строк списка. */
export function KcalBadge({ n }: { n?: Nutrition }) {
  if (!n) return null
  return <span className="text-[12px] font-semibold text-ink-2">{n.kcal} ккал</span>
}

const R = 46
const C = 2 * Math.PI * R

/**
 * Пищевая ценность порции: кольцо с калориями (сегменты — доля энергии из белков, жиров и углеводов)
 * и три строки с граммами. Без данных — аккуратная пометка «уточняется».
 */
export function NutritionPanel({ n }: { n?: Nutrition }) {
  // Кольцо и полоски «дорисовываются» после появления страницы
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const t = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)))
    return () => cancelAnimationFrame(t)
  }, [])

  if (!n)
    return (
      <div className="mt-6 rounded-[22px] border border-dashed border-line px-5 py-4">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">КБЖУ</p>
        <p className="mt-1 text-[14px] text-ink-2">Пищевая ценность уточняется — спросите у бариста.</p>
      </div>
    )

  const shares = energyShares(n)
  const gap = 3
  let offset = 0
  const segs = shares.map((s, i) => {
    const len = Math.max(s * C - gap, 0)
    const seg = { color: macros[i].color, len, offset }
    offset += s * C
    return seg
  })
  const maxG = Math.max(n.protein, n.fat, n.carbs, 1)

  return (
    <section className="mt-6 overflow-hidden rounded-[24px] border border-line/80 bg-card/90 shadow-[0_18px_40px_-28px_rgba(31,36,48,.45)]">
      <div className="flex items-center justify-between px-5 pt-4">
        <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">КБЖУ</h2>
        <span className="text-[12px] text-muted">на порцию</span>
      </div>

      <div className="flex items-center gap-5 px-5 pb-5 pt-3">
        <div className="relative size-[118px] shrink-0">
          <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
            <circle cx="60" cy="60" r={R} fill="none" stroke="var(--color-cream-2)" strokeWidth="11" />
            {segs.map((s) => (
              <circle
                key={s.color}
                className="ring-seg"
                cx="60"
                cy="60"
                r={R}
                fill="none"
                stroke={s.color}
                strokeWidth="11"
                strokeLinecap="round"
                strokeDasharray={`${shown ? s.len : 0} ${C}`}
                strokeDashoffset={shown ? -s.offset : 0}
              />
            ))}
          </svg>
          <div className="absolute inset-0 grid place-content-center text-center">
            <span className="font-serif text-[34px] font-semibold leading-none">{n.kcal}</span>
            <span className="mt-0.5 text-[11.5px] text-muted">ккал</span>
          </div>
        </div>

        <dl className="min-w-0 flex-1 space-y-3">
          {macros.map((m, i) => (
            <div key={m.key}>
              <div className="flex items-baseline justify-between gap-2">
                <dt className="flex items-center gap-2 text-[13px] text-ink-2">
                  <span className="size-2 rounded-full" style={{ background: m.color }} />
                  {m.label}
                </dt>
                <dd className="text-[14.5px] font-semibold tabular-nums">
                  {n[m.key]} г
                  <span className="ml-1.5 text-[11px] font-medium text-muted">{Math.round(shares[i] * 100)}%</span>
                </dd>
              </div>
              <div className="mt-1.5 h-[5px] overflow-hidden rounded-full bg-cream-2">
                {shown && (
                  <div
                    className="bar-fill h-full rounded-full"
                    style={{ width: `${(n[m.key] / maxG) * 100}%`, background: m.color, animationDelay: `${i * 90}ms` }}
                  />
                )}
              </div>
            </div>
          ))}
        </dl>
      </div>
      <p className="border-t border-line/70 px-5 py-2.5 text-[11.5px] leading-snug text-muted">
        Проценты — доля калорий из белков, жиров и углеводов.
      </p>
    </section>
  )
}
