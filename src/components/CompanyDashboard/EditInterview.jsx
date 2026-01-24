import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditInterview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);

  useEffect(() => {
    const all =
      JSON.parse(localStorage.getItem("company_interviews")) || [];
    const found = all.find((i) => i.id === Number(id));

    if (found?.status !== "Draft") {
      alert("Only Draft interviews can be edited.");
      navigate(-1);
      return;
    }

    setInterview(found);
  }, [id, navigate]);

  const handleSave = () => {
    const all =
      JSON.parse(localStorage.getItem("company_interviews")) || [];

    const updated = all.map((i) =>
      i.id === interview.id ? interview : i
    );

    localStorage.setItem(
      "company_interviews",
      JSON.stringify(updated)
    );

    navigate(-1);
  };

  if (!interview) return null;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl">
      <h1 className="text-2xl font-bold mb-6">
        Edit Interview
      </h1>

      <label className="block mb-4">
        Title
        <input
          className="w-full border p-2 rounded mt-1"
          value={interview.title}
          onChange={(e) =>
            setInterview({
              ...interview,
              title: e.target.value,
            })
          }
        />
      </label>

      <label className="block mb-4">
        Role
        <input
          className="w-full border p-2 rounded mt-1"
          value={interview.role}
          onChange={(e) =>
            setInterview({
              ...interview,
              role: e.target.value,
            })
          }
        />
      </label>

      <button
        onClick={handleSave}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
      >
        Save Changes
      </button>
    </div>
  );
}
