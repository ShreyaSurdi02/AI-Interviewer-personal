import React, { useContext, useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import { InterviewContext } from "./context/InterviewContext";

// =======================
// USER (SCOPE 1) IMPORTS
// =======================
import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";

import Dashboard from "./components/Dashboard/Dashboard";
import AboutUs from "./components/About/AboutUs";
import InterviewContainer from "./components/Interview/InterviewContainer";
import CompletionScreen from "./components/Interview/CompletionScreen";
import { ReviewPage } from "./components/Interview/ReviewPage";
import Loader from "./components/Loader/Loader";

// =======================
// COMMON / LANDING
// =======================
import HomePage from "./components/HomePage/HomePage";
import LandingPage from "./components/LandingPage/LandingPage";

// =======================
// COMPANY AUTH (SCOPE 2)
// =======================
import CompanyLogin from "./components/CompanyAuth/CompanyLogin";
import CompanySignup from "./components/CompanyAuth/CompanySignup";
import CompanyProtectedRoute from "./components/CompanyAuth/CompanyProtectedRoute";

// =======================
// COMPANY DASHBOARD (SCOPE 2)
// =======================
import CompanyLayout from "./components/CompanyDashboard/CompanyLayout";
import Overview from "./components/CompanyDashboard/Overview";
import InterviewManagement from "./components/CompanyDashboard/InterviewManagement";
import CreateInterview from "./components/CompanyDashboard/CreateInterview";
import Candidates from "./components/CompanyDashboard/Candidates";
import Analytics from "./components/CompanyDashboard/Analytics";
import Notifications from "./components/CompanyDashboard/Notifications";
import Settings from "./components/CompanyDashboard/Settings";
import InterviewDetails from "./components/CompanyDashboard/InterviewDetails";
import EditInterview from "./components/CompanyDashboard/EditInterview";


// =======================
// APP WRAPPER
// =======================
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const { user, credits, deductCredits, loading } = useContext(AuthContext);
  const { loadding } = useContext(InterviewContext);

  const interviewCtx = useContext(InterviewContext) || {};
  const {
    started = false,
    setStarted = () => {},
    selectedCompany = null,
    selectCompanyRole = () => {},
  } = interviewCtx;

  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const navigate = useNavigate();

  // =======================
  // SCOPE 1 INTERVIEW LOGIC
  // =======================
  const handleSelectRole = (slug, companyName, role) => {
    if (credits <= 0) {
      setShowCreditsModal(true);
      return;
    }

    if (credits < 5) {
      alert("Not enough credits!");
      return;
    }

    deductCredits(5);
    selectCompanyRole(slug, role);
    setStarted(true);
    navigate("/interview");
  };

  return (
    <>
      {(loading || loadding) && <Loader />}

      <Routes>
        {/* ======================= */}
        {/* PUBLIC PAGES */}
        {/* ======================= */}
        <Route path="/" element={<HomePage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />

        {/* ======================= */}
        {/* USER AUTH (SCOPE 1) */}
        {/* ======================= */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />

        {/* ======================= */}
        {/* COMPANY AUTH (SCOPE 2) */}
        {/* ======================= */}
        <Route path="/company-login" element={<CompanyLogin />} />
        <Route path="/company-signup" element={<CompanySignup />} />

        {/* ======================= */}
        {/* USER DASHBOARD (SCOPE 1) */}
        {/* ======================= */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard credits={credits} onSelect={handleSelectRole} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/interview"
          element={
            user ? (
              started && selectedCompany ? (
                <InterviewContainer />
              ) : (
                <Dashboard credits={credits} onSelect={handleSelectRole} />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/completed"
          element={
            user ? <CompletionScreen /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/review"
          element={user ? <ReviewPage /> : <Navigate to="/login" replace />}
        />

        {/* ================================================= */}
        {/* COMPANY DASHBOARD (SCOPE 2 – PROTECTED & NESTED) */}
        {/* ================================================= */}
        <Route
          path="/company/dashboard"
          element={
            <CompanyProtectedRoute>
              <CompanyLayout />
            </CompanyProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="interviews" element={<InterviewManagement />} />
          <Route path="create-interview" element={<CreateInterview />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
          <Route path="interview/:id" element={<InterviewDetails />} />
          <Route path="edit-interview/:id" element={<EditInterview />} />
        </Route>

        {/* ======================= */}
        {/* FALLBACK */}
        {/* ======================= */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}
