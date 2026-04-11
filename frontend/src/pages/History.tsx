import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("history");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">
        🕒 Full Activity History
      </h1>

      {history.length === 0 ? (
        <p className="text-center text-gray-500">
          No history available
        </p>
      ) : (
        <div className="space-y-4">
          {history.map((h, i) => (
            <div
              key={i}
              className="p-5 bg-white rounded-xl shadow flex justify-between"
            >
              <div>
                <p className="font-semibold text-lg">
                  {h.crop.toUpperCase()} → {h.bestMarket}
                </p>
                <p className="text-sm text-gray-500">
                  Quantity: {h.quantity}
                </p>
                <p className="text-sm text-gray-500">
                  Vehicle: {h.vehicle}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(h.timestamp).toLocaleString()}
                </p>
              </div>

              <div className="text-green-600 font-bold text-lg">
                ₹{h.profit}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}