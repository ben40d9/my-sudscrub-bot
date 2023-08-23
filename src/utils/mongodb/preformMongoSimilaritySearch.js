// import { MongoClient, ServerApiVersion } from "mongodb";
// import { MongoDBAtlasVectorSearch } from "langchain/vectorstores/mongodb_atlas";
// import { CohereEmbeddings } from "langchain/embeddings/cohere";
// import "dotenv/config";

// const uriPW = process.env.MONGODB_URI_PW;
// console.log(`uriPW: ${uriPW}`);

// const uri = `mongodb+srv://sud-comarkco:${uriPW}@sudcluster1.44hacv6.mongodb.net/?retryWrites=true&w=majority`;

// const cohereApiKey = `${process.env.COHERE_API_KEY}`;
// console.log(`cohereApiKey: ${cohereApiKey}`);

// export const mongodbPerformSimilaritySearch = async (comment) => {
//   try {
//     const client = new MongoClient(uri, {
//       serverApi: {
//         version: ServerApiVersion.v1,
//         strict: false,
//         deprecationErrors: true,
//         apiStrict: false,
//       },
//     });

//     await client.connect();
//     const db = client.db("tiktok_attempt1");
//     const collection = db.collection("ag5");

//     const vectorStore = new MongoDBAtlasVectorSearch(
//       new CohereEmbeddings({ apiKey: cohereApiKey }),
//       {
//         collection: collection,
//         indexName: "default",
//         textKey: "comment",
//         embeddingKey: "embedding",
//       }
//     );

//     const relevantDocs = await vectorStore.similaritySearch(comment, 5);

//     const similarComments = relevantDocs.map((doc) => {
//       return {
//         comment: doc.pageContent,
//         reply: doc.reply, // Adjust this based on how the reply is stored in your documents
//       };
//     });

//     console.log(similarComments);

//     return similarComments;
//   } catch (error) {
//     console.error("An error occurred:", error);
//     return [];
//   }
// };
// mongodbPerformSimilaritySearch("i want to buy one for my mom");
import { MongoClient, ServerApiVersion } from "mongodb";
import { MongoDBAtlasVectorSearch } from "langchain/vectorstores/mongodb_atlas";
import { CohereEmbeddings } from "langchain/embeddings/cohere";
import "dotenv/config";

const uriPW = process.env.MONGODB_URI_PW;
const uri = `mongodb+srv://sud-comarkco:${uriPW}@sudcluster1.44hacv6.mongodb.net/?retryWrites=true&w=majority`;
const cohereApiKey = process.env.COHERE_API_KEY;

//just here for now for etsting
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
    apiStrict: false,
  },
});

export const mongodbPerformSimilaritySearch = async (comment) => {
  try {
    await client.connect();
    const db = client.db("tiktok_attempt1");
    const collection = db.collection("ag5");

    const vectorStore = new MongoDBAtlasVectorSearch(
      new CohereEmbeddings({ apiKey: cohereApiKey }),
      {
        collection: collection,
        indexName: "default",
        textKey: "comment",
        embeddingKey: "embedding",
      }
    );

    // Perform similarity search and get top 5 similar comments along with their similarity scores
    const relevantDocs = await vectorStore.similaritySearchWithScore(
      comment,
      5
    );

    const similarComments = relevantDocs.map((doc) => {
      return {
        comment: doc[0].pageContent, // Comment text
        reply: doc[0].reply, // Reply based on how it is stored in your documents
        score: doc[1], // Similarity score
      };
    });

    console.log(similarComments);

    return similarComments;
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
};

// mongodbPerformSimilaritySearch("i want to buy one for my mom");
