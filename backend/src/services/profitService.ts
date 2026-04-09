type BestMarket = {
  market: string;
  price: number;
  arrival: number;
  distance: number;
  profit: number;
};

import { fetchMandiPrices } from "./agmarknetService";

const transportCost = (distance: number) => {
  return distance * 2;
};

export const getBestMarket = async (
  crop: string,
  quantity: number,
  state: string,
  district: string
): Promise<BestMarket> => {

  const mandis = await fetchMandiPrices(crop, state, district);

  if (!mandis.length) {
    throw new Error("No mandi data available");
  }

  let best: BestMarket = {
    market: "",
    price: 0,
    arrival: 0,
    distance: 0,
    profit: -Infinity
  };

  for (const mandi of mandis) {
    const distance = mandi.location?.distance || 50;

    const profit =
      mandi.price * quantity - transportCost(distance);

    if (profit > best.profit) {
      best = {
        market: mandi.name,
        price: mandi.price,
        arrival: mandi.arrival,
        distance,
        profit
      };
    }
  }

  return best;
};