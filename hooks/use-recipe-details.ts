"use client"

import { useState, useEffect } from "react"
import type { RecipeDetails } from "@/types/recipe"

const API_KEY = "HUVpj/hAKuhSKtDF1Cy6qA==JUYTJbb6ezkQbw7c"
const BASE_URL = "https://api.api-ninjas.com/v1/recipe"

export function useRecipeDetails(id: string) {
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (!id) return

      setLoading(true)
      setError(null)

      try {
        // Since API Ninjas doesn't have individual recipe endpoints by ID,
        // we'll need to get the recipe data from localStorage or context
        const savedRecipes = localStorage.getItem("current-recipes")
        if (savedRecipes) {
          const recipes = JSON.parse(savedRecipes)
          const foundRecipe = recipes.find((r: any) => r.id.toString() === id)

          if (foundRecipe) {
            // Transform to RecipeDetails format
            const recipeDetails: RecipeDetails = {
              ...foundRecipe,
              extendedIngredients: foundRecipe.ingredients
                ? foundRecipe.ingredients.split("\n").map((ingredient: string, index: number) => ({
                    id: index,
                    original: ingredient.trim(),
                    name: ingredient.trim().split(" ").slice(1).join(" "),
                    amount: 1,
                    unit: "piece",
                  }))
                : [],
              analyzedInstructions: foundRecipe.instructions
                ? [
                    {
                      steps: foundRecipe.instructions
                        .split(".")
                        .filter((step: string) => step.trim())
                        .map((step: string, index: number) => ({
                          number: index + 1,
                          step: step.trim() + ".",
                        })),
                    },
                  ]
                : [],
            }

            setRecipe(recipeDetails)
          } else {
            throw new Error("Recipe not found")
          }
        } else {
          throw new Error("Recipe not found")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        setRecipe(null)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipeDetails()
  }, [id])

  return {
    recipe,
    loading,
    error,
  }
}
