import { MongoClient, ServerApiVersion } from "mongodb"

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

let client: MongoClient | null = null;

// Export the connection function
export const connectToDatabase = async () => {
  try {
    // Reuse existing connection if available
    if (client) {
      return client;
    }

    // Create new connection if none exists
    client = new MongoClient(uri, options);
    await client.connect();
    
    // Send a ping with timeout
    await client.db("admin").command({ ping: 1, maxTimeMS: 5000 });
    console.log("Successfully connected to MongoDB!");
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    // Clean up on error
    if (client) {
      await client.close();
      client = null;
    }
    throw error;
  }
}

// Optional: Add a cleanup function for when you need to close the connection
export const closeConnection = async () => {
  try {
    if (client) {
      await client.close();
      client = null;
      console.log("MongoDB connection closed.");
    }
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    throw error;
  }
}