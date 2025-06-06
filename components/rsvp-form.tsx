"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

export default function RSVPForm() {
  const [name, setName] = useState("")
  const [relation, setRelation] = useState("familiar")
  const [attendeeNames, setAttendeeNames] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Construir el mensaje para WhatsApp
    let message = `¡Hola! Confirmo mi asistencia a los XV años de Alexa.\n\n`
    message += `Nombre: ${name}\n`
    message += `Soy: ${relation === "familiar" ? "Familiar" : "Amigo/a"}\n`

    if (attendeeNames) {
      message += `Nombres: ${attendeeNames}`
    }

    // Número de teléfono corregido - formato internacional sin espacios ni caracteres adicionales
    // El formato correcto para México es: 521 + código de área + número (sin espacios)
    const phoneNumber = "5215610855939" // +52 1 56 1085 5939 (formato para México)

    // Abrir WhatsApp con el mensaje
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <Card className="p-6 bg-beige border-rose-gold">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-foreground">
            Escribe nombre o apellidos de tu familia:
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 border-rose-gold bg-beige-light"
            placeholder="Ej. Familia Rodríguez"
          />
        </div>

        <div>
          <Label className="text-foreground">Eres mi:</Label>
          <RadioGroup value={relation} onValueChange={setRelation} className="mt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="familiar" id="familiar" className="text-rose-gold" />
              <Label htmlFor="familiar" className="cursor-pointer">
                Familiar
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="amigo" id="amigo" className="text-rose-gold" />
              <Label htmlFor="amigo" className="cursor-pointer">
                Amigo/a
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="attendees" className="text-foreground">
            Escribe el nombre de quien asistirá:
          </Label>
          <Textarea
            id="attendees"
            value={attendeeNames}
            onChange={(e) => setAttendeeNames(e.target.value)}
            className="mt-1 border-rose-gold bg-beige-light"
            placeholder="Ej. Juan Pérez, María López"
          />
        </div>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Button type="submit" className="w-full bg-rose-gold hover:bg-rose-gold/80 text-white">
            <Send className="mr-2 h-4 w-4" /> Confirmar por WhatsApp
          </Button>
        </motion.div>
      </form>
    </Card>
  )
}
