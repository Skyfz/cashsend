import { MongoClient, ServerApiVersion } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined');
}

// Create a cached connection
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>
    }
    if (!globalWithMongo._mongoClientPromise) {
        globalWithMongo._mongoClientPromise = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        }).connect()
    }
    clientPromise = globalWithMongo._mongoClientPromise
} else {
    // In production mode, it's best to not use a global variable.
    clientPromise = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }).connect()
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    try {
        const client = await clientPromise;
        const database = client.db("sample_mflix");
        const usersCollection = database.collection("users");

        // If there's no search query, return random users
        if (!query) {
            const randomUsers = await usersCollection.aggregate([
                { $sample: { size: 20 } }
            ]).toArray();
            return NextResponse.json(randomUsers);
        }

        // Existing search logic
        const searchRegex = new RegExp(query, 'i');
        const users = await usersCollection.find({
            $or: [
                { name: searchRegex },
                { email: searchRegex }
            ]
        }).limit(20).toArray();

        return NextResponse.json(users);
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
} 