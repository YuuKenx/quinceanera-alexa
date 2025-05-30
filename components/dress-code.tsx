import { Shirt, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import RevealText from "@/components/reveal-text"

export default function DressCode() {
  return (
    <Card className="p-6 bg-beige border-rose-gold">
      <div className="text-center">
        <h3 className="text-xl font-bold text-rose-gold mb-4">Código de Vestimenta</h3>
        <div className="flex justify-center space-x-8 mb-6">
          <div className="flex flex-col items-center">
            <div className="bg-rose-gold-light p-3 rounded-full mb-2">
              <Shirt className="h-8 w-8 text-rose-gold" />
            </div>
            <p className="text-sm">Caballeros</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-rose-gold-light p-3 rounded-full mb-2">
              <Sparkles className="h-8 w-8 text-rose-gold" />
            </div>
            <p className="text-sm">Damas</p>
          </div>
        </div>

        <RevealText className="text-foreground mb-4">Se solicita vestimenta formal para la ocasión. Por favor</RevealText>
      </div>
    </Card>
  )
}
