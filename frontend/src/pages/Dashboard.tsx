import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfitChart from "../components/ProfitChart";

export default function Dashboard() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();

  const [results, setResults] = useState<any[]>([]);
  const [savings, setSavings] = useState<number>(0);
  const [history, setHistory] = useState<any[]>([]);
  const [username, setUsername] = useState("");

  const formatCurrency = (value: number) =>
    value < 0
      ? `-₹${Math.abs(Math.round(value)).toLocaleString("en-IN")}`
      : `₹${Math.round(value).toLocaleString("en-IN")}`;

  useEffect(() => {
    const storedResults = localStorage.getItem("dashboardData");
    const storedSavings = localStorage.getItem("dashboardSavings");
    const storedHistory = localStorage.getItem("history");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (storedResults) setResults(JSON.parse(storedResults));
    if (storedSavings) setSavings(JSON.parse(storedSavings));
    if (storedHistory) setHistory(JSON.parse(storedHistory));

    if (user.email) {
      setUsername(user.email.split("@")[0]);
    }
  }, []);

  if (!isLoggedIn) return <Navigate to="/login" />;

  if (!results || results.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500">
        <p className="text-lg font-medium">No data yet</p>
        <p className="text-sm">Start using optimizer 🚀</p>
      </div>
    );
  }

  const best = results.find((r: any) => r.isBest);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">

      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold">
          👋 Welcome back, {username || "Farmer"}
        </h1>
        <p className="text-gray-500 mt-2">
          Smart insights for your crop selling decisions
        </p>
      </div>

      {/* HERO */}
      <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-2">
          💰 Best Market Recommendation
        </h2>

        <p>
          Sell at <span className="font-bold">{best.name}</span> to earn{" "}
          <span className="font-bold">{formatCurrency(best.netProfit)}</span>
        </p>

        <p className="text-sm mt-2 opacity-90">
          You gain {formatCurrency(savings)} more compared to the lowest option
        </p>

        <button
          onClick={() => navigate("/map")}
          className="mt-4 bg-white text-green-700 px-4 py-2 rounded-lg font-medium"
        >
          📍 View Route Map
        </button>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

        <div className="bg-white p-5 rounded-2xl shadow text-center">
          <p className="text-gray-500 text-sm">Markets Compared</p>
          <p className="text-xl font-bold">{results.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow text-center">
          <p className="text-gray-500 text-sm">Best Profit</p>
          <p className="text-xl font-bold text-green-600">
            {formatCurrency(best.netProfit)}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow text-center">
          <p className="text-gray-500 text-sm">Savings</p>
          <p className="text-xl font-bold text-green-600">
            {formatCurrency(savings)}
          </p>
        </div>
      </div>

      {/* MARKET CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((r: any, i: number) => (
          <div
            key={i}
            className={`p-5 rounded-2xl shadow ${
              r.isBest ? "bg-green-50 border border-green-400" : "bg-white"
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
      <div>
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">🕒 Recent Activity</h2>

          <button
            onClick={() => navigate("/history")}
            className="text-green-600 text-sm font-semibold"
          >
            View All →
          </button>
        </div>

        {history.length === 0 ? (
          <p className="text-gray-500">No history yet</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {history.slice(0, 2).map((h, i) => (
              <div key={i} className="p-4 bg-white rounded-xl shadow">
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
                  {formatCurrency(h.profit)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="text-center">
        <button
          onClick={() => navigate("/optimizer")}
          className="bg-green-600 text-white px-6 py-3 rounded-xl"
        >
          Try Another Calculation
        </button>
      </div>

    </div>
  );
}