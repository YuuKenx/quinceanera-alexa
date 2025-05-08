"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function ConfettiButton() {
  const [isActive, setIsActive] = useState(false)

  const triggerConfetti = () => {
    setIsActive(true)

    // Desactivar después de la animación
    setTimeout(() => {
      setIsActive(false)
    }, 3000)
  }

  return (
    <div className="relative">
      <Button onClick={triggerConfetti} className="bg-rose-gold hover:bg-rose-gold/80 text-white">
        <Sparkles className="mr-2 h-4 w-4" /> ¡Celebremos!
      </Button>

      {isActive && (
        <div className="absolute top-0 left-0 w-full h-0 overflow-visible pointer-events-none">
          {/* Confeti - 50 piezas */}
          {[...Array(50)].map((_, i) => {
            const size = Math.random() * 10 + 5
            const left = Math.random() * 200 - 100
            const animDuration = Math.random() * 3 + 2
            const delay = Math.random() * 0.5
            const rotation = Math.random() * 360
            const color = ["#e0bfb8", "#dba8a1", "#b76e79", "#d6cfc7", "#f5f5dc", "#e8e6d9", "#f0e6e4", "#FFFFFF"][
              Math.floor(Math.random() * 8)
            ]

            return (
              <div
                key={i}
                className="absolute rounded-sm"
                style={{
                  width: size,
                  height: size,
                  backgroundColor: color,
                  left: `calc(50% + ${left}px)`,
                  top: 0,
                  transform: `rotate(${rotation}deg)`,
                  animation: `confetti ${animDuration}s ease-out ${delay}s forwards`,
                }}
              />
            )
          })}
        </div>
      )}

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(500px) rotate(${Math.random() * 1000}deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
