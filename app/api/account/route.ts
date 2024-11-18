import { connectToDatabase } from "@/lib/db"
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function POST(request: Request) {
  let client;

  try {
    // Verify user is authenticated
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get the account data from the request
    const userData = await request.json()
    
    // Connect to MongoDB
    client = await connectToDatabase()
    const database = client.db("sample_mflix")
    const usersCollection = database.collection("users")
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ 
      email: session.user.email 
    })

    let result;
    if (existingUser) {
      // Update existing user
      result = await usersCollection.updateOne(
        { email: session.user.email },
        { 
          $set: {
            name: userData.name,
            image: session.user.image,
            updatedAt: new Date()
          }
        }
      )
      
      if (!result.acknowledged) {
        throw new Error('Failed to update user')
      }

      console.log('Successfully updated user:', session.user.email)
      return NextResponse.json({ 
        success: true,
        userId: existingUser._id,
        updated: true
      })
    } else {
      // Create new user
      result = await usersCollection.insertOne({
        name: userData.name,
        email: session.user.email,
        image: session.user.image,
        createdAt: new Date()
      })

      if (!result.acknowledged) {
        throw new Error('Failed to create user')
      }

      console.log('Successfully created new user:', session.user.email)
      return NextResponse.json({ 
        success: true,
        userId: result.insertedId,
        created: true
      })
    }

  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  } finally {
    if (client) {
      await client.close()
    }
  }
} 