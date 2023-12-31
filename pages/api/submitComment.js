import { connectToDatabase } from "../../src/utils/mongodb/db.js";
import { ingestDataToMongoDB } from "../../src/utils/mongodb/ingestDataToMongoDb.js";

const submitComment = async (req, res) => {
  if (req.method === "POST") {
    const comment = req.body.comment;

    try {
      const client = await connectToDatabase();
      const db = client.db();

      // Call the function to ingest data
      await ingestDataToMongoDB(comment, db);

      res
        .status(200)
        .json({ success: true, message: "Comment submitted successfully." });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "An error occurred while submitting the comment:",
          error,
        });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed." });
  }
};

export default submitComment;
