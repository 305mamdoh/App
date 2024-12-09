"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DonationForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, amount }),
      })
      const data = await response.json()
      if (data.success) {
        window.location.href = data.mobileUrl
      } else {
        alert('حدث خطأ أثناء إنشاء الفاتورة')
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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">صفحة التبرع</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-right block">الاسم الكامل</label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="text-right"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-right block">رقم الجوال</label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="text-right"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <Button type="button" variant="outline" onClick={() => preFixedPrice('10')}>10</Button>
                <Button type="button" variant="outline" onClick={() => preFixedPrice('50')} className="mx-2">50</Button>
                <Button type="button" variant="outline" onClick={() => preFixedPrice('100')}>100</Button>
              </div>
              <label htmlFor="amount" className="text-right block">المبلغ (ريال سعودي)</label>
            </div>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="5"
              step="1"
              required
              className="text-right"
            />
          </div>
          <Button type="submit" className="w-full">إتمام التبرع</Button>
        </form>
      </CardContent>
    </Card>
  )
}

