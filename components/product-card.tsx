"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  id: string
  title: string
  image: string
  price: number
}

export function ProductCard({ id, title, image, price }: ProductCardProps) {
  const [isHighlighted, setIsHighlighted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const toggleHighlight = () => {
    if (!showForm) {
      setIsHighlighted(!isHighlighted)
    }
  }

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: id, amount: price, name, phone }),
      })
      const data = await response.json()
      if (data.success) {
        window.location.href = data.mobileUrl
      } else {
        alert('حدث خطأ أثناء معالجة الطلب')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('حدث خطأ أثناء معالجة طلبك')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card 
      className={cn(
        "border-2 border-purple-500 bg-[#1a0b2e]/50 overflow-hidden backdrop-blur-sm rounded-lg shadow-lg transition-all duration-300",
        isHighlighted ? "ring-2 ring-purple-500 shadow-purple-500/50" : "hover:shadow-purple-500/20"
      )}
      onClick={toggleHighlight}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-white text-right">{title}</h3>
          <p className="text-sm text-purple-400 font-bold mt-1 text-right">{price} ريال</p>
          {!showForm ? (
            <Button 
              onClick={(e) => {
                e.stopPropagation()
                setShowForm(true)
              }}
              className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white"
            >
              شراء الآن
            </Button>
          ) : (
            <form onSubmit={handlePurchase} className="mt-2 space-y-2" onClick={(e) => e.stopPropagation()}>
              <div>
                <Label htmlFor="name" className="text-white">الاسم</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="text-right"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-white">رقم الجوال</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="text-right"
                  type="tel"
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'جاري المعالجة...' : 'تأكيد الشراء'}
              </Button>
            </form>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

