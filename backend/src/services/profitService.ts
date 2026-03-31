import { calculateNetProfit } from "../utils/costCalculator";
import { getDistance } from "./distanceService";
import { Trip } from "../types";

export const evaluateMandis = (mandis: any[], trip: Trip) => {
  return mandis.map((m) => {
    const distance = getDistance(trip.sourceLocation, m.location);

    const profit = calculateNetProfit(
      m.price,
      trip.quantity,
      distance,
      trip.vehicle
    );

    return {
      mandi: m.name,
      price: m.price,
      distance: Number(distance.toFixed(2)),
      ...profit
    };
  });
};