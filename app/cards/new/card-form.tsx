'use client'

import { useState } from 'react'
import { CreditCard, Check, MapPin, AlertCircle, CheckCircle } from 'lucide-react'
import { FaPaypal ,FaGoogle ,FaApple} from 'react-icons/fa'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from 'next/navigation'

interface CardFormProps {
  userEmail: string
}

export default function CardForm({ userEmail }: CardFormProps) {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardNumber, setCardNumber] = useState('')
  const [address, setAddress] = useState('')
  const [openAddressSearch, setOpenAddressSearch] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string>('')

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    const groups = cleaned.match(/.{1,4}/g)
    return groups ? groups.join('-') : cleaned
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    // Only update if length is valid (max 19 chars: 16 digits + 3 dashes)
    if (formatted.length <= 19) {
      setCardNumber(formatted)
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (paymentMethod === 'card') {
      // Check for exact card number length (16 digits + 3 dashes = 19 chars)
      if (!cardNumber) {
        newErrors.cardNumber = 'Card number is required'
      } else if (cardNumber.length < 19) {
        newErrors.cardNumber = 'Please enter a complete card number'
      }

      // Validate card type using regex patterns
      const cleanNumber = cardNumber.replace(/[-\s]/g, '')
      const cardPatterns = {
        "Visa": /^4[0-9]{15}$/,
        "Mastercard": /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/,
        "Amex": /^3[47][0-9]{13}$/,
        "Discover": /^6(?:011|5[0-9]{2})[0-9]{12}$/
      }

      let isValidCardType = false
      for (const [, pattern] of Object.entries(cardPatterns)) {
        if (pattern.test(cleanNumber)) {
          isValidCardType = true
          break
        }
      }

      if (!isValidCardType && cardNumber.length === 19) {
        newErrors.cardNumber = 'Invalid card number'
      }

      if (!address) newErrors.address = 'Billing address is required'
      if (!(document.getElementById('name') as HTMLInputElement)?.value) newErrors.name = 'Name is required'
      if (!(document.getElementById('cvc') as HTMLInputElement)?.value) newErrors.cvc = 'CVC is required'
      
      const month = (document.querySelector('[name="cc-exp-month"]') as HTMLInputElement)?.value
      const year = (document.querySelector('[name="cc-exp-year"]') as HTMLInputElement)?.value
      
      if (!month || !year) {
        newErrors.expiry = 'Expiry date is required'
      }

      const cvcValue = (document.getElementById('cvc') as HTMLInputElement)?.value
      if (!cvcValue) {
        newErrors.cvc = 'CVC is required'
      } else if (cvcValue.length < 3) {
        newErrors.cvc = 'CVC must be at least 3 digits'
      } else if (cvcValue.length > 4) {
        newErrors.cvc = 'CVC cannot be more than 4 digits'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    if (!validateForm()) {
      setIsSubmitting(false)
      return
    }

    try {
      const nameInput = document.getElementById('name') as HTMLInputElement
      const monthSelect = document.querySelector('[name="cc-exp-month"]') as HTMLSelectElement
      const yearSelect = document.querySelector('[name="cc-exp-year"]') as HTMLSelectElement

      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userEmail,
          cardNumber: cardNumber.replace(/-/g, ''),
          holderName: nameInput.value,
          expiryMonth: parseInt(monthSelect.value),
          expiryYear: parseInt(yearSelect.value),
          billingAddress: address,
          isDefault: true // Make first card default
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save card')
      }

      setSuccessMessage('Payment details successfully saved')
      router.push('/cards')
    } catch (error) {
      console.error('Error saving card:', error)
      setErrors({ submit: 'Failed to save card. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }
  

  return (
    <Card className="w-full max-h-[100vh-3rem]" >
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>Add a new payment method to your account.</CardDescription>
      </CardHeader>
      
      <CardContent>
        {/* Payment Method Selection */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Button
            variant={paymentMethod === 'card' ? 'default' : 'outline'}
            onClick={() => setPaymentMethod('card')}
            className="flex flex-col items-center gap-2 h-20 w-full"
          >
            <CreditCard className="h-12 w-12" />
            Card
          </Button>
          <Button
            variant={paymentMethod === 'paypal' ? 'default' : 'outline'}
            onClick={() => setPaymentMethod('paypal')}
            className="flex flex-col items-center gap-2 h-20 w-full"
          >
            <FaPaypal className="h-12 w-12" />
            PayPal
          </Button>
          <Button
            variant={paymentMethod === 'apple' ? 'default' : 'outline'}
            onClick={() => setPaymentMethod('apple')}
            className="flex flex-col items-center gap-2 h-20 w-full"
          >
            <FaApple className="h-12 w-12" />
            Apple
          </Button>
          <Button
            variant={paymentMethod === 'google' ? 'default' : 'outline'}
            onClick={() => setPaymentMethod('google')}
            className="flex flex-col items-center gap-2 h-20 w-full"
          >
            <FaGoogle className="h-12 w-12" />
            Google
          </Button>
        </div>

        {/* Card Details Form */}
        {paymentMethod === 'card' && (
          <form 
            className="space-y-4" 
            autoComplete="on"
            method="post"
            onSubmit={handleSubmit}
            action="https://your-secure-endpoint.com/payments"
          >
            {successMessage && (
              <Alert variant="default">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}

            {errors.submit && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.submit}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  name="ccname"
                  autoComplete="cc-name"
                  placeholder="First Last" 
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
              </div>
              
              <div className="col-span-2 space-y-4">
                <Label>Billing Address</Label>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full justify-start text-left font-normal"
                    onClick={() => setAddress('123 Main Street, London, UK')}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Use Main Address
                  </Button>
                  
                  <Popover open={openAddressSearch} onOpenChange={setOpenAddressSearch}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        type="button"
                        role="combobox"
                        aria-expanded={openAddressSearch}
                        className="w-full justify-between"
                        onClick={() => setOpenAddressSearch(true)}
                      >
                        {address || "Search address..."}
                        <MapPin className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                      <Command>
                        <CommandInput 
                          placeholder="Search address..."
                        />
                        <CommandGroup>
                          <CommandItem
                            onSelect={() => {
                              setAddress('123 Oxford Street, London, W1D 1NU')
                              setOpenAddressSearch(false)
                            }}
                          >
                            <MapPin className="mr-2 h-4 w-4" />
                            123 Oxford Street, London, W1D 1NU
                          </CommandItem>
                          <CommandItem
                            onSelect={() => {
                              setAddress('456 Baker Street, London, NW1 6XE')
                              setOpenAddressSearch(false)
                            }}
                          >
                            <MapPin className="mr-2 h-4 w-4" />
                            456 Baker Street, London, NW1 6XE
                          </CommandItem>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label htmlFor="card-number">Card number</Label>
                <Input 
                  id="card-number"
                  name="cardnumber"
                  autoComplete="cc-number"
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234-5678-9012-3456"
                  maxLength={19}
                  className={errors.cardNumber ? 'border-red-500' : ''}
                />
                {errors.cardNumber && (
                  <p className="text-sm text-red-500 mt-1">{errors.cardNumber}</p>
                )}
              </div>

              <div>
                <Label>Expires</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Select 
                    name="cc-exp-month" 
                    autoComplete="cc-exp-month"
                  >
                    <SelectTrigger className={errors.expiry ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1)}>
                          {String(i + 1).padStart(2, '0')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select 
                    name="cc-exp-year" 
                    autoComplete="cc-exp-year"
                  >
                    <SelectTrigger className={errors.expiry ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => (
                        <SelectItem 
                          key={i} 
                          value={String(new Date().getFullYear() + i)}
                        >
                          {new Date().getFullYear() + i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {errors.expiry && (
                  <p className="text-sm text-red-500 mt-1">{errors.expiry}</p>
                )}
              </div>

              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input 
                  id="cvc"
                  name="cvc"
                  autoComplete="cc-csc"
                  inputMode="numeric"
                  pattern="\d*"
                  onKeyDown={(e) => {
                    // Only allow numeric input and control keys
                    if (
                      !/[0-9]/.test(e.key) && 
                      !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                  placeholder="CVC" 
                  minLength={3}
                  maxLength={4}
                  className={errors.cvc ? 'border-red-500' : ''}
                />
                {errors.cvc && (
                  <p className="text-sm text-red-500 mt-1">{errors.cvc}</p>
                )}
              </div>
            </div>

            <CardFooter>
              <Button 
                className="w-full" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Continue'}
              </Button>
            </CardFooter>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
