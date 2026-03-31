import { Request, Response } from "express";
import { fetchMandiPrices } from "../services/agmarknetService";
import { getDistance } from "../services/distanceService";

export const getNearbyMandis = (req: Request, res: Response) => {
  try {
    const { crop, location, radius = 100 } = req.body;

    const mandis = fetchMandiPrices(crop);

    const nearby = mandis.map((m) => {
  const distance = getDistance(location, m.location);

  return { ...m, distance };
});

console.log(
  "Distances:",
  nearby.map((m) => m.distance).slice(0, 5)
);

    res.json({ success: true, mandis: nearby });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};