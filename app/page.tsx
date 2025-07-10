"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ChefHat, Sparkles, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRecipes } from "@/hooks/use-recipes"
import { useFavorites } from "@/hooks/use-favorites"
import { RecipeCard } from "@/components/recipe-card"
import { LoadingSkeleton } from "@/components/loading-skeleton"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCuisine, setSelectedCuisine] = useState("")
  const { recipes, loading, error, searchRecipes } = useRecipes()
  const { favorites, toggleFavorite, isFavorite } = useFavorites()

  const cuisines = [
    "Italian",
    "Mexican",
    "Asian",
    "Mediterranean",
    "American",
    "Indian",
    "African",
    "Middle Eastern",
    "French",
    "Thai",
    "Japanese",
    "Greek",
    "Spanish",
    "Chinese",
    "Korean",
    "Vietnamese",
    "Moroccan",
    "Ethiopian",
    "Caribbean",
    "Brazilian",
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      searchRecipes(searchQuery, selectedCuisine)
    }
  }

  // Quick search buttons for testing
  const quickSearches = ["pasta", "chicken", "pizza", "salad", "soup"]

  // Update localStorage when recipes change
  useEffect(() => {
    if (recipes.length > 0) {
      const event = new CustomEvent("recipes-updated", { detail: recipes })
      window.dispatchEvent(event)
    }
  }, [recipes])

  useEffect(() => {
    // Load popular recipes on initial load
    searchRecipes("pasta", "")
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-20">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <div className="relative">
                <ChefHat className="w-16 h-16" />
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </motion.div>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent"
            >
              Recipe Finder
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl mb-8 text-orange-100">
              Discover delicious recipes from around the world
            </motion.p>

            {/* Search Form */}
            <motion.form
              variants={itemVariants}
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-6"
            >
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search for recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 text-lg bg-white/90 backdrop-blur border-0 focus:bg-white text-gray-800 placeholder:text-gray-500"
                />
              </div>
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="h-12 px-4 rounded-md bg-white/90 backdrop-blur border-0 focus:bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="" className="text-gray-800 bg-white">
                  All Cuisines
                </option>
                {cuisines.map((cuisine) => (
                  <option key={cuisine} value={cuisine.toLowerCase()} className="text-gray-800 bg-white">
                    {cuisine}
                  </option>
                ))}
              </select>
              <Button
                type="submit"
                size="lg"
                className="h-12 px-8 bg-white text-orange-500 hover:bg-orange-50 font-semibold"
                disabled={loading}
              >
                <Search className="w-5 h-5 mr-2" />
                {loading ? "Searching..." : "Search"}
              </Button>
            </motion.form>

            {/* Quick Search Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2">
              <span className="text-orange-100 text-sm mr-2">Quick search:</span>
              {quickSearches.map((term) => (
                <Button
                  key={term}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery(term)
                    searchRecipes(term, selectedCuisine)
                  }}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 text-xs"
                >
                  {term}
                </Button>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-20 h-20 bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.section>

      {/* Results Section */}
      <section className="container mx-auto px-4 py-12">
        {/* Debug Info */}
        {error && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Debug Info:</strong> {error}
              <br />
              <span className="text-sm">
                Check the browser console for more details. The app will show demo recipes for now.
              </span>
            </AlertDescription>
          </Alert>
        )}

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12"
            >
              <div className="text-center mb-8">
                <motion.div
                  className="flex justify-center items-center gap-3 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <ChefHat className="w-8 h-8 text-orange-500" />
                  </motion.div>
                  <span className="text-xl text-gray-700 font-medium">Finding delicious recipes...</span>
                </motion.div>
              </div>
              <LoadingSkeleton />
            </motion.div>
          )}

          {!loading && recipes.length > 0 && (
            <motion.div
              key="results"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={itemVariants} className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Found {recipes.length} Amazing Recipes</h2>
                <p className="text-gray-600">Click on any recipe to see the full details</p>
                <p className="text-sm text-gray-500 mt-2">Powered by API Ninjas</p>
              </motion.div>

              <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe, index) => (
                  <RecipeCard key={recipe.id} recipe={recipe} index={index} />
                ))}
              </motion.div>
            </motion.div>
          )}

          {!loading && recipes.length === 0 && !error && (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">No recipes found</h2>
              <p className="text-gray-500 mb-6">
                Try searching for something else or use the quick search buttons above
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}
