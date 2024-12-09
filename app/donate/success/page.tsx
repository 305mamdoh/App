import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DonationSuccessPage() {
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
            <Link href="/">
              <Button>العودة للصفحة الرئيسية</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
      <BottomNav />
    </div>
  )
}

