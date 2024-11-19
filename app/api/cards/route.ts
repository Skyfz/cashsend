import { NextResponse } from 'next/server'
import { addCard } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const result = await addCard(data)
    
    return NextResponse.json({ success: true, cardId: result.insertedId })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to save card' },
      { status: 500 }
    )
  }
} 