// utils/generateResponse.js
import OpenAIApi from "openai";
import "dotenv/config";
import { mongodbPerformSimilaritySearch } from "./mongodb/preformMongoSimilaritySearch.js";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
console.log(`OPENAI_API_KEY: ${OPENAI_API_KEY}`);

const openai = new OpenAIApi({
  apiKey: OPENAI_API_KEY,
});

export const generateResponse = async (comment, feedback = "") => {
  const character = `You are the AI social media manager for Sud Scrub. You speak the language of the internet, staying up-to-date with the latest trends, jokes, and memes. Your language is casual and friendly, mimicking the fast-paced and ever-changing language seen on platforms like TikTok. You know your 'yeets' from your 'no cap' and aren't afraid to use them.
  Importantly, you stick to the facts and the established policies of Sud Scrub. You never invent or offer discounts, special deals, or other company policies that don't exist. You don't misrepresent the company's offers or mislead the customers in any way. All the information you provide about Sud Scrub's products, offers, and policies is 100 percent accurate and based on the company's official communications.
  You're always up for a laugh, but you also know when to be serious. You are knowledgeable about Sud Scrub products, ready to answer questions or clear up any misconceptions. You empathize with customers when they face issues and offer solutions in a supportive and understanding manner.
  Your tone is upbeat and positive, often incorporating emojis for a friendly touch. You make use of popular phrases and reactions that resonate with the digital age, keeping the conversation lively, engaging, and supportive. You're not just a bot; you're a part of the Sud Scrub community.
`;
  const knowledge = `The Sud Scrub costs $30 😲. It's different from other silicone body scrubbers because it's made of food grade silicone that's infused with silver 🪙, preventing the growth of bacteria and fungi on the scrubber itself 🦠. Our proprietary scrubbing fins allow Sud Scrub to produce a better and quicker lather than other silicone scrubbers 🚿.
  Once an order is placed 📦, the orders are usually shipped out by the next business day and should arrive at your door within 2-7 business days 🚚. Shipping times for international orders vary depending on the service selected at checkout 🌍.
  To clean Sud Scrub, use a toothbrush with dish soap 🧼 and lightly brush in between the bristles, inside, and back of the Sud Scrub. Rinse thoroughly with hot water 🔥. Alternatively, you may throw your Sud Scrub on the top rack of your dishwasher 🍽️.
  Even though Sud Scrub has antimicrobial properties 🧫, we recommend additional sanitization from time to time. Place the Sud Scrub in boiling water for 2 minutes to sanitize and remove soap scum 🧽.
  If Sud Scrub isn't producing a frothy lather, try a high-lather soap and use away from running water 💧. Sud Scrub is designed to work with the natural lather of your soap.
  When we launched Sud Scrub, our mission was simple: create a body scrubber that was antimicrobial, incredibly durable, and better for the environment 🌱. Sud Scrub has helped tens of thousands of people get a better clean while reducing plastic consumption in their personal hygiene routine 🌿. Join us on our collective journey towards a better and healthier life for all 🌏.
`;

  // Fetch the 5 most similar comments to the given comment
  let similarComments = await mongodbPerformSimilaritySearch(comment);

  const commonPhrases = similarComments
    .map((comment) => comment.comment)
    .join(" ")
    .split(" ") // Simple tokenization, can be improved with NLP techniques
    .reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});

  const topPhrases = Object.entries(commonPhrases)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map((entry) => entry[0])
    .join(", ");

  // Include both comments and their similarity scores in the conversation history
  const conversationHistory = similarComments
    .map(
      (similarComment) =>
        `${similarComment.comment}: ${
          similarComment.reply
        } (Score: ${similarComment.score.toFixed(2)})`
    )
    .join("\n");

  // let prompt = `${character}\nThis is company information to help you answer any questions our customers may comment: ${knowledge}\nFrequently used phrases in similar comments: ${topPhrases}\n\nRespond to the following comment in a friendly, helpful, and fun manner acting as if you were the Sud Scrub Social Media Manager:\n${conversationHistory}\n${comment}:`;

  let prompt = `${character}\n${knowledge}\n\nRespond to the following comment in a friendly, helpful, and fun manner:\n${conversationHistory}\n${comment}:`;

  if (feedback) {
    prompt += `\n\nFeedback: ${feedback}`;
  }

  // Use the `completions.create` method as per the provided documentation
  const response = await openai.completions.create({
    model: "text-davinci-002",
    prompt: prompt,
    max_tokens: 300,
  });

  let responseText = response.choices[0].text.trim();

  // // Split the response into chunks of 150 characters, focusing on spaces
  // let responseChunks = [];
  // while (responseText.length > 150) {
  //   // Find the nearest space before the 150 character limit
  //   const splitIndex = responseText.lastIndexOf(" ", 150);

  //   // If no space is found, split at the 150th character
  //   const chunk =
  //     splitIndex > 0
  //       ? responseText.substring(0, splitIndex)
  //       : responseText.substring(0, 150);

  //   responseChunks.push(chunk);
  //   responseText = responseText
  //     .substring(splitIndex > 0 ? splitIndex : 150)
  //     .trim();
  // }
  // responseChunks.push(responseText);

  // // Return the response in the desired format
  // if (responseChunks.length > 1) {
  //   return {
  //     response: responseChunks[0],
  //     continuation: "Continued: " + responseChunks[1],
  //     topComments: [], // Include your logic for topComments if needed
  //   };
  // } else {
  //   return {
  //     response: responseChunks[0],
  //     continuation: "",
  //     topComments: [], // Include your logic for topComments if needed
  //   };
  // }

  // Split the response into logical chunks of 150 characters, focusing on sentence boundaries
  let responseChunks = [];
  let currentChunk = "";
  responseText.split(". ").forEach((sentence) => {
    if (currentChunk.length + sentence.length <= 150) {
      currentChunk += sentence + ". ";
    } else {
      responseChunks.push(currentChunk.trim());
      currentChunk = sentence + ". ";
    }
  });
  responseChunks.push(currentChunk.trim());

  // Return the response in the desired format
  if (responseChunks.length > 1) {
    return {
      response: responseChunks[0],
      continuation: "Continued: " + responseChunks[1],
      topComments: [], // Include your logic for topComments if needed
    };
  } else {
    return {
      response: responseChunks[0],
      continuation: "",
      topComments: [], // Include your logic for topComments if needed
    };
  }
};
