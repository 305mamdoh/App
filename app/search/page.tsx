"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BottomNav } from "@/components/bottom-nav"
import { Header } from "@/components/header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [amount, setAmount] = useState("")

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, amount: parseFloat(amount) }),
      })
      const data = await response.json()
      if (data.success) {
        router.push(data.mobileUrl)
      } else {
        alert('حدث خطأ أثناء معالجة الدفع')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('حدث خطأ أثناء معالجة طلبك')
    }
  }

  const preFixedPrice = (value: string) => {
    setAmount(value)
  }

  return (
    <div className="pb-24">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-md mx-auto overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 opacity-50 animate-pulse"></div>
          <CardHeader className="relative z-10 bg-gray-900/80 backdrop-blur-sm">
            <CardTitle className="text-2xl font-bold text-center text-white">صفحة الدفع</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 bg-gray-900/80 backdrop-blur-sm">
            <form onSubmit={handlePayment} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-right block text-white">الاسم الكامل</label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="text-right bg-gray-800/50 border-purple-500 text-white"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-right block text-white">رقم الجوال</label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="text-right bg-gray-800/50 border-purple-500 text-white"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <Button type="button" variant="outline" onClick={() => preFixedPrice('10')} className="bg-gray-800/50 text-white border-purple-500 hover:bg-purple-600">10</Button>
                    <Button type="button" variant="outline" onClick={() => preFixedPrice('50')} className="mx-2 bg-gray-800/50 text-white border-purple-500 hover:bg-purple-600">50</Button>
                    <Button type="button" variant="outline" onClick={() => preFixedPrice('100')} className="bg-gray-800/50 text-white border-purple-500 hover:bg-purple-600">100</Button>
                  </div>
                  <label htmlFor="amount" className="text-right block text-white">المبلغ (ريال سعودي)</label>
                </div>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  step="1"
                  required
                  className="text-right bg-gray-800/50 border-purple-500 text-white"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300 transform hover:scale-105">
                إتمام الدفع
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  )
}

