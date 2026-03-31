// export default function Analytics() {
//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">
//         Analytics
//       </h2>
//       <p>Score distribution and performance charts will appear here.</p>
//     </div>
//   );
// }
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

export default function Analytics() {
  // 🔹 Dummy Interview Results Data
  const data = [
    { name: "Rahul", interview: "Frontend", score: 78, result: "Pass" },
    { name: "Neha", interview: "Backend", score: 45, result: "Fail" },
    { name: "Amit", interview: "Frontend", score: 88, result: "Pass" },
    { name: "Sneha", interview: "Backend", score: 62, result: "Pass" },
    { name: "Ravi", interview: "Frontend", score: 35, result: "Fail" },
  ];

  // 🔹 Filters
  const [selectedInterview, setSelectedInterview] = useState("All");

  const filteredData =
    selectedInterview === "All"
      ? data
      : data.filter((d) => d.interview === selectedInterview);

  // 🔹 Calculations
  const totalCandidates = filteredData.length;
  const passCount = filteredData.filter((d) => d.result === "Pass").length;
  const failCount = totalCandidates - passCount;

  const avgScore =
    totalCandidates > 0
      ? Math.round(
          filteredData.reduce((sum, d) => sum + d.score, 0) / totalCandidates
        )
      : 0;

  // 🔹 Chart Data
  const scoreDistribution = [
    { range: "0-40", count: filteredData.filter((d) => d.score <= 40).length },
    {
      range: "41-70",
      count: filteredData.filter((d) => d.score > 40 && d.score <= 70).length,
    },
    {
      range: "71-100",
      count: filteredData.filter((d) => d.score > 70).length,
    },
  ];

  const passFailData = [
    { name: "Pass", value: passCount },
    { name: "Fail", value: failCount },
  ];

  const avgScorePerInterview = [
    {
      interview: "Frontend",
      score:
        data
          .filter((d) => d.interview === "Frontend")
          .reduce((s, d) => s + d.score, 0) / 3,
    },
    {
      interview: "Backend",
      score:
        data
          .filter((d) => d.interview === "Backend")
          .reduce((s, d) => s + d.score, 0) / 2,
    },
  ];

  return (
    <div className="space-y-6">

      {/* 🔹 FILTERS */}
      <div className="flex gap-4">
        <select
          value={selectedInterview}
          onChange={(e) => setSelectedInterview(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All Interviews</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
        </select>
      </div>

      {/* 🔹 SUMMARY CARDS */}
      <div className="grid grid-cols-4 gap-4">
        <Card title="Candidates" value={totalCandidates} />
        <Card title="Avg Score" value={avgScore} />
        <Card title="Pass Rate" value={`${Math.round((passCount / totalCandidates) * 100 || 0)}%`} />
        <Card title="Fail Rate" value={`${Math.round((failCount / totalCandidates) * 100 || 0)}%`} />
      </div>

      {/* 🔹 CHARTS */}
      <div className="grid grid-cols-2 gap-6">

        {/* Score Distribution */}
        <ChartBox title="Score Distribution">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={scoreDistribution}>
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* Pass vs Fail */}
        <ChartBox title="Pass vs Fail">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={passFailData} dataKey="value" outerRadius={80}>
                <Cell fill="#22c55e" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* Avg Score per Interview */}
        <ChartBox title="Avg Score per Interview">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={avgScorePerInterview}>
              <XAxis dataKey="interview" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#9333ea" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>

      {/* 🔹 INTERVIEW RESULTS TABLE */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Interview Results</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Candidate</th>
              <th className="p-2 border">Interview</th>
              <th className="p-2 border">Score</th>
              <th className="p-2 border">Result</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((c, i) => (
              <tr key={i}>
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{c.interview}</td>
                <td className="p-2 border">{c.score}</td>
                <td className="p-2 border font-semibold">
                  {c.result === "Pass" ? "Hire" : "Reject"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 🔹 Reusable Components
function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>
  );
}

function ChartBox({ title, children }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="mb-2 font-semibold">{title}</h3>
      {children}
    </div>
  );
}

