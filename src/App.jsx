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

// User Authentication Components
import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";

// User Dashboard + Interview Flow
import Dashboard from "./components/Dashboard/Dashboard";
import AboutUs from "./components/About/AboutUs";
import InterviewContainer from "./components/Interview/InterviewContainer";
import CompletionScreen from "./components/Interview/CompletionScreen";
import { ReviewPage } from "./components/Interview/ReviewPage";
import Loader from "./components/Loader/Loader";

// NEW (Scope 2)
import HomePage from "./components/HomePage/HomePage";
import LandingPage from "./components/LandingPage/LandingPage";

// NEW IMPORTS FOR COMPANY AUTH
import CompanyLogin from "./components/CompanyAuth/CompanyLogin";
import CompanySignup from "./components/CompanyAuth/CompanySignup";

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

  const closeModal = () => setShowCreditsModal(false);

  return (
    <>
      {(loading || loadding) && <Loader />}

      <Routes>
        {/* HOMEPAGE */}
        <Route path="/" element={<HomePage />} />

        {/* LANDING PAGE */}
        <Route path="/landing" element={<LandingPage />} />

        {/* USER AUTH */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />

        {/* COMPANY AUTH */}
        <Route path="/company-login" element={<CompanyLogin />} />
        <Route path="/company-signup" element={<CompanySignup />} />

        <Route path="/about" element={<AboutUs />} />

        {/* USER PROTECTED ROUTES */}
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

        {/* FALLBACK */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}
