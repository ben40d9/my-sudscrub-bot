import { connectToDatabase } from "../../src/utils/mongodb/db.js";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { feedback, score } = req.body;

  // Connect to the MongoDB
  const { db } = await connectToDatabase();

  // Insert feedback into the database (customize this logic based on your database schema)
  await db.collection("feedback").insertOne({ feedback, score });

  // Send success response
  res.status(200).json({ success: true });
};
