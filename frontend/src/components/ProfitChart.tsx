import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: any[];
};

export default function ProfitChart({ data }: Props) {
  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">
        📊 Profit Comparison
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="mandi" /> 
          <YAxis />
          <Tooltip formatter={(value: any) => `₹${Math.round(value).toLocaleString("en-IN")}`}/>
          <Bar dataKey="netProfit" fill="#16a34a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}