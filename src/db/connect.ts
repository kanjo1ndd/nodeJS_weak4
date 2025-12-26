import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo: MongoMemoryServer;

export async function connectDB() {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri);
  console.log("MongoDB (in-memory) connected");
}

export async function disconnectDB() {
  await mongoose.disconnect();
  if (mongo) {
    await mongo.stop();
  }
}