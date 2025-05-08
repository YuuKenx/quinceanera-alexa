"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ImageCarousel() {
  // Definimos las imágenes con las URLs proporcionadas
  const images = [
    {
      src: "/images/1.jpg",
      alt: "Invitación elegante",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.jpg-Ail5QSgBKDyXTMsehMo4DNmzGwS3m9.jpeg",
      alt: "Alexa en vestido rosa",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6.jpg-3wbXnxTPlR48B1sBLKhm19nTn3Nm5l.jpeg",
      alt: "Alexa en escaleras elegantes",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7.jpg-hGuGjHSDVlAPxYtADQlC7rphwpO4Pj.jpeg",
      alt: "Vestido elegante dorado",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Cambiar imagen cada 5 segundos

    return () => clearInterval(timer) // Limpiar intervalo al desmontar
  }, [images.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  return (
    <div className="relative w-full h-64 md:h-96">
      <div className="relative w-full h-full">
        <Image
          src={images[currentIndex].src || "/placeholder.svg"}
          alt={images[currentIndex].alt}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between items-center px-4">
        <button
          onClick={goToPrevious}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={goToNext}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          aria-label="Imagen siguiente"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
