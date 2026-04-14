import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import MapPicker from "./MapPicker";
import LocationSearch from "./LocationSearch";

type LocationType = {
  lat: number;
  lng: number;
  label?: string;
};

type ModeType = "search" | "map" | "current";

type FormData = {
  crop: string;
  quantity: number;
  vehicle: string;
  location: LocationType | null;
};

const cropOptions = [
  "Bajra(Pearl Millet/Cumbu)",
  "Barley(Jau)",
  "Jowar(Sorghum)",
  "Maize",
  "Paddy(Common)",
  "Ragi(Finger Millet)",
  "Wheat",
  "Cotton",
  "Copra",
  "Groundnut",
  "Mustard",
  "Niger Seed(Ramtil)",
  "Safflower",
  "Sesamum(Sesame,Gingelly,Til)",
  "Soyabean",
  "Sunflower",
  "Arhar(Tur/Red Gram)(Whole)",
  "Bengal Gram(Gram)(Whole)",
  "Black Gram(Urd Beans)(Whole)",
  "Green Gram(Moong)(Whole)",
  "Lentil(Masur)(Whole)",
  "Onion",
  "Potato",
  "Tomato",
];

export default function InputForm() {
  const [form, setForm] = useState<FormData>({
    crop: "",
    quantity: 0,
    vehicle: "",
    location: null,
  });

  const [mode, setMode] = useState<ModeType>("search");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();

      return {
        state: data.address.state,
        district:
          data.address.state_district ||
          data.address.county ||
          data.address.district,
      };
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
      return null;
    }
  };

  const handleModeChange = (selectedMode: ModeType) => {
    setMode(selectedMode);

    if (selectedMode === "current") {
      if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setForm((prev) => ({
            ...prev,
            location: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              label: "Current Location",
            },
          }));
        },
        () => {
          alert("Please allow location access");
        }
      );
    }
  };

  const handleSubmit = async () => {
    if (!form.crop || form.quantity <= 0 || !form.vehicle || !form.location) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const geo = await reverseGeocode(form.location.lat, form.location.lng);

      if (!geo?.state || !geo?.district) {
        alert("Could not detect state/district from location");
        setLoading(false);
        return;
      }

      const res = await API.post("/profit/calculate", {
        crop: form.crop,
        quantity: form.quantity,
        vehicle: form.vehicle,
        state: geo.state,
        district: geo.district,
        sourceLocation: {
          lat: form.location.lat,
          lng: form.location.lng,
        },
      });

      const { bestMandi, allOptions } = res.data;

      const filtered = (allOptions || []).filter((m: any) => m.netProfit > 0);

      if (filtered.length === 0) {
        alert("No profitable mandis found");
        setLoading(false);
        return;
      }

      const sorted = filtered.sort((a: any, b: any) => b.netProfit - a.netProfit);
      const top5 = sorted.slice(0, 5);

      const minProfit = Math.min(...top5.map((m: any) => m.netProfit));
      const savings = bestMandi.netProfit - minProfit;

      const finalResults = top5.map((m: any) => ({
        ...m,
        crop: form.crop,
        quantity: form.quantity,
        vehicle: form.vehicle,
        isBest: m.name === bestMandi.name,
      }));

      navigate("/dashboard", {
        state: {
          results: finalResults,
          savings,
          source: form.location,
          fromCalculation: true,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🚜 Krishi Route Optimizer
      </h1>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Crop</label>
        <select
          className="w-full border p-3 rounded-lg"
          value={form.crop}
          onChange={(e) => setForm({ ...form, crop: e.target.value })}
        >
          <option value="">Select Crop</option>
          {cropOptions.map((crop) => (
            <option key={crop} value={crop}>
              {crop}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Quantity</label>
        <input
          type="number"
          className="w-full border p-3 rounded-lg"
          value={form.quantity || ""}
          onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Vehicle</label>
        <select
          className="w-full border p-3 rounded-lg"
          value={form.vehicle}
          onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
        >
          <option value="">Select Vehicle</option>
          <option value="mini">Tractor</option>
          <option value="truck">Truck</option>
          <option value="lorry">Tata Ace</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Select Location</label>

        <div className="flex gap-2 mb-3">
          <button
            type="button"
            onClick={() => handleModeChange("current")}
            className={`px-4 py-2 rounded ${
              mode === "current" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            📍 Current
          </button>

          <button
            type="button"
            onClick={() => handleModeChange("search")}
            className={`px-4 py-2 rounded ${
              mode === "search" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            🔍 Search
          </button>

          <button
            type="button"
            onClick={() => handleModeChange("map")}
            className={`px-4 py-2 rounded ${
              mode === "map" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            🗺️ Map
          </button>
        </div>

        {mode === "search" && (
          <LocationSearch
            onSelect={(loc) => setForm({ ...form, location: loc })}
          />
        )}

        {mode === "map" && (
          <MapPicker
            selectedLocation={form.location}
            setLocation={(loc: LocationType) =>
              setForm({ ...form, location: loc })
            }
          />
        )}
      </div>

      {form.location && (
        <p className="text-sm text-gray-700 mb-4 font-medium">
          📍 Selected: {form.location.label}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? "Calculating..." : "Calculate Best Profit"}
      </button>
    </div>
  );
}