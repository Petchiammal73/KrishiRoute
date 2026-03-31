import { Request, Response } from "express";
import { fetchMandiPrices } from "../services/agmarknetService";
import { evaluateMandis } from "../services/profitService";

export const getBestMandi = (req: Request, res: Response) => {
  try {
    const trip = req.body;

    const mandis = fetchMandiPrices(trip.crop);

    const results = evaluateMandis(mandis, trip);

    const best = results.reduce((a, b) =>
      a.netProfit > b.netProfit ? a : b
    );

    res.json({
      success: true,
      bestMandi: best,
      allOptions: results
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};