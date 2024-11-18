import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { AnimatedCard } from "@/app/components/AnimatedCard"
import { CardListItem } from "@/app/components/CardListItem"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default async function CardsPage() {
  const session = await auth()

  return (
      <div className="flex w-full p-4">
        <Card className="flex flex-col w-full mx-auto max-w-4xl p-4">    
        {/* Cards List Section */}
        <div className="flex flex-col w-full mx-auto pt-8 mb-4">
        {/* Hero Card Section */}
        <div className="w-full flex justify-center mb-6">
          
            {session && <AnimatedCard session={session} />}
          
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Payment Methods</h2>
          <Link href="/cards/new">
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add New Card
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-4">
            <CardListItem />
            {/* Add more CardListItem components as needed */}
          </div>
        </div>
      </Card>
    </div>

  )
}
