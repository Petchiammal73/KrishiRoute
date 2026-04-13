import axios from "axios";

const URL = "https://api.agmarknet.gov.in/v1/dashboard-filters/";

let commodityMap: Record<string, number> = {};
let loaded = false;

export const loadCommodities = async () => {
  if (loaded) return commodityMap;

  const res = await axios.get(URL, {
    params: {
      dashboard_name: "marketwise_price_arrival"
    }
  });

  const data = res.data.data.cmdt_data;

  commodityMap = {};

  data.forEach((c: any) => {
    commodityMap[c.cmdt_name.toLowerCase()] = c.cmdt_id;
  });

  loaded = true;

  return commodityMap;
};

export const getCommodityId = async (crop: string) => {
  const map = await loadCommodities();

  return map[crop.toLowerCase()];
};