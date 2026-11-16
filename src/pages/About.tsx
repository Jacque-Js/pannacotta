import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Header } from '../components/Header'
import { dishes, withNutrition } from '../data/menu'
import { asset } from '../asset'

const COVER = asset('img/interior.webp')

export function About() {
  return (
    <div className="pb-16">
      <Header />
      <div className="aspect-[4/3] animate-fade-in overflow-hidden bg-cream-2">
        <img
          src={COVER}
          alt="Зал ПАНАКОТЫ: панорамные окна, лампы над столиками, оливковые кресла"
          className="size-full object-cover object-[50%_62%]"
        />
      </div>
      <div className="animate-fade-up px-6 pt-8">
        <h1 className="font-serif text-[44px] font-semibold leading-tight">О нас</h1>
        <p className="mt-4 text-[15.5px] leading-relaxed text-ink-2">
          ПАНАКОТА — кофейня с панорамными окнами, мягкими оливковыми креслами и тёплым светом ламп. Утром — сырники,
          панкейки и скрэмблы, днём — бургеры, паста и салаты, а к кофе — домашние десерты: от панакоты, давшей нам имя,
          до медовика с лаймом и Сан-Себастьяна.
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-line p-4">
            <dt className="text-[12px] text-muted">Позиций в меню</dt>
            <dd className="mt-1 font-serif text-[32px] font-semibold">{dishes.length}</dd>
          </div>
          <div className="rounded-2xl border border-line p-4">
            <dt className="text-[12px] text-muted">С КБЖУ</dt>
            <dd className="mt-1 font-serif text-[32px] font-semibold">{withNutrition}</dd>
          </div>
        </dl>

        <Link to="/menu" className="press mt-8 inline-flex items-center gap-2 text-[15px] underline underline-offset-4">
          Смотреть меню <ArrowRight className="size-[18px]" strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  )
}
