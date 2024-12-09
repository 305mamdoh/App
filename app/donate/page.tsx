import { DonationForm } from "@/components/donation-form"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"

export default function DonatePage() {
  return (
    <div className="pb-24">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <DonationForm />
      </main>
      <BottomNav />
    </div>
  )
}

