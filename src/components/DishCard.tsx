import { Link } from 'react-router-dom'
import { dishImage, dishPrice, type Dish } from '../data/menu'
import { DishImage } from './DishImage'
import { NutritionMini } from './Nutrition'

/** Компактная карточка блюда — по две в ряд (сетка `grid-cols-2`). */
export function DishCard({ dish }: { dish: Dish }) {
  return (
    <Link
      to={`/dish/${dish.id}`}
      className="press group flex flex-col overflow-hidden rounded-[20px] border border-line/70 bg-card text-ink active:scale-[0.97]"
    >
      <div className="relative aspect-square overflow-hidden bg-cream-2">
        <DishImage src={dishImage(dish.id)} alt={dish.name} className="transition-transform duration-700 group-hover:scale-[1.04]" />
        {dish.signature && (
          <span className="absolute left-2 top-2 rounded-full bg-night/80 px-2.5 py-1 text-[10.5px] font-semibold text-amber backdrop-blur-sm">
            Фирменное
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-2.5">
        <h3 className="line-clamp-2 text-[13.5px] font-medium leading-snug text-ink">{dish.name}</h3>
        <NutritionMini n={dish.nutrition} />
        <span className="mt-auto pt-2.5 text-[15px] font-bold">{dishPrice(dish)}</span>
      </div>
    </Link>
  )
}
