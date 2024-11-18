'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { FaCcVisa } from 'react-icons/fa'

export function CardListItem() {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="relative bg-secondary rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative w-12 h-12 flex items-center justify-center bg-secondary-foreground/20 rounded-lg">
            <FaCcVisa className="w-8 h-8 text-secondary-foreground" />
          </div>
          <div>
            <p className="font-mono text-sm">•••• 4242</p>
            <p className="text-sm text-muted-foreground">Expires 12/25</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">Edit</Button>
      </div>
    </motion.div>
  )
} 