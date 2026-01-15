import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CompanySignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    phone: "",
    location: "",
    companySize: "",
    website: "",
    industry: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    companyEmail: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on type
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    let newErrors = {
      companyEmail: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };

    // EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.companyEmail)) {
      newErrors.companyEmail = "Invalid email format.";
      valid = false;
    }

    // PHONE VALIDATION
    const phoneRegex = /^[0-9]{10}$/; // 10 digits
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone must be 10-digit number.";
      valid = false;
    }

    // PASSWORD VALIDATION
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~]).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be 8+ characters, include uppercase, lowercase, number & symbol.";
      valid = false;
    }

    // CONFIRM PASSWORD
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match!";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

    // If everything is valid
    alert("Company registration submitted!");
    navigate("/company-login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header className="w-full p-4 flex items-center">
        <h1 className="text-2xl font-extrabold text-[#1e3a8a] flex items-center">
          🤖 <span className="ml-2">AI Interviewer</span>
        </h1>
      </header>

      {/* CENTERED FORM */}
      <div className="flex justify-center items-center px-4">
        <div className="bg-white w-full max-w-xl p-10 rounded-xl shadow-xl border">

          <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
            Company Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Company Name */}
            <div>
              <label className="block font-semibold mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg shadow-sm"
              />
            </div>

            {/* Company Email */}
            <div>
              <label className="block font-semibold mb-2">Company Email</label>
              <input
                type="email"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleChange}
                required
                className={`w-full p-3 border rounded-lg shadow-sm ${
                  errors.companyEmail ? "border-red-500" : ""
                }`}
              />
              {errors.companyEmail && (
                <p className="text-red-500 text-sm">{errors.companyEmail}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block font-semibold mb-2">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={`w-full p-3 border rounded-lg shadow-sm ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block font-semibold mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg shadow-sm"
              />
            </div>

            {/* Company Size */}
            <div>
              <label className="block font-semibold mb-2">Company Size</label>
              <input
                type="number"
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg shadow-sm"
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block font-semibold mb-2">Industry Type</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg shadow-sm bg-white"
              >
                <option value="">Select Industry</option>
                <option value="IT">Information Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Consulting">Consulting</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Telecom">Telecom</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Website */}
            <div>
              <label className="block font-semibold mb-2">Website (Optional)</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full p-3 border rounded-lg shadow-sm ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block font-semibold mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={`w-full p-3 border rounded-lg shadow-sm ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 text-lg rounded-lg hover:bg-green-700 transition"
            >
              Register
            </button>
          </form>

          <p className="text-center mt-4">
            Already registered?{" "}
            <span
              className="text-blue-600 cursor-pointer font-semibold"
              onClick={() => navigate("/company-login")}
            >
              Login here
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}
