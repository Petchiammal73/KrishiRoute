import { useState } from "react";
import MapPicker from "./MapPicker";
import API from "../api";
import { useNavigate } from "react-router-dom";

type FormData = {
  crop: string;
  quantity: number;
  vehicle: string;
  location: any;
};

export default function InputForm() {
  const [form, setForm] = useState<FormData>({
    crop: "",
    quantity: 0,
    vehicle: "",
    location: null,
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form.crop || !form.quantity || !form.vehicle || !form.location) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/profit/calculate", {
        crop: form.crop,
        quantity: form.quantity,
        vehicle: form.vehicle,
        sourceLocation: form.location,
      });

      const { bestMandi, allOptions } = res.data;

      const filtered = allOptions.filter((m: any) => m.netProfit > 0);
      if (filtered.length === 0) {
        alert("No profitable mandis found");
        return;
      }

      const sorted = filtered.sort(
        (a: any, b: any) => b.netProfit - a.netProfit
      );

      const top5 = sorted.slice(0, 5);

      const minProfit = Math.min(...top5.map((m: any) => m.netProfit));
      const savings = bestMandi.netProfit - minProfit;

      const finalResults = top5.map((m: any) => ({
        ...m,
        name: m.mandi, // 🔥 IMPORTANT FIX for your dashboard
        isBest: m.mandi === bestMandi.mandi,
      }));

      // 🔥 ADD YOUR HISTORY FEATURE
      const historyEntry = {
        crop: form.crop,
        quantity: form.quantity,
        vehicle: form.vehicle,
        bestMarket: bestMandi.mandi,
        profit: bestMandi.netProfit,
        timestamp: new Date().toISOString(),
      };

      const existingHistory = JSON.parse(
        localStorage.getItem("history") || "[]"
      );

      const updatedHistory = [historyEntry, ...existingHistory].slice(0, 5);

      localStorage.setItem("history", JSON.stringify(updatedHistory));

      // 🔥 STORE FOR DASHBOARD (IMPORTANT FIX)
      localStorage.setItem("dashboardData", JSON.stringify(finalResults));
      localStorage.setItem("dashboardSavings", JSON.stringify(savings));

      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Error fetching data from server");
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
          onChange={(e) =>
            setForm({ ...form, crop: e.target.value })
          }
        >
          <option value="">Select Crop</option>
          <option value="arhar">Arhar (Tur)</option>
          <option value="cotton">Cotton</option>
          <option value="jowar">Jowar</option>
          <option value="soyabean">Soyabean</option>
          <option value="wheat">Wheat</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Quantity (quintals)
        </label>
        <input
          type="number"
          className="w-full border p-3 rounded-lg"
          placeholder="Enter quantity"
          onChange={(e) =>
            setForm({
              ...form,
              quantity: Number(e.target.value),
            })
          }
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Vehicle</label>
        <select
          className="w-full border p-3 rounded-lg"
          onChange={(e) =>
            setForm({ ...form, vehicle: e.target.value })
          }
        >
          <option value="">Select Vehicle</option>
          <option value="TRACTOR">Tractor</option>
          <option value="TRUCK">Truck</option>
          <option value="TATA_ACE">Tata Ace</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">
          Select Location 📍
        </label>
        <MapPicker
          setLocation={(loc: any) =>
            setForm({ ...form, location: loc })
          }
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Calculate Best Profit
      </button>
    </div>
  );
}