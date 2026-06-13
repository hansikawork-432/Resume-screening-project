import { PieChart, Pie, Cell } from "recharts";

function Charts({ score }) {
  const data = [
    { name: "Match", value: score },
    { name: "Gap", value: 100 - score }
  ];

  return (
    <PieChart width={200} height={200}>
      <Pie data={data} dataKey="value" outerRadius={80}>
        <Cell fill="#4f46e5" />
        <Cell fill="#e5e7eb" />
      </Pie>
    </PieChart>
  );
}

export default Charts;
