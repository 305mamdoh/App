"use client"

import { useState, useEffect } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { WhatsAppButton } from "@/components/whatsapp-button"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const banners = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.PNG-4q281DwPa2k3X7Qm8UpIRBFpXdFoFX.png",
      alt: "مرحبا بكم في متجر DO7"
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-iqVUGITu8XkQvp9gapEPNoS8g9L31t.png",
      alt: "تخيل! اكثر من 1400 تطبيق معدل في جوالك"
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.PNG-NbjrJM1P6Y9RffaxlRnqQkGe1MPJgJ.png",
      alt: "الدعم الفني"
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4.PNG-TZT01xrSWdXt13VrMPjVr7XneSowGI.png",
      alt: "طرق الدفع المتعددة"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length)
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="pb-24">
      <Header />
      
      <section className="mt-4 px-4">
        <h1 className="text-3xl font-bold text-white text-right">
          مرحبًا بك في المتجر
        </h1>
      </section>

      <section className="mt-8 px-4">
        <div className="relative h-40 max-w-3xl mx-auto overflow-hidden rounded-xl border-2 border-purple-500/50">
          {banners.map((banner, index) => (
            <div 
              key={index}
              className={cn(
                "absolute top-0 left-0 w-full h-full transition-opacity duration-1000",
                index === currentSlide ? "opacity-100" : "opacity-0"
              )}
            >
              <Image
                src={banner.src}
                alt={banner.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-center justify-between px-4 mb-4">
          <button className="text-sm text-purple-500">عرض الكل</button>
          <h2 className="text-lg font-semibold text-white">المنتجات المميزة</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 px-4">
          <ProductCard
            id="1"
            title="اشتراك بلس ايفون"
            image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4785.PNG-TSpgJRdEwk9l6Bi0rfvTlcoW9ktzJ6.png"
            price={100}
          />
          <ProductCard
            id="2"
            title="اشتراك بلس ايباد"
            image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4787.PNG-bTVpLB2DUf8GVqPSUu4uDepl3LVoCl.png"
            price={50}
          />
        </div>
      </section>

      <WhatsAppButton />
      <BottomNav />
    </div>
  )
}

