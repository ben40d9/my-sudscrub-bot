import { MongoClient, ServerApiVersion } from "mongodb";

const uriPW = process.env.MONGODB_URI_PW;

const uri = `mongodb+srv://sud-comarkco:${uriPW}@sudcluster1.44hacv6.mongodb.net/?retryWrites=true&w=majority`;

let cachedClient = null;

export async function connectToDatabase() {
  if (cachedClient) return cachedClient;

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: false,
      deprecationErrors: true,
      apiStrict: false,
    },
  });

  cachedClient = client;
  return client;
}
