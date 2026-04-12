import mandiData from "../data/mandiData.json";
import { resolveLocation } from "./locationService";
import { logger } from "../utils/logger";

const normalize = (str: string) =>
  str.toLowerCase().trim();

const cropMap: Record<string, string[]> = {
  onion: ["onion"],
  arhar: ["arhar", "tur", "red gram"],
  tomato: ["tomato"]
};

export const fetchMandiPrices = (crop: string) => {
  const normalizedCrop = normalize(crop);

  const keywords =
    cropMap[normalizedCrop] || [normalizedCrop];

  
  const filtered = (mandiData as any[]).filter((item) =>
    keywords.some((k) =>
      normalize(item.commodity).includes(k)
    )
  );

  const mapped = filtered.map((item) => {
    const location = resolveLocation(
      item.market,
      item.district,
      item.state
    );

    return {
      name: item.market,
      state: item.state,
      district: item.district,
      crop: item.commodity,
      price: item.price,
      location
    };
  });

  
  const results = mapped.filter((m) => m.location !== null);

  logger.info("Mandis fetched", { count: results.length });

  return results;
};