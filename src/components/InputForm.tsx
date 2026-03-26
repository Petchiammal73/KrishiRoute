import { useState } from "react";

export default function InputForm() {
  const [form, setForm] = useState({
    crop: "",
    quantity: "",
    vehicle: "",
  });

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-6">
      
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Enter Trip Details 🚜
      </h2>

      {/* Crop */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Crop</label>
        <select
          className="w-full border p-2 rounded-lg"
          onChange={(e) =>
            setForm({ ...form, crop: e.target.value })
          }
        >
          <option value="">Select Crop</option>
          <option value="onion">Onion</option>
          <option value="tomato">Tomato</option>
          <option value="wheat">Wheat</option>
        </select>
      </div>

      {/* Quantity */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Quantity (quintals)</label>
        <input
          type="number"
          className="w-full border p-2 rounded-lg"
          placeholder="Enter quantity"
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
        />
      </div>

      {/* Vehicle */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Vehicle</label>
        <select
          className="w-full border p-2 rounded-lg"
          onChange={(e) =>
            setForm({ ...form, vehicle: e.target.value })
          }
        >
          <option value="">Select Vehicle</option>
          <option value="truck">Truck</option>
          <option value="tractor">Tractor</option>
          <option value="tataace">Tata Ace</option>
        </select>
      </div>

      {/* Button */}
      <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition">
        Calculate Best Profit
      </button>
    </div>
  );
}