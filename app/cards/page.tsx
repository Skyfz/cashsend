import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { AnimatedCard } from "@/app/components/AnimatedCard"
import { CardListItem, CardListSkeletons } from "@/app/components/CardListItem"
import { Cards } from "@/app/types/cards"
import Link from "next/link"
import { getCards } from "@/lib/db"
import { Card } from "@/components/ui/card"

interface Card {
  _id: string;
  userId: string;
  cardNumber: string;
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  holderName: string;
  isDefault: boolean;
  billingAddress: string;
}

export default async function CardsPage() {
  const session = await auth()
  if (!session?.user?.email) {
    return <div>Please log in to view your cards</div>
  }

  try {
    const rawCards = await getCards(session.user.email)
    
    if (!rawCards || rawCards.length === 0) {
      return (
        <div className="flex w-full p-4">
          <Card className="flex flex-col w-full mx-auto max-w-4xl p-4">    
            <div className="flex flex-col w-full mx-auto pt-8 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Payment Methods</h2>
                <Link href="/cards/new">
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add New Card
                  </Button>
                </Link>
              </div>
              <p className="text-muted-foreground">No cards added yet.</p>
            </div>
          </Card>
        </div>
      )
    }

    const cards = rawCards.map(card => {
      console.log('Processing card:', card)
      const cardNumber = card.cardNumber.replace(/\s+/g, '')
      const last4 = cardNumber.slice(-4)
      const brand = detectCardBrand(cardNumber)
      
      return {
        id: card._id.toString(),
        last4,
        brand,
        holderName: card.holderName || card.userId,
        expiryMonth: card.expiryMonth || 1,
        expiryYear: card.expiryYear || new Date().getFullYear(),
        isDefault: true,
        billingAddress: card.billingAddress
      }
    }) satisfies Cards[]

    console.log('Mapped cards array:', cards)
    const defaultCard = cards.find(card => card.isDefault) || cards[0]
    console.log('Default card:', defaultCard)

    return (
      <div className="flex w-full p-4">
        <Card className="flex flex-col w-full mx-auto max-w-4xl p-4">    
          <div className="flex flex-col w-full mx-auto pt-8 mb-4">
            <div className="w-full flex justify-center mb-6">
              {session && <AnimatedCard session={session} card={defaultCard} />}
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
              {cards.map((card) => (
                <CardListItem key={card.id} card={card} />
              ))}
            </div>
          </div>
        </Card>
      </div>
    )
  } catch (error) {
    console.error('Error fetching cards:', error)
    return (
      <div className="flex w-full p-4">
        <Card className="flex flex-col w-full mx-auto max-w-4xl p-4">    
          <div className="flex flex-col w-full mx-auto pt-8 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Payment Methods</h2>
              <Link href="/cards/new">
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add New Card
                </Button>
              </Link>
            </div>
            <CardListSkeletons count={3} />
          </div>
        </Card>
      </div>
    )
  }
}

function detectCardBrand(cardNumber: string): string {
  const patterns = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/
  }

  for (const [brand, pattern] of Object.entries(patterns)) {
    if (pattern.test(cardNumber)) {
      return brand
    }
  }
  return 'unknown'
}
