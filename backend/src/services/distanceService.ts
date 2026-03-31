import { Location } from "../types";

export const getDistance = (a: Location, b: Location): number => {
  const dx = a.lat - b.lat;
  const dy = a.lng - b.lng;

  return Math.sqrt(dx * dx + dy * dy) * 111;
};