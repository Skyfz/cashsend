'use client'

import { motion } from 'framer-motion'
import { Session } from 'next-auth'
import type { Cards } from '@/app/types/cards'

export function AnimatedCard({ session, card }: { session: Session; card?: Cards }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className=""
    >
      {/* Decorative Elements - Adjusted for better glow effects */}
      <div className="absolute top-10 right-20 w-48 h-48 bg-white/20 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-10 w-56 h-56 bg-black/30 rounded-full blur-2xl" />
      
      {/* Credit Card Preview */}
      <div className="max-w-md mx-auto">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="relative aspect-[1.586/1] bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 shadow-2xl 
          before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-black/20 before:pointer-events-none
          border border-white/10 backdrop-blur-sm"
        >
          <div className="absolute -inset-[1px] bg-gradient-to-br from-white/10 via-transparent to-black/20 rounded-2xl pointer-events-none" />
          
          <div className="absolute top-4 right-4">
            <svg className="w-12 h-12 text-white/90" viewBox="0 0 48 48" fill="currentColor">
              {/* Visa/Mastercard SVG path here */}
            </svg>
          </div>
          <div className="h-full flex flex-col justify-between text-white/90">
            <div className="space-y-2">
              <div className="w-12 h-8 bg-gradient-to-r from-amber-400 to-amber-300 rounded" />
              <div className="pt-4 font-mono text-xl tracking-wider">
                •••• •••• •••• {card?.last4 || '4242'}
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-white/60">Card Holder</p>
                <p className="font-medium">{card?.holderName || session?.user?.name || 'Card Holder'}</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Expires</p>
                <p className="font-medium">
                  {card 
                    ? `${card.expiryMonth.toString().padStart(2, '0')}/${card.expiryYear.toString().slice(-2)}`
                    : '12/25'
                  }
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
} 