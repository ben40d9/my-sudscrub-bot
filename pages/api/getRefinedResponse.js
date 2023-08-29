// pages/api/getRefinedResponse.js
import { generateRefinedResponse } from "../../src/utils/generateRefinedResponse.js";

const getRefinedResponse = async (req, res) => {
  try {
    // Validate the request method
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    // Destructure data from the request body
    const { comment, originalResponse, feedback, score } = req.body;

    // Generate a refined response using the new function
    const { response } = await generateRefinedResponse(
      comment,
      originalResponse,
      feedback,
      score
    );

    console.log(`Response from generateResponse: ${response}`);

    // Send the refined response back to the client
    res.status(200).json({ response });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      error: "An unexpected error occurred while processing the feedback.",
    });
  }
};

export default getRefinedResponse;
