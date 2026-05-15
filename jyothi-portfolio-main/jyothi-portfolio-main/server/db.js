import "dotenv/config";
import { MongoClient } from "mongodb";

let clientPromise;

export function hasMongoConfig() {
  return Boolean(process.env.MONGODB_URI);
}

export async function getDb() {
  if (!process.env.MONGODB_URI) {
    return null;
  }

  if (!clientPromise) {
    const client = new MongoClient(process.env.MONGODB_URI);
    clientPromise = client.connect();
  }

  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB || "portfolio");
}
