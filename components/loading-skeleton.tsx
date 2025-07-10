"use client"

import { motion } from "framer-motion"

export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="relative">
            <motion.div
              className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 100%",
              }}
            />
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <motion.div
                className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: 0.2,
                }}
                style={{
                  backgroundSize: "200% 100%",
                }}
              />
              <motion.div
                className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: 0.4,
                }}
                style={{
                  backgroundSize: "200% 100%",
                }}
              />
            </div>

            <div className="flex justify-between">
              <motion.div
                className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-16"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: 0.6,
                }}
                style={{
                  backgroundSize: "200% 100%",
                }}
              />
              <motion.div
                className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-20"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: 0.8,
                }}
                style={{
                  backgroundSize: "200% 100%",
                }}
              />
            </div>

            <motion.div
              className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: 1,
              }}
              style={{
                backgroundSize: "200% 100%",
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
