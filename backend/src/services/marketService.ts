import { loadFilters } from "./filterService";

export const getMarketsByDistrict = async (stateId: number, districtId: number) => {
  const data = await loadFilters();

  return data.market_data.filter(
    (m: any) =>
      m.state_id === stateId &&
      m.district_id === districtId &&
      m.id !== 100009 
  );
};