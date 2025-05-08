"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface FloatingElement {
  id: number
  size: number
  x: number
  y: number
  duration: number
  delay: number
  opacity: number
  color: string
}

export default function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    // Generate random floating elements
    const newElements: FloatingElement[] = []
    const colors = ["#e0bfb8", "#dba8a1", "#b76e79", "#d6cfc7", "#f5f5dc"]

    for (let i = 0; i < 15; i++) {
      newElements.push({
        id: i,
        size: Math.random() * 40 + 10, // 10-50px
        x: Math.random() * 100, // 0-100%
        y: Math.random() * 100, // 0-100%
        duration: Math.random() * 20 + 10, // 10-30s
        delay: Math.random() * 5, // 0-5s
        opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    setElements(newElements)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full"
          style={{
            width: element.size,
            height: element.size,
            left: `${element.x}%`,
            top: `${element.y}%`,
            backgroundColor: element.color,
            opacity: element.opacity,
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
