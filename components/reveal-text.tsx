"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
  const [attendance, setAttendance] = useState("1")
  const [attendeeNames, setAttendeeNames] = useState("")
  const [showAttendeeField, setShowAttendeeField] = useState(true)

  useEffect(() => {
    // Mostrar el campo de nombres solo si no seleccionaron "no podemos asistir"
    setShowAttendeeField(attendance !== "no")
  }, [attendance])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Construir el mensaje para WhatsApp
    let message = `¡Hola! Confirmo mi asistencia a los XV años de Alexa\n\n`
    message += `Nombre: ${name}\n`
    message += `Soy: ${relation === "familiar" ? "Familiar" : "Amigo/a"}\n`

    if (attendance === "no") {
      message += "Lo siento, no podré asistir."
    } else {
      message += `Asistiré con: ${attendance} ${attendance === "1" ? "Persona" : "Personas"}\n`
      if (attendeeNames) {
        message += `Nombres: ${attendeeNames}`
      }
    }

    // Número de teléfono
    const phoneNumber = "5256108559390" // +52 56 1085 5939

    // Abrir WhatsApp con el mensaje
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <Card className="p-6 bg-white border-secondary">
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
            className="mt-1 border-secondary"
            placeholder="Ej. Familia Rodríguez"
          />
        </div>

        <div>
          <Label className="text-foreground">Eres mi:</Label>
          <RadioGroup value={relation} onValueChange={setRelation} className="mt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="familiar" id="familiar" />
              <Label htmlFor="familiar" className="cursor-pointer">
                Familiar
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="amigo" id="amigo" />
              <Label htmlFor="amigo" className="cursor-pointer">
                Amigo/a
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label className="text-foreground">Confirmar asistencia:</Label>
          <RadioGroup value={attendance} onValueChange={setAttendance} className="mt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="5" id="five" />
              <Label htmlFor="five" className="cursor-pointer">
                5 Personas
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="4" id="four" />
              <Label htmlFor="four" className="cursor-pointer">
                4 Personas
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="three" />
              <Label htmlFor="three" className="cursor-pointer">
                3 Personas
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="two" />
              <Label htmlFor="two" className="cursor-pointer">
                2 Personas
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="one" />
              <Label htmlFor="one" className="cursor-pointer">
                1 Persona
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no" className="cursor-pointer">
                Lo siento, no podremos asistir
              </Label>
            </div>
          </RadioGroup>
        </div>

        {showAttendeeField && (
          <div>
            <Label htmlFor="attendees" className="text-foreground">
              Escribe el nombre de quien asistirá ({attendance} {attendance === "1" ? "Persona" : "Personas"}):
            </Label>
            <Textarea
              id="attendees"
              value={attendeeNames}
              onChange={(e) => setAttendeeNames(e.target.value)}
              className="mt-1 border-secondary"
              placeholder="Ej. Juan Pérez, María López"
            />
          </div>
        )}

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Button type="submit" className="w-full bg-primary hover:bg-pink-600 text-white">
            <Send className="mr-2 h-4 w-4" /> Confirmar por WhatsApp
          </Button>
        </motion.div>
      </form>
    </Card>
  )
}
