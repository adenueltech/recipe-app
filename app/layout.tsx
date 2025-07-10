import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { RecipeProvider } from "@/contexts/recipe-context"
import { FavoritesProvider } from "@/contexts/favorites-context"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Recipe Finder - Discover Amazing Recipes",
  description: "Find and save your favorite recipes from around the world",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecipeProvider>
          <FavoritesProvider>
            <Navigation />
            {children}
            <Toaster />
          </FavoritesProvider>
        </RecipeProvider>
      </body>
    </html>
  )
}
