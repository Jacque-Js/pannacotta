import { asset } from '../asset'
/**
 * Меню ПАНАКОТЫ. Источник — карточки блюд с сайта кофейни (названия, описания, цены, КБЖУ, фото).
 * КБЖУ указано на порцию. Где в источнике КБЖУ нет (или стоит 0;0;0;0) — поле `nutrition` не заполнено,
 * карточка покажет «КБЖУ уточняется». Вес порций в источнике не указан — поле `weight` можно добавить позже.
 */

export type CategoryId = 'breakfast' | 'salads' | 'mains' | 'desserts'
export type BreakfastKind = 'hearty' | 'sweet'

export interface Category {
  id: CategoryId
  title: string
}

/** Пищевая ценность порции: ккал и граммы белков, жиров, углеводов. */
export interface Nutrition {
  kcal: number
  protein: number
  fat: number
  carbs: number
}

export interface Dish {
  id: string
  name: string
  price: number
  categories: CategoryId[]
  description?: string
  nutrition?: Nutrition
  weight?: number
  breakfastKind?: BreakfastKind
  /** Фирменное блюдо — так оно названо в описании самой кофейни. */
  signature?: boolean
  /** Уточнение к заказу: добавки, вкусы на выбор, доплаты. */
  note?: string
}

export const categories: Category[] = [
  { id: 'breakfast', title: 'Завтраки' },
  { id: 'salads', title: 'Салаты' },
  { id: 'mains', title: 'Бургеры и паста' },
  { id: 'desserts', title: 'Десерты' },
]

export const breakfastKinds: { id: BreakfastKind | 'all'; title: string }[] = [
  { id: 'all', title: 'Все' },
  { id: 'hearty', title: 'Сытные' },
  { id: 'sweet', title: 'Сладкие' },
]

/** КБЖУ в том же виде, что в меню кофейни: «617-46-31-35» → ккал, Б, Ж, У. */
const kbju = (s: string): Nutrition => {
  const [kcal, protein, fat, carbs] = s.split('-').map(Number)
  return { kcal, protein, fat, carbs }
}

const H: Partial<Dish> = { breakfastKind: 'hearty' }
const S: Partial<Dish> = { breakfastKind: 'sweet' }

type Row = [id: string, name: string, price: number, description: string, nutrition?: string, extra?: Partial<Dish>]

const group = (cats: CategoryId[], rows: Row[]): Dish[] =>
  rows.map(([id, name, price, description, n, extra]) => ({
    id, name, price, description, categories: cats, nutrition: n ? kbju(n) : undefined, ...extra,
  }))

