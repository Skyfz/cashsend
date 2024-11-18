'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

interface AccountFormProps {
  initialData: {
    name: string
    email: string
    image: string
  }
}

export default function AccountForm({ initialData }: AccountFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialData)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create user')
      }

      
    } catch (error) {
      console.error('Error creating user:', error)
      toast({
        title: "Error",
        description: "Failed to create user profile",
        variant: "destructive",
      })
    } finally {
      router.push('/dashboard')
      setIsLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setFormData({ ...formData, image: imageUrl })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4 flex flex-col items-center">
        <div className="w-full space-y-2">
          <Label htmlFor="picture">Profile Picture</Label>
        </div>

        {formData.image && (
          <div className="flex flex-col items-center gap-2">
            <Image 
              src={formData.image} 
              alt="Profile" 
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>
        )}

        <div className="w-full space-y-2">
          <Input
            id="picture"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Label
          onClick={() => {
            toast({
              title: "Email cannot be changed",
              description: "Your email is linked to your OAuth login and cannot be modified.",
              variant: "default",
            })
          }}
          className="cursor-not-allowed flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm opacity-60"
        >
          {formData.email}
        </Label>
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Profile...' : 'Complete Profile'}
      </Button>
    </form>
  )
}