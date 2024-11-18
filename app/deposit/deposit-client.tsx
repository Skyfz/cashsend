'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from 'next/link'

interface DepositClientProps {
  user: {
    id: string
    email?: string | null
  }
  cards: {
    id: string
    last4: string
    brand: string
  }[]
}

// Update form schema
const formSchema = z.object({
  cardId: z.string().min(1, "Please select a card"),
  amount: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 10, {
    message: "Please enter a valid amount greater than 10",
  }),
})

export default function DepositClient({ user, cards }: DepositClientProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardId: "",
      amount: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(values.amount),
          userId: user.id,
          cardId: values.cardId,
        }),
      })

      if (!response.ok) {
        throw new Error('Deposit failed')
      }

      router.refresh()
      router.push('/dashboard')
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full p-4 max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Make a Deposit</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="cardId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Card</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a card" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {cards && cards.length > 0 ? (
                            cards.map((card) => (
                              <SelectItem key={card.id} value={card.id}>
                                {card.brand} •••• {card.last4}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="p-2 text-center">
                              <p className="text-sm text-muted-foreground">No cards found</p>
                              <Link 
                                href="/cards/new" 
                                className="text-sm text-primary hover:underline"
                              >
                                + Add a new card
                              </Link>
                            </div>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (R)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Processing..." : "Deposit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}