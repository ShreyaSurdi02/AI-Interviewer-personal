import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateInterview() {
  const navigate = useNavigate();

  /* ================= STEPS ================= */
  const [step, setStep] = useState(1);

  /* ================= INTERVIEW STATE ================= */
  const [interview, setInterview] = useState({
    id: Date.now(),
    title: "",
    role: "",
    description: "",
    type: "Technical",
    difficulty: "Easy",
    duration: 30,
    scheduledAt: "",
    questions: [],
    status: "Draft",
    createdAt: new Date().toLocaleDateString(),
  

   /* ====== 3.4 ACCESS CONTROL ====== */
    accessType: "Public", // Public | Private
    invitedCandidates: [],
  });

  /* ================= QUESTION STATE ================= */
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("Descriptive");
  const [questionDifficulty, setQuestionDifficulty] = useState("Easy");
  const [timeLimit, setTimeLimit] = useState(60);


  /* ================= INVITE STATE ================= */
  const [inviteEmail, setInviteEmail] = useState("");

  /* ================= ADD QUESTION ================= */
  const addQuestion = () => {
    if (!questionText.trim()) return;

    setInterview({
      ...interview,
      questions: [
        ...interview.questions,
        {
          id: Date.now(),
          text: questionText,
          type: questionType,
          difficulty: questionDifficulty,
          timeLimit,
        },
      ],
    });

    setQuestionText("");
    setTimeLimit(60);
    setQuestionDifficulty("Easy");
  };

  /* ================= DELETE QUESTION ================= */
  const deleteQuestion = (id) => {
    setInterview({
      ...interview,
      questions: interview.questions.filter((q) => q.id !== id),
    });
  };

  /* ================= REORDER QUESTIONS ================= */
  const moveUp = (index) => {
    if (index === 0) return;
    const updated = [...interview.questions];
    [updated[index - 1], updated[index]] = [
      updated[index],
      updated[index - 1],
    ];
    setInterview({ ...interview, questions: updated });
  };

  const moveDown = (index) => {
    if (index === interview.questions.length - 1) return;
    const updated = [...interview.questions];
    [updated[index], updated[index + 1]] = [
      updated[index + 1],
      updated[index],
    ];
    setInterview({ ...interview, questions: updated });
  };


  /* ================= INVITE LOGIC ================= */
  const addInvite = () => {
    if (!inviteEmail.trim()) return;

    const exists = interview.invitedCandidates.some(
      (c) => c.email === inviteEmail
    );
    if (exists) {
      alert("Student already invited");
      return;
    }

    setInterview({
      ...interview,
      invitedCandidates: [
        ...interview.invitedCandidates,
        {
          email: inviteEmail,
          invitedAt: new Date().toLocaleDateString(),
          status: "Invited",
        },
      ],
    });

    setInviteEmail("");
  };

  const revokeInvite = (email) => {
    setInterview({
      ...interview,
      invitedCandidates: interview.invitedCandidates.filter(
        (c) => c.email !== email
      ),
    });
  };

  const resendInvite = (email) => {
    alert(`Invitation resent to ${email}`);
  };

  /* ================= SAVE INTERVIEW ================= */
  const saveInterview = (status) => {
    if (
      !interview.title ||
      !interview.role ||
      interview.questions.length === 0
    ) {
      alert("Please complete all steps before saving.");
      return;
    }

    const existing =
      JSON.parse(localStorage.getItem("company_interviews")) || [];

    localStorage.setItem(
      "company_interviews",
      JSON.stringify([...existing, { ...interview, status }])
    );

    alert(
      `Interview ${status === "Draft" ? "saved as Draft" : "Published"}`
    );
    navigate("/company/dashboard/interviews");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        Create Interview (Step {step}/3)
      </h2>

      {/* ================= STEP 1: BASIC DETAILS ================= */}
      {step === 1 && (
        <div className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="Interview Title"
            value={interview.title}
            onChange={(e) =>
              setInterview({ ...interview, title: e.target.value })
            }
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Job Role"
            value={interview.role}
            onChange={(e) =>
              setInterview({ ...interview, role: e.target.value })
            }
          />

          <textarea
            className="w-full border p-2 rounded"
            placeholder="Interview Description"
            value={interview.description}
            onChange={(e) =>
              setInterview({
                ...interview,
                description: e.target.value,
              })
            }
          />

          <div className="flex gap-4">
            <select
              className="border p-2 rounded"
              value={interview.type}
              onChange={(e) =>
                setInterview({ ...interview, type: e.target.value })
              }
            >
              <option>Technical</option>
              <option>HR</option>
              <option>Mixed</option>
            </select>

            <select
              className="border p-2 rounded"
              value={interview.difficulty}
              onChange={(e) =>
                setInterview({
                  ...interview,
                  difficulty: e.target.value,
                })
              }
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <input
              type="number"
              className="border p-2 rounded w-32"
              value={interview.duration}
              onChange={(e) =>
                setInterview({
                  ...interview,
                  duration: e.target.value,
                })
              }
            />
          </div>

          <input
            type="datetime-local"
            className="border p-2 rounded"
            value={interview.scheduledAt}
            onChange={(e) =>
              setInterview({
                ...interview,
                scheduledAt: e.target.value,
              })
            }
          />

          {/* ===== ACCESS TYPE (3.4) ===== */}
          <div className="border p-4 rounded-lg">
            <label className="font-medium">Interview Access</label>

            <select
              className="border p-2 rounded ml-4"
              value={interview.accessType}
              onChange={(e) =>
                setInterview({
                  ...interview,
                  accessType: e.target.value,
                  invitedCandidates:
                    e.target.value === "Public"
                      ? []
                      : interview.invitedCandidates,
                })
              }
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>

            {interview.accessType === "Private" && (
              <div className="mt-4">
                <div className="flex gap-3 mb-3">
                  <input
                    type="email"
                    className="border p-2 rounded flex-1"
                    placeholder="Student email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                  <button
                    onClick={addInvite}
                    className="bg-blue-600 text-white px-4 rounded"
                  >
                    Invite
                  </button>
                </div>

                {interview.invitedCandidates.map((c, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border p-2 rounded mb-2"
                  >
                    <div>
                      <p className="font-medium">{c.email}</p>
                      <p className="text-xs text-gray-500">
                        Invited on {c.invitedAt}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => resendInvite(c.email)}
                        className="text-blue-600 text-sm"
                      >
                        Resend
                      </button>
                      <button
                        onClick={() => revokeInvite(c.email)}
                        className="text-red-600 text-sm"
                      >
                        Revoke
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
  

      {/* ================= STEP 2: QUESTIONS ================= */}
      {step === 2 && (
        <div>
          <h3 className="font-semibold mb-4">Add Questions</h3>

          <textarea
            className="w-full border p-2 rounded mb-2"
            placeholder="Question text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />

          <div className="flex gap-3 mb-4 flex-wrap">
            <select
              className="border p-2 rounded"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
            >
              <option>MCQ</option>
              <option>Descriptive</option>
              <option>Coding</option>
              <option>Audio</option>
            </select>

            <select
              className="border p-2 rounded"
              value={questionDifficulty}
              onChange={(e) =>
                setQuestionDifficulty(e.target.value)
              }
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <input
              type="number"
              className="border p-2 rounded w-32"
              placeholder="Time (sec)"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
            />

            <button
              onClick={addQuestion}
              className="bg-green-600 text-white px-4 rounded"
            >
              Add
            </button>
          </div>

          {/* QUESTION LIST */}
          <div className="space-y-3">
            {interview.questions.map((q, i) => (
              <div
                key={q.id}
                className="border rounded-lg p-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">
                    Q{i + 1}. {q.text}
                  </p>
                  <p className="text-xs text-gray-500">
                    {q.type} • {q.difficulty} • {q.timeLimit}s
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => moveUp(i)}
                    className="px-2 py-1 border rounded"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveDown(i)}
                    className="px-2 py-1 border rounded"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => deleteQuestion(q.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= STEP 3: PREVIEW ================= */}
      {step === 3 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Interview Preview
          </h3>

          <p>
            <b>Title:</b> {interview.title}
          </p>
          <p>
            <b>Role:</b> {interview.role}
          </p>
          <p>
            <b>Difficulty:</b> {interview.difficulty}
          </p>
          <p>
            <b>Duration:</b> {interview.duration} mins
          </p>

          <div className="mt-4">
            {interview.questions.map((q, i) => (
              <div
                key={q.id}
                className="border p-3 rounded mb-2"
              >
                <b>Q{i + 1}:</b> {q.text}
                <div className="text-xs text-gray-500">
                  {q.type} • {q.difficulty} • {q.timeLimit}s
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= NAVIGATION ================= */}
      <div className="flex justify-between mt-8">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 border rounded"
          >
            Back
          </button>
        )}

        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Next
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => saveInterview("Draft")}
              className="bg-gray-600 text-white px-6 py-2 rounded"
            >
              Save Draft
            </button>
            <button
              onClick={() => saveInterview("Published")}
              className="bg-green-600 text-white px-6 py-2 rounded"
            >
              Publish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
