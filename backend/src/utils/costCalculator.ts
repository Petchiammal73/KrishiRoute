import { VEHICLE_RATES, LOADING_COST } from "../config/constants";

export const calculateNetProfit = (
  price: number,
  quantity: number,
  distance: number,
  vehicle: string
) => {
  const revenue = price * quantity;

  const transportCost = distance * VEHICLE_RATES[vehicle];

  const totalCost = transportCost + LOADING_COST;

  return {
    revenue,
    transportCost,
    totalCost,
    netProfit: revenue - totalCost
  };
};