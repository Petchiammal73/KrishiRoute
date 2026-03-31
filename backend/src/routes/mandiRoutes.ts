import express from "express";
import { getNearbyMandis } from "../controllers/mandiController";

const router = express.Router();

router.post("/nearby", getNearbyMandis);

export default router;