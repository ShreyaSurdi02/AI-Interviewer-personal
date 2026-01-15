import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">

      {/* HEADER / LOGO */}
      <div className="w-full flex items-center bg-white py-4 shadow-sm px-10">
        <h1 className="text-3xl font-extrabold text-[#1e3a8a] flex items-center">
          🤖 <span className="ml-2">AI Interviewer</span>
        </h1>
      </div>

      {/* CARD CONTAINER */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-32 px-8 w-full">

        {/* STUDENT CARD */}
        <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md h-[260px] flex flex-col justify-between text-center border border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-3">For Students</h2>
            <p className="text-gray-600">
              Practice AI-powered mock interviews and improve your skills.
            </p>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Login as Student
          </button>
        </div>

        {/* COMPANY CARD */}
        <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md h-[260px] flex flex-col justify-between text-center border border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-3">For Companies</h2>
            <p className="text-gray-600">
              Manage interview sessions and evaluate candidate transcripts.
            </p>
          </div>
          <button
            onClick={() => navigate("/company-login")}
            className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Login as Company
          </button>
        </div>

      </div>
    </div>
  );
}
