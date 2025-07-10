"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import type { Recipe } from "@/types/recipe"
import { useToast } from "@/hooks/use-toast"

interface FavoritesContextType {
  favorites: Recipe[]
  addFavorite: (recipe: Recipe) => void
  removeFavorite: (id: number) => void
  toggleFavorite: (recipe: Recipe) => void
  isFavorite: (id: number) => boolean
  clearFavorites: () => void
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Recipe[]>([])
  const { toast } = useToast()

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("recipe-favorites")
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        console.error("Error loading favorites:", error)
      }
    }
  }, [])

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("recipe-favorites", JSON.stringify(favorites))
  }, [favorites])

  // Save current recipes for recipe details page
  useEffect(() => {
    const handleRecipesUpdate = (event: CustomEvent) => {
      localStorage.setItem("current-recipes", JSON.stringify(event.detail))
    }

    window.addEventListener("recipes-updated" as any, handleRecipesUpdate)
    return () => window.removeEventListener("recipes-updated" as any, handleRecipesUpdate)
  }, [])

  const addFavorite = (recipe: Recipe) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === recipe.id)) {
        return prev
      }
      toast({
        title: "Added to favorites!",
        description: `${recipe.title} has been saved to your favorites.`,
      })
      return [...prev, recipe]
    })
  }

  const removeFavorite = (id: number) => {
    setFavorites((prev) => {
      const recipe = prev.find((fav) => fav.id === id)
      if (recipe) {
        toast({
          title: "Removed from favorites",
          description: `${recipe.title} has been removed from your favorites.`,
        })
      }
      return prev.filter((fav) => fav.id !== id)
    })
  }

  const toggleFavorite = (recipe: Recipe) => {
    if (isFavorite(recipe.id)) {
      removeFavorite(recipe.id)
    } else {
      addFavorite(recipe)
    }
  }

  const isFavorite = (id: number) => {
    return favorites.some((fav) => fav.id === id)
  }

  const clearFavorites = () => {
    setFavorites([])
    toast({
      title: "Favorites cleared",
      description: "All favorites have been removed.",
    })
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  }

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
