"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Music, MicOff, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import CountdownTimer from "@/components/countdown-timer"
import ImageCarousel from "@/components/image-carousel"
import FloatingElements from "@/components/floating-elements"
import RevealText from "@/components/reveal-text"
import MapComponent from "@/components/map-component"
import RSVPForm from "@/components/rsvp-form"
import DressCode from "@/components/dress-code"
import ParticleBackground from "@/components/particle-background"
// Comentamos la importación del cronograma temporalmente
// import InteractiveTimeline from "@/components/interactive-timeline"
import ConfettiButton from "@/components/confetti-button"

export default function Home() {
  const [showModal, setShowModal] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const { scrollYProgress } = useScroll()
  const audioRef = useRef<HTMLAudioElement>(null)

  const opacitySection1 = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const opacitySection2 = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
  const opacitySection3 = useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
  const opacitySection4 = useTransform(scrollYProgress, [0.6, 0.8], [0, 1])

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error)
        setIsPlaying(false)
      })
    } else if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [isPlaying])

  const openGoogleMaps = () => {
    window.open("https://maps.app.goo.gl/DwjoHB5LxES281S89", "_blank")
  }

  const eventDate = new Date("2025-05-17T17:00:00-06:00") // CDMX time zone (UTC-6)

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-beige-light to-beige text-gray-800">
      <ParticleBackground />
      <FloatingElements />

      {/* Background Music - Actualizado con el nuevo nombre de archivo */}
      <audio ref={audioRef} loop>
        <source src="/music/musica.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Music Control */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed top-4 right-4 z-50 p-2 bg-rose-gold-light rounded-full shadow-md hover:bg-rose-gold transition-all"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? <MicOff size={20} className="text-white" /> : <Music size={20} className="text-white" />}
      </button>

      {/* Countdown Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <Card className="w-[90%] max-w-md p-6 bg-beige border-rose-gold shadow-xl">
            <h2 className="text-2xl text-center mb-4 text-rose-gold font-bold">Faltan</h2>
            <CountdownTimer targetDate={eventDate} />
            <p className="text-center mt-4 mb-6 font-light">Para los XV de Alexa</p>
            <Button
              onClick={() => setShowModal(false)}
              className="w-full bg-rose-gold hover:bg-rose-gold/80 text-white"
            >
              Continuar al sitio
            </Button>
          </Card>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/1.jpg" alt="Alexa Quinceañera" fill className="object-cover" priority />
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
            className="text-5xl md:text-7xl font-bold text-white mb-4"
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8"
          >
            <ConfettiButton />
          </motion.div>
        </motion.div>
      </section>

      {/* Carousel Section */}
      <section className="py-16 px-4">
        <motion.div style={{ opacity: opacitySection1 }} className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-rose-gold mb-12">Momentos Especiales</h2>
          <ImageCarousel />
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-rose-gold-light/50 relative overflow-hidden">
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
            className="text-3xl md:text-4xl font-bold mb-8 text-rose-gold"
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
                src="/images/3.jpg"
                alt="Celebración"
                width={300}
                height={300}
                className="rounded-lg mb-4 w-full h-64 object-cover"
              />
              <h3 className="font-medium text-rose-gold">Celebración</h3>
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
                src="/images/5.jpg"
                alt="Tradición"
                width={300}
                height={300}
                className="rounded-lg mb-4 w-full h-64 object-cover"
              />
              <h3 className="font-medium text-rose-gold">Tradición</h3>
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
                src="/images/1.jpg"
                alt="Invitación"
                width={300}
                height={300}
                className="rounded-lg mb-4 w-full h-64 object-cover"
              />
              <h3 className="font-medium text-rose-gold">Invitación</h3>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Se ha eliminado temporalmente la sección del cronograma */}

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
            className="text-3xl md:text-4xl font-bold mb-8 text-rose-gold"
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
              <h3 className="text-xl font-medium mb-4 text-rose-gold">Ceremonia</h3>
              <p className="mb-2">17 de Mayo, 2025</p>
              <p className="mb-2">3:00 PM</p>
              <p>Iglesia San Juan Bautista</p>
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
              <h3 className="text-xl font-medium mb-4 text-rose-gold">Recepción</h3>
              <p className="mb-2">17 de Mayo, 2025</p>
              <p className="mb-2">5:00 PM</p>
              <p>San Lorenzo Zitlaltepec</p>
            </motion.div>
          </div>

          {/* Dress Code */}
          <div className="mt-12">
            <DressCode />
          </div>

          {/* Map */}
          <div className="mt-12">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-xl font-medium mb-4 text-rose-gold"
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
                  className="mt-2 border-rose-gold text-rose-gold hover:bg-rose-gold/80"
                >
                  <MapPin className="mr-2 h-4 w-4" /> Ver en Google Maps
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
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
            <div className="absolute -top-10 -left-10 w-20 h-20 text-6xl opacity-20 font-bold text-rose-gold">"</div>
            <RevealText className="text-2xl md:text-3xl italic mb-6 text-rose-gold">
              Cada momento es un regalo, cada sonrisa un tesoro. En mis quince años, celebro la vida y los sueños por
              cumplir.
            </RevealText>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 text-6xl opacity-20 font-bold text-rose-gold rotate-180">
              "
            </div>
            <RevealText delay={0.4} className="text-lg text-gray-700">
              - Alexa
            </RevealText>
          </motion.div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-16 px-4 bg-rose-gold-light/50 relative overflow-hidden">
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
            className="text-3xl md:text-4xl font-bold text-center mb-8 text-rose-gold"
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
            <RSVPForm />
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-sm">
        <p>Con cariño, Alexa y Familia</p>
        <p className="mt-2">© {new Date().getFullYear()} - Mis XV años - Alexa</p>
      </footer>
    </main>
  )
}
