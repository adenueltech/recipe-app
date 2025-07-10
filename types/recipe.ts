export interface Recipe {
  id: number
  title: string
  image: string
  readyInMinutes: number
  servings: number
  dishTypes?: string[]
  summary?: string
  instructions?: string
  ingredients?: string
}

export interface RecipeDetails extends Recipe {
  extendedIngredients?: Array<{
    id: number
    original: string
    name: string
    amount: number
    unit: string
  }>
  analyzedInstructions?: Array<{
    steps: Array<{
      number: number
      step: string
    }>
  }>
  nutrition?: {
    nutrients: Array<{
      name: string
      amount: number
      unit: string
    }>
  }
}
