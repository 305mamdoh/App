"use client"

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DonationSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const updateSupporters = async () => {
      const transactionNo = searchParams.get('transactionNo')
      if (transactionNo) {
        try {
          const response = await fetch('/api/update-supporters', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transactionNo }),
          })
          if (!response.ok) {
            console.error('Failed to update supporters')
          }
        } catch (error) {
          console.error('Error updating supporters:', error)
        }
      }
    }

    updateSupporters()
  }, [searchParams])

  return (
    <div className="pb-24">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">تم التبرع بنجاح</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-xl mb-4">شكراً لدعمكم</p>
            <Button onClick={() => router.push('/achievements')}>العودة لصفحة أفضل الداعمين</Button>
          </CardContent>
        </Card>
      </main>
      <BottomNav />
    </div>
  )
}

