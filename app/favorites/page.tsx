"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Heart, ArrowLeft, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useFavorites } from "@/hooks/use-favorites"
import Link from "next/link"

export default function FavoritesPage() {
  const { favorites, removeFavorite, clearFavorites } = useFavorites()

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
    exit: {
      x: -100,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                <h1 className="text-3xl font-bold text-gray-800">My Favorites</h1>
              </div>
            </div>

            {favorites.length > 0 && (
              <Button
                variant="outline"
                onClick={clearFavorites}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {favorites.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-20"
              >
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-600 mb-2">No favorites yet</h2>
                <p className="text-gray-500 mb-6">Start exploring recipes and add them to your favorites!</p>
                <Link href="/">
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    Discover Recipes
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="favorites"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {favorites.map((recipe) => (
                    <motion.div
                      key={recipe.id}
                      variants={itemVariants}
                      exit="exit"
                      layout
                      whileHover={{ y: -5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card className="overflow-hidden h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                        <div className="relative">
                          <img
                            src={recipe.image || "/placeholder.svg"}
                            alt={recipe.title}
                            className="w-full h-48 object-cover"
                          />
                          <motion.button
                            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur shadow-lg"
                            onClick={() => removeFavorite(recipe.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                          </motion.button>
                        </div>

                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-3 line-clamp-2 text-gray-800">{recipe.title}</h3>

                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                            <span>{recipe.readyInMinutes} min</span>
                            <span>{recipe.servings} servings</span>
                          </div>

                          <Link href={`/recipe/${recipe.id}`}>
                            <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                              View Recipe
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
