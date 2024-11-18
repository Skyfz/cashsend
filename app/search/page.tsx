"use client"

import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import Image from 'next/image'
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface User {
  id: string
  name: string
  email: string
  image?: string
  // Add other user fields as needed
}

const backgroundColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-emerald-500",
  "bg-cyan-500",
  "bg-violet-500",
] as const;

const getRandomColor = () => {
  return backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const searchUsers = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=5`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setError('Failed to fetch users. Please try again.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchUsers(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  useEffect(() => {
    searchUsers('');
  }, []);

  return (
    <div className="flex-1 w-full max-w-2xl mx-auto p-4 h-[calc(100vh-6rem)]">
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-2">
          <Label htmlFor="search" className="text-xl font-semibold">
            Search Users
          </Label>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <div className="flex flex-col h-full gap-4">
            <Input
              id="search"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            
            <ScrollArea className="flex-1 w-full rounded-md border min-h-0">
              <div className="p-4">
                {loading ? (
                  // Loading skeletons
                  Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-4 mb-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[150px]" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="space-y-4">
                    {users.slice(0, 15).map((user) => (
                      <Card 
                        key={user.id} 
                        className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                        onClick={() => setSelectedUser(user)}
                      >
                        <div className="flex items-center space-x-4">
                          {user.image ? (
                            <Image
                              src={user.image}
                              alt={`${user.name}'s profile picture`}
                              width={48}
                              height={48}
                              className="rounded-lg"
                            />
                          ) : (
                            <div className={cn(
                              "w-12 h-12 rounded-lg flex items-center justify-center font-medium",
                              getRandomColor()
                            )}>
                              {user.name
                                .split(' ')
                                .map(name => name[0])
                                .slice(0, 2)
                                .join('')
                                .toUpperCase()}
                            </div>
                          )}
                          <div className="flex flex-col space-y-1">
                            <span className="font-medium">{user.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </Card>
                    ))}
                    {users.length === 0 && (
                      <p className="text-center text-muted-foreground">
                        No users found
                      </p>
                    )}
                    {error && (
                      <p className="text-center text-red-500">
                        {error}
                      </p>
                    )}
                  </div>
                )}    
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedUser?.name}&apos;s Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            {selectedUser && Object.entries(selectedUser).map(([key, value]) => (
              <div key={key} className="grid grid-cols-2 gap-2">
                <span className="font-semibold">{key}:</span>
                <span className="break-all">
                  {typeof value === 'object' 
                    ? JSON.stringify(value) 
                    : String(value)}
                </span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
