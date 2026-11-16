import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, Info } from 'lucide-react'
import { DishImage } from '../components/DishImage'
import { KcalBadge, NutritionPanel } from '../components/Nutrition'
import { categoryTitle, dishImage, dishPrice, dishesIn, getDish } from '../data/menu'

export function DishPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const dish = getDish(id)
  if (!dish) return <Navigate to="/menu" replace />

  const mainCategory = dish.categories[0]
  const related = dishesIn(mainCategory).filter((d) => d.id !== dish.id).slice(0, 8)
  const back = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/menu'))

  return (
    <div key={dish.id} className="min-h-dvh pb-12">
      <div className="relative aspect-[4/3] animate-fade-in overflow-hidden bg-cream-2">
        <DishImage src={dishImage(dish.id)} alt={dish.name} eager />
        <button
          onClick={back}
          aria-label="Назад"
          className="press absolute left-4 top-[max(16px,env(safe-area-inset-top))] grid size-11 place-items-center rounded-full bg-cream text-ink shadow-sm"
        >
          <ChevronLeft className="size-6" strokeWidth={1.5} />
        </button>
        {dish.signature && (
          <span className="absolute right-4 top-[max(22px,env(safe-area-inset-top))] rounded-full bg-night/80 px-3 py-1 text-[12px] font-semibold text-amber backdrop-blur-sm">
            Фирменное
          </span>
        )}
      </div>

      <article className="relative -mt-6 animate-sheet-up rounded-t-[28px] bg-cream px-5 pt-7">
        <Link to={`/menu?c=${mainCategory}`} className="text-[12.5px] font-medium uppercase tracking-[0.12em] text-muted">
          {categoryTitle(mainCategory)}
        </Link>
        <h1 className="mt-2 font-serif text-[32px] font-semibold leading-[1.1]">{dish.name}</h1>
        <p className="mt-3 text-[24px] font-bold">{dishPrice(dish)}</p>

        {dish.description && <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{dish.description}</p>}

        {dish.note && (
          <p className="mt-4 flex gap-2.5 rounded-2xl bg-blush/70 px-4 py-3 text-[13.5px] leading-snug text-ink-2">
            <Info className="mt-px size-[17px] shrink-0 text-rose" strokeWidth={1.75} />
            {dish.note}
          </p>
        )}

        <NutritionPanel n={dish.nutrition} />

        {related.length > 0 && (
          <section className="mt-9">
            <h2 className="font-serif text-[26px] font-semibold">Ещё в разделе</h2>
            <div className="no-scrollbar -mx-5 mt-4 flex gap-3 overflow-x-auto px-5 pb-1">
              {related.map((d) => (
                <Link key={d.id} to={`/dish/${d.id}`} replace className="press w-[148px] shrink-0">
                  <div className="aspect-square overflow-hidden rounded-2xl bg-cream-2">
                    <DishImage src={dishImage(d.id)} alt="" />
                  </div>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-snug">{d.name}</p>
                  <p className="mt-1 flex items-baseline gap-2">
                    <span className="text-[14px] font-bold">{dishPrice(d)}</span>
                    <KcalBadge n={d.nutrition} />
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
        <Link
          to={`/menu?c=${mainCategory}`}
          className="press mt-9 flex h-14 items-center justify-center rounded-2xl bg-olive text-[15px] font-medium text-cream"
        >
          Весь раздел «{categoryTitle(mainCategory)}»
        </Link>
      </article>
    </div>
  )
}
