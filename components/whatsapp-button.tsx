import { PhoneIcon as WhatsappIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function getWhatsAppUrl() {
  const phoneNumber = "+966570560016"
  const message = encodeURIComponent("مرحبا، لدي استفسار حول المتجر.")
  return `https://wa.me/${phoneNumber}?text=${message}`
}

export function WhatsAppButton() {
  const whatsappUrl = getWhatsAppUrl()

  return (
    <Button
      className="fixed bottom-20 right-4 z-50 rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg"
      onClick={() => window.open(whatsappUrl, '_blank')}
    >
      <WhatsappIcon className="w-6 h-6 text-white" />
    </Button>
  )
}

