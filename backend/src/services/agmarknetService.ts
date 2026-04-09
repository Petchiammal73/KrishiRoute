import axios from "axios";
import { resolveLocation } from "./locationService";
import { logger } from "../utils/logger";
import { resolveIds } from "./resolverService";
import { getMarketsByDistrict } from "./marketService";

const BASE_URL = "https://api.agmarknet.gov.in/v1/dashboard-data/";

export const fetchMandiPrices = async (
  crop: string,
  stateName: string,
  districtName: string
) => {
  const { commodityId, stateId, districtId } =
    await resolveIds(crop, stateName, districtName);

  const markets = await getMarketsByDistrict(stateId, districtId);

  const results: any[] = [];

  for (const market of markets.slice(0, 20)) { // limit for safety
    try {
      const params = {
        dashboard: "marketwise_price_arrival",
        date: new Date().toISOString().split("T")[0],
        commodity: `[${commodityId}]`,
        state: stateId,
        district: `[${districtId}]`,
        market: `[${market.id}]`,
        variety: 100021,
        grades: "[4]",
        format: "json"
      };

      const res = await axios.get(BASE_URL, { params });

      const record = res.data?.data?.records?.[0];

      if (!record) continue;

      const location = resolveLocation(
        market.mkt_name,
        districtName,
        stateName
      );

      results.push({
        name: market.mkt_name,
        state: "Andhra Pradesh",
        district: "Chittoor",
        crop: record.cmdt_name,
        price: Number(record.as_on_price),
        arrival: Number(record.as_on_arrival),
        location
      });

    } catch (err) {
      logger.error("API error", { market: market.mkt_name });
    }
  }

  logger.info("Dynamic mandis fetched", { count: results.length });

  return results;
};