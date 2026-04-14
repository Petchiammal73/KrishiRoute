import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ProfitChart from "../components/ProfitChart";
import { saveHistory, getHistory } from "../api/historyApi";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const { results, savings, source, fromCalculation } = location.state || {};

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const [username, setUsername] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const hasSaved = useRef(false);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  const best = results?.find((r: any) => r.isBest);

  const formatCurrency = (value: number = 0) =>
    `₹${Math.round(value).toLocaleString("en-IN")}`;

 
  const fetchHistory = async (email: string) => {
    try {
      const res = await getHistory(email);
      setHistory(res.data || []);
    } catch (err) {
      console.error("Fetch history error:", err);
    }
  };

  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user?.email) {
      setUsername(user.email.split("@")[0]);
      fetchHistory(user.email);
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!results?.length || !best || !user?.email || !fromCalculation) return;

    const saveKey = `history-saved:${user.email}:${best.name}:${best.netProfit}`;

    if (hasSaved.current || localStorage.getItem(saveKey)) return;

    hasSaved.current = true;
    localStorage.setItem(saveKey, "1");

    const payload = {
      userEmail: user.email,
      crop: best.crop ?? "Not Selected",
      bestMarket: best.name ?? "Unknown Market",
      quantity: best.quantity ?? 0,
      vehicle: best.vehicle ?? "Not Selected",
      profit: Math.round(best.netProfit ?? 0),
      timestamp: new Date().toISOString(),
    };

    saveHistory(payload)
      .then(async () => {
        // 🔥 ALWAYS REFRESH FROM DATABASE
        await fetchHistory(user.email);
      })
      .catch((err) => {
        console.error("Save history error:", err);
        hasSaved.current = false;
        localStorage.removeItem(saveKey);
      });
  }, [results, best, fromCalculation]);

  if (!results || results.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500">
        <p className="text-lg font-medium">No data yet</p>
        <p className="text-sm">Start using optimizer 🚀</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">

      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          👋 Welcome back, {username || "Farmer"}
        </h1>
        <p className="text-gray-500">
          Smart insights for your crop selling decisions
        </p>
      </div>

      {/* BEST RESULT */}
      <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-2">
          💰 Best Market Recommendation
        </h2>

        <p>
          Sell at <span className="font-bold">{best?.name}</span> → Earn{" "}
          <span className="font-bold">
            {formatCurrency(best?.netProfit)}
          </span>
        </p>

        <p className="text-sm mt-2 opacity-90">
          You gain {formatCurrency(savings || 0)} more compared to others
        </p>

        <button
          onClick={() =>
            navigate("/map", { state: { source, results, best } })
          }
          className="mt-4 bg-white text-green-700 px-4 py-2 rounded-lg font-medium"
        >
          📍 View Route Map
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow text-center">
          <p className="text-gray-500 text-sm">Markets Compared</p>
          <p className="text-xl font-bold">{results.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow text-center">
          <p className="text-gray-500 text-sm">Best Profit</p>
          <p className="text-xl font-bold text-green-600">
            {formatCurrency(best?.netProfit)}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow text-center">
          <p className="text-gray-500 text-sm">Savings</p>
          <p className="text-xl font-bold text-green-600">
            {formatCurrency(savings || 0)}
          </p>
        </div>
      </div>

      {/* MARKET CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((r: any, i: number) => (
          <div
            key={i}
            className={`p-5 rounded-2xl shadow ${
              r.isBest
                ? "bg-green-50 border border-green-400"
                : "bg-white"
            }`}
          >
            <h3 className="font-bold">{r.name}</h3>

            <p className="text-sm text-gray-500">
              Distance: {Math.round(r.distance)} km
            </p>

            <p className="text-green-600 font-semibold">
              {formatCurrency(r.netProfit)}
            </p>

            {r.isBest && (
              <span className="text-xs text-green-700 font-bold">
                ⭐ Best Choice
              </span>
            )}
          </div>
        ))}
      </div>

      {/* CHART */}
      <ProfitChart data={results} />

      {/* RECENT ACTIVITY */}
      <div className="bg-white p-5 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">🕒 Recent Activity</h2>

          <button
            onClick={() => navigate("/history")}
            className="text-green-600 text-sm font-semibold hover:underline"
          >
            View All →
          </button>
        </div>

        {history.length === 0 ? (
          <p className="text-gray-500">No history yet</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {history.slice(0, 2).map((h, i) => (
              <div key={i} className="p-4 border rounded-xl">
                <p className="font-semibold">
                  {h.crop} → {h.bestMarket}
                </p>

                <p className="text-sm text-gray-500">
                  Qty: {h.quantity} | {h.vehicle}
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(h.timestamp).toLocaleString()}
                </p>

                <p className="text-green-600 font-bold">
                  ₹{Math.round(h.profit)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}