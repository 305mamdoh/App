import type { Metadata } from "next"
import { Tajawal } from 'next/font/google'
import "./globals.css"

const tajawal = Tajawal({ subsets: ["arabic"], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: "متجر الألعاب",
  description: "منصة ألعاب حديثة",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className={tajawal.className}>
        <main className="min-h-screen bg-[#1a0b2e]">
          {children}
        </main>
      </body>
    </html>
  )
}

