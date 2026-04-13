import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHistory } from "../api/historyApi";

export default function History() {
  const [history, setHistory] = useState<any[]>([]);
  const navigate = useNavigate();

  // ✅ FETCH FROM BACKEND (NOT localStorage)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user?.email) {
      fetchHistory(user.email);
    }
  }, []);

  const fetchHistory = async (email: string) => {
    try {
      const res = await getHistory(email);
      setHistory(res.data || []);
    } catch (err) {
      console.error("❌ Fetch history error:", err);
    }
  };

  const formatCurrency = (value: number = 0) =>
    `₹${Math.round(value).toLocaleString("en-IN")}`;

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📊 All Activity</h1>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          ← Back
        </button>
      </div>

      {/* DATA */}
      {history.length === 0 ? (
        <p className="text-gray-500">No history found</p>
      ) : (
        <div className="space-y-4">
          {history.map((h, i) => (
            <div key={i} className="p-4 border rounded-xl shadow-sm">
              <p className="font-semibold">
                {h.crop} → {h.bestMarket}
              </p>

              <p className="text-sm text-gray-500">
                Quantity: {h.quantity} | Vehicle: {h.vehicle}
              </p>

              <p className="text-xs text-gray-400">
                {new Date(h.timestamp).toLocaleString()}
              </p>

              <p className="text-green-600 font-bold">
                {formatCurrency(h.profit)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}