import { useLocation } from "react-router-dom";
import ProfitChart from "../components/ProfitChart";

export default function Dashboard() {
  const location = useLocation();
  const { results, savings } = location.state || {};

  if (!results) {
    return <p className="text-center mt-10">No data available</p>;
  }

  const best = results.find((r: any) => r.isBest);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">
        📊 Decision Dashboard
      </h1>

      {/* Savings */}
      <div className="p-4 bg-green-100 border border-green-400 rounded-lg text-center font-semibold">
        💰 You can earn ₹{savings} more by choosing{" "}
        <span className="font-bold">{best.name}</span>
      </div>

      {/* Best Mandi Highlight */}
      <div className="p-6 bg-green-100 border border-green-500 rounded-xl shadow-md">
        <h2 className="text-xl font-bold">
          ⭐ Best Market: {best.name}
        </h2>
        <p>Revenue: ₹{best.revenue}</p>
        <p>Transport: ₹{best.transport}</p>
        <p className="text-green-600 font-bold">
          Profit: ₹{best.netProfit}
        </p>
      </div>

      {/* Profit Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {results.map((r: any, i: number) => (
          <div
            key={i}
            className={`p-4 rounded-lg shadow ${
              r.isBest
                ? "bg-green-50 border border-green-400"
                : "bg-white"
            }`}
          >
            <h3 className="font-bold">{r.name}</h3>
            <p>Distance: {r.distance} km</p>
            <p>Profit: ₹{r.netProfit}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <ProfitChart data={results} />

      {/* Impact Metrics */}
      <div className="grid md:grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-bold text-lg">Markets Compared</h3>
          <p>{results.length}</p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-bold text-lg">Best Profit</h3>
          <p>₹{best.netProfit}</p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-bold text-lg">Savings</h3>
          <p>₹{savings}</p>
        </div>
      </div>
    </div>
  );
}