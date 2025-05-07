"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface RevealTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function RevealText({ children, className = "", delay = 0 }: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: "easeOut",
      },
    },
  }

  return (
    <div ref={ref} className={className}>
      <motion.div variants={variants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        {children}
      </motion.div>
    </div>
  )
}
