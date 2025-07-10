"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, X, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface SearchFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void
}

interface FilterOptions {
  maxReadyTime?: number
  minRating?: number
  diet?: string
  intolerances?: string[]
}

export function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({})

  const diets = ["vegetarian", "vegan", "gluten free", "ketogenic", "paleo"]
  const intolerances = [
    "dairy",
    "egg",
    "gluten",
    "grain",
    "peanut",
    "seafood",
    "sesame",
    "shellfish",
    "soy",
    "sulfite",
    "tree nut",
    "wheat",
  ]
  const cookingTimes = [15, 30, 45, 60, 90]
  const ratings = [3, 4, 4.5]

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const clearFilters = () => {
    setFilters({})
    onFiltersChange({})
  }

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== undefined && value !== null && (Array.isArray(value) ? value.length > 0 : true),
  ).length

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-white hover:bg-gray-50 border-gray-200"
      >
        <Filter className="w-4 h-4 mr-2" />
        Filters
        {activeFiltersCount > 0 && (
          <Badge className="ml-2 bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 text-xs">
            {activeFiltersCount}
          </Badge>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 z-50"
          >
            <Card className="w-80 shadow-xl border-0 bg-white/95 backdrop-blur">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <div className="flex gap-2">
                    {activeFiltersCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        Clear All
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Cooking Time */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="font-medium">Max Cooking Time</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cookingTimes.map((time) => (
                      <Button
                        key={time}
                        variant={filters.maxReadyTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() =>
                          updateFilters({ maxReadyTime: filters.maxReadyTime === time ? undefined : time })
                        }
                        className={filters.maxReadyTime === time ? "bg-orange-500 hover:bg-orange-600" : ""}
                      >
                        {time} min
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">Minimum Rating</span>
                  </div>
                  <div className="flex gap-2">
                    {ratings.map((rating) => (
                      <Button
                        key={rating}
                        variant={filters.minRating === rating ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateFilters({ minRating: filters.minRating === rating ? undefined : rating })}
                        className={filters.minRating === rating ? "bg-orange-500 hover:bg-orange-600" : ""}
                      >
                        {rating}+ ⭐
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Diet */}
                <div className="space-y-3">
                  <span className="font-medium">Diet</span>
                  <div className="flex flex-wrap gap-2">
                    {diets.map((diet) => (
                      <Button
                        key={diet}
                        variant={filters.diet === diet ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateFilters({ diet: filters.diet === diet ? undefined : diet })}
                        className={filters.diet === diet ? "bg-orange-500 hover:bg-orange-600" : ""}
                      >
                        {diet}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Intolerances */}
                <div className="space-y-3">
                  <span className="font-medium">Intolerances</span>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {intolerances.map((intolerance) => {
                      const isSelected = filters.intolerances?.includes(intolerance) || false
                      return (
                        <Button
                          key={intolerance}
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            const current = filters.intolerances || []
                            const updated = isSelected
                              ? current.filter((i) => i !== intolerance)
                              : [...current, intolerance]
                            updateFilters({ intolerances: updated.length > 0 ? updated : undefined })
                          }}
                          className={isSelected ? "bg-orange-500 hover:bg-orange-600" : ""}
                        >
                          {intolerance}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
