import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="px-6 md:px-16 py-10 space-y-16">
      
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          🌾 Smart Market Selection for Farmers
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Find the most profitable mandi by analyzing prices,
          transport cost, and distance — all in one place.
        </p>

        <Link
          to="/optimizer"
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Try Optimizer
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Maximize Your Profit
          </h2>

          <p className="text-gray-600 mb-4">
            Farmers often sell at the nearest mandi without
            comparing prices. Our platform helps you find
            the most profitable option by analyzing:
          </p>

          <ul className="space-y-2 text-gray-700">
            <li>✅ Market prices across mandis</li>
            <li>✅ Transport cost based on distance</li>
            <li>✅ Net profit comparison</li>
            <li>✅ Best market recommendation</li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1560493676-04071c5f467b"
            className="rounded-xl shadow-md object-cover h-full w-full"
          />
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef"
            className="rounded-xl shadow-md object-cover h-full w-full"
          />
          <img
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399"
            className="rounded-xl shadow-md col-span-2 object-cover h-full w-full"
          />
        </div>
      </div>

      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">
          Why Use KrishiRoute?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl shadow">
            📊
            <h3 className="font-semibold mt-2">Data Driven</h3>
            <p className="text-sm text-gray-600">
              Real-time market comparisons
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow">
            🚛
            <h3 className="font-semibold mt-2">Smart Logistics</h3>
            <p className="text-sm text-gray-600">
              Transport cost optimization
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow">
            💰
            <h3 className="font-semibold mt-2">Higher Profit</h3>
            <p className="text-sm text-gray-600">
              Maximize your earnings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}