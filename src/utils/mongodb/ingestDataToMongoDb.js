// src/utils/ingestDataToMongoDB.js

import { MongoClient, ServerApiVersion } from "mongodb";
import { MongoDBAtlasVectorSearch } from "langchain/vectorstores/mongodb_atlas";
import { CohereEmbeddings } from "langchain/embeddings/cohere";
import "dotenv/config";

import {
  readSpreadsheet,
  processData,
  processJSONData,
} from "../processData.js"; // Adjust paths as needed

import { readAndProcessJSON } from "../jsonProcessor.js";

// Get environment variables
const cohereApiKey = process.env.COHERE_API_KEY;
const uriPW = process.env.MONGODB_URI_PW;

console.log(`cohereApiKey: ${cohereApiKey}`);
console.log(`uriPW: ${uriPW}`);

const uri = `mongodb+srv://sud-comarkco:${uriPW}@sudcluster1.44hacv6.mongodb.net/?retryWrites=true&w=majority`;

// Create a new MongoDB client with server API configurations
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
    apiStrict: false,
  },
});

// Async function to process and store data in MongoDB and perform a similarity search
export const ingestDataToMongoDB = async (comment) => {
  try {
    // Connect to the MongoDB server.
    await client.connect();
    console.log("Connected successfully to MongoDB server");

    // Get the database and collection where data will be stored.
    const db = client.db("tiktok_attempt1");
    const collection = db.collection("ag5");

    // Read data from a spreadsheet.
    const spreadsheetData = readSpreadsheet("../../tiktok-data.xlsx");
    const processedSpreadsheetData = processData(spreadsheetData);
    // console.log("Processed spreadsheet data:", processedSpreadsheetData);

    // Read and process data from the JSON file.
    const jsonData = readAndProcessJSON("../../data/comments.json");
    const processedJSONData = processJSONData(jsonData);
    // console.log("Processed JSON data:", processedJSONData);

    // Combine the data from the spreadsheet and the JSON file.
    const combinedData = [...processedSpreadsheetData, ...processedJSONData];
    // console.log("Combined data:", combinedData);

    // Generate embeddings for the comments and store them in MongoDB Atlas collection.
    await MongoDBAtlasVectorSearch.fromTexts(
      combinedData.map((item) => item.comment),
      combinedData,
      new CohereEmbeddings({ apiKey: cohereApiKey }),
      {
        collection: collection,
        indexName: "default",
        textKey: "comment",
        embeddingKey: "embedding",
      }
    );
    console.log("Data has been successfully inserted into the collection");

    // Retrieve the first 5 documents in the collection.
    const insertedData = await collection.find({}).limit(5).toArray();
    console.log("First 5 documents in the collection:", insertedData);
  } catch (error) {
    // Log any errors.
    console.error("An error occurred:", error);
  }
};

// Example usage (uncomment as needed)
// ingestDataToMongoDB("i need free stuff team!").catch(console.error);
