// src/components/Dashboard/Dashboard.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Bot } from "lucide-react";
import { ALL_COMPANIES_URL } from "../../utils/constants";
import fetchFunction from "../../utils/fetchFunction";
import { InterviewContext } from "../../context/InterviewContext";
import { AuthContext } from "../../context/AuthContext";

export default function Dashboard({ credits = 0 }) {
  const navigate = useNavigate();

  // Scope-1 states
  const [showCredits, setShowCredits] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [companiesInfo, setCompaniesInfo] = useState(null);

  // 🔹 Scope-2 state
  const [publishedInterviews, setPublishedInterviews] = useState([]);

  const companies = [
    { name: "TCS", role: "Frontend Developer" },
    { name: "Infosys", role: "Backend Developer" },
    { name: "Accenture", role: "Full Stack Developer" },
    { name: "Wipro", role: "UI/UX Designer" },
    { name: "Cognizant", role: "Data Analyst" },
    { name: "Capgemini", role: "Software Engineer" },
    { name: "TechVerito", role: "UI/UX Designer" },
    { name: "Cognizant", role: "Data Engineer" },
    { name: "Credinca", role: "DevOps Engineer" },
    { name: "Equifax", role: "DevOps Engineer" },
  ];

  const { setLoading, selectCompanyRole, startInterview, resetInterview } =
    useContext(InterviewContext);

  const { deductCredits } = useContext(AuthContext);

  /* =========================
     SCOPE-1: FETCH PRACTICE INTERVIEWS
     ========================= */
  useEffect(() => {
    initialCompaniesFetch();
  }, []);

  async function initialCompaniesFetch() {
    setLoading(true);
    const result = await fetchFunction({
      apiUrl: ALL_COMPANIES_URL,
      crudMethod: "GET",
      setError: setFetchError,
    });

    if (result.status === "success") {
      setCompaniesInfo(result?.companyData);
    } else {
      console.log("ERROR IN FETCH : ", fetchError);
    }
    setLoading(false);
  }

  /* =========================
     SCOPE-2: LOAD PUBLISHED INTERVIEWS
     ========================= */
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("company_interviews")) || [];

    const published = stored.filter(
      (interview) => interview.status === "Published"
    );

    setPublishedInterviews(published);
  }, []);

  /* =========================
     SCOPE-1 START INTERVIEW
     ========================= */
  const handleStart = async (company) => {
    if (credits < 5) {
      setShowCredits(true);
      return;
    }

    deductCredits(5);
    resetInterview();
    await selectCompanyRole(company.slug, company.companyName, company.role);
    startInterview();
    navigate("/interview");
  };

  /* =========================
     SCOPE-2 START INTERVIEW
     ========================= */
  const handleCompanyInterviewStart = (interview) => {
    if (credits < 5) {
      setShowCredits(true);
      return;
    }

    deductCredits(5);
    resetInterview();

    localStorage.setItem(
      "active_interview",
      JSON.stringify(interview)
    );

    startInterview();
    navigate("/interview");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#a7c0f2] via-[#7ea1e8] to-[#a7c0f2] p-8 text-gray-800 relative">
      {/* ================= HEADER ================= */}
      <header className="w-full fixed top-0 left-0 flex justify-between items-center px-10 py-4 bg-[#1e3a8a]/70 backdrop-blur-md shadow-lg border-b border-blue-400/30">
        <h1 className="flex items-center text-3xl font-extrabold text-white">
          🤖 AI <span className="text-blue-300 ml-1">Interviewer</span>
        </h1>

        <nav className="flex space-x-8 text-lg font-semibold text-white">
          <button onClick={() => navigate("/dashboard")}>Home</button>
          <button onClick={() => setShowCredits(true)}>Credits</button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      {/* ================= TITLE ================= */}
      <h1 className="text-4xl font-extrabold mt-20 mb-12 text-center drop-shadow-lg">
        Welcome to AI Interviewer
      </h1>

      {/* ================= CREDITS ================= */}
      <div className="flex justify-end mb-6 px-4">
        <div className="bg-white bg-opacity-80 px-4 py-2 rounded-lg shadow-sm text-sm font-medium">
          Credits: <span className="font-bold">{credits}</span>
        </div>
      </div>

      {/* ================= SCOPE-1 PRACTICE INTERVIEWS ================= */}
      <h2 className="text-3xl font-bold mb-8 text-center">
        Practice Interviews
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {(companiesInfo ? companiesInfo : companies).map((company, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.07 }}
            className="bg-white p-6 rounded-2xl shadow-lg w-72 text-center"
          >
            <h2 className="text-2xl font-bold text-indigo-700">
              {company.companyName}
            </h2>
            <p className="text-gray-600 mb-4">{company.role}</p>
            <button
              onClick={() => handleStart(company)}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700"
            >
              Start Interview
            </button>
          </motion.div>
        ))}
      </div>

      {/* ================= SCOPE-2 COMPANY INTERVIEWS ================= */}
<h2 className="text-3xl font-bold mt-20 mb-8 text-center">
  Company Published Interviews
</h2>

{publishedInterviews.length === 0 ? (
  <p className="text-center text-gray-600">
    No company interviews available yet.
  </p>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
    {publishedInterviews.map((interview, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.05 }}
        className="bg-white p-6 rounded-2xl shadow-xl w-80 border border-green-200 relative"
      >
        {/* LIVE BADGE */}
        <span className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
          LIVE
        </span>

        {/* COMPANY NAME */}
        <h2 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
           {interview.companyName}
        </h2>

        {/* INTERVIEW TITLE */}
        <p className="text-lg font-semibold text-green-700 mt-1">
          {interview.title}
        </p>

        <hr className="my-3" />

        {/* DETAILS */}
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <b>Role:</b> {interview.role}
          </p>
          <p>
            <b>Difficulty:</b> {interview.difficulty}
          </p>
          <p>
            <b>Duration:</b> {interview.duration} mins
          </p>
          
        </div>

        {/* CTA */}
        <button
          onClick={() => handleCompanyInterviewStart(interview)}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Attempt Interview
        </button>
      </motion.div>
    ))}
  </div>
)}


      {/* ================= FOOTER ================= */}
      <footer className="mt-20 bg-white bg-opacity-10 backdrop-blur-md py-6 rounded-t-2xl text-center text-white">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold tracking-wide">
            © 2025 <span className="text-yellow-300">AI Interviewer</span>
          </h2>
          <p className="text-sm mt-2 font-medium">
            Built by <span className="text-yellow-300">Team AI Interviewer</span>{" "}
            | NMIET Pune
          </p>
        </div>
      </footer>

      {/* ================= CREDITS MODAL ================= */}
      <AnimatePresence>
        {showCredits && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="bg-white p-8 rounded-2xl shadow-2xl w-96 text-center">
              <h2 className="text-2xl font-bold mb-4 text-indigo-700">
                Your Credits
              </h2>
              <p className="text-5xl font-extrabold text-indigo-600 mb-4">
                {credits}
              </p>
              <p className="text-gray-600 mb-6">
                Each interview costs <b>5 credits</b>.
              </p>
              <button
                onClick={() => navigate("/credits")}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700"
              >
                Buy More
              </button>
              <br />
              <button
                onClick={() => setShowCredits(false)}
                className="mt-4 text-indigo-600 font-semibold hover:underline"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
