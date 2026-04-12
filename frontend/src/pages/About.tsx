export default function About() {
  return (
    <div className="px-6 md:px-16 py-10 space-y-12">

      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          About KrishiRoute 🌾
        </h1>
        <p className="text-gray-600 text-lg">
          Empowering farmers with smarter decisions to maximize
          their profits and reduce losses.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center">

        <div>
          <h2 className="text-2xl font-bold mb-4">
            The Problem
          </h2>

          <p className="text-gray-600 mb-4">
            Most farmers sell their produce at the nearest mandi
            without comparing prices across markets. This leads to
            significant loss in potential income due to lack of
            information and logistics awareness.
          </p>

          <p className="text-gray-600">
            A farmer traveling a little farther could earn much
            more — but without proper tools, this decision is
            difficult.
          </p>
        </div>

        <img
          src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
          className="rounded-xl shadow-md"
        />
      </div>

      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Our Solution
        </h2>

        <p className="text-gray-600">
          KrishiRoute helps farmers identify the most profitable
          mandi by analyzing market prices, transport costs, and
          distance — all in one place.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 text-center">
        <div className="p-6 bg-white rounded-xl shadow">
          📊
          <h3 className="font-semibold mt-2">
            Smart Comparison
          </h3>
          <p className="text-sm text-gray-600">
            Compare multiple markets instantly
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          🚛
          <h3 className="font-semibold mt-2">
            Logistics Awareness
          </h3>
          <p className="text-sm text-gray-600">
            Factor in transport costs accurately
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          💰
          <h3 className="font-semibold mt-2">
            Profit Optimization
          </h3>
          <p className="text-sm text-gray-600">
            Maximize earnings with data-driven insights
          </p>
        </div>
      </div>

      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Impact
        </h2>

        <p className="text-gray-600">
          By providing actionable insights, KrishiRoute can help
          farmers increase their income, reduce uncertainty, and
          make informed selling decisions.
        </p>
      </div>

    </div>
  );
}