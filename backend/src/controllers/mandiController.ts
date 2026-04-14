import { Request, Response } from "express";
import { fetchMandiPrices } from "../services/agmarknetService";
import { getDistance } from "../services/distanceService";
import { Location } from "../types";

export const getNearbyMandis = async (req: Request, res: Response) => {
  try {
    const {
      crop,
      state,
      district,
      location,
      radius = 100
    } = req.body;

    if (!crop || !state || !district || !location) {
      return res.status(400).json({
        error: "Missing required parameters"
      });
    }

    // 🔹 Fetch real Agmarknet data
    const mandis = await fetchMandiPrices(
      crop,
      state,
      district
    );

    if (!mandis.length) {
      return res.json({
        success: true,
        mandis: []
      });
    }

    // 🔹 Calculate distance
    const nearby = mandis
      .map((m: { location: Location; }) => {
        const distance = m.location
          ? getDistance(location, m.location)
          : 999;

        return {
          ...m,
          distance
        };
      })
      .filter((m: { distance: number; }) => m.distance <= radius);

    return res.json({
      success: true,
      count: nearby.length,
      mandis: nearby
    });

  } catch (err: any) {
    return res.status(500).json({
      error: "Failed to fetch nearby mandis"
    });
  }
};