"use client"

import { Heart, Music, Cake, Camera, Gift } from "lucide-react"

export default function InteractiveTimeline() {
  const events = [
    {
      time: "3:00 PM",
      title: "Ceremonia Religiosa",
      description: "Misa de acción de gracias en la Iglesia San Juan Bautista",
      icon: <Heart className="h-5 w-5 text-white" />,
    },
    {
      time: "5:00 PM",
      title: "Recepción",
      description: "Bienvenida a los invitados en San Lorenzo Zitlaltepec",
      icon: <Gift className="h-5 w-5 text-white" />,
    },
    {
      time: "6:00 PM",
      title: "Vals y Primer Baile",
      description: "Momento especial con chambelanes y familia",
      icon: <Music className="h-5 w-5 text-white" />,
    },
    {
      time: "7:30 PM",
      title: "Cena",
      description: "Disfruta de un menú especialmente seleccionado",
      icon: <Cake className="h-5 w-5 text-white" />,
    },
    {
      time: "9:00 PM",
      title: "Fiesta",
      description: "Baile y celebración",
      icon: <Music className="h-5 w-5 text-white" />,
    },
    {
      time: "11:00 PM",
      title: "Recuerdo Fotográfico",
      description: "Sesión de fotos con todos los invitados",
      icon: <Camera className="h-5 w-5 text-white" />,
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-center text-rose-gold mb-10">Cronograma del Evento</h3>

      <div className="relative">
        {/* Línea vertical central */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-rose-gold/30 transform -translate-x-1/2" />

        <div className="space-y-12">
          {events.map((event, index) => (
            <div
              key={index}
              className={`relative flex items-start ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
            >
              {/* Punto en la línea de tiempo */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-rose-gold flex items-center justify-center z-10">
                {event.icon}
              </div>

              {/* Contenido */}
              <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="text-rose-gold font-bold mb-1">{event.time}</div>
                  <h4 className="text-lg font-semibold mb-2">{event.title}</h4>
                  <p className="text-gray-600 text-sm">{event.description}</p>
                </div>
              </div>

              {/* Espacio para el otro lado */}
              <div className="w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
