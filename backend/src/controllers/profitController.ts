import { Request, Response } from "express";
import { getBestMarket } from "../services/profitService";

export const getBestMandi = async (req: Request, res: Response) => {
  try {
    
    const {
      crop,
      quantity,
      state,
      district,
      vehicle,
      sourceLocation
    } = req.body;
    console.log("Sending sourceLocation:", sourceLocation);
    if (
      !crop ||
      !quantity ||
      !state ||
      !district ||
      !vehicle ||
      !sourceLocation
    ) {
      return res.status(400).json({
        error: "Missing required parameters"
      });
    }

    const result = await getBestMarket(
      crop,
      quantity,
      state,
      district,
      vehicle,
      sourceLocation
    );

    return res.json({
      success: true,
      bestMandi: result.bestMandi,
      allOptions: result.allOptions
    });

  } catch (error) {
    return res.status(500).json({
      error: "Failed to calculate profit"
    });
  }
};