import express from "express";
import { getMandis } from "../controllers/mandiController";

const router = express.Router();

router.post("/nearby", getMandis);

export default router;