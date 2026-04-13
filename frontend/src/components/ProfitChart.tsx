import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  data: any[];
};

export default function ProfitChart({ data }: Props) {
  return (
    <div className="mt-6 bg-white p-4 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition">

      <h2 className="text-lg md:text-xl font-bold mb-4 text-center">
        📊 Profit Comparison
      </h2>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[300px] h-[250px] md:h-[320px]">

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap="25%" barGap={8}>

              {/* Grid */}
              <CartesianGrid strokeDasharray="2 2" opacity={0.3} />

              {/* Axes */}
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />

              {/* Tooltip with ₹ formatting */}
              <Tooltip
                formatter={(value: any) =>
                  `₹${Math.round(value).toLocaleString("en-IN")}`
                }
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />

              {/* Bars */}
              <Bar
                dataKey="netProfit"
                fill="#16a34a"
                radius={[8, 8, 0, 0]}
                barSize={65}
              />

            </BarChart>
          </ResponsiveContainer>

        </div>
      </div>

    </div>
  );
}