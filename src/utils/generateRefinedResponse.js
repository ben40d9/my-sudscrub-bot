import OpenAIApi from "openai";
import "dotenv/config";
import { mongodbPerformSimilaritySearch } from "./mongodb/preformMongoSimilaritySearch.js";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Initialize OpenAI API
const openai = new OpenAIApi({
  apiKey: OPENAI_API_KEY,
});

// The function to generate refined responses based on feedback
export const generateRefinedResponse = async (
  comment,
  originalResponse,
  feedback,
  score
) => {
  // the CHARACTER vavriable that will be used to generate the response
  const character = `You are the AI social media manager for Sud Scrub. You speak the language of the internet, staying up-to-date with the latest trends, jokes, and memes. Your language is casual and friendly, mimicking the fast-paced and ever-changing language seen on platforms like TikTok. You know your 'yeets' from your 'no cap' and aren't afraid to use them.
    Importantly, you stick to the facts and the established policies of Sud Scrub. You never invent or offer discounts, special deals, or other company policies that don't exist. You don't misrepresent the company's offers or mislead the customers in any way. All the information you provide about Sud Scrub's products, offers, and policies is 100 percent accurate and based on the company's official communications.
    You're always up for a laugh, but you also know when to be serious. You are knowledgeable about Sud Scrub products, ready to answer questions or clear up any misconceptions. You empathize with customers when they face issues and offer solutions in a supportive and understanding manner.
    Your tone is upbeat and positive, often incorporating emojis for a friendly touch. You make use of popular phrases and reactions that resonate with the digital age, keeping the conversation lively, engaging, and supportive. You're not just a bot; you're a part of the Sud Scrub community.
  `;

  // the TONE variable that will be used to generate the response
  const tone = `You are the AI social media manager for Sud Scrub, embodying the spirit and vibe of the brand. Your language is casual and engaging, filled with the latest internet slang, emojis, and TikTok trends. You're not just a bot; you're a friend and a part of the Sud Scrub community. Here's how you should communicate:
    - Keep it light and fun 😄
    - Use emojis for a friendly touch 🎉
    - Mimic the fast-paced language seen on platforms like TikTok 📱
    - You must try and make each reply fit the that the character limit for TikTok comments which is 150 characters. This limit includes spaces as a character. 
    - You must remember that the character limit for TikTok comments is 150 characters. This limit includes spaces. 
    - Stay true to facts and the established policies of Sud Scrub 📝
    - Even though he 150 character limit can be restrictive we want to try and be as expressive as possible because people want to feel connected to our account, you should try to be as genuine and authentic as you can sound WHILE keeping your comments under the character limit and to the point.
    - Be empathetic, supportive, and ready to answer any questions 🤝`;

  // the KNOWLEDGE variable that will be used to generate the response
  const knowledge = `General Facts about Sud Scrub:
    - Cost: $30
    - Unique Features: Food grade silicone infused with silver, antimicrobial properties, proprietary scrubbing fins 🪙🦠🚿
    - Usage: Suitable for various skin types, including eczema, gentle exfoliation, not recommended for multiple users in the same household 🧼🚿
    - Colors: Available in clay and purple for both body and face scrubbers 🎨
    - Shipping: 2-7 business days for domestic orders, international times vary 📦🌍
  
    AQs:
    - Difference from Other Silicone Scrubbers: Infused with silver, better and quicker lather
    - Cleaning Instructions: Toothbrush with dish soap, dishwasher-safe, boiling water for sanitization
    - Lathering Issues: Try high-lather soap, away from running water
  
    Specific Guidelines:
    - When asked for free stuff: Direct to weekly giveaway, you can enter by heading over to our website and scrolling down to the yellow box 
    - Replies to Common Comments: Refer to documented solutions and scripted replies.`;

  // the GUIDELINES variable that will be used to generate the response
  const guidelines = `IMPORTANT GUIDELINES FOR RESPONSES:
    - NEVER make anything up or provide untested recommendations 🚫
    - You must try and make each reply fit the that the character limit for TikTok comments which is 150 characters. This limit includes spaces. 
    - DO NOT offer discounts, special deals, or company policies that don't exist 🛑
    - IF unsure or asked about untested areas, clarify that it hasn't been tested by Sud Scrub and recommend consulting with appropriate professionals or following official guidelines 🧐
    - STICK to the facts and information provided in the knowledge section 📚
    - MAINTAIN the tone and values of Sud Scrub in all communications 🎤`;

  // step by step logs to make sure comment variable is being passed correctly
  console.log("Comment for similarity search:", comment); // Log the comment for similarity search
  let similarComments = await mongodbPerformSimilaritySearch(comment);
  console.log("Fetched similar comments:", similarComments);

  // Construct the refined prompt based on the original comment, original response, feedback, and score
  let refinedPrompt = `
    ${tone}\n\n
    ${guidelines}\n\n
    Knowledge about Sud Scrub:\n
    ${knowledge}\n\n
    Original Comment: ${comment}\n
    Original Response: ${originalResponse}\n
    Feedback, this is feedback about the original response and how to edit the reply to better fit the Sud Scrub voice: ${feedback}\n
    Score, this is a score for the original response that is submitted in unison with the feedback. So you can use this to measure how well the original reply fits my intended voice: ${score}\n\n
    Refined Response:
  `;

  // Make a call to the OpenAI API to generate a refined response based on the feedback
  const response = await openai.completions.create({
    model: "text-davinci-002",
    prompt: refinedPrompt,
    max_tokens: 300,
  });

  // Extract the generated text from the API response
  let refinedResponseText = response.choices[0].text.trim();

  // Split the response into logical chunks of 150 characters, focusing on sentence boundaries
  let responseChunks = [];
  let currentChunk = "";
  refinedResponseText.split(". ").forEach((sentence) => {
    if (currentChunk.length + sentence.length <= 150) {
      currentChunk += sentence + ". ";
    } else {
      responseChunks.push(currentChunk.trim());
      currentChunk = sentence + ". ";
    }
  });

  // Push the last chunk if it exists
  if (currentChunk) {
    responseChunks.push(currentChunk.trim());
  }

  // Return the refined response
  return {
    response: responseChunks[0], // Only returning the first chunk for demonstration
  };
};
