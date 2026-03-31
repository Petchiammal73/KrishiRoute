type Props = {
  results: any[];
};

export default function Results({ results }: Props) {
  return (
    <div className="mt-8 space-y-4">
      {results.map((r, i) => (
        <div
          key={i}
          className={`p-5 border rounded-xl shadow-md transition ${
            r.isBest
              ? "bg-green-100 border-green-500"
              : "bg-white"
          }`}
        >
          <h2 className="font-bold text-xl">{r.name}</h2>

          {r.isBest && (
            <p className="text-green-700 font-bold mt-1">
              ⭐ Best Option
            </p>
          )}

          <div className="mt-2 space-y-1 text-sm">
            <p>Revenue: ₹{r.revenue}</p>
            <p>Transport Cost: ₹{r.transport}</p>
            <p className="text-green-600 font-semibold">
              Profit: ₹{r.netProfit}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}