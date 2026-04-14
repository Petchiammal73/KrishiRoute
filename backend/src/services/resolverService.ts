import { loadFilters } from "./filterService";

const normalize = (str: string) =>
  str.toLowerCase().replace(/[^a-z]/g, "");

const districtAliases: Record<string, string> = {
  thoothukudi: "tuticorin",
  tuticorin: "tuticorin",
  kanniyakumari: "nagercoilkannyiakumari",
  kanyakumari: "nagercoilkannyiakumari",
  tirunelveli: "thirunelveli",
  tirupur: "thirupur",
  tiruvallur: "thiruvellore",
};

export const resolveIds = async (
  crop: string,
  stateName: string,
  districtName: string
) => {
  const data = await loadFilters();

  const normCrop = normalize(crop);
  const normState = normalize(stateName);
  let normDistrict = normalize(districtName);

  // 🔹 Apply alias mapping
  if (districtAliases[normDistrict]) {
    normDistrict = districtAliases[normDistrict];
  }

  const commodity = data.cmdt_data.find((c: any) =>
    normalize(c.cmdt_name).includes(normCrop)
  );

  const state = data.state_data.find((s: any) =>
    normalize(s.state_name).includes(normState)
  );

  if (!commodity) throw new Error(`Commodity not found: ${crop}`);
  if (!state) throw new Error(`State not found: ${stateName}`);

  const district = data.district_data.find((d: any) =>
    normalize(d.district_name).includes(normDistrict) &&
    d.state_id === state.state_id
  );

  if (!district) {
    console.log(
      "Available districts for state:",
      data.district_data
        .filter((d: any) => d.state_id === state.state_id)
        .map((d: any) => d.district_name)
    );

    throw new Error(`District not found: ${districtName}`);
  }
  console.log("Matched commodity:", commodity);
console.log("Matched state:", state);
console.log("Matched district:", district);
  
  return {
    commodityId: commodity.cmdt_id,
    stateId: state.state_id,
    districtId: district.id,
  };
};