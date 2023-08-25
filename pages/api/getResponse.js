import { connectToDatabase } from "../../src/utils/mongodb/db.js";
import { generateResponse } from "../../src/utils/generateResponse.js";

const getResponse = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const { comment } = req.body;

    // Connect to the MongoDB
    const { db } = await connectToDatabase();

    // Send the response back to the frontend
    const { response, continuation, topComments } = await generateResponse(
      comment
    );

    console.log(
      "Response from generateResponse:",
      response,
      continuation,
      topComments
    );

    res.json({ response, continuation, topComments });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An unexpected error occurred while generating the response.",
      });
  }
};

export default getResponse;
