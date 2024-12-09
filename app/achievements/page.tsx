"use client"

import { useEffect, useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { Header } from "@/components/header"
import { Diamond, Award, Medal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation'

interface Supporter {
  name: string
  amount: number
}

function SupporterCard({ name, amount, rank }: { name: string; amount: number; rank: number }) {
  let BadgeIcon = Award
  let badgeColor = "text-gray-400"
  let animationClass = ""

  if (rank === 1) {
    BadgeIcon = Diamond
    badgeColor = "text-yellow-400"
    animationClass = "animate-pulse"
  } else if (rank === 2) {
    badgeColor = "text-gray-300"
    animationClass = "animate-bounce"
  } else if (rank === 3) {
    BadgeIcon = Medal
    badgeColor = "text-yellow-600"
    animationClass = "animate-spin-slow"
  }

  return (
    <div className={`flex items-center justify-between bg-gray-800/50 rounded-lg p-4 mb-4 ${rank <= 3 ? 'border-2 border-purple-500' : ''}`}>
      <div className="text-2xl font-bold text-gray-500">#{rank}</div>
      <div className="flex items-center">
        <div className="text-right">
          <h3 className="text-white font-semibold">{name}</h3>
          <p className="text-purple-400">{amount} ريال</p>
        </div>
        <div className={`mr-4 ${badgeColor} ${animationClass}`}>
          <BadgeIcon size={24} />
        </div>
      </div>
    </div>
  )
}

export default function AchievementsPage() {
  const [supporters, setSupporters] = useState<Supporter[]>([])
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetchSupporters()
  }, [])

  const fetchSupporters = async () => {
    const response = await fetch('/api/supporters')
    const data = await response.json()
    setSupporters(data.sort((a: Supporter, b: Supporter) => b.amount - a.amount))
  }

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, amount: parseFloat(amount) }),
      })
      const data = await response.json()
      if (data.success) {
        router.push(data.mobileUrl)
      } else {
        alert('حدث خطأ أثناء معالجة التبرع')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('حدث خطأ أثناء معالجة طلبك')
    }
  }

  return (
    <div className="pb-24">
      <Header />
      
      <section className="mt-4 px-4">
        <h1 className="text-3xl font-bold text-white mb-6 text-right">أفضل الداعمين</h1>
        
        <Card className="w-full max-w-md mx-auto mb-8 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 opacity-50 animate-pulse"></div>
          <CardHeader className="relative z-10 bg-gray-900/80 backdrop-blur-sm">
            <CardTitle className="text-2xl font-bold text-center text-white">تبرع الآن</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 bg-gray-900/80 backdrop-blur-sm">
            <form onSubmit={handleDonation} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-right block text-white">الاسم</label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="text-right bg-gray-800/50 border-purple-500 text-white"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="amount" className="text-right block text-white">المبلغ (ريال)</label>
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
                تبرع
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {supporters.map((supporter, index) => (
            <SupporterCard
              key={supporter.name}
              name={supporter.name}
              amount={supporter.amount}
              rank={index + 1}
            />
          ))}
        </div>
      </section>

      <BottomNav />
    </div>
  )
}

