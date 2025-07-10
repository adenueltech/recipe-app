"use client"

import { motion } from "framer-motion"
import { Heart, Clock, Users, Star, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useFavorites } from "@/hooks/use-favorites"
import Link from "next/link"
import type { Recipe } from "@/types/recipe"

interface RecipeCardProps {
  recipe: Recipe
  index?: number
}

export function RecipeCard({ recipe, index = 0 }: RecipeCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites()

  // Get difficulty color
  const getDifficultyColor = (title: string) => {
    if (title.toLowerCase().includes("quick") || title.toLowerCase().includes("easy")) {
      return "bg-green-100 text-green-800"
    }
    if (title.toLowerCase().includes("gourmet") || title.toLowerCase().includes("authentic")) {
      return "bg-red-100 text-red-800"
    }
    return "bg-blue-100 text-blue-800"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group"
    >
      <Card className="overflow-hidden h-full bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border-0 relative">
        <div className="relative overflow-hidden">
          <motion.img
            src={recipe.image || "/placeholder.svg?height=200&width=300"}
            alt={recipe.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Favorite button */}
          <motion.button
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur shadow-lg z-10"
            onClick={(e) => {
              e.preventDefault()
              toggleFavorite(recipe)
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 + index * 0.05 }}
          >
            <Heart
              className={`w-5 h-5 transition-colors duration-200 ${
                isFavorite(recipe.id) ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"
              }`}
            />
          </motion.button>

          {/* Recipe style badge */}
          <div className="absolute bottom-3 left-3">
            <Badge className={`${getDifficultyColor(recipe.title)} border-0`}>
              {recipe.dishTypes?.[0] || "Recipe"}
            </Badge>
          </div>

          {/* Cuisine type indicator */}
          <motion.div
            className="absolute top-3 left-3 p-2 rounded-full bg-orange-500/90 backdrop-blur shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <ChefHat className="w-4 h-4 text-white" />
          </motion.div>
        </div>

        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-800 group-hover:text-orange-600 transition-colors duration-200">
              {recipe.title}
            </h3>

            {recipe.summary && (
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {recipe.summary.replace(/<[^>]*>/g, "").substring(0, 100)}...
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="font-medium">{recipe.readyInMinutes} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-orange-500" />
                <span className="font-medium">{recipe.servings}</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">4.{Math.floor(Math.random() * 9) + 1}</span>
            </div>
          </div>

          <Link href={`/recipe/${recipe.id}`} className="block">
            <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + index * 0.05 }}>
                View Recipe
              </motion.span>
            </Button>
          </Link>
        </CardContent>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Card>
    </motion.div>
  )
}
