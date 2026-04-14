import axios from "axios";
import { resolveIds } from "./resolverService";
import { resolveLocation } from "./locationService";
import { logger } from "../utils/logger";

const BASE_URL = process.env.AGMARKNET_BASE_URL;

export const fetchMandiPrices = async (
  crop: string,
  stateName: string,
  districtName: string
) => {
  try {
    console.log("BASE URL:", BASE_URL);

    if (!BASE_URL) {
      throw new Error("AGMARKNET_BASE_URL is not defined in .env");
    }

    const { commodityId, stateId, districtId } = await resolveIds(
      crop,
      stateName,
      districtName
    );

    if (!commodityId || !stateId || !districtId) {
      throw new Error("Failed to resolve Agmarknet IDs");
    }

    console.log({ crop, stateName, districtName, commodityId, stateId, districtId });

    const getFormattedDate = (date: Date) => date.toISOString().split("T")[0];

    let records: any[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const formattedDate = getFormattedDate(date);
      console.log("Trying date:", formattedDate);

      const params = {
        dashboard: "marketwise_price_arrival",
        date: formattedDate,
        commodity: `[${commodityId}]`,
        state: stateId,
        district: `[${districtId}]`,
        format: "json",
      };

      const response = await axios.get(`${BASE_URL}/dashboard-data/`, {
        params,
        timeout: 10000,
      });

      console.log("Raw response:", response.data);

      const dataBlock = response.data?.data;
      console.log("dataBlock:", dataBlock);

      records = dataBlock?.records || dataBlock?.rows || dataBlock?.data || [];
      console.log("Records found:", records.length);

      if (records.length > 0) {
        console.log(`Data found for date: ${formattedDate}`);
        break;
      }
    }

    if (!records.length) {
      logger.info("Real mandi data fetched", { count: 0 });
      return [];
    }

    
  const mandis = records.map((r: any) => {
  const marketName =
    r.market_name ||
    r.market ||
    r.marketName ||
    districtName;

  return {
    name: marketName,
    state: stateName,
    district: districtName,
    crop: r.cmdt_name || crop,
    price: Number(r.as_on_price || r.msp_price || 0),
    arrival: Number(r.as_on_arrival || 0),
    date: r.reported_date || r.price_date || "",
    location: resolveLocation(marketName, districtName, stateName),
  };
});

    logger.info("Real mandi data fetched", {
      count: mandis.length,
    });

    return mandis;
  } catch (error: any) {
    console.error("Agmarknet Service Error:", error.message);
    throw error;
  }
};