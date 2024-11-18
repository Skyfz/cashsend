'use client'

import { useState } from 'react'
import { CreditCard, Check, MapPin } from 'lucide-react'
import { FaPaypal ,FaGoogle ,FaApple} from 'react-icons/fa'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"


type AddressResult = {
  id: string;
  address: string;
}

const mockAddresses: AddressResult[] = [
  { id: '1', address: '123 Oxford Street, London, W1D 1NU' },
  { id: '2', address: '456 Baker Street, London, NW1 6XE' },
  { id: '3', address: '789 Regent Street, London, W1B 4DN' },
  { id: '4', address: '321 Bond Street, London, W1S 1PJ' },
  { id: '5', address: '654 Carnaby Street, London, W1F 7DW' },
];

export default function CardForm({ session }) {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardNumber, setCardNumber] = useState('')
  const [searchValue, setSearchValue] = useState("")
  const [address, setAddress] = useState('')
  const [openAddressSearch, setOpenAddressSearch] = useState(false)
  const [filteredAddresses, setFilteredAddresses] = useState(mockAddresses)

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    const groups = cleaned.match(/.{1,4}/g)
    return groups ? groups.join('-') : cleaned
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    // Limit to 19 characters (16 digits + 3 dashes)
    if (formatted.length <= 19) {
      setCardNumber(formatted)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission securely here
    // Should submit to a secure HTTPS endpoint
    // Example:
    // await fetch('https://api.yourservice.com/payments', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData)
    // })
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
    const filtered = mockAddresses.filter(item => 
      item.address.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredAddresses(filtered)
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
            Apple Pay
          </Button>
          <Button
            variant={paymentMethod === 'google' ? 'default' : 'outline'}
            onClick={() => setPaymentMethod('google')}
            className="flex flex-col items-center gap-2 h-20 w-full"
          >
            <FaGoogle className="h-12 w-12" />
            Google Pay
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
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  name="ccname"
                  autoComplete="cc-name"
                  placeholder="First Last" 
                />
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
                />
              </div>

              <div>
                <Label>Expires</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Select name="cc-exp-month" autoComplete="cc-exp-month">
                    <SelectTrigger>
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
                  <Select name="cc-exp-year" autoComplete="cc-exp-year">
                    <SelectTrigger>
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
              </div>

              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input 
                  id="cvc"
                  name="cvc"
                  autoComplete="cc-csc"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="CVC" 
                  maxLength={4} 
                />
              </div>
            </div>
          </form>
        )}
      </CardContent>

      {paymentMethod === 'card' && (
        <CardFooter>
          <Button className="w-full" type="submit">
            Continue
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
