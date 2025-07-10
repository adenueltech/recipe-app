"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, Users, Heart, CheckCircle2, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRecipeDetails } from "@/hooks/use-recipe-details"
import { useFavorites } from "@/hooks/use-favorites"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function RecipeDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { recipe, loading, error } = useRecipeDetails(id)
  const { toggleFavorite, isFavorite } = useFavorites()
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set())
  const [checkedInstructions, setCheckedInstructions] = useState<Set<number>>(new Set())

  const toggleIngredient = (index: number) => {
    const newChecked = new Set(checkedIngredients)
    if (newChecked.has(index)) {
      newChecked.delete(index)
    } else {
      newChecked.add(index)
    }
    setCheckedIngredients(newChecked)
  }

  const toggleInstruction = (index: number) => {
    const newChecked = new Set(checkedInstructions)
    if (newChecked.has(index)) {
      newChecked.delete(index)
    } else {
      newChecked.add(index)
    }
    setCheckedInstructions(newChecked)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <ChefHat className="w-8 h-8 text-orange-500" />
          </motion.div>
          <span className="text-lg text-gray-600">Loading recipe...</span>
        </motion.div>
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="text-red-500 text-lg mb-4">Recipe not found</div>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Recipes
              </Button>
            </Link>
          </div>

          {/* Recipe Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          >
            <div className="relative">
              <motion.img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <motion.button
                className="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur shadow-lg"
                onClick={() => toggleFavorite(recipe)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className={`w-6 h-6 ${isFavorite(recipe.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
              </motion.button>
            </div>

            <div className="space-y-6">
              <div>
                <motion.h1
                  className="text-4xl font-bold text-gray-800 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {recipe.title}
                </motion.h1>

                <motion.div
                  className="flex flex-wrap gap-2 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {recipe.dishTypes?.map((type, index) => (
                    <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800">
                      {type}
                    </Badge>
                  ))}
                </motion.div>

                <motion.div
                  className="grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-sm">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <div>
                      <div className="font-semibold">{recipe.readyInMinutes} min</div>
                      <div className="text-sm text-gray-600">Cook Time</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-sm">
                    <Users className="w-5 h-5 text-orange-500" />
                    <div>
                      <div className="font-semibold">{recipe.servings}</div>
                      <div className="text-sm text-gray-600">Servings</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {recipe.summary && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">About This Recipe</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: recipe.summary.replace(/<[^>]*>/g, ""),
                        }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Ingredients and Instructions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ingredients */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChefHat className="w-5 h-5 text-orange-500" />
                    Ingredients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recipe.extendedIngredients?.map((ingredient, index) => (
                      <motion.div
                        key={index}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                          checkedIngredients.has(index)
                            ? "bg-green-50 border border-green-200"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                        onClick={() => toggleIngredient(index)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            checkedIngredients.has(index) ? "border-green-500 bg-green-500" : "border-gray-300"
                          }`}
                        >
                          {checkedIngredients.has(index) && <CheckCircle2 className="w-3 h-3 text-white" />}
                        </div>
                        <span className={`flex-1 ${checkedIngredients.has(index) ? "line-through text-gray-500" : ""}`}>
                          {ingredient.original}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-orange-500" />
                    Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recipe.analyzedInstructions?.[0]?.steps?.map((step, index) => (
                      <motion.div
                        key={index}
                        className={`flex gap-4 p-4 rounded-lg cursor-pointer transition-all ${
                          checkedInstructions.has(index)
                            ? "bg-green-50 border border-green-200"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                        onClick={() => toggleInstruction(index)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold text-sm ${
                            checkedInstructions.has(index)
                              ? "border-green-500 bg-green-500 text-white"
                              : "border-orange-500 text-orange-500"
                          }`}
                        >
                          {checkedInstructions.has(index) ? "✓" : step.number}
                        </div>
                        <p
                          className={`flex-1 leading-relaxed ${
                            checkedInstructions.has(index) ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {step.step}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
