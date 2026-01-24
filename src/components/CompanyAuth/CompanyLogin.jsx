import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function CompanyLogin() {
  const navigate = useNavigate();
  const { loginCompany } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setLoginError("");

    // EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format.");
      return;
    }

    // PASSWORD VALIDATION
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be 8+ characters, include uppercase, lowercase, number & special symbol."
      );
      return;
    }

    try {
      // 🔑 AUTH CONTEXT LOGIN
      await loginCompany(email, password);

      // ✅ REDIRECT TO COMPANY DASHBOARD
      navigate("/company/dashboard");
    } catch (error) {
      setLoginError("Invalid company credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="w-full p-4 flex items-center">
        <h1 className="text-2xl font-extrabold text-[#1e3a8a] flex items-center">
          🤖 <span className="ml-2">AI Interviewer</span>
        </h1>
      </header>

      {/* Login Box */}
      <div className="flex justify-center items-center min-h-[80vh] px-4">
        <div className="bg-white w-full max-w-md p-10 rounded-xl shadow-xl border">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
            Company Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                required
                className={`w-full p-3 border rounded-lg shadow-sm ${
                  emailError ? "border-red-500" : ""
                }`}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                required
                className={`w-full p-3 border rounded-lg shadow-sm ${
                  passwordError ? "border-red-500" : ""
                }`}
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 text-lg rounded-lg hover:bg-green-700 transition"
            >
              Login
            </button>
          </form>

          {/* General login error */}
          {loginError && (
            <p className="text-red-600 text-center mt-3">{loginError}</p>
          )}

          <p className="text-center mt-4">
            New company?{" "}
            <span
              className="text-blue-600 cursor-pointer font-semibold"
              onClick={() => navigate("/company-signup")}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
