import { useEffect, useState } from "react";

export default function Overview() {
  const [interviews, setInterviews] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("company_interviews")) || [];
    setInterviews(stored);
    setFiltered(stored);
  }, []);

  /* ================= DATE FILTER ================= */
  const applyFilter = () => {
    if (!startDate || !endDate) {
      alert("Please select both dates");
      return;
    }

    const result = interviews.filter((i) => {
      const created = new Date(i.createdAt);
      return (
        created >= new Date(startDate) &&
        created <= new Date(endDate + "T23:59:59")
      );
    });

    setFiltered(result);
  };

  const resetFilter = () => {
    setFiltered(interviews);
    setStartDate("");
    setEndDate("");
  };

  /* ================= METRICS ================= */
  const totalInterviews = filtered.length;

  const activeInterviews = filtered.filter(
    (i) => i.status === "Published"
  ).length;

  /* Attempts & shortlisted (safe fallback) */
  const attempts =
    JSON.parse(localStorage.getItem("interview_attempts")) || [];

  const totalCandidatesAttempted = attempts.filter((a) =>
    filtered.some((i) => i.id === a.interviewId)
  ).length;

  const shortlistedCandidates = attempts.filter(
    (a) => a.status === "Shortlisted"
  ).length;

  const stats = [
    { label: "Total Interviews", value: totalInterviews },
    { label: "Active Interviews", value: activeInterviews },
    {
      label: "Candidates Attempted",
      value: totalCandidatesAttempted,
    },
    {
      label: "Shortlisted Candidates",
      value: shortlistedCandidates,
    },
  ];

  return (
    <div>
      {/* ================= DATE FILTER ================= */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <input
          type="date"
          className="border p-2 rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button
          onClick={applyFilter}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Apply
        </button>

        <button
          onClick={resetFilter}
          className="border px-4 rounded"
        >
          Reset
        </button>
      </div>

      {/* ================= DASHBOARD CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded shadow"
          >
            <p className="text-gray-500">{item.label}</p>
            <h2 className="text-3xl font-bold text-blue-600">
              {item.value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