export const dishes: Dish[] = [
  ...group(['breakfast'], [
    ['syrniki', 'Сырники с ягодным соусом', 490,
      'Наши фирменные сырники с ягодным соусом и сметаной — идеальный вариант для завтрака.',
      '617-46-31-35', { ...S, signature: true }],
    ['scramble-shrimp-bacon', 'Фирменный скрэмбл с креветкой и беконом', 660,
      'Скрэмбл с креветками и беконом в сливочном соусе. Идеальное сочетание вкусов для вашего утра!',
      '575-20-47-18', { ...H, signature: true }],
    ['croque-madame', 'Крок-мадам', 560,
      'Классический французский сэндвич с сыром, ветчиной и яйцом на булочке бриошь.',
      '877-39-56-55', H],
    ['pancakes-ricotta', 'Панкейки с сыром рикотта', 450,
      'Американские блинчики с клубничным компоте, сыром рикотта и белым шоколадом.',
      '485-16-8-86', S],
    ['casserole-apricot', 'Творожная запеканка с абрикосовым компоте', 390,
      'Нежная творожная запеканка со сметаной и домашним вареньем из абрикосов.',
      '242-20-10-10', S],
    ['brooklyn-breakfast', 'Бруклинский завтрак', 590,
      'Скрэмбл с фасолью, свиными колбасками, томатами гриль, зелёным салатом и тостом бриошь.',
      '803-34-53-47', H],
    ['combo-mom-morning', 'Комбо «Мамино утро»', 460,
      'Каша на выбор (овсяная или рисовая), бутерброд с хлебом бриошь, сливочным маслом и сыром, варенье из айвы или клубники, злаковое печенье 35 г и какао на шоколаде.',
      '699-13-50-51', { ...S, note: 'Каша — овсяная или рисовая, варенье — айва или клубника' }],
    ['potato-waffle-salmon', 'Вафля картофельная с сёмгой', 750,
      'Традиционная бельгийская картофельная вафля с подкопчённой сёмгой и яйцом пашот.',
      undefined, H],
    ['shakshuka-sausage', 'Шакшука с мясной сосиской', 550,
      'Томаты в собственном соку, охотничьи колбаски, болгарский перец, репчатый лук, куриные яйца, кинза, кунжут и чиабатта.',
      undefined, H],
    ['buckwheat-verde', 'Греча Верде', 350,
      'Гречка, греческий йогурт, соус песто, яйцо пашот и пармезан.',
      undefined, H],
    ['porridge-of-day', 'Каша дня', 250,
      'Классическая молочная каша с добавками на выбор: пюре из манго, компоте из клубники или абрикосовое варенье.',
      undefined, { ...S, note: 'На кокосовом или миндальном молоке — +60 ₽' }],
    ['croissant', 'Круассан', 240,
      'Слоёный круассан к кофе.',
      undefined, { ...S, note: 'Добавки на выбор' }],
  ]),
  ...group(['salads'], [
    ['salad-eggplant', 'Салат с хрустящими баклажанами', 550,
      'Азиатский салат с хрустящими баклажанами, творожным сыром и тайским соусом, посыпан кинзой и жареным арахисом.',
      '362-6-26-25'],
    ['caesar-chicken', 'Салат Цезарь с куриной грудкой', 490,
      'Хрустящие листья салата айсберг, сочные томаты, тёртый пармезан и нежнейшее куриное филе.',
      '368-25-27-6'],
  ]),
  ...group(['mains'], [
    ['burger-signature', 'Бургер фирменный на булочке бриошь', 790,
      'Котлета из мраморной говядины, хрустящий бекон и фирменный маринованный красный лук на булочке бриошь.',
      '657-20-35-64', { signature: true }],
    ['burger-taiga', 'Бургер таёжный с брусничным соусом', 790,
      'Бифштекс из мраморной говядины, айсберг, карамелизованный лук, бекон, томаты, сыр и фирменный соус.',
      '716-16-31-93'],
    ['carbonara', 'Паста Карбонара', 490,
      'Спагетти с обжаренными кусочками бекона, сливочным соусом и сыром пармезан.',
      '767-28-50-49'],
    ['club-sandwich', 'Клаб-сэндвич', 550,
      'Хрустящий тост, соус цезарь, курочка су-вид, салат айсберг, помидоры и глазунья.',
      '938-34-63-58'],
  ]),
  ...group(['desserts'], [
    ['panna-cotta', 'Панакота манго / малина', 200,
      'Потрясающе нежный и мягкий десерт из сливок с малиной или манго.',
      undefined, { signature: true, note: 'Вкус на выбор: манго или малина' }],
    ['san-sebastian', 'Чизкейк Сан-Себастьян', 465,
      'Нежное и воздушное лакомство из сливочного сыра на песочном сабле с клубничным соусом.'],
    ['honey-cake-lime', 'Медовик лайм', 380,
      'Воздушные медовые коржи со сладким ароматом мёда и нежным заварным кремом с двойной начинкой из лайма и орехового грильяжа.'],
    ['napoleon', 'Наполеон', 365,
      'Нежнее нежного. Всеми любимое лакомство в нашем фирменном исполнении.'],
    ['meringue-roll', 'Меренговый рулет', 400,
      'Изысканный десерт из хрустящей меренги, нежного крема и сочной начинки.',
      undefined, { note: 'Начинка на выбор: малина, клубника или манго-маракуйя' }],
    ['milk-slice', 'Молочный ломтик ПП', 380,
      'Вкуснейший торт, название которого говорит само за себя: без сахара и глютена.'],
    ['chocolate-salami', 'Шоколадная колбаса', 390,
      'Песочное сабле с медовой крошкой, жареным грецким орехом, шоколадом и каплей коньяка.'],
    ['salted-caramel', 'Солёная карамель', 375,
      'Неповторимый сладко-солёный вкус и густая текстура — идеально сочетается с любыми десертами.'],
  ]),
]

const byId = new Map(dishes.map((d) => [d.id, d]))

export const getDish = (id: string) => byId.get(id)
export const dishImage = (id: string) => asset(`dishes/${id}.webp`)
export const dishesIn = (category: CategoryId) => dishes.filter((d) => d.categories.includes(category))
export const categoryTitle = (id: CategoryId) => categories.find((c) => c.id === id)?.title ?? ''

export const formatPrice = (value: number) => `${value.toLocaleString('ru-RU')} ₽`
export const dishPrice = (d: Pick<Dish, 'price'>) => formatPrice(d.price)

/** Макронутриенты: цвета одни и те же на карточках и на странице блюда. */
export const macros = [
  { key: 'protein', label: 'Белки', short: 'Б', color: 'var(--color-protein)', kcalPerGram: 4 },
  { key: 'fat', label: 'Жиры', short: 'Ж', color: 'var(--color-fat)', kcalPerGram: 9 },
  { key: 'carbs', label: 'Углеводы', short: 'У', color: 'var(--color-carbs)', kcalPerGram: 4 },
] as const

/** Доля калорий из белков, жиров и углеводов (сумма — 1). */
export const energyShares = (n: Nutrition) => {
  const parts = macros.map((m) => n[m.key] * m.kcalPerGram)
  const total = parts.reduce((a, b) => a + b, 0) || 1
  return parts.map((p) => p / total)
}

/** Блюда до 500 ккал — от самого лёгкого. */
export const lightDishes = dishes
  .filter((d) => d.nutrition && d.nutrition.kcal <= 500)
  .sort((a, b) => a.nutrition!.kcal - b.nutrition!.kcal)

export const withNutrition = dishes.filter((d) => d.nutrition).length
