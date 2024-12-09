import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface GameCardProps {
  title: string
  image: string
  slug: string
  price: number
  size?: "small" | "large"
}

export function GameCard({ title, image, slug, price, size = "large" }: GameCardProps) {
  return (
    <Link href={`/games/${slug}`}>
      <Card className="border-0 bg-transparent">
        <CardContent className="p-0">
          <div className={cn(
            "relative overflow-hidden rounded-xl",
            size === "large" ? "aspect-[3/4]" : "aspect-[2/1]"
          )}>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
          <div className="mt-2">
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="text-sm text-purple-400 font-bold">{price} SAR</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

