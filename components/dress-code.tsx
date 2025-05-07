import { Shirt, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import RevealText from "@/components/reveal-text"

export default function DressCode() {
  return (
    <Card className="p-6 bg-white border-secondary">
      <div className="text-center">
        <h3 className="text-xl font-dancing text-primary mb-4">Código de Vestimenta</h3>
        <div className="flex justify-center space-x-8 mb-6">
          <div className="flex flex-col items-center">
            <div className="bg-secondary/20 p-3 rounded-full mb-2">
              <Shirt className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm">Caballeros</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-secondary/20 p-3 rounded-full mb-2">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm">Damas</p>
          </div>
        </div>

        <RevealText className="text-foreground mb-4">Se solicita vestimenta formal para la ocasión.</RevealText>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-primary mb-1">Caballeros</p>
            <ul className="space-y-1 text-left">
              <li>• Traje o saco y corbata</li>
              <li>• Camisa de vestir</li>
              <li>• Zapatos formales</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-primary mb-1">Damas</p>
            <ul className="space-y-1 text-left">
              <li>• Vestido de cóctel</li>
              <li>• Conjunto formal</li>
              <li>• Evitar color blanco</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  )
}
