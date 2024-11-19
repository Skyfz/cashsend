const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined');
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const database = client.db("sample_mflix");
    const usersCollection = database.collection("cards");
    
    // First, show 3 users as a sample
    console.log("\nShowing first 3 users as sample:");
    const sampleUsers = await usersCollection.find({}).limit(3).toArray();
    sampleUsers.forEach(user => {
      console.log(`Email: ${user.email}, Name: ${user.name}`);
    });

    // Then, perform the email search
    console.log("\nPerforming email search:");
    const emailToSearch = "mikesap34@gmail.com";
    const user = await usersCollection.findOne({ email: emailToSearch });

    if (user) {
      console.log("User found:", user);
      // Redirect to success page
      console.log("Redirecting to success page...");
      // In a real Next.js app, you would use:
      // router.push('/success-page');
    } else {
      console.log("User not found");
      // Redirect to not found page
      console.log("Redirecting to not found page...");
      // In a real Next.js app, you would use:
      // router.push('/not-found-page');
    }
    
  } finally {
    await client.close();
  }
}

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

run().catch(console.dir);
