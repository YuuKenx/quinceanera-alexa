"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Music, MicOffIcon as MusicOff, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import CountdownTimer from "@/components/countdown-timer"
import ImageCarousel from "@/components/image-carousel"
import FloatingElements from "@/components/floating-elements"
import ParallaxImage from "@/components/parallax-image"
import RevealText from "@/components/reveal-text"
import MapComponent from "@/components/map-component"
import RSVPForm from "@/components/rsvp-form"

export default function Home() {
  const [showModal, setShowModal] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
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

    // Manejar visibilidad de la página para pausar la música cuando el usuario sale
    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying) {
        audio?.pause()
      } else if (!document.hidden && isPlaying) {
        audio?.play().catch((err) => console.error("Error al reanudar audio:", err))
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [isPlaying])

  const openGoogleMaps = () => {
    window.open("https://maps.app.goo.gl/DwjoHB5LxES281S89", "_blank")
  }

  // Corregimos la fecha para que sea futura
  const currentYear = new Date().getFullYear()
  const eventYear = currentYear + 1 // Siempre un año en el futuro para que el contador funcione
  const eventDate = new Date(eventYear, 4, 17, 17, 0, 0) // Mayo es 4 (0-indexed)

  console.log("Fecha del evento:", eventDate.toString())

  const closeModal = () => {
    console.log("Cerrando modal...")
    setShowModal(false)
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 text-pink-900">
      <FloatingElements />
      {/* Background Music */}
      <audio id="background-music" loop>
        <source src="/music/ekkojinx.mp3" type="audio/mp3" />
      </audio>

      {/* Music Control */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed top-4 right-4 z-50 p-2 bg-secondary rounded-full shadow-md hover:bg-amber-300 transition-all"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? <MusicOff size={20} /> : <Music size={20} />}
      </button>

      {/* Countdown Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <Card className="w-[90%] max-w-md p-6 bg-white border-secondary shadow-xl">
            <h2 className="text-2xl font-dancing text-center mb-4 text-primary">Faltan</h2>
            <CountdownTimer targetDate={eventDate} />
            <p className="text-center mt-4 mb-6 font-light">Para la quinceañera de Alexa</p>
            <Button onClick={closeModal} className="w-full bg-primary hover:bg-pink-600 text-white">
              Continuar al sitio
            </Button>
          </Card>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ParallaxImage src="/images/1.jpg" alt="Fondo de quinceañera" className="absolute inset-0" />
          <div className="absolute inset-0 bg-pink-900/40" />
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
            17 de Mayo, {eventYear} • 5:00 PM
          </motion.p>
        </motion.div>
      </section>

      {/* Carousel Section */}
      <section className="py-16 px-4">
        <motion.div style={{ opacity: opacitySection1 }} className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-dancing text-center mb-12 text-pink-500">Momentos Especiales</h2>
          <ImageCarousel />
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-pink-100/70 relative overflow-hidden">
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
            className="text-3xl md:text-4xl font-dancing mb-8 text-pink-500"
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
              <Image src="/images/1.jpg" alt="Celebración" width={300} height={300} className="rounded-lg mb-4" />
              <h3 className="font-medium text-pink-500">Celebración</h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <Image src="/images/2.jpg" alt="Baile" width={300} height={300} className="rounded-lg mb-4" />
              <h3 className="font-medium text-pink-500">Baile</h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <Image src="/images/3.jpg" alt="Amigos" width={300} height={300} className="rounded-lg mb-4" />
              <h3 className="font-medium text-pink-500">Amigos</h3>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          style={{
            x: useTransform(scrollYProgress, [0.2, 0.4], [-100, 100]),
            opacity: useTransform(scrollYProgress, [0.2, 0.25, 0.4], [0, 1, 0]),
          }}
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-pink-300/50 z-0"
        />
        <motion.div
          style={{
            x: useTransform(scrollYProgress, [0.2, 0.4], [100, -100]),
            opacity: useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 1, 0]),
          }}
          className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-pink-200/50 z-0"
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
            className="text-3xl md:text-4xl font-dancing mb-8 text-pink-500"
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
              <h3 className="text-xl font-medium mb-4 text-pink-500">Ceremonia</h3>
              <p className="mb-2">17 de Mayo, {eventYear}</p>
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
              <h3 className="text-xl font-medium mb-4 text-pink-500">Recepción</h3>
              <p className="mb-2">17 de Mayo, {eventYear}</p>
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
              className="text-xl font-medium mb-4 text-pink-500"
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
                  className="mt-2 border-pink-400 text-pink-500 hover:bg-pink-100"
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
          className="absolute top-40 right-10 w-24 h-24 rounded-full border-4 border-pink-300/50 z-0"
        />
        <motion.div
          style={{
            scale: useTransform(scrollYProgress, [0.4, 0.6], [0.5, 1.5]),
            opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]),
          }}
          className="absolute bottom-40 left-10 w-16 h-16 rounded-full bg-pink-200/50 z-0"
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
            <div className="absolute -top-10 -left-10 w-20 h-20 text-6xl opacity-20 font-dancing text-pink-500">"</div>
            <RevealText className="text-2xl md:text-3xl font-dancing text-pink-500 italic mb-6">
              Cada momento es un regalo, cada sonrisa un tesoro. En mis quince años, celebro la vida y los sueños por
              cumplir.
            </RevealText>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 text-6xl opacity-20 font-dancing text-pink-500 rotate-180">
              "
            </div>
            <RevealText delay={0.4} className="text-lg text-pink-800">
              - Alexa
            </RevealText>
          </motion.div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-16 px-4 bg-muted relative overflow-hidden">
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
            className="text-3xl md:text-4xl font-dancing text-center mb-8 text-primary"
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
      <footer className="py-8 px-4 text-center text-sm bg-pink-50 text-pink-800">
        <p>Con cariño, Alexa y Familia</p>
        <p className="mt-2">© {new Date().getFullYear()} - XV años de Alexa</p>
      </footer>
    </main>
  )
}
