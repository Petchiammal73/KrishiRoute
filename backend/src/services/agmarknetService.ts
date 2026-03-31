import mandiData from "../data/mandiData.json";
import { resolveLocation } from "./locationService";
import { logger } from "../utils/logger";

const normalize = (str: string) =>
  str.toLowerCase().trim();

// optional crop keyword mapping
const cropMap: Record<string, string[]> = {
  onion: ["onion"],
  arhar: ["arhar", "tur", "red gram"],
  tomato: ["tomato"]
};

export const fetchMandiPrices = (crop: string) => {
  const normalizedCrop = normalize(crop);

  const keywords =
    cropMap[normalizedCrop] || [normalizedCrop];

  // Step 1: filter by crop
  const filtered = (mandiData as any[]).filter((item) =>
    keywords.some((k) =>
      normalize(item.commodity).includes(k)
    )
  );

  console.log("Filtered by crop:", filtered.length);

  // Step 2: map + resolve location
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

  console.log("Before location filter:", mapped.length);

  // Step 3: remove missing locations
  const results = mapped.filter((m) => m.location !== null);

  console.log("After location filter:", results.length);

  // debug sample data
  console.log("Sample mandiData:", (mandiData as any[]).slice(0, 3));

  logger.info("Mandis fetched", { count: results.length });

  return results;
};