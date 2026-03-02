import { Router } from "express";
import { getRecyclingCenters } from "./recycling.controller.js";

const router = Router();

router.post("/recycling-centers", getRecyclingCenters);

export default router;