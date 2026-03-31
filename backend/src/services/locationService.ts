import cityData from "../data/cityCoordinates.json";
import districtData from "../data/districtCoordinates.json";

const normalize = (str: string) => str.toLowerCase().trim();

export const resolveLocation = (
  market: string,
  district: string,
  state: string
) => {
  const marketKey = normalize(market);
  const districtKey = normalize(district);
  const stateKey = normalize(state);

  // try city match
  if ((cityData as any)[marketKey]) {
    return (cityData as any)[marketKey];
  }

  // try district match
  const districtFullKey = `${stateKey}_${districtKey}`;

  if ((districtData as any)[districtFullKey]) {
    return (districtData as any)[districtFullKey];
  }

  // fallback: district only
  if ((districtData as any)[districtKey]) {
    return (districtData as any)[districtKey];
  }

  return null;
};