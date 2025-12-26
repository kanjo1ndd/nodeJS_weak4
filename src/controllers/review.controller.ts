import type { Request, Response } from "express";
import { ReviewService } from "../services/review.service.js";

const service = new ReviewService();

// ---------------------------
// POST /api/entity3
// ---------------------------
export async function create(req: Request, res: Response) {
  const { entity1Id, text, rating } = req.body;

  if (!entity1Id || !text) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const review = await service.create({
    entity1Id,
    text,
    rating,
  });

  res.status(201).json(review);
}

// ---------------------------
// GET /api/entity3
// ---------------------------
export async function list(req: Request, res: Response) {
  const { entity1Id } = req.query;

  if (!entity1Id) {
    return res.status(400).json({ message: "entity1Id required" });
  }

  const data = await service.list(String(entity1Id));
  res.json(data);
}

// ---------------------------
// POST /api/entity3/_counts
// ---------------------------
export async function counts(req: Request, res: Response) {
  const { entity1Ids } = req.body;

  const data = await service.counts(entity1Ids);
  res.json(data);
}