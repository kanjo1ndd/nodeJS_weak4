import express from "express";
import reviewRoutes from "./routes/review.routes.js";

const app = express();

app.use(express.json());
app.use("/api/entity3", reviewRoutes);

export default app;