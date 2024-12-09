"use client"

import { Home, PlusCircle, Trophy, User } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="flex items-center justify-around p-4 bg-black/20 backdrop-blur-xl border-t border-white/5">
        <Link
          href="/profile"
          className={cn(
            "flex flex-col items-center text-gray-400 hover:text-white transition-colors",
            pathname === "/profile" && "text-purple-500"
          )}
        >
          <User size={24} />
        </Link>
        <Link
          href="/achievements"
          className={cn(
            "flex flex-col items-center text-gray-400 hover:text-white transition-colors",
            pathname === "/achievements" && "text-purple-500"
          )}
        >
          <Trophy size={24} />
        </Link>
        <Link
          href="/search"
          className={cn(
            "flex flex-col items-center text-gray-400 hover:text-white transition-colors",
            pathname === "/search" && "text-purple-500"
          )}
        >
          <PlusCircle size={24} />
        </Link>
        <Link
          href="/"
          className={cn(
            "flex flex-col items-center text-gray-400 hover:text-white transition-colors",
            pathname === "/" && "text-purple-500"
          )}
        >
          <Home size={24} />
        </Link>
      </div>
    </nav>
  )
}

