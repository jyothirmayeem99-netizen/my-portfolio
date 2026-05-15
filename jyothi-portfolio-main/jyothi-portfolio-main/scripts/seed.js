import "dotenv/config";
import { MongoClient } from "mongodb";
import { profile, projects, skills } from "../data/seedData.js";

if (!process.env.MONGODB_URI) {
  console.error("Missing MONGODB_URI. Copy .env.example to .env and add your MongoDB Atlas URI.");
  process.exit(1);
}

const client = new MongoClient(process.env.MONGODB_URI);

try {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || "portfolio");

  await db.collection("profile").deleteMany({});
  await db.collection("projects").deleteMany({});
  await db.collection("skills").deleteMany({});

  await db.collection("profile").insertOne({ ...profile, type: "main" });
  await db.collection("projects").insertMany(projects);
  await db.collection("skills").insertMany(skills);

  console.log("Seeded MongoDB with profile, projects, and skills.");
} finally {
  await client.close();
}
