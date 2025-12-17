import { MongoClient } from "mongodb";

// Use environment variable set in Netlify
const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI environment variable not set");
}

const client = new MongoClient(uri);

export async function connectDB() {
  if (!client.topology) await client.connect();
  return client.db("nathen"); // database name
}
