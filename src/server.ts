import express from "express";
import { connectDB } from "./db/connect.js";
import reviewRoutes from "./routes/review.routes.js";

const app = express();

app.use(express.json());
app.use("/api/reviews", reviewRoutes);

const PORT = 3001;

async function start() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Review service started on port ${PORT}`);
  });
}

start();