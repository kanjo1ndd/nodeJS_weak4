import { Router } from "express";
import * as ctrl from "../controllers/review.controller.js";

const router = Router();

router.post("/", ctrl.create);
router.get("/", ctrl.list);
router.post("/_counts", ctrl.counts);

export default router;