"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Esta función se ejecutará cuando el script de Leaflet esté cargado
    const initMap = () => {
      if (!mapRef.current || typeof window === "undefined" || !window.L) return

      // Coordenadas de San Lorenzo Zitlaltepec
      const lat = 19.81222
      const lng = -99.150112

      // Crear el mapa
      const map = window.L.map(mapRef.current).setView([lat, lng], 15)

      // Añadir capa de mapa de OpenStreetMap
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map)

      // Añadir marcador
      const marker = window.L.marker([lat, lng]).addTo(map)
      marker.bindPopup("<b>San Lorenzo Zitlaltepec</b><br>¡Te esperamos aquí!").openPopup()
    }

    // Si Leaflet ya está cargado, inicializar el mapa
    if (window.L) {
      initMap()
    }

    // Limpiar al desmontar
    return () => {
      if (mapRef.current && window.L) {
        const mapInstance = window.L.DomUtil.get(mapRef.current)
        if (mapInstance && mapInstance._leaflet_id) {
          mapInstance.remove()
        }
      }
    }
  }, [])

  return (
    <>
      {/* Cargar Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />

      {/* Cargar Leaflet JS */}
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin=""
        onLoad={() => {
          if (window.L) {
            // Definir el tipo para window.L
            window.L = window.L
            // Inicializar el mapa cuando el script se cargue
            if (mapRef.current) {
              const lat = 19.81222
              const lng = -99.150112
              const map = window.L.map(mapRef.current).setView([lat, lng], 15)
              window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19,
              }).addTo(map)
              const marker = window.L.marker([lat, lng]).addTo(map)
              marker.bindPopup("<b>San Lorenzo Zitlaltepec</b><br>¡Te esperamos aquí!").openPopup()
            }
          }
        }}
      />

      {/* Contenedor del mapa */}
      <div ref={mapRef} className="w-full h-full rounded-lg" style={{ minHeight: "300px" }} />
    </>
  )
}

// Extender la interfaz Window para incluir Leaflet
declare global {
  interface Window {
    L: any
  }
}
