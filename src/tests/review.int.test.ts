import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import { connectDB, disconnectDB } from "../db/connect.js";
import { ReviewModel } from "../models/review.model.js";

describe("Review API (Entity3)", () => {
  const entity1Id = "book-123";

  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  afterEach(async () => {
    await ReviewModel.deleteMany({});
  });

  // ---------------------------
  // POST /api/entity3
  // ---------------------------
  it("should create review", async () => {
    const res = await request(app)
      .post("/api/entity3")
      .send({
        entity1Id,
        text: "Great book",
      });

    expect(res.status).toBe(201);
    expect(res.body.entity1Id).toBe(entity1Id);
    expect(res.body.text).toBe("Great book");
    expect(res.body.createdAt).toBeDefined();
  });

  // ---------------------------
  // GET /api/entity3
  // ---------------------------
  it("should return reviews sorted by date desc", async () => {
    await ReviewModel.create([
      { entity1Id, text: "Old", createdAt: new Date("2023-01-01") },
      { entity1Id, text: "New", createdAt: new Date("2024-01-01") },
    ]);

    const res = await request(app)
      .get("/api/entity3")
      .query({ entity1Id });

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].text).toBe("New");
    expect(res.body[1].text).toBe("Old");
  });

  // ---------------------------
  // POST /api/entity3/_counts
  // ---------------------------
  it("should return counts per entity1Id", async () => {
    await ReviewModel.create([
      { entity1Id: "id1", text: "A" },
      { entity1Id: "id1", text: "B" },
      { entity1Id: "id2", text: "C" },
    ]);

    const res = await request(app)
      .post("/api/entity3/_counts")
      .send({
        entity1Ids: ["id1", "id2", "id3"],
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id1: 2,
      id2: 1,
      id3: 0,
    });
  });
});