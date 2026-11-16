import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, Leaf } from 'lucide-react'
import { Header } from '../components/Header'
import { DishCard } from '../components/DishCard'
import { categories, dishes, lightDishes, withNutrition } from '../data/menu'
import { cafe } from '../data/cafe'
import { asset } from '../asset'

const HERO = asset('img/interior.webp')
const signature = dishes.filter((d) => d.signature)

export function Home() {
  const nextRef = useRef<HTMLElement>(null)

  return (
    <div className="pb-16">
      {/* Экран 1 — вечерний зал: панорамные окна, гирлянды на деревьях, тёплые лампы над столиками */}
      <section className="relative flex h-[100svh] min-h-[640px] flex-col overflow-hidden bg-night text-cream">
        <img
          src={HERO}
          alt="Зал ПАНАКОТЫ вечером: панорамные окна, деревья в гирляндах, лампы над круглыми столиками и оливковые кресла"
          fetchPriority="high"
          className="absolute inset-0 size-full animate-hero-zoom object-cover object-[46%_50%]"
        />
        {/* Сверху — под шапку, снизу — под текст; середина с окнами и лампой остаётся светлой */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,28,44,.55)_0%,rgba(21,28,44,0)_16%,rgba(21,28,44,0)_44%,rgba(21,28,44,.6)_64%,rgba(15,20,32,.95)_100%)]" />

        <Header tone="dark" logo={false} />

        <div className="relative z-10 mt-auto animate-fade-up px-6 pb-[max(24px,env(safe-area-inset-bottom))] [animation-delay:250ms]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.32em] text-amber">{cafe.tagline}</p>
          <h1 className="mt-3 animate-glow font-serif text-[clamp(44px,13.6vw,64px)] font-semibold leading-[0.9] tracking-[0.06em] text-[#fff4e2]">
            {cafe.name}
          </h1>
          <p className="mt-4 max-w-[310px] text-[15px] leading-relaxed text-cream/85">
            Сырники на завтрак, бургеры на обед и домашние десерты — у больших окон и тёплого света.
          </p>

          <div className="mt-7 flex gap-3">
            <Link
              to="/menu"
              className="press flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-amber text-[15px] font-semibold text-night shadow-[0_10px_30px_-10px_rgba(243,182,96,.7)]"
            >
              Открыть меню <ArrowRight className="size-[18px]" strokeWidth={2} />
            </Link>
            <Link
              to="/contacts"
              className="press flex h-14 items-center justify-center rounded-2xl border border-cream/30 bg-cream/10 px-5 text-[15px] font-medium backdrop-blur-md"
            >
              Как найти
            </Link>
          </div>

          <button
            onClick={() => nextRef.current?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Листать вниз"
            className="press mx-auto mt-5 flex flex-col items-center gap-1 text-[12px] text-cream/60"
          >
            Листай
            <ArrowDown className="size-4 animate-nudge" strokeWidth={1.5} />
          </button>
        </div>
      </section>

      <section ref={nextRef} className="scroll-mt-0 px-5 pt-10">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-[34px] font-semibold leading-none">Меню</h2>
          <Link to="/menu" className="press flex items-center gap-1.5 text-[14px] font-medium underline underline-offset-4">
            Всё меню <ArrowRight className="size-4" strokeWidth={1.5} />
          </Link>
        </div>
        <div className="no-scrollbar -mx-5 mt-5 flex gap-2 overflow-x-auto px-5">
          {categories.map((c) => (
            <Link key={c.id} to={`/menu?c=${c.id}`} className="press h-10 shrink-0 content-center rounded-full border border-line bg-card px-[18px] text-[13.5px] font-medium text-ink-2">
              {c.title}
            </Link>
          ))}
        </div>

        <h3 className="mt-10 font-serif text-[26px] font-semibold">Фирменное</h3>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {signature.slice(0, 4).map((d) => (
            <DishCard key={d.id} dish={d} />
          ))}
        </div>

        {/* Для тех, кто считает калории */}
        <div className="mt-10 overflow-hidden rounded-[26px] bg-night px-5 pb-5 pt-6 text-cream">
          <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-amber">
            <Leaf className="size-4" strokeWidth={1.75} /> Считаете КБЖУ?
          </div>
          <h3 className="mt-2 font-serif text-[28px] font-semibold leading-tight">Лёгкое — до 500 ккал</h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-cream/70">
            У {withNutrition} блюд указаны калории, белки, жиры и углеводы — на карточке и на странице блюда.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {lightDishes.slice(0, 4).map((d) => (
              <DishCard key={d.id} dish={d} />
            ))}
          </div>
        </div>

        <Link to="/menu" className="press mt-6 flex h-14 items-center justify-center rounded-2xl bg-olive text-[15px] font-medium text-cream">
          Открыть меню
        </Link>

        <nav className="mt-10 divide-y divide-line border-y border-line">
          {[
            ['/about', 'О нас'],
            ['/contacts', 'Контакты и часы работы'],
            ['/social', 'Мы в соцсетях'],
          ].map(([to, label]) => (
            <Link key={to} to={to} className="press flex items-center justify-between py-4 text-[15px]">
              {label}
              <ArrowRight className="size-[18px] text-muted" strokeWidth={1.5} />
            </Link>
          ))}
        </nav>
      </section>
    </div>
  )
}
