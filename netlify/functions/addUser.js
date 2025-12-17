import { connectDB } from "../../db.js";

export async function handler(event, context) {
  try {
    const { username, email } = JSON.parse(event.body);

    const db = await connectDB();
    const result = await db.collection("users").insertOne({
      username,
      email,
      createdAt: new Date().toISOString()
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ userId: result.insertedId })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
