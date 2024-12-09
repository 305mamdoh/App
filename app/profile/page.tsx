import { BottomNav } from "@/components/bottom-nav"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { getWhatsAppUrl } from "@/components/whatsapp-button"

export default function ProfilePage() {
  return (
    <div className="pb-24">
      <Header />
      
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-32 h-32 relative mb-6 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl animate-spin-slow"></div>
          <div className="absolute inset-0.5 bg-[#1a0b2e] rounded-xl"></div>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4813.PNG-QWJs31OS9BVPPcl4b7rbsStP1uaUxQ.png"
            alt="شعار المتجر"
            fill
            className="object-contain p-2 rounded-xl"
          />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">متجر دوح بلس</h1>
        <p className="text-purple-400 mb-6">الإصدار 1.0.0</p>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md animate-pulse"></div>
          <Button className="relative bg-[#1a0b2e] hover:bg-[#2a1b3e] text-white px-6 py-2 rounded-md" onClick={() => window.open(getWhatsAppUrl(), '_blank')}>
            تواصل معنا
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

