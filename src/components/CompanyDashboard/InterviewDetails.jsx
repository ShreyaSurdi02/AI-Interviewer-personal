import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function InterviewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);

  useEffect(() => {
    const all =
      JSON.parse(localStorage.getItem("company_interviews")) || [];
    const found = all.find((i) => i.id === Number(id));
    setInterview(found);
  }, [id]);

  if (!interview) {
    return <p className="p-6">Interview not found</p>;
  }

  //  Lock logic
  const isLocked =
    interview.status === "Published" ||
    interview.status === "Closed";

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg space-y-8">

      {/* INTERVIEW DETAILS */}
      <div>
        <h1 className="text-3xl font-bold mb-6">
          {interview.title}
        </h1>

        <div className="space-y-3 text-gray-700">
          <p><b>Role:</b> {interview.role}</p>
          <p><b>Difficulty:</b> {interview.difficulty}</p>
          <p><b>Duration:</b> {interview.duration} mins</p>
          <p><b>Status:</b> {interview.status}</p>
          <p><b>Access:</b> {interview.accessType}</p>

          {/* Optional fields (won’t break if absent) */}
          {interview.scheduledAt && (
            <p><b>Scheduled:</b> {interview.scheduledAt}</p>
          )}
          {interview.totalScore && (
            <p><b>Total Score:</b> {interview.totalScore}</p>
          )}
        </div>
      </div>

      {/* QUESTIONS SECTION */}
      {interview.questions && interview.questions.length > 0 && (
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Questions</h2>

            {isLocked && (
              <span className="text-sm text-red-500 font-medium">
                 Locked
              </span>
            )}
          </div>

          <div className="space-y-4">
            {interview.questions.map((q, index) => (
              <div
                key={q.id || index}
                className="bg-gray-50 border rounded-xl p-4"
              >
                <p className="font-medium">
                  Q{index + 1}. {q.text}
                </p>

                <div className="text-sm text-gray-600 mt-2 space-y-1">
                  <p>Type: {q.type}</p>
                  {/* <p>Time Limit: {q.timeLimit} mins</p>
                  <p>Marks: {q.marks}</p> */}
                </div>

                {/* MCQ Options */}
                {q.type === "MCQ" && q.options && (
                  <ul className="mt-2 list-disc ml-5 text-sm text-gray-700">
                    {q.options.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {isLocked && (
            <p className="text-sm text-gray-500 mt-4">
               Questions cannot be edited because this interview is
              already published or closed.
            </p>
          )}
        </div>
      )}

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="text-indigo-600 font-semibold"
      >
        ← Back
      </button>
    </div>
  );
}
