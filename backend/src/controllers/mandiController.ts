import { Request, Response } from "express";
import { fetchMandiPrices } from "../services/agmarknetService";

export const getMandis = async (req: Request, res: Response) => {
  try {
    const { crop, state, district } = req.body;

    if (!crop || !state || !district) {
      return res.status(400).json({ error: "Missing params" });
    }

    const data = await fetchMandiPrices(crop, state, district);

    res.json({
      success: true,
      count: data.length,
      data
    });

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};