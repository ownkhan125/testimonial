import { MongoClient } from "mongodb";

// MongoDB URI environment variable from .env file
const client = new MongoClient(process.env.MONGODB_URI);

export const clientPromise = client.connect();
