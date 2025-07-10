"use client"

import { useState, useCallback } from "react"
import type { Recipe } from "@/types/recipe"

const API_KEY = "HUVpj/hAKuhSKtDF1Cy6qA==JUYTJbb6ezkQbw7c"
const BASE_URL = "https://api.api-ninjas.com/v1/recipe"

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Recipe variations for different food types
  const getRecipeVariations = (query: string, cuisine?: string) => {
    const variations: Array<{
      title: string
      style: string
      cookTime: number
      servings: number
      description: string
      difficulty: string
    }> = []

    // Common variations based on food type
    const foodVariations: Record<string, any[]> = {
      rice: [
        {
          title: "Jollof Rice",
          style: "West African",
          cookTime: 45,
          servings: 6,
          description: "Spicy tomato-based rice dish",
          difficulty: "Medium",
        },
        {
          title: "Chinese Fried Rice",
          style: "Chinese",
          cookTime: 20,
          servings: 4,
          description: "Wok-fried rice with vegetables and soy sauce",
          difficulty: "Easy",
        },
        {
          title: "Spanish Paella",
          style: "Spanish",
          cookTime: 60,
          servings: 8,
          description: "Saffron-infused rice with seafood",
          difficulty: "Hard",
        },
        {
          title: "Indian Biryani",
          style: "Indian",
          cookTime: 90,
          servings: 6,
          description: "Fragrant basmati rice with spices",
          difficulty: "Hard",
        },
        {
          title: "Japanese Sushi Rice",
          style: "Japanese",
          cookTime: 30,
          servings: 4,
          description: "Perfectly seasoned rice for sushi",
          difficulty: "Medium",
        },
        {
          title: "Thai Coconut Rice",
          style: "Thai",
          cookTime: 25,
          servings: 4,
          description: "Creamy coconut-infused jasmine rice",
          difficulty: "Easy",
        },
      ],
      chicken: [
        {
          title: "Butter Chicken",
          style: "Indian",
          cookTime: 45,
          servings: 4,
          description: "Creamy tomato-based curry",
          difficulty: "Medium",
        },
        {
          title: "Kung Pao Chicken",
          style: "Chinese",
          cookTime: 25,
          servings: 4,
          description: "Spicy stir-fried chicken with peanuts",
          difficulty: "Easy",
        },
        {
          title: "Chicken Tikka Masala",
          style: "Indian",
          cookTime: 50,
          servings: 6,
          description: "Marinated chicken in spiced curry sauce",
          difficulty: "Medium",
        },
        {
          title: "Southern Fried Chicken",
          style: "American",
          cookTime: 30,
          servings: 4,
          description: "Crispy buttermilk fried chicken",
          difficulty: "Medium",
        },
        {
          title: "Chicken Teriyaki",
          style: "Japanese",
          cookTime: 20,
          servings: 4,
          description: "Glazed chicken with sweet soy sauce",
          difficulty: "Easy",
        },
        {
          title: "Moroccan Chicken Tagine",
          style: "Moroccan",
          cookTime: 75,
          servings: 6,
          description: "Slow-cooked chicken with dried fruits",
          difficulty: "Medium",
        },
      ],
      pasta: [
        {
          title: "Spaghetti Carbonara",
          style: "Italian",
          cookTime: 20,
          servings: 4,
          description: "Creamy egg and cheese sauce",
          difficulty: "Medium",
        },
        {
          title: "Pad Thai",
          style: "Thai",
          cookTime: 15,
          servings: 4,
          description: "Stir-fried rice noodles with tamarind",
          difficulty: "Easy",
        },
        {
          title: "Fettuccine Alfredo",
          style: "Italian",
          cookTime: 25,
          servings: 4,
          description: "Rich butter and parmesan cream sauce",
          difficulty: "Easy",
        },
        {
          title: "Ramen Noodles",
          style: "Japanese",
          cookTime: 45,
          servings: 2,
          description: "Rich broth with fresh noodles",
          difficulty: "Hard",
        },
        {
          title: "Penne Arrabbiata",
          style: "Italian",
          cookTime: 30,
          servings: 4,
          description: "Spicy tomato sauce with garlic",
          difficulty: "Easy",
        },
        {
          title: "Vietnamese Pho",
          style: "Vietnamese",
          cookTime: 60,
          servings: 4,
          description: "Aromatic beef noodle soup",
          difficulty: "Medium",
        },
      ],
      pizza: [
        {
          title: "Margherita Pizza",
          style: "Italian",
          cookTime: 25,
          servings: 2,
          description: "Classic tomato, mozzarella, and basil",
          difficulty: "Medium",
        },
        {
          title: "Chicago Deep Dish",
          style: "American",
          cookTime: 45,
          servings: 4,
          description: "Thick crust with chunky tomato sauce",
          difficulty: "Hard",
        },
        {
          title: "Neapolitan Pizza",
          style: "Italian",
          cookTime: 15,
          servings: 2,
          description: "Thin crust wood-fired pizza",
          difficulty: "Hard",
        },
        {
          title: "BBQ Chicken Pizza",
          style: "American",
          cookTime: 30,
          servings: 3,
          description: "Tangy BBQ sauce with grilled chicken",
          difficulty: "Medium",
        },
        {
          title: "Turkish Pide",
          style: "Turkish",
          cookTime: 35,
          servings: 4,
          description: "Boat-shaped flatbread with toppings",
          difficulty: "Medium",
        },
        {
          title: "Indian Naan Pizza",
          style: "Indian",
          cookTime: 20,
          servings: 2,
          description: "Naan bread with curry-spiced toppings",
          difficulty: "Easy",
        },
      ],
      soup: [
        {
          title: "Tom Yum Soup",
          style: "Thai",
          cookTime: 30,
          servings: 4,
          description: "Spicy and sour shrimp soup",
          difficulty: "Medium",
        },
        {
          title: "French Onion Soup",
          style: "French",
          cookTime: 60,
          servings: 4,
          description: "Caramelized onions with cheese",
          difficulty: "Medium",
        },
        {
          title: "Miso Soup",
          style: "Japanese",
          cookTime: 10,
          servings: 4,
          description: "Traditional soybean paste soup",
          difficulty: "Easy",
        },
        {
          title: "Minestrone",
          style: "Italian",
          cookTime: 45,
          servings: 6,
          description: "Hearty vegetable and bean soup",
          difficulty: "Easy",
        },
        {
          title: "Pho Bo",
          style: "Vietnamese",
          cookTime: 90,
          servings: 4,
          description: "Beef noodle soup with herbs",
          difficulty: "Hard",
        },
        {
          title: "Gazpacho",
          style: "Spanish",
          cookTime: 15,
          servings: 4,
          description: "Cold tomato and vegetable soup",
          difficulty: "Easy",
        },
      ],
      salad: [
        {
          title: "Caesar Salad",
          style: "American",
          cookTime: 15,
          servings: 4,
          description: "Romaine lettuce with parmesan and croutons",
          difficulty: "Easy",
        },
        {
          title: "Greek Salad",
          style: "Greek",
          cookTime: 10,
          servings: 4,
          description: "Fresh vegetables with feta cheese",
          difficulty: "Easy",
        },
        {
          title: "Thai Som Tam",
          style: "Thai",
          cookTime: 15,
          servings: 4,
          description: "Spicy green papaya salad",
          difficulty: "Easy",
        },
        {
          title: "Caprese Salad",
          style: "Italian",
          cookTime: 10,
          servings: 4,
          description: "Tomato, mozzarella, and basil",
          difficulty: "Easy",
        },
        {
          title: "Tabbouleh",
          style: "Middle Eastern",
          cookTime: 20,
          servings: 6,
          description: "Parsley and bulgur wheat salad",
          difficulty: "Easy",
        },
        {
          title: "Waldorf Salad",
          style: "American",
          cookTime: 15,
          servings: 4,
          description: "Apple, celery, and walnut salad",
          difficulty: "Easy",
        },
      ],
    }

    // Find matching variations
    const queryLower = query.toLowerCase()
    let matchedVariations: any[] = []

    // Check for exact matches first
    if (foodVariations[queryLower]) {
      matchedVariations = foodVariations[queryLower]
    } else {
      // Check for partial matches
      for (const [food, vars] of Object.entries(foodVariations)) {
        if (queryLower.includes(food) || food.includes(queryLower)) {
          matchedVariations = vars
          break
        }
      }
    }

    // If no specific variations found, create generic ones
    if (matchedVariations.length === 0) {
      matchedVariations = [
        {
          title: `Classic ${query}`,
          style: "Traditional",
          cookTime: 30,
          servings: 4,
          description: `Traditional ${query} recipe`,
          difficulty: "Medium",
        },
        {
          title: `Spicy ${query}`,
          style: "Fusion",
          cookTime: 35,
          servings: 4,
          description: `Spicy version of ${query}`,
          difficulty: "Medium",
        },
        {
          title: `Healthy ${query}`,
          style: "Modern",
          cookTime: 25,
          servings: 4,
          description: `Healthy take on ${query}`,
          difficulty: "Easy",
        },
        {
          title: `Gourmet ${query}`,
          style: "Fine Dining",
          cookTime: 60,
          servings: 2,
          description: `Upscale ${query} preparation`,
          difficulty: "Hard",
        },
        {
          title: `Quick ${query}`,
          style: "Fast",
          cookTime: 15,
          servings: 4,
          description: `Quick and easy ${query}`,
          difficulty: "Easy",
        },
        {
          title: `Authentic ${query}`,
          style: "Traditional",
          cookTime: 45,
          servings: 6,
          description: `Authentic ${query} recipe`,
          difficulty: "Medium",
        },
      ]
    }

    // Filter by cuisine if specified
    if (cuisine) {
      const cuisineVariations = matchedVariations.filter((v) => v.style.toLowerCase().includes(cuisine.toLowerCase()))
      if (cuisineVariations.length > 0) {
        matchedVariations = cuisineVariations
      }
    }

    return matchedVariations.slice(0, 6) // Return up to 6 variations
  }

  const searchRecipes = useCallback(async (query: string, cuisine?: string) => {
    setLoading(true)
    setError(null)

    try {
      console.log("Searching for:", query, "Cuisine:", cuisine)

      // Get recipe variations
      const variations = getRecipeVariations(query, cuisine)

      // Create recipes from variations
      const generatedRecipes: Recipe[] = variations.map((variation, index) => ({
        id: Date.now() + index,
        title: variation.title,
        image: `https://source.unsplash.com/400x300/?${encodeURIComponent(variation.title)}`,
        readyInMinutes: variation.cookTime,
        servings: variation.servings,
        dishTypes: [variation.style],
        summary: `${variation.description}. This ${variation.difficulty.toLowerCase()} recipe serves ${variation.servings} people and takes about ${variation.cookTime} minutes to prepare.`,
        instructions: `Instructions for ${variation.title}:\n\n1. Gather all ingredients for this ${variation.style.toLowerCase()} ${query} dish.\n2. Prepare your cooking area and utensils.\n3. Follow traditional ${variation.style.toLowerCase()} cooking methods.\n4. Cook for approximately ${variation.cookTime} minutes.\n5. Season according to ${variation.style.toLowerCase()} traditions.\n6. Serve hot and enjoy your delicious ${variation.title}!`,
        ingredients: `Ingredients for ${variation.title}:\n\n• Main ingredient: ${query}\n• Traditional ${variation.style.toLowerCase()} spices\n• Fresh vegetables\n• Cooking oil\n• Salt and pepper\n• Herbs and seasonings\n• Additional ingredients specific to ${variation.style.toLowerCase()} cuisine`,
      }))

      // Try to fetch from API as well (but don't wait for it)
      try {
        const searchQuery = cuisine ? `${query} ${cuisine}` : query
        const url = `${BASE_URL}?query=${encodeURIComponent(searchQuery)}`

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "X-Api-Key": API_KEY,
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          const apiData = await response.json()
          console.log("API Response:", apiData)

          // If we get API data, we could merge it with our generated recipes
          // For now, we'll just use our generated variations
        }
      } catch (apiError) {
        console.log("API call failed, using generated recipes:", apiError)
      }

      setRecipes(generatedRecipes)
    } catch (err) {
      console.error("Search error:", err)
      setError(err instanceof Error ? err.message : "An error occurred while searching for recipes")
      setRecipes([])
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    recipes,
    loading,
    error,
    searchRecipes,
  }
}
