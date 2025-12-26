import { ReviewModel } from "../models/review.model.js";

export class ReviewService {
  async create(data: {
    entity1Id: string;
    text: string;
    rating?: number;
  }) {
    return ReviewModel.create(data);
  }

  async list(entity1Id: string) {
    return ReviewModel.find({ entity1Id })
      .sort({ createdAt: -1 });
  }

  async counts(entity1Ids: string[]) {
    const agg = await ReviewModel.aggregate([
      { $match: { entity1Id: { $in: entity1Ids } } },
      { $group: { _id: "$entity1Id", count: { $sum: 1 } } }
    ]);

    return Object.fromEntries(
      entity1Ids.map(id => [
        id,
        agg.find(a => a._id === id)?.count ?? 0
      ])
    );
  }
}