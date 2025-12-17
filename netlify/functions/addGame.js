import { connectDB } from "../../db.js";

export async function handler(event, context) {
  try {
    const { title, creatorId, gameUrl, language, description } = JSON.parse(event.body);
    const db = await connectDB();

    const result = await db.collection("games").insertOne({
      title,
      creatorId,
      gameUrl,
      language,
      description,
      votes: 0,
      createdAt: new Date().toISOString()
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ gameId: result.insertedId })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
