"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight, Music, MicOffIcon as MusicOff, Send, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CountdownTimer from "@/components/countdown-timer"
import ImageCarousel from "@/components/image-carousel"
import FloatingElements from "@/components/floating-elements"
import ParallaxImage from "@/components/parallax-image"
import RevealText from "@/components/reveal-text"
import MapComponent from "@/components/map-component"

export default function Home() {
  const [showModal, setShowModal] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [guests, setGuests] = useState(1)
  const { scrollYProgress } = useScroll()

  const opacitySection1 = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const opacitySection2 = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
  const opacitySection3 = useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
  const opacitySection4 = useTransform(scrollYProgress, [0.6, 0.8], [0, 1])

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50])
  const carouselX = useTransform(scrollYProgress, [0.1, 0.3], [-50, 0])
  const aboutImagesScale = useTransform(scrollYProgress, [0.3, 0.5], [0.8, 1])
  const detailsRotate = useTransform(scrollYProgress, [0.5, 0.7], [-5, 0])
  const rsvpScale = useTransform(scrollYProgress, [0.7, 0.9], [0.9, 1])

  useEffect(() => {
    const audio = document.getElementById("background-music") as HTMLAudioElement

    if (isPlaying) {
      audio?.play().catch((error) => {
        console.error("Audio playback failed:", error)
        setIsPlaying(false)
      })
    } else {
      audio?.pause()
    }
  }, [isPlaying])

  const handleRSVP = () => {
    const phoneNumber = "5255637593877" // +52 55 6375 9387 without spaces or symbols
    const message = encodeURIComponent(
      `¡Hola! Confirmo mi asistencia a la quinceañera de Alexa. Asistiré con ${guests} ${guests === 1 ? "invitado" : "invitados"}.`,
    )
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  const openGoogleMaps = () => {
    window.open("https://maps.app.goo.gl/DwjoHB5LxES281S89", "_blank")
  }

  const eventDate = new Date("2025-05-17T17:00:00-06:00") // CDMX time zone (UTC-6)

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#f9f3f0] to-[#f8e8e8] text-[#8a5a44]">
      <FloatingElements />
      {/* Background Music */}
      <audio id="background-music" loop>
        <source src="/music/background-music.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Music Control */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed top-4 right-4 z-50 p-2 bg-[#f0d4d4] rounded-full shadow-md hover:bg-[#e6c0c0] transition-all"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? <MusicOff size={20} /> : <Music size={20} />}
      </button>

      {/* Countdown Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <Card className="w-[90%] max-w-md p-6 bg-[#fff9f5] border-[#e6c0c0] shadow-xl">
            <h2 className="text-2xl font-dancing text-center mb-4 text-[#d4a092]">Faltan</h2>
            <CountdownTimer targetDate={eventDate} />
            <p className="text-center mt-4 mb-6 font-light">Para la quinceañera de Alexa</p>
            <Button onClick={() => setShowModal(false)} className="w-full bg-[#d4a092] hover:bg-[#c08e82] text-white">
              Continuar al sitio
            </Button>
          </Card>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ParallaxImage src="/placeholder.svg?key=bm06h" alt="Fondo de quinceañera" className="absolute inset-0" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            type: "spring",
            stiffness: 100,
          }}
          className="relative z-10 text-center px-4"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              type: "spring",
            }}
            className="text-5xl md:text-7xl font-dancing text-white mb-4"
          >
            Alexa
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-white font-light mb-8"
          >
            Mis Quince Años
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-lg md:text-xl text-white font-light"
          >
            17 de Mayo, 2025 • 5:00 PM
          </motion.p>
        </motion.div>
      </section>

      {/* Carousel Section */}
      <section className="py-16 px-4">
        <motion.div style={{ opacity: opacitySection1 }} className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-dancing text-center mb-12 text-[#d4a092]">Momentos Especiales</h2>
          <ImageCarousel />
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-[#f0d4d4]/30 relative overflow-hidden">
        <motion.div
          style={{
            opacity: opacitySection2,
            y: useTransform(scrollYProgress, [0.2, 0.4], [100, 0]),
          }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-dancing mb-8 text-[#d4a092]"
          >
            Sobre Alexa
          </motion.h2>
          <RevealText delay={0.2} className="text-lg mb-8 leading-relaxed">
            Con gran alegría celebro mis quince años, un momento especial en mi vida que quiero compartir con todas las
            personas que quiero. Este día marca el comienzo de una nueva etapa llena de sueños y esperanzas.
          </RevealText>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <Image
                src="/placeholder.svg?key=iv07c"
                alt="Celebración"
                width={300}
                height={300}
                className="rounded-lg mb-4"
              />
              <h3 className="font-medium text-[#d4a092]">Celebración</h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <Image
                src="/placeholder.svg?key=lv0il"
                alt="Baile"
                width={300}
                height={300}
                className="rounded-lg mb-4"
              />
              <h3 className="font-medium text-[#d4a092]">Baile</h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <Image
                src="/placeholder.svg?key=us3db"
                alt="Amigos"
                width={300}
                height={300}
                className="rounded-lg mb-4"
              />
              <h3 className="font-medium text-[#d4a092]">Amigos</h3>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          style={{
            x: useTransform(scrollYProgress, [0.2, 0.4], [-100, 100]),
            opacity: useTransform(scrollYProgress, [0.2, 0.25, 0.4], [0, 1, 0]),
          }}
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-[#f8d0c8]/30 z-0"
        />
        <motion.div
          style={{
            x: useTransform(scrollYProgress, [0.2, 0.4], [100, -100]),
            opacity: useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 1, 0]),
          }}
          className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-[#f8d0c8]/20 z-0"
        />
      </section>

      {/* Event Details */}
      <section className="py-16 px-4 relative overflow-hidden">
        <motion.div
          style={{
            opacity: opacitySection3,
            y: useTransform(scrollYProgress, [0.4, 0.6], [100, 0]),
          }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-dancing mb-8 text-[#d4a092]"
          >
            Detalles del Evento
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-medium mb-4 text-[#d4a092]">Ceremonia</h3>
              <p className="mb-2">17 de Mayo, 2025</p>
              <p className="mb-2">3:00 PM</p>
              <p>Iglesia Santa María</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-medium mb-4 text-[#d4a092]">Recepción</h3>
              <p className="mb-2">17 de Mayo, 2025</p>
              <p className="mb-2">5:00 PM</p>
              <p>San Lorenzo Zitlaltepec</p>
            </motion.div>
          </div>
          <div className="mt-12">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-xl font-medium mb-4 text-[#d4a092]"
            >
              Ubicación
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-4 rounded-lg shadow-md overflow-hidden"
            >
              {/* Componente de mapa */}
              <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                <MapComponent />
              </div>
              <div className="mt-4 text-center">
                <p className="font-medium">San Lorenzo Zitlaltepec</p>
                <p className="text-sm text-muted-foreground">55628 San Juan Zitlaltepec, Méx.</p>
                <Button
                  onClick={openGoogleMaps}
                  variant="outline"
                  size="sm"
                  className="mt-2 border-[#d4a092] text-[#d4a092] hover:bg-[#d4a092]/10"
                >
                  <MapPin className="mr-2 h-4 w-4" /> Ver en Google Maps
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          style={{
            rotate: useTransform(scrollYProgress, [0.4, 0.6], [0, 180]),
            opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]),
          }}
          className="absolute top-40 right-10 w-24 h-24 rounded-full border-4 border-[#f8d0c8]/30 z-0"
        />
        <motion.div
          style={{
            scale: useTransform(scrollYProgress, [0.4, 0.6], [0.5, 1.5]),
            opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]),
          }}
          className="absolute bottom-40 left-10 w-16 h-16 rounded-full bg-[#f8d0c8]/20 z-0"
        />
      </section>

      {/* Special Message Section */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-20 h-20 text-6xl opacity-20 font-dancing text-[#d4a092]">"</div>
            <RevealText className="text-2xl md:text-3xl font-dancing text-[#d4a092] italic mb-6">
              Cada momento es un regalo, cada sonrisa un tesoro. En mis quince años, celebro la vida y los sueños por
              cumplir.
            </RevealText>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 text-6xl opacity-20 font-dancing text-[#d4a092] rotate-180">
              "
            </div>
            <RevealText delay={0.4} className="text-lg text-[#8a5a44]">
              - Alexa
            </RevealText>
          </motion.div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-16 px-4 bg-[#f0d4d4]/30 relative overflow-hidden">
        <motion.div
          style={{
            opacity: opacitySection4,
            y: useTransform(scrollYProgress, [0.6, 0.8], [100, 0]),
          }}
          className="max-w-md mx-auto relative z-10"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-dancing text-center mb-8 text-[#d4a092]"
          >
            Confirma tu Asistencia
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            whileHover={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              y: -5,
            }}
          >
            <Card className="p-6 bg-white">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="guests">Número de invitados</Label>
                  <div className="flex items-center mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="border-[#d4a092] text-[#d4a092]"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      value={guests}
                      onChange={(e) => setGuests(Number.parseInt(e.target.value) || 1)}
                      className="mx-2 text-center"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setGuests(guests + 1)}
                      className="border-[#d4a092] text-[#d4a092]"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button onClick={handleRSVP} className="w-full bg-[#d4a092] hover:bg-[#c08e82] text-white">
                    <Send className="mr-2 h-4 w-4" /> Confirmar por WhatsApp
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          style={{
            x: useTransform(scrollYProgress, [0.6, 0.8], [-100, 100]),
            y: useTransform(scrollYProgress, [0.6, 0.8], [0, -50]),
            opacity: useTransform(scrollYProgress, [0.6, 0.7, 0.8], [0, 1, 0]),
          }}
          className="absolute top-20 left-10 w-28 h-28 rounded-full bg-[#f8d0c8]/20 z-0"
        />
        <motion.div
          style={{
            x: useTransform(scrollYProgress, [0.6, 0.8], [100, -100]),
            y: useTransform(scrollYProgress, [0.6, 0.8], [0, 50]),
            opacity: useTransform(scrollYProgress, [0.6, 0.7, 0.8], [0, 1, 0]),
          }}
          className="absolute bottom-20 right-10 w-20 h-20 rounded-full bg-[#f8d0c8]/30 z-0"
        />
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-sm">
        <p>Con cariño, Alexa y Familia</p>
        <p className="mt-2">© {new Date().getFullYear()} - Quinceañera de Alexa</p>
      </footer>
    </main>
  )
}
