"use client"

import { createContext, useContext, type ReactNode } from "react"

type RecipeContextType = {}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined)

export function RecipeProvider({ children }: { children: ReactNode }) {
  const value = {
    // Add any global recipe state here if needed
  }

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
}

export function useRecipeContext() {
  const context = useContext(RecipeContext)
  if (!context) {
    throw new Error("useRecipeContext must be used within a RecipeProvider")
  }
  return context
}
