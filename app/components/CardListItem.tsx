'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa'
import type { Cards } from '@/app/types/cards'
import { Skeleton } from "@/components/ui/skeleton"

const CardBrandIcon = ({ brand }: { brand: string }) => {
  switch (brand.toLowerCase()) {
    case 'visa': return <FaCcVisa className="w-8 h-8 text-secondary-foreground" />
    case 'mastercard': return <FaCcMastercard className="w-8 h-8 text-secondary-foreground" />
    case 'amex': return <FaCcAmex className="w-8 h-8 text-secondary-foreground" />
    default: return <FaCcVisa className="w-8 h-8 text-secondary-foreground" />
  }
}

export function CardListItemSkeleton() {
  return (
    <div className="relative bg-secondary rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <div>
            <Skeleton className="w-24 h-4 mb-2" />
            <Skeleton className="w-20 h-4" />
          </div>
        </div>
        <Skeleton className="w-16 h-8" />
      </div>
    </div>
  )
}

export function CardListSkeletons({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <CardListItemSkeleton key={index} />
      ))}
    </div>
  )
}

export function CardListItem({ card }: { card: Cards }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="relative bg-secondary rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative w-12 h-12 flex items-center justify-center bg-secondary-foreground/20 rounded-lg">
            <CardBrandIcon brand={card.brand} />
          </div>
          <div>
            <p className="font-mono text-sm">•••• {card.last4}</p>
            <p className="text-sm text-muted-foreground">
              Expires {card.expiryMonth.toString().padStart(2, '0')}/{card.expiryYear.toString().slice(-2)}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm">Edit</Button>
      </div>
    </motion.div>
  )
} 