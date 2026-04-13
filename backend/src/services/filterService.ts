import axios from "axios";

const URL = "https://api.agmarknet.gov.in/v1/dashboard-filters/";

let cache: any = null;

export const loadFilters = async () => {
  if (cache) return cache;

  const res = await axios.get(URL, {
    params: {
      dashboard_name: "marketwise_price_arrival"
    }
  });

  cache = res.data.data;
  return cache;
};