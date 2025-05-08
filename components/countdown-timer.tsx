"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  targetDate: Date
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()
      console.log("Fecha objetivo:", targetDate.toString())
      console.log("Fecha actual:", new Date().toString())
      console.log("Diferencia en ms:", difference)

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // Si la fecha ya pasó, mostramos al menos 1 día para que no aparezca todo en ceros
        setTimeLeft({ days: 1, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-rose-gold">{timeLeft.days}</div>
        <div className="text-xs uppercase tracking-wider">Días</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-rose-gold">{timeLeft.hours}</div>
        <div className="text-xs uppercase tracking-wider">Horas</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-rose-gold">{timeLeft.minutes}</div>
        <div className="text-xs uppercase tracking-wider">Minutos</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-rose-gold">{timeLeft.seconds}</div>
        <div className="text-xs uppercase tracking-wider">Segundos</div>
      </div>
    </div>
  )
}
