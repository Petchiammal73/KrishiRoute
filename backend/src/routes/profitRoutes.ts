import express from "express";
import { bestMarket } from "../controllers/profitController";

const router = express.Router();

router.post("/calculate", bestMarket);

export default router;