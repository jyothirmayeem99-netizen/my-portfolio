import { ObjectId } from "mongodb";
import { getDb } from "./db.js";
import { profile, projects, skills } from "../data/seedData.js";

export async function getProfile() {
  const db = await getDb();
  if (!db) return profile;

  const storedProfile = await db.collection("profile").findOne({ type: "main" });
  return storedProfile || profile;
}

export async function getProjects() {
  const db = await getDb();
  if (!db) return projects;

  const storedProjects = await db
    .collection("projects")
    .find({})
    .sort({ featured: -1, year: -1, title: 1 })
    .toArray();

  return storedProjects.length ? storedProjects : projects;
}

export async function getSkills() {
  const db = await getDb();
  if (!db) return skills;

  const storedSkills = await db.collection("skills").find({}).sort({ group: 1 }).toArray();
  return storedSkills.length ? storedSkills : skills;
}

export async function saveContactMessage(payload) {
  const cleanMessage = {
    name: String(payload.name || "").trim(),
    email: String(payload.email || "").trim(),
    message: String(payload.message || "").trim(),
    createdAt: new Date()
  };

  if (!cleanMessage.name || !cleanMessage.email || !cleanMessage.message) {
    const error = new Error("Name, email, and message are required.");
    error.statusCode = 400;
    throw error;
  }

  const db = await getDb();
  if (!db) {
    return { ...cleanMessage, _id: new ObjectId().toString(), stored: false };
  }

  const result = await db.collection("messages").insertOne(cleanMessage);
  return { ...cleanMessage, _id: result.insertedId, stored: true };
}
