import { useLocation, useNavigate } from "react-router-dom";
import RouteMap from "../components/RouteMap";

export default function MapPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as any;

  const source = state?.source;
  const results = state?.results || [];

  const best = results.find((r: any) => r.isBest);
  const top5 = results.slice(0, 5);

  // 🚫 NO DATA SAFETY
  if (!source || results.length === 0) {
    return (
      <div className="text-center mt-20">
        <p className="text-gray-600">No map data available</p>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold text-center">
        🗺️ Route Visualization
      </h1>

      {/* ⭐ BEST ROUTE */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-2">⭐ Best Route</h2>

        <div className="h-[400px] rounded-xl overflow-hidden">
          {best ? (
            <RouteMap source={source} mandis={[best]} />
          ) : (
            <p className="text-gray-500 text-center mt-10">
              No best route available
            </p>
          )}
        </div>
      </div>

      {/* 📍 ALL ROUTES */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-2">📍 Top 5 Routes</h2>

        <div className="h-[400px] rounded-xl overflow-hidden">
          <RouteMap source={source} mandis={top5} />
        </div>
      </div>

      {/* BACK */}
      <div className="text-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          ← Back to Dashboard
        </button>
      </div>

    </div>
  );
}