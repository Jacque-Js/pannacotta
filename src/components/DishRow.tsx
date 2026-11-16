import { Link } from 'react-router-dom'
import { dishImage, dishPrice, type Dish } from '../data/menu'
import { DishImage } from './DishImage'
import { NutritionMini } from './Nutrition'

/** Строка списка с миниатюрой — экран «Завтраки». */
export function DishRow({ dish }: { dish: Dish }) {
  return (
    <Link to={`/dish/${dish.id}`} className="press flex items-center gap-4 py-3.5 active:scale-[0.99]">
      <div className="relative h-[92px] w-[116px] shrink-0 overflow-hidden rounded-2xl bg-cream-2">
        <DishImage src={dishImage(dish.id)} alt={dish.name} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-[14.5px] font-medium leading-snug">{dish.name}</h3>
        <NutritionMini n={dish.nutrition} />
        <span className="mt-2 block text-[16px] font-bold">{dishPrice(dish)}</span>
      </div>
    </Link>
  )
}
