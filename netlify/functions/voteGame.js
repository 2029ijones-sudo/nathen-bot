import { connectDB } from "../../db.js";
import { ObjectId } from "mongodb";

export async function handler(event, context) {
  try {
    const { userId, gameId } = JSON.parse(event.body);
    const db = await connectDB();

    // Prevent double voting
    const existingVote = await db.collection("votes").findOne({ userId, gameId });
    if (existingVote) return { statusCode: 400, body: "Already voted" };

    await db.collection("votes").insertOne({ userId, gameId, createdAt: new Date().toISOString() });
    await db.collection("games").updateOne({ _id: ObjectId(gameId) }, { $inc: { votes: 1 } });

    return { statusCode: 200, body: "Vote added" };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
