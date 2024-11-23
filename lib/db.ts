import { MongoClient, ServerApiVersion } from "mongodb"
import { Cards } from '@/app/types/cards';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000,
  socketTimeoutMS: 5000,
  maxPoolSize: 10,
  minPoolSize: 0,
}

let client: MongoClient

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient
  }

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options)
  }
  client = globalWithMongo._mongoClient
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
}

// Export the connection function
export const connectToDatabase = async () => {
  try {
    if (client?.db().admin()) {
      return client;
    }

    if (client) {
      await client.close();
    }

    client = new MongoClient(uri, options);
    await client.connect();
    
    // Verify connection
    await client.db().command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
    
    // Add connection error handler
    client.on('error', (error) => {
      console.error('MongoDB connection error:', error);
      //client = null;
    });

    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    //client = null;
    throw error;
  }
}

// Optional: Add a cleanup function for when your app actually needs to close the connection
export const closeConnection = async () => {
  try {
    if (client) {
      await client.close();
      //client = null;
      console.log("MongoDB connection closed.");
    }
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    throw error;
  }
}

// Add this new function
export async function getCards(userEmail: string | null | undefined) {
  if (!userEmail) return []
  
  try {
    const dbClient = await connectToDatabase()
    // Use isConnected() method
    if (!dbClient?.db().admin()) {
      throw new Error('Database connection lost');
    }
    
    const db = dbClient.db('sample_mflix')
    const cards = await db.collection('cards').find({
      userId: userEmail
    }).toArray()
    
    console.log('DB Query result:', cards)
    return cards
    
  } catch (error) {
    console.error('Error fetching cards:', error)
    return []
  }
}

// Add a new function for card operations
export async function addCard(cardData: Omit<Cards, 'id'>) {
  try {
    const dbClient = await connectToDatabase();
    // Use isConnected() method
    if (!dbClient?.db().admin()) {
      throw new Error('Database connection lost');
    }
    
    const db = dbClient.db('sample_mflix');
    const result = await db.collection('cards').insertOne(cardData);
    return result;
  } catch (error) {
    console.error('Error in addCard:', error);
    throw error;
  }
}


// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default client