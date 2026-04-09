import { Request, Response } from "express";
import { getBestMarket } from "../services/profitService";

export const bestMarket = async (req: Request, res: Response) => {
  try {
    const { crop, quantity, state, district } = req.body;

    if (!crop || !quantity || !state || !district) {
      return res.status(400).json({ error: "Missing params" });
    }

    const result = await getBestMarket(
      crop,
      quantity,
      state,
      district
    );

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(500).json({ error: "Internal error" });
  }
};