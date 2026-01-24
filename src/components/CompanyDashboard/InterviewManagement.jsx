import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  Edit,
  Copy,
  XCircle,
  Trash2,
  CheckCircle,
} from "lucide-react";

export default function InterviewManagement() {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  /* ================= LOAD ================= */
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("company_interviews")) || [];
    setInterviews(stored);
  }, []);

  const updateStorage = (updated) => {
    setInterviews(updated);
    localStorage.setItem("company_interviews", JSON.stringify(updated));
  };

  /* ================= ACTIONS ================= */
  const publishInterview = (id) => {
    updateStorage(
      interviews.map((i) =>
        i.id === id ? { ...i, status: "Published" } : i
      )
    );
  };

  const closeInterview = (id) => {
    updateStorage(
      interviews.map((i) =>
        i.id === id ? { ...i, status: "Closed" } : i
      )
    );
  };

  const duplicateInterview = (interview) => {
    updateStorage([
      ...interviews,
      {
        ...interview,
        id: Date.now(),
        title: interview.title + " (Copy)",
        status: "Draft",
      },
    ]);
  };

  const deleteInterview = (id) => {
    if (!window.confirm("Delete this interview permanently?")) return;
    updateStorage(interviews.filter((i) => i.id !== id));
  };

  /* ================= UI ================= */
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Interview Management
        </h2>
      </div>

      {/* EMPTY STATE */}
      {interviews.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No interviews created yet.
        </div>
      )}

      {/* TABLE */}
      {interviews.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="py-3">Interview</th>
                <th>Status</th>
                <th>Access</th>
                <th>Schedule</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {interviews.map((i) => (
                <tr
                  key={i.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* TITLE */}
                  <td className="py-4">
                    <p className="font-semibold text-gray-800">
                      {i.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {i.role}
                    </p>
                  </td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          i.status === "Draft"
                            ? "bg-yellow-100 text-yellow-700"
                            : i.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                    >
                      {i.status}
                    </span>
                  </td>

                  {/* ACCESS */}
                  <td className="text-sm text-gray-700">
                    {i.accessType || "Public"}
                  </td>

                  {/* SCHEDULE */}
                  <td className="text-sm text-gray-500">
                    {i.scheduledAt
                      ? new Date(i.scheduledAt).toLocaleString()
                      : "Not scheduled"}
                  </td>

                  {/* ACTIONS */}
                  <td className="py-4">
                    <div className="flex justify-end gap-3">
                      {/* VIEW */}
                      <button
                        onClick={() =>
                          navigate(
                            `/company/dashboard/interview/${i.id}`
                          )
                        }
                        className="text-blue-600 hover:text-blue-800"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>

                      {/* DRAFT ACTIONS */}
                      {i.status === "Draft" && (
                        <>
                          <button
                            onClick={() =>
                              navigate(
                                `/company/dashboard/edit-interview/${i.id}`
                              )
                            }
                            className="text-indigo-600 hover:text-indigo-800"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>

                          <button
                            onClick={() => publishInterview(i.id)}
                            className="text-green-600 hover:text-green-800"
                            title="Publish"
                          >
                            <CheckCircle size={18} />
                          </button>
                        </>
                      )}

                      {/* PUBLISHED ACTION */}
                      {i.status === "Published" && (
                        <button
                          onClick={() => closeInterview(i.id)}
                          className="text-gray-600 hover:text-gray-800"
                          title="Close"
                        >
                          <XCircle size={18} />
                        </button>
                      )}

                      {/* DUPLICATE */}
                      <button
                        onClick={() => duplicateInterview(i)}
                        className="text-purple-600 hover:text-purple-800"
                        title="Duplicate"
                      >
                        <Copy size={18} />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => deleteInterview(i.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
