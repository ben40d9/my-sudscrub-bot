import { connectToDatabase } from "../../src/utils/mongodb/db.js";

//this is the response generated using the original model
import { generateResponse } from "../../src/utils/generateResponse.js";

//this is the response generated using fine-tuning
import { generateFineTunedResponse } from "../../src/utils/openai/fineTunedResponse.js";

const getResponse = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const { comment, feedback } = req.body;

    // Connect to the MongoDB
    const { db } = await connectToDatabase();

    // Send the response back to the frontend
    // const { response } = await generateResponse(comment, feedback);
    // console.log(`Response from generateResponse: ${response}`);

    const { response } = await generateFineTunedResponse(comment);
    console.log(`Response from generateFineTunedResponse: ${response}`);

    res.json({ response });
  } catch (error) {
    res.status(500).json({
      error: "An unexpected error occurred while generating the response.",
    });
  }
};

export default getResponse;
