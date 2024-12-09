import { ChevronRight } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/')
  }

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <button 
          onClick={handleBack} 
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="العودة للصفحة الرئيسية"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">D07</span>
      </div>
    </div>
  )
}

