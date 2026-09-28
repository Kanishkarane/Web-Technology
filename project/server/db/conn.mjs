import "../loadEnvironment.mjs";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.ATLAS_URI || "");
await client.connect();
console.log("Connected to MongoDB Atlas");

const db = client.db(process.env.DB_NAME || "blog");
export default db;
