"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
}

export default function ParallaxImage({ src, alt, className = "" }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  return (
    <div ref={ref} className={`relative overflow-hidden rounded-xl ${className}`}>
      <motion.div style={{ y, scale, opacity }} className="relative w-full h-full">
        <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  )
}
