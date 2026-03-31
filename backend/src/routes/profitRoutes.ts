import express from "express";
import { getBestMandi } from "../controllers/profitController";

const router = express.Router();

router.post("/calculate", getBestMandi);

export default router;