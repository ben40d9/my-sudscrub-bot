// import { connectToDatabase } from "../../src/utils/mongodb/db.js";

// const submitFeedback = async (req, res) => {
//   if (req.method !== "POST") {
//     return res.status(405).end();
//   }

//   const { feedback, score } = req.body;

//   // Connect to the MongoDB
//   const { db } = await connectToDatabase();

//   // Insert feedback into the database (customize this logic based on your database schema)
//   await db.collection("feedback").insertOne({ feedback, score });

//   // Send success response
//   res.status(200).json({ success: true });
// };

// export default submitFeedback;
import { generateResponse } from "../../src/utils/generateResponse.js";

const submitFeedback = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const { comment, feedback } = req.body;

    // Generate an improved response based on the original comment and user's feedback
    const { response } = await generateResponse(comment, feedback);

    // Send the refined response back to the client
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({
      error: "An unexpected error occurred while processing the feedback.",
    });
  }
};

export default submitFeedback;
